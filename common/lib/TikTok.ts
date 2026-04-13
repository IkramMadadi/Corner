import { v4 as uuidv4 } from "uuid";

type TikTokEventParams = Record<string, any>;

declare global {
  interface Window {
    ttq?: {
      track: (
        event: string,
        params?: Record<string, unknown>,
        options?: { event_id?: string }
      ) => void;
      page: () => void;
      load: (pixelId: string, options?: Record<string, unknown>) => void;
      instance: (pixelId: string) => any;
      identify: (params: Record<string, unknown>) => void;
      enableCookie: () => void;
      disableCookie: () => void;
    };
  }
}

const eventNameMap: Record<string, string> = {
  Purchase: "CompletePayment",
  AddToCart: "AddToCart",
  ViewContent: "ViewContent",
  InitiateCheckout: "InitiateCheckout",
};

function mapEventName(eventName: string): string {
  return eventNameMap[eventName] || eventName;
}

export async function trackTikTokEvent(
  eventName: string,
  websiteId: string,
  params: TikTokEventParams = {},
  sendToEapi = false,
  userData?: { client_name?: string; client_number?: string; email?: string },
  options?: { test_event_code?: string; event_id?: string; ttclid?: string }
) {
  const mapped = mapEventName(eventName);
  const event_id = options?.event_id || uuidv4();

  let formattedPhone = undefined;

  if (userData?.client_number) {
    let rawPhone = userData.client_number.replace(/\D/g, '');

    if (rawPhone.startsWith('00213')) {
      rawPhone = rawPhone.substring(2);
    } else if (rawPhone.startsWith('0') && rawPhone.length === 10) {
      rawPhone = '213' + rawPhone.substring(1);
    } else if (!rawPhone.startsWith('213') && rawPhone.length === 9) {
      rawPhone = '213' + rawPhone;
    }

    formattedPhone = `+${rawPhone}`;
  }

  const tiktokUserData = {
    phone_number: formattedPhone,
    external_id: formattedPhone,
  };

  if (typeof window !== "undefined" && window.ttq) {
    try {
      if (formattedPhone) {
        window.ttq.identify(tiktokUserData);
      }
      
      window.ttq.track(mapped, params, { event_id });
    } catch (e) {
      console.error("TikTok Pixel Error:", e);
    }
  }

  if (sendToEapi && websiteId) {
    try {
      await fetch(`/api/tiktok-event/${mapped}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteId,
          userData: tiktokUserData,
          properties: params,
          url: typeof window !== "undefined" ? window.location.href : undefined,
          event_id,
          test_event_code: options?.test_event_code,
          ttclid: options?.ttclid,
        }),
      });
    } catch (e) {
      console.error("Error sending event to TikTok EAPI:", e);
    }
  }
}
