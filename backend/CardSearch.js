import React from "react";

// cardType: [normal, holofoil, reverseHolofoil, 1stEditionHolofoil, 1stEditionNormal], maybe
// let this parameter be an array and the user can select which card types to include
function GetCards(min = 0, max, cardType = "normal") {
  var queryParams = "q=tcgplayer.prices." + cardType + ".market:[" + min + " TO " + max + "]&select=id,name,images,tcgplayer";
  const url = "https://api.pokemontcg.io/v2/cards?" + queryParams;
  const headers = {
    "X-Api-Key": process.env.TCG_API_KEY, // Can put key into an env variable if we want since that's more secure
    "Content-Type": "application/json"
  };
  const res = await fetch(url, {
    method: "GET",
    headers: headers
  });
}

export default GetCards;