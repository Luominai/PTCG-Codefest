import React from "react";
import { useState, useEffect } from "react";

// cardType: [normal, holofoil, reverseHolofoil, 1stEditionHolofoil, 1stEditionNormal], maybe
// let this parameter be an array and the user can select which card types to include
async function GetCards(min = 0, max = 0, cardType = "normal", filterSet = "") {
  try {
    var query = "q=";
    if (max != 0) { // If max = 0, we assume no price filter, could also just add another bool param called filterPrice instead
      query += ("tcgplayer.prices." + cardType + ".market:[" + min + " TO " + max + "]");
    }
    if (filterSet != "") {
      query += ("set.name:" + filterSet);
    }
    var select = "&select=id,name,set,images,tcgplayer";
    const url = "https://api.pokemontcg.io/v2/cards?" + query + select;
    const headers = {
      "X-Api-Key": process.env.REACT_APP_TCG_API_KEY, // Right now the key isn't being used for some reason
      "Content-Type": "application/json"
    };
    const res = await fetch(url, {
      method: "GET",
      headers: headers
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("UH OH", err);
    console.error(err);
  }
}

export default GetCards;