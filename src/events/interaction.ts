import { commands } from '@/modules/commands.ts';
import type { EventOptions } from '@/types.ts';

export const EventData: EventOptions<'interactionCreate'> = {
  category: 'interactionCreate',
  run(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.find((c) => c.data.name === interaction.commandName);
    if (!command) return;

    command.run(interaction);
  },
};