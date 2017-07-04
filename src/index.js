import program from 'commander';
import packageJson from '../package.json';
import comporator from './comporator';

const help = program
  .version(packageJson.version)
  .description(packageJson.description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((cmd, env) => {
    console.log(comporator(cmd, env));
  })
  .parse(process.argv);

export const gendiff = () => help.action;

export default comporator;
