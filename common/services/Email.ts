import formData from "form-data";
import Mailgun from "mailgun.js";
import type Mail from "nodemailer/lib/mailer";

import Service from "./Service";

/* service details */
const id = "EmailService";

interface MailgunTransporter {
  sendMail(
    mail: Mail.Options
  ): Promise<{ messageId: string; accepted: string[]; rejected: string[] }>;
  close(): Promise<void>;
  verify(): Promise<boolean>;
}

class EmailService extends Service<MailgunTransporter> {
  name = "Email";
  category = "Email";
  description = "Email Service";
  enabled: boolean;
  private domain: string;

  constructor(enabled = true) {
    super(
      id,
      enabled
        ? EmailService.connect()
        : (Promise.resolve() as unknown as Promise<MailgunTransporter>)
    );
    this.enabled = enabled;
    this.domain = process.env.MAILGUN_DOMAIN || "";
  }

  public static async connect(): Promise<MailgunTransporter> {
    return new Promise((resolve, reject) => {
      try {
        const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
        const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

        if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
          throw new Error("Mailgun API key or domain not configured");
        }

        const mailgun = new Mailgun(formData);
        const client = mailgun.client({
          username: "api",
          key: MAILGUN_API_KEY,
          url: "https://api.mailgun.net",
        });

        const transporter: MailgunTransporter = {
          async sendMail(mail: Mail.Options) {
            const messageData: any = {
              from: EmailService.formatFrom(mail.from),
              to: EmailService.formatRecipients(mail.to),
              subject: mail.subject || "",
              text: mail.text || "",
              html: mail.html || "",
            };

            if (mail.cc) {
              messageData.cc = EmailService.formatRecipients(mail.cc);
            }

            if (mail.bcc) {
              messageData.bcc = EmailService.formatRecipients(mail.bcc);
            }

            if (mail.replyTo) {
              messageData["h:Reply-To"] = EmailService.formatRecipients(
                mail.replyTo
              );
            }

            if (mail.attachments && Array.isArray(mail.attachments)) {
              messageData.attachment = mail.attachments
                .filter((att) => att && att.content != null)
                .map((att) => {
                  try {
                    if (typeof att.content === "string") {
                      return {
                        filename: att.filename || "attachment",
                        data: Buffer.from(
                          att.content,
                          (att.encoding as BufferEncoding) || "utf8"
                        ),
                      };
                    } else if (Buffer.isBuffer(att.content)) {
                      return {
                        filename: att.filename || "attachment",
                        data: att.content,
                      };
                    } else if (att.path) {
                      return {
                        filename: att.filename || "attachment",
                        data: att.path,
                      };
                    }
                    return null;
                  } catch (error) {
                    console.error("Error processing attachment:", error);
                    return null;
                  }
                })
                .filter(Boolean);
            }

            const result = await client.messages.create(
              MAILGUN_DOMAIN,
              messageData
            );

            return {
              messageId: result.id || `mg_${Date.now()}`,
              accepted:
                typeof messageData.to === "string"
                  ? [messageData.to]
                  : Array.isArray(messageData.to)
                  ? messageData.to.split(",").map((e: string) => e.trim())
                  : [],
              rejected: [] as string[],
            };
          },

          async verify() {
            return true;
          },

          async close() {
            return;
          },
        };

        console.info("📬 The Mailgun email service is ready");
        resolve(transporter);
      } catch (error) {
        console.error(`📭 Error in Email Service: ${error}`);
        reject(error);
      }
    });
  }

  async sendEmail(mail: Mail.Options) {
    if (this.enabled)
      return this.connection.then((transporter) => {
        const email = transporter.sendMail(mail);
        email.then((res) => {
          console.info(
            "email sent",
            res.messageId,
            "accepted by",
            res.accepted,
            "rejected by",
            res.rejected
          );
        });
        return email;
      });
  }

  public stop(): Promise<void> {
    return this.connection.then((transporter) => {
      return transporter.close();
    });
  }

  private static formatFrom(
    address: string | Mail.Address | undefined
  ): string {
    if (!address) return "";

    if (typeof address === "string") {
      return address;
    }

    if (address.name) {
      return `${address.name} <${address.address}>`;
    }

    return address.address;
  }

  private static formatRecipients(
    addresses: string | Mail.Address | (string | Mail.Address)[] | undefined
  ): string {
    if (!addresses) return "";

    const addressArray = Array.isArray(addresses) ? addresses : [addresses];
    return addressArray
      .map((addr) => {
        if (typeof addr === "string") {
          return addr;
        }
        if (addr.name) {
          return `${addr.name} <${addr.address}>`;
        }
        return addr.address;
      })
      .filter(Boolean)
      .join(", ");
  }
}

export default EmailService;
