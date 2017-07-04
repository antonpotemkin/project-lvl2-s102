import program from 'commander';
import packageJson from '../package.json';
import comporator from './comporator';

export default () => program
  .version(packageJson.version)
  .description(packageJson.description)
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(comporator(firstConfig, secondConfig));
  })
  .parse(process.argv);
