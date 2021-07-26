/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Condition } from "./globalTypes";

// ====================================================
// GraphQL fragment: MyCoin
// ====================================================

export interface MyCoin_prices_currency {
  __typename: "Currency";
  code: string;
  name: string;
}

export interface MyCoin_prices {
  __typename: "Price";
  condition: Condition;
  price: number;
  currency: MyCoin_prices_currency;
  count: number;
}

export interface MyCoin {
  __typename: "Coin";
  name: string;
  count: number;
  publicId: string;
  id: string;
  favorite: boolean;
  prices: MyCoin_prices[];
}
