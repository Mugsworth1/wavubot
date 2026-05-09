// Extract pattern player/<id>"
import {parseHtmlDocument} from "html-parser.ts";
import {Document as HtmlDoc} from "html-parser.ts";

const POLARIS_ID_REGEX: RegExp = new RegExp("player\\/\\w+\"", "g");
//When multiple player IDs are found in search, use a more specific pattern
const POLARIS_ID_PLAYERNAME_REGEX = "player\\/\\w+\">\\n\\s+";
const STARTPOINT: number = 7;
const ENDPOINT: number = 19;

export class WavuHelper {

    static getPlayerID(playerName: string) {
        return fetch(`https://wank.wavu.wiki/player/search?q=${playerName}`)
            .then((response) => {
                if (!response.ok) {
                    console.log("Error getting player ID: " + response.statusText);
                }
                return response.text();
            })
            .then((data) => {
                return this.parsePlayerID(data, playerName);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // static getPlayerData(playerID: string): any {
    //     return fetch(`http://wank.wavu.wiki/api/replays?p1_polaris_id=${playerID}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //                 console.log(data);
    //                 return data;
    //             }
    //         );
    // }

    // static getPlayerData(playerID: string): any {
    //     return fetch(`http://wank.wavu.wiki/player/${playerID}`)
    //         .then((data) => {
    //                 console.log(data);
    //                 return data.text();
    //             }
    //         );
    // }

    static getPlayerData(playerID: string): Promise<HtmlDoc> {
        return fetch(`http://wank.wavu.wiki/player/${playerID}`)
            .then((response) => {
                if (!response.ok) {
                    console.log("Error getting player data: " + response.statusText);
                }
                return response.text();
            })
            .then((html) => {
                return parseHtmlDocument(html);
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
    }

    private static parsePlayerID(html: string, playerName: string): string {
        //Try the lazy match first
        const matchSet = html.matchAll(POLARIS_ID_REGEX);
        if (!matchSet) return null;
        //Convert to array for easier handling
        const matchSetArray = (matchSet as RegExpStringIterator<RegExpExecArray>).toArray();
        if (!matchSetArray || !matchSetArray[0]) return null;
        // We have multiple matches, have to use the more specific pattern
        if (matchSetArray[2]) {
            //If we get a hit filtering with playername use that, if not default to first result in list
            const filteredMatches = html.match(`${POLARIS_ID_PLAYERNAME_REGEX}${playerName}`);
            if (filteredMatches) {
                return filteredMatches[0].substring(STARTPOINT, ENDPOINT);
            }
        }
        return matchSetArray[0][0].substring(STARTPOINT, ENDPOINT);
    }
}