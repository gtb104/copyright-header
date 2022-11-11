/* © 2018-2022 Marco Stahl */
import test from 'ava';
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { createSandbox } from 'sinon';
import { runCli } from './cli';
const TEST_DATA_FOLDER = 'test-data';
let sinonSandbox;
let consoleLogStub;
let consoleErrorStub;
const revertTestDataFolder = () => {
    child_process.execSync('npm run revertTestData');
};
const verifyValidationError = (t, argv, expectedErrorMessage) => {
    consoleLogStub = sinonSandbox.stub(console, 'log');
    consoleErrorStub = sinonSandbox.stub(console, 'error');
    const exitCode = runCli(['node', 'script.js', ...argv]);
    t.is(exitCode, 1 /* ERROR */);
    t.is(consoleErrorStub.callCount, 1);
    t.deepEqual(consoleErrorStub.getCall(0).args, [expectedErrorMessage]);
    t.is(consoleLogStub.callCount, 0);
};
const assertFileContent = (t, file, content) => {
    const resultJs = fs.readFileSync(path.join(TEST_DATA_FOLDER, file), 'utf8');
    t.is(resultJs, content);
};
test.beforeEach(() => {
    // revertTestDataFolder();
    sinonSandbox = createSandbox();
});
test.afterEach(() => {
    revertTestDataFolder();
    sinonSandbox.restore();
});
test.serial('validate but not fix', t => {
    const exitCode = runCli([
        'node',
        'script.js',
        '--include',
        TEST_DATA_FOLDER,
        '--copyrightHolder',
        'CopyrightHolder'
    ]);
    t.is(exitCode, 1 /* ERROR */);
});
test.serial('--fix', t => {
    const exitCode = runCli([
        'node',
        'script.js',
        '--include',
        TEST_DATA_FOLDER,
        '--copyrightHolder',
        'CopyrightHolder',
        '--fix'
    ]);
    t.is(exitCode, 0 /* OK */);
    assertFileContent(t, 'file-javascript-no-header.js', '/* © 2022 CopyrightHolder */\n\n' + "console.log('Test');");
    assertFileContent(t, 'file-javascript-with-start-year.js', '/* © 2022 CopyrightHolder */\n\n' + "console.log('Test');");
    assertFileContent(t, 'file-javascript-with-header-start-year-to-year.js', '/* © 2015-2022 CopyrightHolder */\n\n' + "console.log('Test');");
    assertFileContent(t, 'file-javascript-with-header-start-year-to-present.js', '/* © 2014-present CopyrightHolder */\n\n' + "console.log('Test');");
});
test.serial('--forceModificationYear present', t => {
    const exitCode = runCli([
        'node',
        'script.js',
        '--include',
        TEST_DATA_FOLDER,
        '--copyrightHolder',
        'CopyrightHolder',
        '--forceModificationYear',
        'present',
        '--fix'
    ]);
    t.is(exitCode, 0 /* OK */);
    assertFileContent(t, 'file-javascript-no-header.js', '/* © 2022-present CopyrightHolder */\n\n' + "console.log('Test');");
    assertFileContent(t, 'file-javascript-with-start-year.js', '/* © 2022-present CopyrightHolder */\n\n' + "console.log('Test');");
    assertFileContent(t, 'file-javascript-with-header-start-year-to-year.js', '/* © 2015-present CopyrightHolder */\n\n' + "console.log('Test');");
    assertFileContent(t, 'file-javascript-with-header-start-year-to-present.js', '/* © 2014-present CopyrightHolder */\n\n' + "console.log('Test');");
});
test.serial('--forceModificationYear number', t => {
    const exitCode = runCli([
        'node',
        'script.js',
        '--include',
        TEST_DATA_FOLDER,
        '--copyrightHolder',
        'CopyrightHolder',
        '--forceModificationYear',
        '2022',
        '--fix'
    ]);
    t.is(exitCode, 0 /* OK */);
    assertFileContent(t, 'file-javascript-no-header.js', '/* © 2022 CopyrightHolder */\n\n' + "console.log('Test');");
    assertFileContent(t, 'file-javascript-with-start-year.js', '/* © 2022 CopyrightHolder */\n\n' + "console.log('Test');");
    assertFileContent(t, 'file-javascript-with-header-start-year-to-year.js', '/* © 2015-2022 CopyrightHolder */\n\n' + "console.log('Test');");
    assertFileContent(t, 'file-javascript-with-header-start-year-to-present.js', '/* © 2014-2022 CopyrightHolder */\n\n' + "console.log('Test');");
});
test.serial('--forceModificationYear', verifyValidationError, ['--copyrightHolder', 'CopyrightHolder', '--forceModificationYear', 'noNumber'], '--forceModificationYear: "noNumber" is not a valid year. It must be a number or "present"');
test.serial('--copyrightHolder is required', verifyValidationError, ['--include', TEST_DATA_FOLDER], 'Please specify --copyrightHolder');
test.serial('--templateId validation', verifyValidationError, [
    '--copyrightHolder',
    'CopyrightHolder',
    '--include',
    TEST_DATA_FOLDER,
    '--templateId',
    'unknownTemplateId'
], 'templateId must be one of [minimal, apache, gplv3]');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmludGVncmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NsaS5pbnRlZ3JhdGlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZCQUE2QjtBQUU3QixPQUFPLElBQTBCLE1BQU0sS0FBSyxDQUFDO0FBQzdDLE9BQU8sS0FBSyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxhQUFhLEVBQTJCLE1BQU0sT0FBTyxDQUFDO0FBQy9ELE9BQU8sRUFBWSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFekMsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7QUFFckMsSUFBSSxZQUEwQixDQUFDO0FBQy9CLElBQUksY0FBeUIsQ0FBQztBQUM5QixJQUFJLGdCQUEyQixDQUFDO0FBRWhDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxFQUFFO0lBQ2hDLGFBQWEsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUM7QUFFRixNQUFNLHFCQUFxQixHQUFHLENBQzVCLENBQTRCLEVBQzVCLElBQTJCLEVBQzNCLG9CQUE0QixFQUM1QixFQUFFO0lBQ0YsY0FBYyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25ELGdCQUFnQixHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXZELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXhELENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxnQkFBaUIsQ0FBQztJQUMvQixDQUFDLENBQUMs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