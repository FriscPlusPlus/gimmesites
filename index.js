const args = require('args-parser')(process.argv);
const Search  = require('./src/search');
const chalk = require('chalk');


/**
 * LOGO FIRAS JELASSI
 */


console.log(chalk.blue(`
    ██╗██████╗ ████████╗██╗  ██╗ ██████╗ ███████╗████████╗
    ██║██╔══██╗╚══██╔══╝██║  ██║██╔═══██╗██╔════╝╚══██╔══╝
    ██║██████╔╝   ██║   ███████║██║   ██║███████╗   ██║   
    ██║██╔═══╝    ██║   ██╔══██║██║   ██║╚════██║   ██║   
    ██║██║        ██║   ██║  ██║╚██████╔╝███████║   ██║   
    ╚═╝╚═╝        ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝  
    By Firas Jelassi (https://github.com/Friscas/)
`));


const BingSearch = new Search('176.52.245.147', {
    pageCount: 100,
    bProxy: false
});

BingSearch.main();