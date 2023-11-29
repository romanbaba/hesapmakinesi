import type { CommandOptions } from '@/types.ts';
import { generateButtons } from '@/utils/generateButtons.ts';
import { mathButtons } from '@/utils/mathButtons.ts';
import ansiColors from 'ansi-colors';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Colors,
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  codeBlock,
} from 'discord.js';
import isNumber from 'is-number';
import ms from 'ms';

export const CommandData: CommandOptions = {
  data: new SlashCommandBuilder()
    .setName('hesapmakinesi')
    .setDescription(
      'Hesap makinesini açarak aritmetik işlemler yapabilirsiniz.',
    ),
  async run(interaction) {
    const {
      firstActionRowBuilder,
      secondActionRowBuilder,
      thirdActionRowBuilder,
      fourthActionRowBuilder,
    } = generateButtons(mathButtons);

    const message = await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Blue)
          .setAuthor({
            name: `${interaction.user.displayName} (@${interaction.user.username})`,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle('Hesap Makinesi')
          .setDescription(
            'Yapacağınız hesap işlemlerinde hiçbir veri saklanmamaktadır. Dilediğiniz gibi hesap yapabilirsiniz; ancak henüz tam fonksiyonlu değildir. Kullandığınız bu açık kaynaklı kod, [@ewgsta](https://github.com/ewgsta/djs-math) tarafından tasarlanmış ve kodlanmıştır.',
          )
          .setFields({
            name: 'İşleminiz:',
            value: codeBlock('yaml', '\u200B'),
          })
          .setTimestamp()
          .setFooter({
            text: `${interaction.client.user.username} 💗 Open Source`,
            iconURL: interaction.client.user.displayAvatarURL(),
          }),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().setComponents(
          new ButtonBuilder()
            .setCustomId('disabledButtonOne')
            .setDisabled(true)
            .setLabel('\u200B')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('disabledButtonTwo')
            .setDisabled(true)
            .setLabel('\u200B')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('C')
            .setEmoji('1179054526020464690')
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId('CE')
            .setEmoji('1147605823292461167')
            .setStyle(ButtonStyle.Danger),
        ),
        firstActionRowBuilder,
        secondActionRowBuilder,
        thirdActionRowBuilder,
        fourthActionRowBuilder,
      ],
      fetchReply: true,
    });

    let mathData: string[] = [];

    const updateEmbed = async (
      i: ButtonInteraction,
      operation: string,
      result?: string,
    ) => {
      await i.update({
        embeds: [
          new EmbedBuilder(message.embeds[0]?.data).setFields({
            name: 'İşleminiz:',
            value: codeBlock(
              'ansi',
              `${ansiColors.blue(result || operation)}`,
            ),
          }),
        ],
      });
    };

    const handleButtonClick = async (i: ButtonInteraction) => {
      const customId = i.customId;
      switch (customId) {
      case 'CE': {
        mathData = [];
        await updateEmbed(i, '\u200B');
        break;
      }
      case 'C': {
        mathData.pop();
        const operation = mathData
          .map(
            (value) =>
              `${
                isNumber(value) || value === '.' ? '' : ' '
              }${value
                .replaceAll('*', 'x')
                .replaceAll('/', '÷')}${
                isNumber(value) || value === '.' ? '' : ' '
              }`,
          );
        await updateEmbed(i, operation.length ? operation.join('') : '\u200B');
        break;
      }
      case '=': {
        const math = mathData.join('');
        const operation = mathData
          .map(
            (value) =>
              `${
                isNumber(value) || value === '.' ? '' : ' '
              }${value
                .replaceAll('*', 'x')
                .replaceAll('/', '÷')}${
                isNumber(value) || value === '.' ? '' : ' '
              }`,
          )
          .join('');
        try {
          const result = eval(math);
          if (!isNumber(result)) {
            await updateEmbed(
              i,
              operation,
              `${operation} = ${ansiColors.red.bold(
                'İşlem Hatası',
              )}`,
            );
          }
          else {
            await updateEmbed(
              i,
              operation,
              `${operation} = ${ansiColors.bold(
                `${result}`,
              )}`,
            );
          }
        }
        catch {
          await updateEmbed(
            i,
            operation,
            `${operation} = ${ansiColors.red.bold(
              'İşlem Hatası',
            )}`,
          );
        }
        break;
      }
      default: {
        mathData.push(customId);
        const operation = mathData
          .map(
            (value) =>
              `${
                isNumber(value) || value === '.' ? '' : ' '
              }${value
                .replaceAll('*', 'x')
                .replaceAll('/', '÷')}${
                isNumber(value) || value === '.' ? '' : ' '
              }`,
          )
          .join('');
        await updateEmbed(i, operation);
        break;
      }
      }
    };

    const filter = (i: ButtonInteraction) =>
      i.message.id === message.id && i.user.id === interaction.user.id;
    const buttonClick = message.createMessageComponentCollector({
      filter,
      time: ms('1m'),
      componentType: ComponentType.Button,
    });

    buttonClick.on('collect', handleButtonClick);
  },
};
