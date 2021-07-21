/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userInfoCoin
// ====================================================

export interface userInfoCoin_userInfoCoin_nameCollection {
  __typename: "NameCollection";
  name: string;
}

export interface userInfoCoin_userInfoCoin {
  __typename: "DataUserCollection";
  nameCollection: userInfoCoin_userInfoCoin_nameCollection;
  totalCoin: number;
  numberCoinOfUser: number;
}

export interface userInfoCoin {
  userInfoCoin: userInfoCoin_userInfoCoin[];
}
