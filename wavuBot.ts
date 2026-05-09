import {WavuHelper} from "./helpers/WavuHelper";
import {Document as HtmlDoc} from "html-parser.ts";
import {HtmlHelper, RatingObject} from "./helpers/HtmlHelper";

export class WavuBot {

    public static async getRankInfo(playerName: string) {
        return WavuHelper.getPlayerID(playerName).then((id: string) => {
            if(!id) {
                return "Error fetching player ID";
            }
            return WavuHelper.getPlayerData(id)
                .then((doc: HtmlDoc) => {
                    // This is ugly and I'll figure out nice discord formatting if I care
                    let output = `Rating info for player ${playerName} ${id}`
                    let ratings: RatingObject[] = HtmlHelper.getRatingInfo(doc);
                    for (let rating of ratings) {
                        output += '\n';
                        output += JSON.stringify(rating);
                    }
                    return output;
                });
        }).then(result => {return result});
    }
}