"use strict";

/** Takes an event parameter,
 * queries Giphy API with users search input,
 * and appends the resulting gif to the DOM. */

async function search(evt) {
  evt.preventDefault();

  const searchText = $("#search-text").val();
  const params = new URLSearchParams({
    q: searchText,
    api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
  });

  const response = await fetch(`http://api.giphy.com/v1/gifs/search?${params}`);
  const responseObj = await response.json();
  console.log(responseObj);

  const url = responseObj.data[0].images.downsized.url;
  $("#gifs").append($("<img>").attr("src", url));
}

$("#search-button").on("click", search);