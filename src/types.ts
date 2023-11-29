import type { ChatInputCommandInteraction, ClientEvents, SlashCommandBuilder } from 'discord.js';

export type MaybePromise<Type> = Promise<Type> | Type;
export type Categories = keyof ClientEvents;

export interface CommandOptions {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    run: (interaction: ChatInputCommandInteraction) => MaybePromise<any>;
}

export interface EventOptions<Category extends Categories> {
    category: Category;
    run: (...args: ClientEvents[Category]) => MaybePromise<any>;
}

export interface MathButtonData {
    custom_id: string;
    emoji: string;
}