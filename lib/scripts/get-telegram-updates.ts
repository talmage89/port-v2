import TelegramService from "@/lib/services/telegram";

// Function to get updates from Telegram
const getUpdates = async () => {
  const updates = await TelegramService.getUpdates();
  console.log(updates);
};

// Function to send a message to Telegram
const sendMessage = async (text: string) => {
  const message = await TelegramService.sendMessage(text);
  console.log(message);
};

// CLI argument parsing
const main = async () => {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log("Usage:");
    console.log("  npm run telegram -- updates         Get recent Telegram updates");
    console.log('  npm run telegram -- send "message"  Send a message to Telegram');
    return;
  }

  switch (command) {
    case "updates":
      await getUpdates();
      break;
    case "send":
      const messageText = args[1];
      if (!messageText) {
        console.error("Error: Message text is required");
        console.log('Usage: npm run telegram -- send "Your message here"');
        return;
      }
      await sendMessage(messageText);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.log("Available commands: updates, send");
  }
};

// Execute the main function
main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
