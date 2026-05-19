import {SlashCommandBuilder} from "discord.js";
import {WavuBot} from "../wavuBot.js";

export class Commands {
    static ping = {
        data: new SlashCommandBuilder().setName('ping').setDescription('Ping Test'),
        async execute(interaction) {
            await interaction.reply('Ping Successful')
        }
    }

    static rankInfo = {
        data: new SlashCommandBuilder()
            .setName('wavuwank')
            .setDescription('Returns glicko2 rank info for a player from wavu.wank.wiki')
            .addStringOption(option => option.setName('name').setDescription('Name of the player you want info for').setRequired(true)),
        async execute(interaction) {
            WavuBot.getRankInfo(interaction.options.data[0].value)
                .then(async res => {
                    await interaction.reply(res)
                });
        }
    }

    // This is lazy but who cares
    static allCommands = [
        this.ping,
        this.rankInfo
    ]
}