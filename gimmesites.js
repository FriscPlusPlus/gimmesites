const args = require('args-parser')(process.argv);
const validator = require('./src/argsHelper');
const Search = require('./src/BingSearch');
const logo = require('./src/logo');
const chalk = require('chalk');
const helpers = require('./src/helpers');

function start() {
  /**
   * function that echos the logo
   */
  logo();
  /**
   * the function is called argsValidation and you can find it in the module src/argsHelper with full description
   */
  const validatedArgs = validator(args);

  // if the help flag is given or an error occurs we just end the program

  if (validatedArgs.stop) return;

  /**
   * Creating instance of the BingSearch class
   * Check the source code for comments about how the class works
   */

  const BingSearch = new Search('194.59.37.21', {
    pageCount: 100,
    bProxy: false,
  });

  /**
   * Settings events and using as arguments the function from the module src/helpers, check it for more info
   */

  BingSearch.on('search', helpers.search);
  BingSearch.on('clean', helpers.clean.bind(this));
  BingSearch.on('links', helpers.links.bind(this));
  BingSearch.on('error', helpers.error.bind(this));

  /**
   * Calling the main method called search to start the process 
   */

 BingSearch.search();
}

start();
