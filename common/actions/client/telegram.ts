export async function sendTelegramNotification(message: string) {
    const TELEGRAM_TOKEN = "8575822994:AAEKIwd7v7onPSvxJuKoNxJY1_a9DBRevAM"
    const CHAT_ID = "-1003946016934"
  
    if (!TELEGRAM_TOKEN || !CHAT_ID) {
      console.error('❌ Missing Telegram config: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
      return;
    }
  
    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Telegram API error:', response.status, errorData);
        return;
      }

      const result = await response.json();
      if (!result.ok) {
        console.error('❌ Telegram send failed:', result.description);
        return;
      }

      console.log('✅ Telegram notification sent successfully');
    } catch (err) {
      console.error('❌ Failed to send Telegram message:', err);
    }
  }
  