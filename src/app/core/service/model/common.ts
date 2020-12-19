import { EventEmitter, Type } from '@angular/core';
import { Subject } from 'rxjs';

// tslint:disable-next-line: no-namespace
export namespace Common {

  export type PagedResponse<T> = {
    totalCount: number;
  } & PagedItemsResponse<T>;

  export interface PagedItemsResponse<T> {
    items: T[];
  }

  export interface PageQueryParams {
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
  }

  export interface Lookup {
    id: string;
    displayName: string;
  }

  export interface Nav {
    name: string;
    parentName?: string;
    requiredPolicy?: string;
    order?: number;
    invisible?: boolean;
  }

  export interface Tab extends Nav {
    component: Type<any>;
  }

  export interface BasicItem {
    id: string;
    name: string;
  }

  export interface Option<T> {
    key: Extract<keyof T, string>;
    value: T[Extract<keyof T, string>];
  }

  export interface Dictionary<T = any> {
    [key: string]: T;
  }

  export type ExtractFromOutput<
    T extends EventEmitter<any> | Subject<any>
  > = T extends EventEmitter<infer X> ? X : T extends Subject<infer Y> ? Y : never;
}
