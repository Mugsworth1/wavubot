import {WavuHelper} from "./wavuHelper";
import {Document as HtmlDoc} from "html-parser.ts";
import {HtmlHelper, RatingObject} from "./HtmlHelper";

const PLAYER_NAME: string = "SLOPTIMUS PRIME";
console.log(`Parsing Player ${PLAYER_NAME}`);

WavuHelper.getPlayerID(PLAYER_NAME).then((id: string) => {
    if(!id) {
        console.log("Could not find player");
        return;
    }
    console.log("PlayerID: " + id);
    WavuHelper.getPlayerData(id)
        .then((doc: HtmlDoc) => {
            let ratings: RatingObject[] = HtmlHelper.getRatingInfo(doc);
            console.log("Ratings Parsed");
            console.log("======================");
            for (let rating of ratings) {
                console.log(rating);
            }
            console.log("======================");
    })
});

