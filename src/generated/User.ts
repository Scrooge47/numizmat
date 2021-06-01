/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: User
// ====================================================

export interface User_createUser {
  __typename: "User";
  id: string;
  email: string;
}

export interface User {
  createUser: User_createUser;
}

export interface UserVariables {
  input: NewUserInput;
}
