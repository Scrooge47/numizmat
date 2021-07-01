export interface ItemFilter {
  name: string;
  id: number;
}

export interface Filters {

  country: ItemFilter[] | null;
  nameCollection: ItemFilter[] | null;
}

export interface formatError {
  path: string;
  message: string
}


export interface Chip {
  id: number;
  name: string;
  label: string;
}

export enum Model {
  Coin,
  Collection
}