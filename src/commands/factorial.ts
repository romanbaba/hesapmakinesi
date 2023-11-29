import type { CommandOptions } from '@/types.ts';
import { factorial } from '@/utils/factorial.ts';
import ansiColors from 'ansi-colors';
import { Colors, EmbedBuilder, SlashCommandBuilder, codeBlock } from 'discord.js';
import isNumber from 'is-number';

export const CommandData: CommandOptions = {
  data: new SlashCommandBuilder()
    .setName('faktöriyel')
    .setDescription('İstediğiniz bir sayıyı girerek o sayının faktöriyelini bulabilirsiniz')
    .addIntegerOption((input) => input.setName('n').setDescription('Bir sayı giriniz.').setRequired(true)),
  async run(interaction) {
    const n = interaction.options.getInteger('n', true);

    try {
      const f = factorial(n);

      const resultMessage = isNumber(f) ? `!${n} = ${ansiColors.bold.blue(f.toLocaleString('tr'))}` : 'Yüksek Veri';

      const finalEmbed = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setAuthor({
          name: `${interaction.user.displayName} (@${interaction.user.username})`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTitle('Faktöriyel Hesaplayıcı')
        .setDescription(
          'Yapacağınız hesap işlemlerinde hiçbir veri saklanmamaktadır. Dilediğiniz gibi hesap yapabilirsiniz; ancak henüz tam fonksiyonlu değildir. Kullandığınız bu açık kaynaklı kod, [@ewgsta](https://github.com/ewgsta/djs-math) tarafından tasarlanmış ve kodlanmıştır.',
        )
        .setTimestamp()
        .setFooter({
          text: `${interaction.client.user.username} 💗 Open Source`,
          iconURL: interaction.client.user.displayAvatarURL(),
        })
        .addFields({ name:'Sonuç:', value: codeBlock('ansi', `${ansiColors.blue(resultMessage)}`) });

      await interaction.reply({ embeds: [finalEmbed], fetchReply: true });
    }
    catch {
      const finalEmbed = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setAuthor({
          name: `${interaction.user.displayName} (@${interaction.user.username})`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTitle('Faktöriyel Hesaplayıcı')
        .setDescription(
          'Yapacağınız hesap işlemlerinde hiçbir veri saklanmamaktadır. Dilediğiniz gibi hesap yapabilirsiniz; ancak henüz tam fonksiyonlu değildir. Kullandığınız bu açık kaynaklı kod, [@ewgsta](https://github.com/ewgsta/djs-math) tarafından tasarlanmış ve kodlanmıştır.',
        )
        .setTimestamp()
        .setFooter({
          text: `${interaction.client.user.username} 💗 Open Source`,
          iconURL: interaction.client.user.displayAvatarURL(),
        })
        .addFields({ name:'Sonuç:', value: codeBlock('ansi', `${ansiColors.blue(`!${n} = ${ansiColors.bold.red('İşlem Hatası')}`)}`) });

      await interaction.reply({ embeds: [finalEmbed], fetchReply: true });
    }
  },
};