/* © 2018-2022 Marco Stahl */

import test, { ExecutionContext } from 'ava';
import { testExports, ValidatedOptions } from './copyright-header';
import { TEMPLATES } from './templates';
import { FileInfo } from './types';

const { collectFiles, updateCopyrightHeader, useTodayAsYearDefault } = testExports;

const collectFilesTest = (
  t: ExecutionContext<unknown>,
  include: ReadonlyArray<string>,
  expected: ReadonlyArray<string>
) => {
  t.deepEqual(
    collectFiles({
      copyrightHolder: '',
      exclude: [],
      fix: false,
      include,
      onlyChanged: false,
      template: ''
    }),
    expected
  );
};

// tslint:disable-next-line:no-object-mutation
collectFilesTest.title = (
  providedTitle: string,
  include: ReadonlyArray<string>,
  expected: ReadonlyArray<string>
) => `collectFiles - ${providedTitle}: ${include} => ${expected}`;

const ALL_TEST_DATA_FILES: ReadonlyArray<string> = [
  'test-data/file-javascript-plain.js',
  'test-data/file-javascript-with-header-start-year-to-present.js',
  'test-data/file-javascript-with-header-start-year-to-year.js',
  'test-data/file-javascript-with-start-year.js',
  'test-data/file-typescript-plain.ts'
];

test('matching files', collectFilesTest, ['test-data'], ALL_TEST_DATA_FILES);

test('no matching files', collectFilesTest, ['test-data-not-exist'], []);

test('collectFiles - no include filter', t => {
  t.true(
    collectFiles({
      copyrightHolder: '',
      exclude: [],
      fix: false,
      include: [],
      onlyChanged: false,
      template: ''
    }).length > 10
  );
});

test('collectFiles - exclude filter over include filter', t => {
  t.deepEqual(
    collectFiles({
      copyrightHolder: '',
      exclude: ['.*\\.ts$'],
      fix: false,
      include: ['test-data'],
      onlyChanged: false,
      template: ''
    }),
    ALL_TEST_DATA_FILES.filter(f => !f.endsWith('.ts'))
  );
});

test('useTodayAsYearDefault', t => {
  const thisYear = new Date().getFullYear();
  t.deepEqual(useTodayAsYearDefault({ filename: 'dummy' }), {
    filename: 'dummy',
    createdYear: thisYear,
    updatedYear: thisYear
  });
});

const testOpts: ValidatedOptions = {
  copyrightHolder: 'Test User, Inc.',
  exclude: [],
  fix: true,
  include: ['test/file.ts'],
  onlyChanged: false,
  template: TEMPLATES.minimal
};

const testFileInfo: FileInfo = {
  filename: 'test/file.ts',
  createdYear: 2002,
  updatedYear: 2017
};

test('hashbang', t => {
  const origFile = ['#!/bin/sh -some -options', 'File content', 'is here', ''].join('\n');
  const expected = [
    '#!/bin/sh -some -options',
    '',
    '/* © 2002-2017 Test User, Inc. */',
    '',
    'File content',
    'is here',
    ''
  ].join('\n');

  let updated = updateCopyrightHeader(testOpts, testFileInfo, origFile);
  t.is(updated, expected);

  // Run a second time to ensure idempotence
  updated = updateCopyrightHeader(testOpts, testFileInfo, updated);
  t.is(updated, expected);
});
