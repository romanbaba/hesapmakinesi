import { bot } from '@/base/bot.ts';
import type { Categories, EventOptions } from '@/types.ts';
import ansiColors from 'ansi-colors';
import consola from 'consola';
import { glob } from 'glob';

export async function reloadEvents() {
  const eventDir = './src/events';
  const eventFiles = (await glob('*.ts', { withFileTypes: true, cwd: eventDir }))
    .filter((path) => path.isFile());

  for await (const { name } of eventFiles) {
    const importDir = `../events/${name}`;
    const { EventData: event }: { EventData: EventOptions<Categories> } = await import(importDir);

    if (!('category' in event && 'run' in event)) continue;
    bot.on(event.category, (...args) => event.run(...args));

    consola.info(`Başarıyla ${ansiColors.bold(name)} adlı etkinlik çalıştırıldı.`);
  }
}