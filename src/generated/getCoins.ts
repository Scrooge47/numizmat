/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereFilters } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCoins
// ====================================================

export interface getCoins_getCoins_country {
  __typename: "Country";
  name: string;
}

export interface getCoins_getCoins_mint {
  __typename: "Mint";
  name: string;
}

export interface getCoins_getCoins_currency {
  __typename: "Currency";
  name: string;
}

export interface getCoins_getCoins {
  __typename: "Coin";
  id: string;
  name: string;
  country: getCoins_getCoins_country;
  publicId: string;
  year: number;
  description: string;
  denomination: number;
  mint: getCoins_getCoins_mint;
  current: boolean;
  currency: getCoins_getCoins_currency;
  count: number;
}

export interface getCoins {
  getCoins: getCoins_getCoins[];
}

export interface getCoinsVariables {
  filters: WhereFilters;
}
