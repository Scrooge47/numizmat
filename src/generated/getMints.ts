/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMints
// ====================================================

export interface getMints_getMints {
  __typename: "Mint";
  id: number;
  name: string;
}

export interface getMints {
  getMints: getMints_getMints[];
}

export interface getMintsVariables {
  country: string;
}
