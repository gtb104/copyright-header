/* © 2018-2022 Marco Stahl */

import { Command } from 'commander';
import { ensureUpdatedCopyrightHeader } from './copyright-header';
import { DEFAULT_TEMPLATE_ID, TEMPLATE_IDS, TEMPLATES } from './templates';
import { ToYear } from './types';
import { mapOptional, Result } from './utils';

export const enum ExitCode {
  OK = 0,
  ERROR = 1
}

export interface CliOptions {
  readonly copyrightHolder: string;
  readonly exclude: ReadonlyArray<string>;
  readonly excludeCommits?: string;
  readonly fix: boolean;
  readonly forceModificationYear?: string;
  readonly include: ReadonlyArray<string>;
  readonly onlyChanged: boolean;
  readonly templateId: string;
}

export function runCli(argv: string[], version = 'unknown'): ExitCode {
  const program = new Command();
  program
    .option('--copyrightHolder <name>', 'Copyright Holder')
    .option('-e, --exclude <paths>', 'exclude regexp file filter', parseList, [])
    .option('--excludeCommits <pattern>', 'ignores commits which message match this pattern')
    .option('--fix', 'adds or updates copyright header to files', false)
    .option('--forceModificationYear <year>', 'number | "present"')
    .option('-i, --include <paths>', 'include regexp file filter', parseList, [])
    .option('--onlyChanged', 'Inspect only changed files', false)
    .option('--templateId <id>', TEMPLATE_IDS.join(' | '), DEFAULT_TEMPLATE_ID)
    .version(version);

  // parse the options from the command line
  program.parse(argv);

  // get the options as an object
  const options: CliOptions = program.opts() as any;

  if (!options.copyrightHolder) {
    return reportError('Please specify --copyrightHolder');
  }

  if (options.templateId && !(options.templateId in TEMPLATES)) {
    return reportError(`templateId must be one of [${TEMPLATE_IDS.join(', ')}]`);
  }

  const forceModificationYear = mapOptional(options.forceModificationYear, parseModificationYear);
  if (forceModificationYear instanceof Error) {
    return reportError('--forceModificationYear: ' + forceModificationYear.message);
  }

  const result = ensureUpdatedCopyrightHeader({
    copyrightHolder: options.copyrightHolder,
    exclude: options.exclude,
    excludeCommits: options.excludeCommits,
    fix: options.fix,
    forceModificationYear: forceModificationYear,
    include: options.include,
    onlyChanged: options.onlyChanged,
    template: TEMPLATES[options.templateId]
  });

  return result.unFixedFiles.length ? ExitCode.ERROR : ExitCode.OK;
}

function reportError(message: string): ExitCode {
  console.error(message);
  return ExitCode.ERROR;
}

function parseList(val: string): ReadonlyArray<string> {
  return val.split(',');
}

function parseModificationYear(year: string): Result<ToYear> {
  if (year === 'present') {
    return 'present';
  } else {
    const yearNumber = parseInt(year, 10);
    if (isNaN(yearNumber)) {
      return new Error(`"${year}" is not a valid year. It must be a number or "present"`);
    }
    return yearNumber;
  }
}
