const { program } = require("commander");

program
  .name("GimmeSites")
  .description(
    "A useful tool in your arsenal for your information gathering phase"
  )
  .requiredOption("-t, --target <string>", "A valid IPV4 or a valid domain name")
  .version("1.0.0#beta");

module.exports = async function argsValidation(args) {
  program.parse(args);
  const options = program.opts();
  return options;
};
