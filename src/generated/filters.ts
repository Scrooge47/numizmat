/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: filters
// ====================================================

export interface filters_getFiltersFromCoins_country {
  __typename: "Country";
  code: string;
  name: string;
}

export interface filters_getFiltersFromCoins_nameCollection {
  __typename: "NameCollection";
  id: string;
  name: string;
}

export interface filters_getFiltersFromCoins {
  __typename: "Coin";
  country: filters_getFiltersFromCoins_country;
  nameCollection: filters_getFiltersFromCoins_nameCollection;
}

export interface filters {
  getFiltersFromCoins: filters_getFiltersFromCoins[];
}
