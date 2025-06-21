import chalk from 'chalk';
const run = (PORT:number) => {
  console.log(chalk.bgHex('#0C0B0BFF').bold(`
    ${chalk.hex('#ff6ec7')('🥷  Ibrahim\'s Ninja API is now active...')}
    ${chalk.hex('#6c757d')('=======================================')}
    ${chalk.hex('#00ffe5')('🗡️  Welcome to the secret dojo of products!')}
    ${chalk.hex('#ffff00')('🌐  ')}${chalk.hex('#00ff88')(`http://localhost:${PORT}/api`)}
    ${chalk.hex('#ff9d00')('🕒  Initiated at:')} ${chalk.hex('#ffffff')(new Date().toLocaleTimeString())}
    ${chalk.hex('#999999')('💨  Stealth Mode:')} ${chalk.hex('#39ff14')('ON')}
    ${chalk.hex('#6c757d')('=======================================')}
  `));
};

export default run;
