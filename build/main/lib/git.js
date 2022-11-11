"use strict";
/* Copyright (c) 2018-2022 Marco Stahl */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testExports = exports.getFileInfoFromGit = exports.getGitFiles = void 0;
const child_process = __importStar(require("child_process"));
const utils_1 = require("./utils");
function execToLines(execAndArgs) {
    const exec = execAndArgs.shift();
    if (!exec) {
        throw new Error(`No command to exec present`);
    }
    return child_process
        .execFileSync(exec, execAndArgs, { encoding: 'utf8' })
        .split('\n')
        .filter(line => line);
}
function getGitFiles(onlyChanged) {
    if (onlyChanged) {
        return execToLines(['git', 'diff', '--name-only', '--cached']);
    }
    return execToLines(['git', 'ls-files']);
}
exports.getGitFiles = getGitFiles;
function invertedGrepOptions(excludeCommitPattern) {
    return excludeCommitPattern ? ['--invert-grep', '--grep=' + excludeCommitPattern] : [];
}
function getFileInfoFromGit(filename, excludeCommits) {
    const grepFlag = invertedGrepOptions(excludeCommits);
    const logDates = execToLines([
        'git',
        'log',
        '--format=%aD',
        '--follow',
        ...grepFlag,
        '--',
        filename
    ]);
    return {
        filename,
        createdYear: utils_1.mapOptional(utils_1.last(logDates), utils_1.getYearFromTimestamp),
        updatedYear: utils_1.mapOptional(utils_1.first(logDates), utils_1.getYearFromTimestamp)
    };
}
exports.getFileInfoFromGit = getFileInfoFromGit;
exports.testExports = {
    execToLines,
    invertedGrepOptions
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9naXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUV6Qyw2REFBK0M7QUFDL0MsbUNBQXlFO0FBRXpFLFNBQVMsV0FBVyxDQUFDLFdBQXFCO0lBQ3hDLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsT0FBTyxhQUFhO1NBQ2pCLFlBQVksQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQ3JELEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLFdBQXFCO0lBQy9DLElBQUksV0FBVyxFQUFFO1FBQ2YsT0FBTyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQ2hFO0lBQ0QsT0FBTyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBTEQsa0NBS0M7QUFFRCxTQUFTLG1CQUFtQixDQUFDLG9CQUE2QjtJQUN4RCxPQUFPLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3pGLENBQUM7QUFRRCxTQUFnQixrQkFBa0IsQ0FBQyxRQUFnQixFQUFFLGNBQXVCO0lBQzFFLE1BQU0sUUFBUSxHQUFHLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQztRQUMzQixLQUFLO1FBQ0wsS0FBSztRQUNMLGNBQWM7UUFDZCxVQUFVO1FBQ1YsR0FBRyxRQUFRO1FBQ1gsSUFBSTtRQUNKLFFBQVE7S0FDVCxDQUFDLENBQUM7SUFFSCxPQUFPO1FBQ0wsUUFBUTtRQUNSLFdBQVcsRUFBRSxtQkFBVyxDQUFDLFlBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSw0QkFBb0IsQ0FBQztRQUM5RCxXQUFXLEVBQUUsbUJBQVcsQ0FBQyxhQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsNEJBQW9CLENBQUM7S0FDaEUsQ0FBQztBQUNKLENBQUM7QUFqQkQsZ0RBaUJDO0FBRVksUUFBQSxXQUFXLEdBQUc7SUFDekIsV0FBVztJQUNYLG1CQUFtQjtDQUNwQixDQUFDIn0=