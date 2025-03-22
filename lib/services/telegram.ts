import "dotenv/config";

class TelegramService {
  private BASE_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

  async makeRequest(method: string, params: Record<string, any>) {
    const response = await fetch(`${this.BASE_URL}/${method}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  }

  async sendMessage(message: string) {
    const response = await this.makeRequest("sendMessage", {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: process.env.DEBUG ? `MESSAGE FROM LOCAL DEVELOPMENT\n\n${message}` : message,
    });
    return response;
  }

  async getUpdates() {
    const response = await this.makeRequest("getUpdates", {});
    return JSON.stringify(response);
  }
}

export default new TelegramService();
