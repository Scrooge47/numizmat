/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CoinFilter, Condition } from "./globalTypes";

// ====================================================
// GraphQL query operation: collection
// ====================================================

export interface collection_collectionOfUser_coin_prices_currency {
  __typename: "Currency";
  code: string;
  name: string;
}

export interface collection_collectionOfUser_coin_prices {
  __typename: "Price";
  condition: Condition;
  price: number;
  currency: collection_collectionOfUser_coin_prices_currency;
}

export interface collection_collectionOfUser_coin {
  __typename: "Coin";
  name: string;
  count: number;
  publicId: string;
  id: string;
  favorite: boolean;
  prices: collection_collectionOfUser_coin_prices[];
}

export interface collection_collectionOfUser {
  __typename: "Collection";
  coin: collection_collectionOfUser_coin;
}

export interface collection {
  collectionOfUser: collection_collectionOfUser[];
}

export interface collectionVariables {
  filters: CoinFilter;
}
