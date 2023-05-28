const figlet = require("figlet");
const chalk = require(`chalk`);

const menus = [
  {
    text: `User management`,
    exe: (user) => {
      main(user, true);
    },
  },
  {
    text: `VIM codes`,
  },
  {
    text: `tmux cheatsheet`,
  },
  {
    text: `htop statsictics`,
  },
  {
    text: `Fetch data from ${chalk.yellow('Bank Indonesia')}`,
    exe: (user) => {
      require(`./fdbi`).main(user);
    },
  },
  {
    text: `Welcome screen`,
    exe: (user) => {
      main(user);
    }
  },
  {
    text: `Exit CLI`,
    exe: () => {
      console.log(chalk.bgCyan(` Gracefully exiting system... `));
    }
  },
];

const main = (user, skip) => {
  let _user = user;
  if (skip) _user = false;
  console.log(`\n`);
  const appendUser = _user ? `- ${_user}` : ` Back`;
  console.log(
    chalk.bgBlue(figlet.textSync(` Welcome ${appendUser}  `))
  );
  console.log(`\n`);
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    console.log(chalk.cyan((i+1) + `. ` + menu.text));
  }
  console.log(`\n`);

  const inquirer = require(`inquirer`);
  inquirer.prompt([{
    message: `Choose number:`, name: `number`
  },]).then((answers) => {
    try {
      const number = parseInt(answers.number);
      if (number < 1 || number > menus.length) throw new Error(
        `Chosen number isn't available!`
      );
      const menu = menus[number - 1];
      console.log(`\nexecute: ${chalk.green(menu.text)}`);
      menu.exe(user);
    } catch (error) {
      console.error(
        chalk.bgRed(` ${error} `)
        , chalk.red(`exiting system...`)
      );
    }
  });
};

exports.menu = (user, skip) => {
  const Spinner = require('cli-spinner').Spinner;
  Spinner.setDefaultSpinnerString(18);
  const spinner = new Spinner(`Loading main menu %s`);
  console.log();
  spinner.start();
  setTimeout(() => {
    spinner.stop(true);
    main(user, skip);
  }, 3000);
};
