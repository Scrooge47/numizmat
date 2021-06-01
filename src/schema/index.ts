import { buildSchemaSync, Resolver, Query } from "type-graphql";
import { CoinResolver } from "./coin";
import { CollectionResolver } from "./collection";
import { CountryResolver } from "./country";
import { CurrencyResolver } from "./currency";
import { ImageResolver } from "./image";
import { MintResolver } from "./mind";
import { NameCollectionResolver } from "./nameCollection";
import { UserResolver } from "./user";

export const schema = buildSchemaSync({
  resolvers: [UserResolver, CollectionResolver, ImageResolver, CountryResolver, CoinResolver, CurrencyResolver, MintResolver, NameCollectionResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",

});
