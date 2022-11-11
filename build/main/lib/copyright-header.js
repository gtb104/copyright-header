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
Object.defineProperty(exports, "__esModule", { value: true });
exports.testExports = exports.ensureUpdatedCopyrightHeader = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const git_1 = require("./git");
const simple_template_1 = require("./simple-template");
const CREATIVE_FILE_EXTENSIONS = [
    'ts',
    'js',
    'tsx',
    'jsx',
    'java',
    'cs',
    'm',
    'h',
    'c',
    'cc',
    'cpp',
    'c++',
    'cxx',
    'cp'
];
const COPYRIGHT_HEADER_REGEXP = /^(\s*)(\/\*[\s\S]*?(?:©|Copyright \(c\))[\s\S]*?\*\/)/;
const FIND_YEARS_REGEXP = /\b20\d{2}\b|present/g;
const HASHBANG_REGEXP = /^(#\!.*?\n)(.*)$/s;
function ensureUpdatedCopyrightHeader(opts) {
    const files = collectFiles(opts);
    const fileInfos = files.map(f => useTodayAsYearDefault(git_1.getFileInfoFromGit(f, opts.excludeCommits)));
    const unFixedFiles = [];
    for (const fileInfo of fileInfos) {
        const fileContent = fs.readFileSync(fileInfo.filename, 'utf8');
        console.log(`Checking ${fileInfo.filename} ...`);
        const newFileContent = updateCopyrightHeader(opts, fileInfo, fileContent);
        if (!stringsEqual(newFileContent, fileContent)) {
            if (opts.fix) {
                console.log(`Update copyright header in  ${fileInfo.filename}`);
                fs.writeFileSync(fileInfo.filename, newFileContent);
            }
            else {
                console.log(`Need to fix copyright header in  ${fileInfo.filename}`);
                unFixedFiles.push(fileInfo.filename);
            }
        }
    }
    return { unFixedFiles };
}
exports.ensureUpdatedCopyrightHeader = ensureUpdatedCopyrightHeader;
// Compare strings ignoring whitespace
function stringsEqual(a, b) {
    return a.replace(/\s+/g, ' ') === b.replace(/\s+/g, ' ');
}
function useTodayAsYearDefault(fileinfo) {
    return {
        filename: fileinfo.filename,
        createdYear: fileinfo.createdYear || new Date().getFullYear(),
        updatedYear: fileinfo.updatedYear || new Date().getFullYear()
    };
}
function collectFiles(options) {
    const gitFiles = git_1.getGitFiles(options.onlyChanged);
    const includeRegexps = options.include.map(pattern => new RegExp(pattern));
    const includeFilter = (filename) => includeRegexps.length === 0 || includeRegexps.some(regexp => regexp.test(filename));
    const excludeRegexps = options.exclude.map(pattern => new RegExp(pattern));
    const excludeFilter = (filename) => excludeRegexps.length === 0 || !excludeRegexps.some(regexp => regexp.test(filename));
    return gitFiles
        .filter(includeFilter)
        .filter(excludeFilter)
        .filter(filename => CREATIVE_FILE_EXTENSIONS.includes(path
        .extname(filename)
        .toLowerCase()
        .slice(1)));
}
function getMaxYear(year1, yearOrPresent2) {
    if (!yearOrPresent2) {
        return year1;
    }
    else if (yearOrPresent2 === 'present') {
        return 'present';
    }
    else {
        const year2 = parseInt(yearOrPresent2, 10);
        return Math.max(year1, year2);
    }
}
function getCopyrightYears(fileInfo, currentHeader, forceModificationYear) {
    const copyrightYears = currentHeader && currentHeader.match(FIND_YEARS_REGEXP);
    if (copyrightYears && copyrightYears.length > 0) {
        return {
            from: parseInt(copyrightYears[0], 10),
            to: forceModificationYear || getMaxYear(fileInfo.updatedYear, copyrightYears[1])
        };
    }
    else {
        return { from: fileInfo.createdYear, to: forceModificationYear || fileInfo.updatedYear };
    }
}
function renderNewHeader(opts) {
    const copyrightYears = getCopyrightYears(opts.fileInfo, opts.currentHeader, opts.forceModificationYear);
    const needToShowUpdatedYear = copyrightYears.to && copyrightYears.to !== copyrightYears.from;
    return simple_template_1.renderSimpleTemplate(opts.template, {
        from: copyrightYears.from.toString(),
        to: needToShowUpdatedYear ? '-' + copyrightYears.to : '',
        copyrightHolder: opts.copyrightHolder
    });
}
function updateCopyrightHeader(opts, fileInfo, origFileContent) {
    const renderOpts = {
        fileInfo,
        template: opts.template,
        copyrightHolder: opts.copyrightHolder,
        forceModificationYear: opts.forceModificationYear
    };
    let hashbang = '';
    let fileContent = origFileContent;
    const hashbangMatch = origFileContent.match(HASHBANG_REGEXP);
    if (hashbangMatch) {
        hashbang = hashbangMatch[1];
        fileContent = hashbangMatch[2];
    }
    const headMatch = fileContent.match(COPYRIGHT_HEADER_REGEXP);
    if (headMatch) {
        const leadingWhitespace = headMatch[1];
        fileContent = fileContent.replace(COPYRIGHT_HEADER_REGEXP, leadingWhitespace +
            renderNewHeader(Object.assign(Object.assign({}, renderOpts), { currentHeader: headMatch[2] })));
    }
    else {
        fileContent = renderNewHeader(renderOpts) + '\n\n' + fileContent;
        if (hashbang) {
            hashbang += '\n';
        }
    }
    return hashbang + fileContent;
}
exports.testExports = {
    collectFiles,
    updateCopyrightHeader,
    useTodayAsYearDefault
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weXJpZ2h0LWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29weXJpZ2h0LWhlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNkJBQTZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTdCLHVDQUF5QjtBQUN6QiwyQ0FBNkI7QUFDN0IsK0JBQXFFO0FBQ3JFLHVEQUF5RDtBQUd6RCxNQUFNLHdCQUF3QixHQUEwQjtJQUN0RCxJQUFJO0lBQ0osSUFBSTtJQUNKLEtBQUs7SUFDTCxLQUFLO0lBQ0wsTUFBTTtJQUNOLElBQUk7SUFDSixHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxJQUFJO0lBQ0osS0FBSztJQUNMLEtBQUs7SUFDTCxLQUFLO0lBQ0wsSUFBSTtDQUNMLENBQUM7QUFFRixNQUFNLHVCQUF1QixHQUFHLHVEQUF1RCxDQUFDO0FBQ3hGLE1BQU0saUJBQWlCLEdBQUcsc0JBQXNCLENBQUM7QUFDakQsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUM7QUFpQjVDLFNBQWdCLDRCQUE0QixDQUFDLElBQXNCO0lBQ2pFLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxNQUFNLFNBQVMsR0FBZSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQzFDLHFCQUFxQixDQUFDLHdCQUFrQixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FDbEUsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUV4QixLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVMsRUFBRTtRQUNoQyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLFFBQVEsQ0FBQyxRQUFRLE1BQU0sQ0FB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