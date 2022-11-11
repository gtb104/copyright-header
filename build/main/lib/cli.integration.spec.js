"use strict";
/* © 2018-2022 Marco Stahl */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const child_process = __importStar(require("child_process"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const sinon_1 = require("sinon");
const cli_1 = require("./cli");
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
    const exitCode = cli_1.runCli(['node', 'script.js', ...argv]);
    t.is(exitCode, 1 /* ERROR */);
    t.is(consoleErrorStub.callCount, 1);
    t.deepEqual(consoleErrorStub.getCall(0).args, [expectedErrorMessage]);
    t.is(consoleLogStub.callCount, 0);
};
const assertFileContent = (t, file, content) => {
    const resultJs = fs.readFileSync(path.join(TEST_DATA_FOLDER, file), 'utf8');
    t.is(resultJs, content);
};
ava_1.default.beforeEach(() => {
    // revertTestDataFolder();
    sinonSandbox = sinon_1.createSandbox();
});
ava_1.default.afterEach(() => {
    revertTestDataFolder();
    sinonSandbox.restore();
});
ava_1.default.serial('validate but not fix', t => {
    const exitCode = cli_1.runCli([
        'node',
        'script.js',
        '--include',
        TEST_DATA_FOLDER,
        '--copyrightHolder',
        'CopyrightHolder'
    ]);
    t.is(exitCode, 1 /* ERROR */);
});
ava_1.default.serial('--fix', t => {
    const exitCode = cli_1.runCli([
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
ava_1.default.serial('--forceModificationYear present', t => {
    const exitCode = cli_1.runCli([
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
ava_1.default.serial('--forceModificationYear number', t => {
    const exitCode = cli_1.runCli([
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
ava_1.default.serial('--forceModificationYear', verifyValidationError, ['--copyrightHolder', 'CopyrightHolder', '--forceModificationYear', 'noNumber'], '--forceModificationYear: "noNumber" is not a valid year. It must be a number or "present"');
ava_1.default.serial('--copyrightHolder is required', verifyValidationError, ['--include', TEST_DATA_FOLDER], 'Please specify --copyrightHolder');
ava_1.default.serial('--templateId validation', verifyValidationError, [
    '--copyrightHolder',
    'CopyrightHolder',
    '--include',
    TEST_DATA_FOLDER,
    '--templateId',
    'unknownTemplateId'
], 'templateId must be one of [minimal, apache, gplv3]');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmludGVncmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NsaS5pbnRlZ3JhdGlvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBNkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU3Qiw4Q0FBNkM7QUFDN0MsNkRBQStDO0FBQy9DLHVDQUF5QjtBQUN6QiwyQ0FBNkI7QUFDN0IsaUNBQStEO0FBQy9ELCtCQUF5QztBQUV6QyxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQztBQUVyQyxJQUFJLFlBQTBCLENBQUM7QUFDL0IsSUFBSSxjQUF5QixDQUFDO0FBQzlCLElBQUksZ0JBQTJCLENBQUM7QUFFaEMsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLEVBQUU7SUFDaEMsYUFBYSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ25ELENBQUMsQ0FBQztBQUVGLE1BQU0scUJBQXFCLEdBQUcsQ0FDNUIsQ0FBNEIsRUFDNUIsSUFBMkIsRUFDM0Isb0JBQTRCLEVBQzVCLEVBQUU7SUFDRixjQUFjLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkQsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFdkQsTUFBTSxRQUFRLEdBQUcsWUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFeEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLGdCQUFpQixDQUFDO0lBQy9CLENBQUMsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxD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