"use strict";
/* © 2018-2022 Marco Stahl */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const copyright_header_1 = require("./copyright-header");
const templates_1 = require("./templates");
const { collectFiles, updateCopyrightHeader, useTodayAsYearDefault } = copyright_header_1.testExports;
const collectFilesTest = (t, include, expected) => {
    t.deepEqual(collectFiles({
        copyrightHolder: '',
        exclude: [],
        fix: false,
        include,
        onlyChanged: false,
        template: ''
    }), expected);
};
// tslint:disable-next-line:no-object-mutation
collectFilesTest.title = (providedTitle, include, expected) => `collectFiles - ${providedTitle}: ${include} => ${expected}`;
const ALL_TEST_DATA_FILES = [
    'test-data/file-javascript-no-header.js',
    'test-data/file-javascript-with-header-start-year-to-present.js',
    'test-data/file-javascript-with-header-start-year-to-year.js',
    'test-data/file-javascript-with-start-year.js',
    'test-data/file-typescript-no-header.ts'
];
ava_1.default('matching files', collectFilesTest, ['test-data'], ALL_TEST_DATA_FILES);
ava_1.default('no matching files', collectFilesTest, ['test-data-not-exist'], []);
ava_1.default('collectFiles - no include filter', t => {
    t.true(collectFiles({
        copyrightHolder: '',
        exclude: [],
        fix: false,
        include: [],
        onlyChanged: false,
        template: ''
    }).length > 10);
});
ava_1.default('collectFiles - exclude filter over include filter', t => {
    t.deepEqual(collectFiles({
        copyrightHolder: '',
        exclude: ['.*\\.ts$'],
        fix: false,
        include: ['test-data'],
        onlyChanged: false,
        template: ''
    }), ALL_TEST_DATA_FILES.filter(f => !f.endsWith('.ts')));
});
ava_1.default('useTodayAsYearDefault', t => {
    const thisYear = new Date().getFullYear();
    t.deepEqual(useTodayAsYearDefault({ filename: 'dummy' }), {
        filename: 'dummy',
        createdYear: thisYear,
        updatedYear: thisYear
    });
});
const testOpts = {
    copyrightHolder: 'Test User, Inc.',
    exclude: [],
    fix: true,
    include: ['test/file.ts'],
    onlyChanged: false,
    template: templates_1.TEMPLATES.minimal
};
const testFileInfo = {
    filename: 'test/file.ts',
    createdYear: 2002,
    updatedYear: 2017
};
ava_1.default('hashbang', t => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weXJpZ2h0LWhlYWRlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb3B5cmlnaHQtaGVhZGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZCQUE2Qjs7Ozs7QUFFN0IsOENBQTZDO0FBQzdDLHlEQUFtRTtBQUNuRSwyQ0FBd0M7QUFHeEMsTUFBTSxFQUFFLFlBQVksRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxHQUFHLDhCQUFXLENBQUM7QUFFbkYsTUFBTSxnQkFBZ0IsR0FBRyxDQUN2QixDQUE0QixFQUM1QixPQUE4QixFQUM5QixRQUErQixFQUMvQixFQUFFO0lBQ0YsQ0FBQyxDQUFDLFNBQVMsQ0FDVCxZQUFZLENBQUM7UUFDWCxlQUFlLEVBQUUsRUFBRTtRQUNuQixPQUFPLEVBQUUsRUFBRTtRQUNYLEdBQUcsRUFBRSxLQUFLO1FBQ1YsT0FBTztRQUNQLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFFBQVEsRUFBRSxFQUFFO0tBQ2IsQ0FBQyxFQUNGLFFBQVEsQ0FDVCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsOENBQThDO0FBQzlDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxDQUN2QixhQUFxQixFQUNyQixPQUE4QixFQUM5QixRQUErQixFQUMvQixFQUFFLENBQUMsa0JBQWtCLGFBQWEsS0FBSyxPQUFPLE9BQU8sUUFBUSxFQUFFLENBQUM7QUFFbEUsTUFBTSxtQkFBbUIsR0FBMEI7SUFDakQsd0NBQXdDO0lBQ3hDLGdFQUFnRTtJQUNoRSw2REFBNkQ7SUFDN0QsOENBQThDO0lBQzlDLHdDQUF3QztDQUN6QyxDQUFDO0FBRUYsYUFBSSxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUU3RSxhQUFJLENBQUMsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEVB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