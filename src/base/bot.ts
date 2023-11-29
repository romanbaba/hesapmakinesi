import { reloadCommands } from '@/modules/commands.ts';
import { reloadEvents } from '@/modules/events.ts';
import { Client, IntentsBitField } from 'discord.js';

export const bot = new Client({
  intents: [IntentsBitField.Flags.Guilds],
  partials: [],
  rest: {
    offset: 0,
  },
  ws: {
    large_threshold: 250,
  },
});

export async function start() {
  await reloadCommands();
  await reloadEvents();

  await bot.login(process.env.DISCORD_BOT_TOKEN);
}