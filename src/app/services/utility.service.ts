import { Service } from '@angular/core';

const MONTHS_IN_YEAR: number = 12;

@Service()
export class UtilityService {

  private readonly MONTH_NAMES: string[] = this.getMonthNames();

  monthName(month: number): string {
    if (month < 1 || month > MONTHS_IN_YEAR) return '';
    return this.MONTH_NAMES[month - 1];
  }

  toDashCase(str: string): string {
    return str
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  addToRecord<T extends number | string, Data>(
    group: Record<T, Data[]>,
    key: T | undefined,
    data: Data
  ): void {
    if (!key) return;
    if (!group[key]) group[key] = [];
    group[key].push(data);
  }

  addToSubRecord<T extends number | string, U extends number | string, Data>(
    group: Record<T, Record<U, Data[]>>,
    groupKey: T | undefined,
    subGroupKey: U | undefined,
    data: Data
  ): void {
    if (!groupKey || !subGroupKey) return;
    if (!group[groupKey]) group[groupKey] = {} as Record<U, Data[]>;
    if (!group[groupKey][subGroupKey]) group[groupKey][subGroupKey] = [];
    group[groupKey][subGroupKey].push(data);
  }

  private getMonthNames(): string[] {
    return Array.from({ length: MONTHS_IN_YEAR }, (_, i) =>
      new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(0, i))
    );
  }

}
