import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {WavuBot} from "../wavuBot";

export interface Command {
    data: any;
    execute: any;
}

export class Commands {
    public static ping: Command = {
        data: new SlashCommandBuilder().setName('ping').setDescription('Ping Test'),
        async execute(interaction) {
            await interaction.reply('Ping Successful')
        }
    }

    public static rankInfo: Command = {
        data: new SlashCommandBuilder()
            .setName('wavuwank')
            .setDescription('Returns glicko2 rank info for a player from wavu.wank.wiki')
            .addStringOption(option => option.setName('name').setDescription('Name of the player you want info for').setRequired(true)),
        async execute(interaction: CommandInteraction): Promise<void> {
            WavuBot.getRankInfo(interaction.options.data[0].value)
                .then(async res => {
                    await interaction.reply(res)
                });
        }
    }

    // This is lazy but who cares
    public static allCommands: Command[] = [
        this.ping,
        this.rankInfo
    ]
}