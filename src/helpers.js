const ora = require('ora');
const chalk = require('chalk');

var links = [];
var cleanDone = false; // global variable needed to know if the clean event is really over to avoid printing the succeed msg for every link (bad way of handling it, will fix it)

const SearchSpinner = ora(chalk.hex('#FF003C').bold('Searching on Bing'));
const CleanSpinner = ora(
  chalk
    .hex('#FF003C')
    .bold('Removing duplicates and urls that are hosted on a different server')
);
module.exports = {
  search: function () {
    SearchSpinner.start();
  },
  clean: function (urlsTotalCount) {
    SearchSpinner.succeed(
      chalk.hex('#FF003C').bold(`${urlsTotalCount} links found`)
    );
    CleanSpinner.start();
  },
  links: function (url) {
    if (!cleanDone) {
      cleanDone = true;
      CleanSpinner.succeed();
      console.log(''); // adding spacing
    }
    links.push(url);
    console.log(`${chalk.hex('#FF003C').bold('Link found:')} ${chalk.hex('#FF003C').bold(url)}`);
    console.log('');
  },
  error: function (error) {},
};
