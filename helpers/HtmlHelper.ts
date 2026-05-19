import {Document as HtmlDoc, HTMLElement} from "html-parser.ts";

export interface RatingObject {
   charName: string;
   rating: string;
   confidence: string;
   numGames: string;
   lastPlayed: string;
}

export class HtmlHelper {

   public static getRatingInfo(doc: HtmlDoc): RatingObject[] {
      let ratings: RatingObject[] = [];
      // You can't make me parse this properly I won't do it
      const ratingCardSection = doc.childNodes[2].childNodes[3].childNodes[3].childNodes[1]
          .childNodes[1].childNodes[3].childNodes[1].childNodes[1];
      const confidentRatingsSection = ratingCardSection.childNodes[3].childNodes[1].childNodes[3]
      // Each child node here should have a rating element we can parse
      for (let elem of confidentRatingsSection.childNodes) {
         if (elem instanceof HTMLElement) {
            ratings.push(this.parseRatingsObject(elem));
         }
      }
      return ratings;
   }

   private static parseRatingsObject(elem: HTMLElement): RatingObject {
      return {
         charName: elem.childNodes[1].textContent,
         rating: elem.childNodes[3].textContent,
         confidence: elem.childNodes[5].textContent,
         numGames: elem.childNodes[7].textContent,
         lastPlayed: elem.childNodes[9].textContent.split('printDate')[0]
      }
   }
}