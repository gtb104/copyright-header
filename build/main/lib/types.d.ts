export interface FileInfo {
    readonly filename: string;
    readonly createdYear: number;
    readonly updatedYear: number;
}
export declare type ToYear = number | 'present';
export interface YearRange {
    readonly from: number;
    readonly to?: number | 'present';
}
