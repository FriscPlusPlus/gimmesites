const arguments = require('args-parser')(process.argv);
const validator = require('./src/argsHelper');
const Search = require('./src/BingSearch');
const logo = require('./src/logo');
const chalk = require('chalk');
const cliSpinners = require('cli-spinners');
const ora = require('ora');
const log = require('single-line-log').stdout;
const Table = require('cli-table3');

var table = new Table({
  head: ['Count', 'Url'],
  colWidths: [20, 50],
});

var links = [];

/**
 * Script logo
 */

console.log(chalk.hex('#FF003C')(logo()));

/**
 * calling the function argsValidation from the helper argsHelper
 */
validator(arguments);

var cleanDone = false; // global variable needed to know if the clean event is really over to avoid printing the succeed msg for every link (bad way of handling it, will fix it)

const BingSearch = new Search('176.52.245.147', {
  pageCount: 100,
  bProxy: false,
});

const SearchSpinner = ora(chalk.hex('#FF003C').bold('Searching on Bing'));
const CleanSpinner = ora(
  chalk
    .hex('#FF003C')
    .bold('Removing duplicates and urls that are hosted on a different server')
);

BingSearch.on('search', () => {
  SearchSpinner.start();
});
BingSearch.on('clean', (urlsTotalCount) => {
  SearchSpinner.succeed(
    chalk.hex('#FF003C').bold(`${urlsTotalCount} links found`)
  );
  CleanSpinner.start();
});
BingSearch.on('links', (url) => {
  if (!cleanDone) {
    cleanDone = true;
    CleanSpinner.succeed();
    console.log(''); // adding spacing
  }
  links.push(url);
  links.forEach((data, i) => {
    let bIsPresent = table.find((e) => e[1] === data) ? true : false;
    if (!bIsPresent) {
      table.push([`#${i + 1}`, data]);
    }
  });
  log(chalk.hex('#FF003C').bold(table.toString()));
});

BingSearch.search();
