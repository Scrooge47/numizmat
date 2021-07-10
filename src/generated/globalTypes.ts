/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Condition {
  F = "F",
  G = "G",
  PROOF = "PROOF",
  UNC = "UNC",
  VF = "VF",
  VG = "VG",
  XF = "XF",
}

export interface ArrayCode {
  in: string[];
}

export interface ArrayNumber {
  in: number[];
}

export interface CoinFilter {
  coin?: Filters | null;
}

export interface CoinWhereUniqueInput {
  id: string;
}

export interface CountryWhereCodeInput {
  code?: ArrayCode | null;
  name?: includeFilter | null;
}

export interface CountryWhereUniqueInput {
  code: string;
}

export interface CurrencyWhereUniqueInput {
  code?: string | null;
  id?: string | null;
}

export interface Filters {
  AND?: Filters[] | null;
  NameCollection?: NameCollectionWhereIdInput | null;
  OR?: Filters[] | null;
  country?: CountryWhereCodeInput | null;
  name?: includeFilter | null;
}

export interface MintWhereUniqueInput {
  id?: number | null;
}

export interface NameCollectionWhereIdInput {
  id: ArrayNumber;
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
  confirmPassword: string;
  email: string;
  password: string;
}

export interface favoriteCoinInput {
  favoriteState: boolean;
  id: string;
}

export interface includeFilter {
  contains?: string | null;
  mode?: string | null;
}

export interface newCollectionInput {
  coin: NestedCoinCreateInput;
  count: number;
}

export interface newPriceInput {
  coinId: string;
  condition: Condition;
  currencyId: string;
  price: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
