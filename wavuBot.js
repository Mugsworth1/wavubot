import {WavuHelper} from "./helpers/WavuHelper.js";
import {HtmlHelper} from "./helpers/HtmlHelper.js";

export class WavuBot {

    static async getRankInfo(playerName) {
        const id = await WavuHelper.getPlayerID(playerName);
        if (!id) {
            return Promise.reject(new Error("Invalid ID"));
        }
        const doc = await WavuHelper.getPlayerData(id);
        let ratings = HtmlHelper.getRatingInfo(doc);
        return this.formatForDiscord(playerName, id, ratings);
    }

    static formatForDiscord(playerName, playerID, ratings) {
        // Title
        let output = `## ${playerName} Glicko Rating`;
        // Link
        output += `\n${WavuHelper.getWavuUrl(playerID)}`;
        // Characters
        for (let rating of ratings) {
            output += `\n### ${rating.charName}`;
            output += `\nRating: ${rating.rating}`;
            output += `\nConfidence: ${rating.confidence}`;
            output += `\nGames Played: ${rating.numGames}`;
            output += `\nLast Played: ${rating.lastPlayed}`;
        }
        return output;
    }
}