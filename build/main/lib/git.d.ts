declare function execToLines(execAndArgs: string[]): string[];
export declare function getGitFiles(onlyChanged?: boolean): string[];
declare function invertedGrepOptions(excludeCommitPattern?: string): string[];
export interface GitFileInfo {
    readonly filename: string;
    readonly createdYear?: number;
    readonly updatedYear?: number;
}
export declare function getFileInfoFromGit(filename: string, excludeCommits?: string): GitFileInfo;
export declare const testExports: {
    execToLines: typeof execToLines;
    invertedGrepOptions: typeof invertedGrepOptions;
};
export {};
