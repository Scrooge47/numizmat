/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequestCoin, Condition } from "./globalTypes";

// ====================================================
// GraphQL query operation: getCoins
// ====================================================

export interface getCoins_getCoins_edges_node_country {
  __typename: "Country";
  name: string;
}

export interface getCoins_getCoins_edges_node_mint {
  __typename: "Mint";
  name: string;
}

export interface getCoins_getCoins_edges_node_currency {
  __typename: "Currency";
  name: string;
}

export interface getCoins_getCoins_edges_node_prices_currency {
  __typename: "Currency";
  code: string;
  name: string;
}

export interface getCoins_getCoins_edges_node_prices {
  __typename: "Price";
  condition: Condition;
  price: number;
  currency: getCoins_getCoins_edges_node_prices_currency;
  count: number;
}

export interface getCoins_getCoins_edges_node {
  __typename: "Coin";
  id: string;
  name: string;
  country: getCoins_getCoins_edges_node_country;
  publicId: string;
  year: number;
  description: string;
  denomination: number;
  mint: getCoins_getCoins_edges_node_mint;
  current: boolean;
  currency: getCoins_getCoins_edges_node_currency;
  count: number;
  favorite: boolean;
  circulation: number;
  prices: getCoins_getCoins_edges_node_prices[];
}

export interface getCoins_getCoins_edges {
  __typename: "Edge";
  cursor: string;
  node: getCoins_getCoins_edges_node;
}

export interface getCoins_getCoins_pageInfo {
  __typename: "PageInfo";
  endCursor: string;
  hasNextPage: boolean;
}

export interface getCoins_getCoins {
  __typename: "Response";
  edges: getCoins_getCoins_edges[];
  pageInfo: getCoins_getCoins_pageInfo;
}

export interface getCoins {
  getCoins: getCoins_getCoins;
}

export interface getCoinsVariables {
  filters: RequestCoin;
}
