/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequestCoin, Condition } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCoinsNonAuthorized
// ====================================================

export interface getCoinsNonAuthorized_getCoins_edges_node_country {
  __typename: "Country";
  name: string;
}

export interface getCoinsNonAuthorized_getCoins_edges_node_mint {
  __typename: "Mint";
  name: string;
}

export interface getCoinsNonAuthorized_getCoins_edges_node_currency {
  __typename: "Currency";
  name: string;
}

export interface getCoinsNonAuthorized_getCoins_edges_node_prices_currency {
  __typename: "Currency";
  code: string;
  name: string;
}

export interface getCoinsNonAuthorized_getCoins_edges_node_prices {
  __typename: "Price";
  condition: Condition;
  price: number;
  currency: getCoinsNonAuthorized_getCoins_edges_node_prices_currency;
  count: number;
}

export interface getCoinsNonAuthorized_getCoins_edges_node {
  __typename: "Coin";
  id: string;
  name: string;
  country: getCoinsNonAuthorized_getCoins_edges_node_country;
  publicId: string;
  year: number;
  description: string;
  denomination: number;
  mint: getCoinsNonAuthorized_getCoins_edges_node_mint;
  current: boolean;
  currency: getCoinsNonAuthorized_getCoins_edges_node_currency;
  circulation: number;
  prices: getCoinsNonAuthorized_getCoins_edges_node_prices[];
}

export interface getCoinsNonAuthorized_getCoins_edges {
  __typename: "Edge";
  cursor: string;
  node: getCoinsNonAuthorized_getCoins_edges_node;
}

export interface getCoinsNonAuthorized_getCoins_pageInfo {
  __typename: "PageInfo";
  endCursor: string;
  hasNextPage: boolean;
}

export interface getCoinsNonAuthorized_getCoins {
  __typename: "Response";
  edges: getCoinsNonAuthorized_getCoins_edges[];
  pageInfo: getCoinsNonAuthorized_getCoins_pageInfo;
}

export interface getCoinsNonAuthorized {
  getCoins: getCoinsNonAuthorized_getCoins;
}

export interface getCoinsNonAuthorizedVariables {
  filters: RequestCoin;
}
