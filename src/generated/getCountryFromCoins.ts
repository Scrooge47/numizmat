/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCountryFromCoins
// ====================================================

export interface getCountryFromCoins_getCountryFromCoins_country {
  __typename: "Country";
  code: string;
  name: string;
}

export interface getCountryFromCoins_getCountryFromCoins {
  __typename: "Coin";
  country: getCountryFromCoins_getCountryFromCoins_country;
}

export interface getCountryFromCoins {
  getCountryFromCoins: getCountryFromCoins_getCountryFromCoins[];
}
