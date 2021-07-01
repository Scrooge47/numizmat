/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: filters
// ====================================================

export interface filters_getFiltersFromCoins_country {
  __typename: "PreparedOneElemFilter";
  id: number;
  name: string;
}

export interface filters_getFiltersFromCoins_nameCollection {
  __typename: "PreparedOneElemFilter";
  id: number;
  name: string;
}

export interface filters_getFiltersFromCoins {
  __typename: "PreparedFilter";
  country: filters_getFiltersFromCoins_country[] | null;
  nameCollection: filters_getFiltersFromCoins_nameCollection[] | null;
}

export interface filters {
  getFiltersFromCoins: filters_getFiltersFromCoins;
}
