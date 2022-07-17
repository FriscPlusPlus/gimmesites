const chalk = require("chalk");
const axios = require("axios").default;
const { SocksProxyAgent } = require("socks-proxy-agent");

/**
 * @Type: Class
 * @name: ArgsHelper
 * @description: Helper class for flag validation
 */

class ArgsHelper {
  noArgs() {
    console.log(
      chalk
        .hex("#FF003C")
        .bold('Example: gimmesites --target="185.77.32.227" --count=50')
    );
    console.log(
      chalk.hex("#FF003C").bold("Call gimmesites --help for more information!")
    );
  }
  error(flag) {
    console.log(
      chalk
        .hex("#FF003C")
        .bold(
          `The ${flag} option is incorrectly written or it does not exist, please use the --help flag for more information`
        )
    );
  }
  help() {
    console.log(chalk.hex("#FF003C").bold(`Options:`));
    console.log(chalk.hex("#FF003C")(`  -h, --help`));
    console.log(chalk.hex("#FF003C")(`      display help information`));
    console.log(chalk.hex("#FF003C")(`  -t, --target`));
    console.log(
      chalk.hex("#FF003C")(`      IPv4 address to get the information from`)
    );
    console.log(chalk.hex("#FF003C")(`  -c, --count`));
    console.log(
      chalk.hex("#FF003C")(
        `      How many pages should the program search in Bing (default 100)`
      )
    );
    console.log(chalk.hex("#FF003C")(`  -o, --output`));
    console.log(
      chalk.hex("#FF003C")(`      Save the found websites in a json file`)
    );
    console.log(chalk.hex("#FF003C")(`  --tor`));
    console.log(
      chalk.hex("#FF003C")(
        `      Use tor as proxy and define the port socks tor port (default 9150)`
      )
    );
    console.log(
      chalk.hex("#FF003C")(`  --proxy, --proxyType, --proxyHost, --proxyPort`)
    );
    console.log(
      chalk.hex("#FF003C")(
        `      Use custom proxy, use the flags like this: --proxy --proxyType=SOCKS5 --proxyHost=IP --proxyPort=PORT, no auth is supported for the moment`
      )
    );
  }
  output(path) {}
  target(target) {
    let bValid =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        target
      );
    if (!bValid) {
      console.log(chalk.hex("#FF003C")(`Invalid IPv4 address`));
    }
    return bValid;
  }
  tor(port) {
    console.log(chalk.hex("#FF003C")('Tor flag enabled...'));
    console.log(chalk.hex("#FF003C")('Checking tor connection'));
    if (typeof port === "boolean") {
      port = 9150;
    }
    const agent = new SocksProxyAgent(`socks://127.0.0.1:${port}`);
    const inst = axios.create({
      httpAgent: agent,
      httpsAgent: agent,
    });
    inst.get("https://check.torproject.org/api/ip").then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(chalk.hex("#FF003C")('It seems like tor is not running or maybe it is using another port?'));
    })
  }
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
      if (prop === "help" || prop === "h") {
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
