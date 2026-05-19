// Extract pattern player/<id>"
import {parseHtmlDocument} from "html-parser.ts";
import {Document as HtmlDoc} from "html-parser.ts";

const POLARIS_ID_REGEX = new RegExp("player\\/\\w+\"", "g");
//When multiple player IDs are found in search, use a more specific pattern
const POLARIS_ID_PLAYERNAME_REGEX = "player\\/\\w+\">\\n\\s+";
const STARTPOINT = 7;
const ENDPOINT = 19;

export class WavuHelper {

    static getPlayerID(playerName) {
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
                return Promise.reject(error);
            });
    }

    static getPlayerData(playerID) {
        return fetch(this.getWavuUrl(playerID))
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
                return {};
            });
    }

    static getWavuUrl(playerID) {
        return `http://wank.wavu.wiki/player/${playerID}`;
    }

    static parsePlayerID(html, playerName) {
        //Try the lazy match first
        const matchSet = html.matchAll(POLARIS_ID_REGEX);
        if (!matchSet) return "";
        //Convert to array for easier handling
        const matchSetArray = (matchSet).toArray();
        if (!matchSetArray || !matchSetArray[0]) return "";
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