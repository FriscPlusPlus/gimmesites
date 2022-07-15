const chalk = require('chalk');

/**
 * @Type: Class
 * @name: ArgsHelper
 * @description: Helper class for flag validation
 */

class ArgsHelper {
  noArgs() {
    console.log(
      chalk
        .hex('#FF003C')
        .bold('Example: gimmesites --target="185.77.32.227" --count=50')
    );
    console.log(
      chalk.hex('#FF003C').bold('Call gimmesites --help for more information!')
    );
  }
  error(flag) {
    console.log(
      chalk
        .hex('#FF003C')
        .bold(
          `The ${flag} option is incorrectly written or it does not exist, please use the --help flag for more information`
        )
    );
  }
  help() {
    console.log(chalk.hex('#FF003C').bold(`Options:`));
    console.log(chalk.hex('#FF003C')(`  -h, --help`));
    console.log(chalk.hex('#FF003C')(`      display help information`));
    console.log(chalk.hex('#FF003C')(`  -t, --target`));
    console.log(
      chalk.hex('#FF003C')(`      IPv4 address to get the information from`)
    );
    console.log(chalk.hex('#FF003C')(`  -c, --count`));
    console.log(
      chalk.hex('#FF003C')(
        `      How many pages should the program search in Bing (default 100)`
      )
    );
    console.log(chalk.hex('#FF003C')(`  -o, --output`));
    console.log(
      chalk.hex('#FF003C')(`      Save the found websites in a json file`)
    );
    console.log(chalk.hex('#FF003C')(`  --tor`));
    console.log(
      chalk.hex('#FF003C')(
        `      Use tor as proxy (using default tor settings)`
      )
    );
    console.log(
      chalk.hex('#FF003C')(`  --proxy, --proxyType, --proxyHost, --proxyPort`)
    );
    console.log(
      chalk.hex('#FF003C')(
        `      Use custom proxy, use the flags like this: --proxy --proxyType=SOCKS5 --proxyHost=IP --proxyPort=PORT, no auth is supported for the moment`
      )
    );
  }
  output(path) {}
  target(target) {
    
  }
  tor() {}
  proxy() {}
  count() {}
}

/**
 * @name: argsValidation
 * @description: Function used to validate the arguments and return values to pass to the BingSearch constructor
 */

// ToDo: beautify code too many returns in one function, reduce to one only

module.exports = function argsValidation(args) {
  const argsHelper = new ArgsHelper();
  const allArgs = {
    help: argsHelper.help,
    output: argsHelper.output,
    o: argsHelper.output,
    target: argsHelper.target,
    t: argsHelper.target,
    tor: argsHelper.tor,
    proxy: argsHelper.proxy,
    count: argsHelper.count,
    c: argsHelper.count,
  };
  let result = { stop: false };
  if (Object.entries(args).length === 0) {
    argsHelper.noArgs();
    result.stop = true;
  } else {
    for (let prop in args) {
      if (prop === 'help' || prop === 'h') {
        argsHelper.help();
        result.stop = true;
        break;
      }
      if (!allArgs[prop]) {
        argsHelper.error(prop);
        result.stop = true;
        break;
      }
      result.stop = !allArgs[prop](args[prop]);
      if (result.stop) break;
    }
  }
  return result;
};
