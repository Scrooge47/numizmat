/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: coin
// ====================================================

export interface coin_coin_country {
  __typename: "Country";
  name: string;
}

export interface coin_coin_mint {
  __typename: "Mint";
  name: string;
}

export interface coin_coin_currency {
  __typename: "Currency";
  name: string;
  code: string;
}

export interface coin_coin {
  __typename: "Coin";
  id: string;
  name: string;
  country: coin_coin_country;
  publicId: string;
  year: number;
  description: string;
  denomination: number;
  mint: coin_coin_mint;
  current: boolean;
  currency: coin_coin_currency;
  count: number;
}

export interface coin {
  coin: coin_coin;
}

export interface coinVariables {
  id: string;
}
