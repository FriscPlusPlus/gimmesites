const args = require("args-parser")(process.argv);
const Search = require("./src/BingSearch");
const chalk = require("chalk");
const cliSpinners = require("cli-spinners");
const ora = require("ora");

/**
 * LOGO FIRAS JELASSI
 */

console.log(
  chalk.hex("#FF003C")(`
    ██╗██████╗ ████████╗██╗  ██╗ ██████╗ ███████╗████████╗
    ██║██╔══██╗╚══██╔══╝██║  ██║██╔═══██╗██╔════╝╚══██╔══╝
    ██║██████╔╝   ██║   ███████║██║   ██║███████╗   ██║   
    ██║██╔═══╝    ██║   ██╔══██║██║   ██║╚════██║   ██║   
    ██║██║        ██║   ██║  ██║╚██████╔╝███████║   ██║   
    ╚═╝╚═╝        ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝  
    By Firas Jelassi (https://github.com/Friscas/)
`)
);

var cleanDone = false;

const BingSearch = new Search("176.52.245.147", {
  pageCount: 100,
  bProxy: false,
});

const SearchSpinner = ora(chalk.hex("#FF003C")("Searching on Bing"));
const CleanSpinner = ora(
  chalk.hex("#FF003C")(
    "Removing duplicates and urls that are hosted on a different server"
  )
);

BingSearch.on("search", () => {
  SearchSpinner.start();
});
BingSearch.on("clean", (urlsTotalCount) => {
  SearchSpinner.succeed(chalk.hex("#FF003C")(`${urlsTotalCount} links found`));
  CleanSpinner.start();
});
BingSearch.on("links", (url) => {
  if (!cleanDone) {
    cleanDone = true;
    CleanSpinner.succeed();
  }
  console.log(chalk.hex("#FF003C")(url));
});

BingSearch.search();
