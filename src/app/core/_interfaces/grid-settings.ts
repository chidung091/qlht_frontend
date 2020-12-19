import { State } from '@progress/kendo-data-query';
import { ColumnSettings } from './column-settings';
export interface GridSettings {
    date: Date;
    columnsConfig: ColumnSettings[];
    state: State;
    gridData?: any;
    columnMenu?: boolean;
}
