/* Copyright (c) 2018-2022 Marco Stahl */

export interface FileInfo {
  readonly filename: string;
  readonly createdYear: number;
  readonly updatedYear: number;
}

export type ToYear = number | 'present';

export interface YearRange {
  readonly from: number;
  readonly to?: number | 'present';
}
