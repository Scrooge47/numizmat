/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: collection
// ====================================================

export interface collection_collectionOfUser_coin {
  __typename: "Coin";
  name: string;
  count: number;
  publicId: string;
  id: string;
}

export interface collection_collectionOfUser {
  __typename: "Collection";
  coin: collection_collectionOfUser_coin;
}

export interface collection {
  collectionOfUser: collection_collectionOfUser[];
}
