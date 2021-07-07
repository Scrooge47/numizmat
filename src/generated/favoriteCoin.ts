/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { favoriteCoinInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: favoriteCoin
// ====================================================

export interface favoriteCoin_favoriteCoin {
  __typename: "Coin";
  id: string;
  favorite: boolean;
}

export interface favoriteCoin {
  favoriteCoin: favoriteCoin_favoriteCoin;
}

export interface favoriteCoinVariables {
  input: favoriteCoinInput;
}
