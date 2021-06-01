/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchCountry
// ====================================================

export interface searchCountry_searchCountry {
  __typename: "Country";
  name: string;
  code: string;
}

export interface searchCountry {
  searchCountry: searchCountry_searchCountry[];
}

export interface searchCountryVariables {
  search: string;
}
