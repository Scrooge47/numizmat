import { buildSchemaSync, Resolver, Query } from "type-graphql";

@Resolver()
class DummyResolver {
  @Query((_returns) => String)
  hello(){
    return "hello"
  }
}

export const schema = buildSchemaSync({
  resolvers: [DummyResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
  
});
