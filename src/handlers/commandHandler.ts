import { Collection } from "discord.js";
import { commands as commandList } from "../commands/index";
import type { Command } from "../types/command";

/**
 * Load all commands from the commands index
 */
export async function loadCommands(): Promise<Collection<string, Command>> {
  const commands = new Collection<string, Command>();

  for (const command of commandList) {
    commands.set(command.data.name, command);
  }

  return commands;
}

/**
 * Get all command data in JSON format for deployment
 */
export function getCommandsData(commands: Collection<string, Command>) {
  return commands.map((command) => command.data.toJSON());
}
