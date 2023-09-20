"use strict";


/**
 * Displays gif
 */
function showGif(url) {
  $("#gifs").append($("<img>").attr("src", url));
}

/** Returns user input */

function getSearchText() {
  return $("#search-text").val();
}

/** Takes search parameter,
 * queries GIPHY API,
 * and returns gif url.
 */

async function searchForGif(searchText) {
  const params = new URLSearchParams({
    q: searchText,
    api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
  });

  const response = await fetch(`http://api.giphy.com/v1/gifs/search?${params}`);
  const responseObj = await response.json();
  console.log(responseObj);

  if (responseObj.data.length === 0) return null;

  return responseObj.data[0].images.downsized.url;
}

/** Takes an event parameter,
 * queries Giphy API with users search input,
 * and appends the resulting gif to the DOM. */

async function handleSubmit(evt) {
  evt.preventDefault();

  const searchText = getSearchText();

  const url = await searchForGif(searchText);
  if (!url) return;

  showGif(url);

  $("#search-text").val('');
}

/**
 * Removes the appended gifs
 */
function remove() {
  $("#gifs").empty();
}

$("#search-button").on("click", handleSubmit);

$("#remove").on("click", remove);
