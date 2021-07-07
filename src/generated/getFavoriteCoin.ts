/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getFavoriteCoin
// ====================================================

export interface getFavoriteCoin_getFavoriteCoin_country {
  __typename: "Country";
  name: string;
}

export interface getFavoriteCoin_getFavoriteCoin_mint {
  __typename: "Mint";
  name: string;
}

export interface getFavoriteCoin_getFavoriteCoin_currency {
  __typename: "Currency";
  name: string;
}

export interface getFavoriteCoin_getFavoriteCoin {
  __typename: "Coin";
  id: string;
  name: string;
  country: getFavoriteCoin_getFavoriteCoin_country;
  publicId: string;
  year: number;
  description: string;
  denomination: number;
  mint: getFavoriteCoin_getFavoriteCoin_mint;
  current: boolean;
  currency: getFavoriteCoin_getFavoriteCoin_currency;
  count: number;
  favorite: boolean;
}

export interface getFavoriteCoin {
  getFavoriteCoin: getFavoriteCoin_getFavoriteCoin[];
}
