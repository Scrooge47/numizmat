/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { newPriceInput, Condition } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addPrice
// ====================================================

export interface addPrice_addPrice_coin_prices {
  __typename: "Price";
  condition: Condition;
  price: number;
}

export interface addPrice_addPrice_coin {
  __typename: "Coin";
  prices: addPrice_addPrice_coin_prices[];
}

export interface addPrice_addPrice {
  __typename: "Price";
  coin: addPrice_addPrice_coin;
}

export interface addPrice {
  addPrice: addPrice_addPrice;
}

export interface addPriceVariables {
  input: newPriceInput;
}
