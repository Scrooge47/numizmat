/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewCoinInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCoin
// ====================================================

export interface CreateCoin_createCoin {
  __typename: "Coin";
  id: string;
}

export interface CreateCoin {
  createCoin: CreateCoin_createCoin;
}

export interface CreateCoinVariables {
  input: NewCoinInput;
}
