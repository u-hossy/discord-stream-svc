import { Client, Events, GatewayIntentBits } from "discord.js";
import { registerGlobalCommands } from "./utils/register-global-commands";

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.trace("DISCORD_TOKEN must be given.");
  process.exit(1);
}

// Deploy global commands
try {
  registerGlobalCommands();
} catch (e) {
  console.error("Error has occurred in deploying commands:");
  if (e instanceof Error) {
    console.error(`Message: ${e.message}`);
    if (e.stack) {
      console.error(`Stack trace:\n${e.stack}`);
    }
  } else {
    console.error("Unknown error:", e);
  }
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
