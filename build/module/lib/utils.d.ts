export declare function first<T>(array: ReadonlyArray<T>): T | undefined;
export declare function last<T>(array: ReadonlyArray<T>): T | undefined;
export declare function mapOptional<T, R>(x: T | undefined, f: (y: T) => R): R | undefined;
export declare function getYearFromTimestamp(timestamp: number | string): number;
export declare type Result<T> = T | Error;
