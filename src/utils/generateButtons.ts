import type { MathButtonData } from '@/types.ts';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import isNumber from 'is-number';

export function generateButtons(buttonDataList: MathButtonData[]): {
    firstActionRowBuilder: ActionRowBuilder<ButtonBuilder>
    secondActionRowBuilder: ActionRowBuilder<ButtonBuilder>
    thirdActionRowBuilder: ActionRowBuilder<ButtonBuilder>
    fourthActionRowBuilder: ActionRowBuilder<ButtonBuilder>
} {
  const actionRowBuilders: ActionRowBuilder<ButtonBuilder>[] = [];

  for (let i = 0; i < buttonDataList.length; i += 4) {
    const actionRowBuilder = new ActionRowBuilder<ButtonBuilder>();

    actionRowBuilder.addComponents(buttonDataList.slice(i, i + 4).map((buttonData) => {
      return new ButtonBuilder()
        .setCustomId(buttonData.custom_id)
        .setEmoji(buttonData.emoji)
        .setStyle(isNumber(buttonData.custom_id) ? ButtonStyle.Primary : ButtonStyle.Secondary);
    }));

    actionRowBuilders.push(actionRowBuilder);
  }

  return {
    firstActionRowBuilder: actionRowBuilders[0]!,
    secondActionRowBuilder: actionRowBuilders[1]!,
    thirdActionRowBuilder: actionRowBuilders[2]!,
    fourthActionRowBuilder: actionRowBuilders[3]!,
  };
}