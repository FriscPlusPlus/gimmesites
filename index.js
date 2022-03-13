const args = require("args-parser")(process.argv);
const Search = require("./src/BingSearch");
const chalk = require("chalk");
const cliSpinners = require("cli-spinners");
const ora = require("ora");
console.clear(); // clear console, for a better view
/**
 * LOGO FIRAS JELASSI
 */

console.log(
  chalk.hex("#FF003C").bgHex("#554B41")(`
   ██████  ██ ███    ███ ███    ███ ███████ ███████ ██ ████████ ███████ ███████ 
  ██       ██ ████  ████ ████  ████ ██      ██      ██    ██    ██      ██      
  ██   ███ ██ ██ ████ ██ ██ ████ ██ █████   ███████ ██    ██    █████   ███████ 
  ██    ██ ██ ██  ██  ██ ██  ██  ██ ██           ██ ██    ██    ██           ██ 
   ██████  ██ ██      ██ ██      ██ ███████ ███████ ██    ██    ███████ ███████
    By Firas Jelassi (https://github.com/Friscas/)
`)
);

var cleanDone = false;

const BingSearch = new Search("176.52.245.147", {
  pageCount: 100,
  bProxy: false,
});

const SearchSpinner = ora(chalk.hex("#FF003C").bold("Searching on Bing"));
const CleanSpinner = ora(
  chalk
    .hex("#FF003C")
    .bold("Removing duplicates and urls that are hosted on a different server")
);

BingSearch.on("search", () => {
  SearchSpinner.start();
});
BingSearch.on("clean", (urlsTotalCount) => {
  SearchSpinner.succeed(
    chalk.hex("#FF003C").bold(`${urlsTotalCount} links found`)
  );
  CleanSpinner.start();
});
BingSearch.on("links", (url) => {
  if (!cleanDone) {
    cleanDone = true;
    CleanSpinner.succeed();
    console.log(""); // adding spacing
  }
  console.log(chalk.hex("#FF003C").bold(url));
});

BingSearch.search();
