const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const DisplayError = document.getElementById("DisplayError");
let maxCounter = 20;
let counter = 0;
function loadingWithSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
  DisplayError.hidden = true;
}
function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
  }
  quoteContainer.hidden = false;
  DisplayError.hidden = true;
}
function renderError() {
  loader.hidden = true;
  quoteContainer.hidden = true;
  DisplayError.hidden = false;
}
function setAuthor(author) {
  if (author) quoteAuthor.innerText = `-${author}`;
  else quoteAuthor.innerText = "-unknown";
}

async function getQuotes() {
  const Proxy = "https://cors-anywhere.herokuapp.com/";
  const API_URL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    loadingWithSpinner();
    const response = await fetch( API_URL);
    const data = await response.json();
    console.log(data);
    setAuthor(data.quoteAuthor);

    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (err) {
    // if (counter > maxCounter) renderError();
    // else {
    //
    // }
    // counter++;
    // getQuotes();
    console.log("ooops error", err);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const TWEET_URL = `https://twitter.com/intent/tweet?text=${quote}- ${author}`;
  window.open(TWEET_URL, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote);
newQuote.addEventListener("click", getQuotes);
getQuotes();
// loading();
