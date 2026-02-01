import type { Command } from "../types/command";
import { command as pingCommand } from "./utility/ping";

/**
 * All available commands
 * To add a new command:
 * 1. Create a command file that exports a 'command' object
 * 2. Import it here
 * 3. Add it to the commands array below
 */
export const commands: Command[] = [pingCommand];
