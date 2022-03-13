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
  chalk.hex("#FF003C")(`

  ______ _____ _______ _______ _______ _______ _____ _______ _______ _______
 |  ____   |   |  |  | |  |  | |______ |______   |      |    |______ |______ {V1.0.0}
 |_____| __|__ |  |  | |  |  | |______ ______| __|__    |    |______ ______| By Firas Jelassi (https://github.com/Friscas/)

 This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 See the GNU General Public License v2.0 for more details at http://www.gnu.org/licenses/gpl-2.0.html.
 
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
