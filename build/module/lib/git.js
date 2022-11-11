/* Copyright (c) 2018-2022 Marco Stahl */
import * as child_process from 'child_process';
import { first, getYearFromTimestamp, last, mapOptional } from './utils';
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
export function getGitFiles(onlyChanged) {
    if (onlyChanged) {
        return execToLines(['git', 'diff', '--name-only', '--cached']);
    }
    return execToLines(['git', 'ls-files']);
}
function invertedGrepOptions(excludeCommitPattern) {
    return excludeCommitPattern ? ['--invert-grep', '--grep=' + excludeCommitPattern] : [];
}
export function getFileInfoFromGit(filename, excludeCommits) {
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
        createdYear: mapOptional(last(logDates), getYearFromTimestamp),
        updatedYear: mapOptional(first(logDates), getYearFromTimestamp)
    };
}
export const testExports = {
    execToLines,
    invertedGrepOptions
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9naXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUNBQXlDO0FBRXpDLE9BQU8sS0FBSyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV6RSxTQUFTLFdBQVcsQ0FBQyxXQUFxQjtJQUN4QyxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUMvQztJQUVELE9BQU8sYUFBYTtTQUNqQixZQUFZLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUNyRCxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsV0FBcUI7SUFDL0MsSUFBSSxXQUFXLEVBQUU7UUFDZixPQUFPLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7S0FDaEU7SUFDRCxPQUFPLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLG9CQUE2QjtJQUN4RCxPQUFPLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3pGLENBQUM7QUFRRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsUUFBZ0IsRUFBRSxjQUF1QjtJQUMxRSxNQUFNLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFDM0IsS0FBSztRQUNMLEtBQUs7UUFDTCxjQUFjO1FBQ2QsVUFBVTtRQUNWLEdBQUcsUUFBUTtRQUNYLElBQUk7UUFDSixRQUFRO0tBQ1QsQ0FBQyxDQUFDO0lBRUgsT0FBTztRQUNMLFFBQVE7UUFDUixXQUFXLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxvQkFBb0IsQ0FBQztRQUM5RCxXQUFXLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxvQkFBb0IsQ0FBQztLQUNoRSxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRztJQUN6QixXQUFXO0lBQ1gsbUJBQW1CO0NBQ3BCLENBQUMifQ==