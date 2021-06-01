/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { newCollectionInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addCoinToCollection
// ====================================================

export interface addCoinToCollection_addCoinToCollection {
  __typename: "Collection";
  count: number;
}

export interface addCoinToCollection {
  addCoinToCollection: addCoinToCollection_addCoinToCollection;
}

export interface addCoinToCollectionVariables {
  input: newCollectionInput;
}
