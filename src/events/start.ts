import type { EventOptions } from '@/types.ts';
import consola from 'consola';

export const EventData: EventOptions<'ready'> = {
  category: 'ready',
  run() {
    consola.success('Bot başarıyla Discord\'a giriş yaptı.');
  },
};