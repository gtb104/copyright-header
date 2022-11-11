import { GitFileInfo } from './git';
import { FileInfo, ToYear } from './types';
export interface ValidatedOptions {
    readonly exclude: ReadonlyArray<string>;
    readonly include: ReadonlyArray<string>;
    readonly copyrightHolder: string;
    readonly excludeCommits?: string;
    readonly fix: boolean;
    readonly forceModificationYear?: ToYear;
    readonly onlyChanged: boolean;
    readonly template: string;
}
interface ValidationResult {
    readonly unFixedFiles: ReadonlyArray<string>;
}
export declare function ensureUpdatedCopyrightHeader(opts: ValidatedOptions): ValidationResult;
declare function useTodayAsYearDefault(fileinfo: GitFileInfo): FileInfo;
declare function collectFiles(options: ValidatedOptions): ReadonlyArray<string>;
declare function updateCopyrightHeader(opts: ValidatedOptions, fileInfo: FileInfo, origFileContent: string): string;
export declare const testExports: {
    collectFiles: typeof collectFiles;
    updateCopyrightHeader: typeof updateCopyrightHeader;
    useTodayAsYearDefault: typeof useTodayAsYearDefault;
};
export {};
