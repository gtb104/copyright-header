export declare const enum ExitCode {
    OK = 0,
    ERROR = 1
}
export interface CliOptions {
    readonly copyrightHolder: string;
    readonly exclude: ReadonlyArray<string>;
    readonly excludeCommits?: string;
    readonly fix: boolean;
    readonly forceModificationYear?: string;
    readonly include: ReadonlyArray<string>;
    readonly onlyChanged: boolean;
    readonly templateId: string;
}
export declare function runCli(argv: string[], version?: string): ExitCode;
