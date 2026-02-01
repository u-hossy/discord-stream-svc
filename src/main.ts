import { Client, Events, GatewayIntentBits } from "discord.js";
import { loadCommands } from "./handlers/commandHandler";
import { registerGlobalCommands } from "./utils/register-global-commands";

const token = process.env.DISCORD_STREAM_SVC_TOKEN;

if (!token) {
  console.trace(
    "DISCORD_STREAM_SVC_TOKEN must be set in environment variables",
  );
  process.exit(1);
}

// Deploy global commands
try {
  await registerGlobalCommands();
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

// Load commands into the client
const commands = await loadCommands();

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Handle slash command interactions
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);

    const errorMessage = {
      content: "コマンドの実行中にエラーが発生しました。",
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

// Log in to Discord with your client's token
client.login(token);
