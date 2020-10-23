import spawnAsync from '@expo/spawn-async';
import chalk from 'chalk';
import inquirer from 'inquirer';

import * as Directories from '../Directories';
import { androidNativeUnitTests } from './AndroidNativeUnitTests';

type PlatformName = 'android' | 'ios' | 'both';

async function thisAction({
  platform,
  instrumentation,
}: {
  platform?: PlatformName;
  instrumentation: boolean;
}) {
  if (!platform) {
    console.log(chalk.yellow("You haven't specified platform to run unit tests for!"));
    const result = await inquirer.prompt<{ platform: PlatformName }>([
      {
        name: 'platform',
        type: 'list',
        message: 'Which platform do you want to run native tests ?',
        choices: ['android', 'ios', 'both'],
        default: 'android',
      },
    ]);
    platform = result.platform;
  }
  const runAndroid = platform === 'android' || platform === 'both';
  const runIos = platform === 'ios' || platform === 'both';
  if (runIos) {
    try {
      await spawnAsync('fastlane scan', undefined, {
        cwd: Directories.getIosDir(),
        stdio: 'inherit',
      });
    } catch (e) {
      console.log('Something went wrong:');
      console.log(e);
    }
  }

  if (runAndroid) {
    await androidNativeUnitTests({ instrumentation });
  }
}

export default (program: any) => {
  program
    .command('native-unit-tests')
    .option(
      '-p, --platform <string>',
      'Determine for which platform we should run native tests: android, ios or both'
    )
    .option(
      '-i, --instrumentation',
      'Run instrumentation tests if they are supported on this platform',
      false
    )
    .description('Runs native unit tests for each unimodules that provides them.')
    .asyncAction(thisAction);
};
