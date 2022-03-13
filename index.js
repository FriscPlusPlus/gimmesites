const args = require("args-parser")(process.argv);
const Search = require("./src/BingSearch");
const chalk = require("chalk");

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

const BingSearch = new Search("176.52.245.147", {
  pageCount: 100,
  bProxy: false,
});

BingSearch.main()