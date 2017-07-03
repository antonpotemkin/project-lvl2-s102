import program from 'commander';
import packageJson from '../package.json';

const help = program
  .version(packageJson.version)
  .description(packageJson.description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((cmd, env) => {
    console.log(`Compares two configuration files: ${cmd} and ${env}`);
  })
  .parse(process.argv);

export default () => help.action;
