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
    console.log(chalk.hex('#FF003C')(`  --help`));
    console.log(chalk.hex('#FF003C')(`      display help information`));
    console.log(chalk.hex('#FF003C')(`  --target`));
    console.log(
      chalk.hex('#FF003C')(`      IPv4 address to get the information from`)
    );
    console.log(chalk.hex('#FF003C')(`  --count`));
    console.log(
      chalk.hex('#FF003C')(
        `      How many pages should the program search in Bing (default 100)`
      )
    );
    console.log(chalk.hex('#FF003C')(`  --output`));
    console.log(
      chalk.hex('#FF003C')(`      Path of where to save the found websites`)
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
  output() {}
  target() {}
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
    target: argsHelper.target,
    tor: argsHelper.tor,
    proxy: argsHelper.proxy,
    count: argsHelper.count,
  };
  if (Object.entries(args).length === 0) {
    argsHelper.noArgs();
    return {
      error: true,
    };
  }
  for (let prop in args) {
    if (prop === 'help') {
      argsHelper.help();
      return {
        help: true,
      };
    }
    if (!allArgs[prop]) {
      argsHelper.error(prop);
      return {
        error: true,
      };
    }
    allArgs[prop](args[prop]);
  }
};
