const figlet = require("figlet");
const chalk = require(`chalk`);

exports.menu = (user) => {
  console.log(`\n`);
  console.log(chalk.bgBlue(figlet.textSync(` Welcome - ${user}  `)));
  console.log(`\n`);
  console.log(chalk.cyan(`1. Fetch data from Bank Indonesia`));
  console.log(`\n`);
};
