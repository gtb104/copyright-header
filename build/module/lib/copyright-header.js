/* © 2018-2022 Marco Stahl */
import * as fs from 'fs';
import * as path from 'path';
import { getFileInfoFromGit, getGitFiles } from './git';
import { renderSimpleTemplate } from './simple-template';
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
const COPYRIGHT_HEADER_REGEXP = /^(\s*)(\/\*[\s\S]*?©[\s\S]*?\*\/)/;
const FIND_YEARS_REGEXP = /\b20\d{2}\b|present/g;
const HASHBANG_REGEXP = /^(#\!.*?\n)(.*)$/s;
export function ensureUpdatedCopyrightHeader(opts) {
    const files = collectFiles(opts);
    const fileInfos = files.map(f => useTodayAsYearDefault(getFileInfoFromGit(f, opts.excludeCommits)));
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
    const gitFiles = getGitFiles(options.onlyChanged);
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
    return renderSimpleTemplate(opts.template, {
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
            renderNewHeader({
                ...renderOpts,
                currentHeader: headMatch[2]
            }));
    }
    else {
        fileContent = renderNewHeader(renderOpts) + '\n\n' + fileContent;
        if (hashbang) {
            hashbang += '\n';
        }
    }
    return hashbang + fileContent;
}
export const testExports = {
    collectFiles,
    updateCopyrightHeader,
    useTodayAsYearDefault
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weXJpZ2h0LWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29weXJpZ2h0LWhlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2QkFBNkI7QUFFN0IsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDekIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBZSxNQUFNLE9BQU8sQ0FBQztBQUNyRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUd6RCxNQUFNLHdCQUF3QixHQUEwQjtJQUN0RCxJQUFJO0lBQ0osSUFBSTtJQUNKLEtBQUs7SUFDTCxLQUFLO0lBQ0wsTUFBTTtJQUNOLElBQUk7SUFDSixHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxJQUFJO0lBQ0osS0FBSztJQUNMLEtBQUs7SUFDTCxLQUFLO0lBQ0wsSUFBSTtDQUNMLENBQUM7QUFFRixNQUFNLHVCQUF1QixHQUFHLG1DQUFtQyxDQUFDO0FBQ3BFLE1BQU0saUJBQWlCLEdBQUcsc0JBQXNCLENBQUM7QUFDakQsTUFBTSxlQUFlLEdBQUcsbUJBQW1CLENBQUM7QUFpQjVDLE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxJQUFzQjtJQUNqRSxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsTUFBTSxTQUFTLEdBQWUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUMxQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQ2xFLENBQUM7SUFDRixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7SUFFeEIsS0FBSyxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUU7UUFDaEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxRQUFRLENBQUMsUUFBUSxNQUFNLENBQUMsQ0FBQztRQUNqRCxNQUFNLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxFQUFFO1lBQzlDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDaEUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN0QztTQUNGO0tBQ0Y7SUFFRCxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUM7QUFDMUIsQ0FBQztBQUVELHNDQUFzQztBQUN0QyxTQUFTLFlBQVksQ0FBQyxDQUFTLEVBQUUsQ0FBUztJQUN4QyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLFFBQXFCO0lBQ2xELE9BQU87UUFDTCxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7UUFDM0IsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDN0QsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7S0FDOUQsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxPQUF5QjtJQUM3QyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRWxELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMzRSxNQUFNLGFBQWEsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxDQUN6QyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRXRGLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMzRSxNQUFNLGFBQWEsR0FBRyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxDQUN6QyxjQUFjLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFdkYsT0FBTyxRQUFRO1NBQ1osTUFBTSxDQUFDLGFBQWEsQ0FBQztTQUNyQixNQUFNLENBQUMsYUFBYSxDQUFDO1NBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUNqQix3QkFBd0IsQ0FBQyxRQUFRLENBQy9CLElBQUk7U0FDRCxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQ2pCLFdBQVcsRUFBRTtTQUNiLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDWixDQUNGLENBQUM7QUFDTixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsS0FBYSxFQUFFLGNBQTZCO0lBQzlELElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDbkIsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNLElBQUksY0FBYyxLQUFLLFNBQVMsRUFBRTtRQUN2QyxPQUFPLFNBQVMsQ0FBQztLQUNsQjtTQUFNO1FBQ0wsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQy9CO0FBQ0gsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQ3hCLFFBQWtCLEVBQ2xCLGFBQWlDLEVBQ2pDLHFCQUE4QjtJQUU5QixNQUFNLGNBQWMsR0FBRyxhQUFhLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9FLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQy9DLE9BQU87WUFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckMsRUFBRSxFQUFFLHFCQUFxQixJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqRixDQUFDO0tBQ0g7U0FBTTtRQUNMLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUscUJBQXFCLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQzFGO0FBQ0gsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLElBTXhCO0lBQ0MsTUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQ3RDLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLHFCQUFxQixDQUMzQixDQUFDO0lBQ0YsTUFBTSxxQkFBcUIsR0FBRyxjQUFjLENBQUMsRUFBRSxJQUFJLGNBQWMsQ0FBQyxFQUFFLEtBQUssY0FBYyxDQUFDLElBQUksQ0FBQztJQUM3RixPQUFPLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDekMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ3BDLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDeEQsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO0tBQ3RDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUM1QixJQUFzQixFQUN0QixRQUFrQixFQUNsQixlQUF1QjtJQUV2QixNQUFNLFVBQVUsR0FBRztRQUNqQixRQUFRO1FBQ1IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1FBQ3ZCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtRQUNyQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCO0tBQ2xELENBQUM7SUFDRixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDbEIsSUFBSSxXQUFXLEdBQUcsZUFBZSxDQUFDO0lBRWxDLE1BQU0sYUFBYSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0QsSUFBSSxhQUFhLEVBQUU7UUFDakIsUUFBUSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixXQUFXLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hDO0lBRUQsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzdELElBQUksU0FBUyxFQUFFO1FBQ2IsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQy9CLHVCQUF1QixFQUN2QixpQkFBaUI7WUFDZixlQUFlLENBQUM7Z0JBQ2QsR0FBRyxVQUFVO2dCQUNiLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQzVCLENBQUMsQ0FDTCxDQUFDO0tBQ0g7U0FBTTtRQUNMLFdBQVcsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUNqRSxJQUFJLFFBQVEsRUFBRTtZQUNaLFFBQVEsSUFBSSxJQUFJLENBQUM7U0FDbEI7S0FDRjtJQUVELE9BQU8sUUFBUSxHQUFHLFdBQVcsQ0FBQztBQUNoQyxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHO0lBQ3pCLFlBQVk7SUFDWixxQkFBcUI7SUFDckIscUJBQXFCO0NBQ3RCLENBQUMifQ==