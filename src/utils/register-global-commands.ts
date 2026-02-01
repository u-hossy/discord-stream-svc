import { REST, Routes } from "discord.js";
import { getCommandsData, loadCommands } from "../handlers/commandHandler";

/**
 * Deploy slash commands to Discord
 */
export async function registerGlobalCommands() {
  const token = process.env.DISCORD_STREAM_SVC_TOKEN;
  const clientId = process.env.DISCORD_STREAM_SVC_CLIENT_ID;

  if (!token || !clientId) {
    throw new Error(
      "DISCORD_STREAM_SVC_TOKEN and DISCORD_STREAM_SVC_CLIENT_ID must be set in environment variables",
    );
  }

  // Load all commands
  const commands = await loadCommands();
  const commandsData = getCommandsData(commands);

  if (commandsData.length === 0) {
    console.log("No commands to deploy.");
    return;
  }

  // Deploy commands
  const rest = new REST().setToken(token);

  try {
    console.log(
      `Started refreshing ${commandsData.length} application (/) commands.`,
    );

    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: commandsData,
    });

    console.log(
      `✅ Successfully deployed ${(data as unknown[]).length} application (/) commands.`,
    );
  } catch (error) {
    console.error("Error deploying commands:", error);
    throw error;
  }
}
