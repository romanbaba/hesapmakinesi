import type { CommandOptions } from '@/types.ts';
import ansiColors from 'ansi-colors';
import consola from 'consola';
import { REST, Routes } from 'discord.js';
import { glob } from 'glob';

export const commands: CommandOptions[] = [];
export const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

export async function reloadCommands() {
  const commandDir = './src/commands';
  const commandFiles = (await glob('*.ts', { withFileTypes: true, cwd: commandDir }))
    .filter((path) => path.isFile());

  for await (const { name } of commandFiles) {
    const importDir = `../commands/${name}`;
    const { CommandData: command }: { CommandData: CommandOptions } = await import(importDir);

    if (!('data' in command && 'run' in command)) continue;

    commands.push(command);
    consola.info(`Başarıyla ${ansiColors.bold(name)} adlı komut kayıt edildi.`);
  }

  await rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_ID), {
    body: commands.map((command) => command.data),
  });
  consola.info(`Başarıyla ${ansiColors.bold(commands.length.toString())} komut Discord API'ye gönderildi.`);
}