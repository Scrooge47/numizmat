/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CoinWhereUniqueInput {
  id: string;
}

export interface CountryWhereUniqueInput {
  code: string;
}

export interface CurrencyWhereUniqueInput {
  code?: string | null;
  id?: string | null;
}

export interface MintWhereUniqueInput {
  id?: number | null;
}

export interface NestedCoinCreateInput {
  connect: CoinWhereUniqueInput;
}

export interface NestedCountyCreateInput {
  connect: CountryWhereUniqueInput;
}

export interface NestedCurrencyCreateInput {
  connect: CurrencyWhereUniqueInput;
}

export interface NestedMintCreateInput {
  connect: MintWhereUniqueInput;
}

export interface NestedUserCreateInput {
  connect: UserWhereUniqueInput;
}

export interface NewCoinInput {
  country: NestedCountyCreateInput;
  currency: NestedCurrencyCreateInput;
  current: boolean;
  denomination: number;
  description: string;
  mint: NestedMintCreateInput;
  name: string;
  url: string;
  year: number;
}

export interface NewUserInput {
  email: string;
  password: string;
}

export interface UserWhereUniqueInput {
  id: string;
}

export interface newCollectionInput {
  coin: NestedCoinCreateInput;
  count: number;
  user: NestedUserCreateInput;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
