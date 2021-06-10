export interface ItemFilter {
  name: string;
  code: string;
}

export interface Filters {
  country: ItemFilter[];
  nameCollection: ItemFilter[];
}

export interface formatError {
  path: string;
  message: string
}