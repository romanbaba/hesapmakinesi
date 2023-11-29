

# Discord ile basit fonksiyonlu hesap makinesi ❤
Bu projenin genel amacı Discord ile beraber basit fonksiyonlara sahip bir hesap makinesinin yapılışıdır.


## Nasıl görünüyor?
<img src="https://cdn.discordapp.com/attachments/1161381780163661875/1179406112341102703/image.png" height="auto" width="auto" style="border-radius:50%"/>

## Yükleme 
Projenin gereksinimi olan paketleri mevcut paket yöneticiniz ile projeye indirebilirsiniz, ben genel olarak `pnpm` kullanıyorum.

```bash 
  npm install
  pnpm install
  yarn
```
    
## Ortam Değişkenleri

Bu projeyi çalıştırmak için aşağıdaki ortam değişkenlerini .env dosyanıza eklemeniz gerekecek:

`DISCORD_BOT_TOKEN`

`DISCORD_BOT_ID`

  
## Örnek bir komut objesi:

```ts
import type { CommandOptions } from '@/types.ts';

export const CommandData: CommandOptions = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Örnek bir komut örneğidir, es geçiniz!'),
  async run(interaction) {},
};
```

## Örnek bir etkinlik objesi:
```ts
import type { EventOptions } from '@/types.ts';

export const EventData: EventOptions<'ready'> = {
  category: 'ready',
  run() {},
};
```

  
## Lisans

[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html/)

  
## Yazarlar ve Teşekkür

- [@ewgsta](https://www.github.com/ewgsta) tarafından kodlanmış ve tasarlanmıştır, izni dışında hiç bir yerde paylaşılamaz.

  

