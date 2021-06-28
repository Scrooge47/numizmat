/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: filtersOfUser
// ====================================================

export interface filtersOfUser_getFiltersFromCoinsOfUser_country {
  __typename: "PreparedOneElemFilter";
  id: number;
  name: string;
}

export interface filtersOfUser_getFiltersFromCoinsOfUser_nameCollection {
  __typename: "PreparedOneElemFilter";
  id: number;
  name: string;
}

export interface filtersOfUser_getFiltersFromCoinsOfUser {
  __typename: "PreparedFilter";
  country: filtersOfUser_getFiltersFromCoinsOfUser_country[] | null;
  nameCollection: filtersOfUser_getFiltersFromCoinsOfUser_nameCollection[] | null;
}

export interface filtersOfUser {
  getFiltersFromCoinsOfUser: filtersOfUser_getFiltersFromCoinsOfUser;
}
