export class ListResultDto<T> {
  items?: T[];

  constructor(initialValues: Partial<ListResultDto<T>> = {}) {
    for (const key in initialValues) {
      if (initialValues.hasOwnProperty(key)) {
        this[key] = initialValues[key];
      }
    }
  }
}

export class PagedResultDto<T> extends ListResultDto<T> {
  totalCount?: number;

  constructor(initialValues: Partial<PagedResultDto<T>> = {}) {
    super(initialValues);
  }
}
