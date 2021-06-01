import {
  ObjectType,
  InputType,
  Field,
  ID,
  Float,
  Int,
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  ResolverInterface,
} from "type-graphql";
import { Coin, NestedCoinCreateInput } from "./coin";
import { Context } from "./context";
import { NestedUserCreateInput, User } from "./user";

@ObjectType()
class Collection {
  @Field()
  count: number

  @Field()
  coinId: string

  @Field()
  userId: string
}

@InputType()
export class newCollectionInput {
  @Field(type => Int)
  count: number

  @Field()
  user: NestedUserCreateInput

  @Field()
  coin: NestedCoinCreateInput
}

@Resolver(of => Collection)
export class CollectionResolver {
  @Mutation((_returns => Collection))
  async addCoinToCollection(@Arg('input') input: newCollectionInput, @Ctx() ctx: Context) {
    return await ctx.prisma.collection.upsert({
      where: {
        coinId_userId: {
          userId: input.user.connect.id,
          coinId: input.coin.connect.id
        }
      },
      update: { count: input.count },
      create: { ...input }
    })
  }

  @FieldResolver(returns => User)
  async user(@Root() collection: Collection, @Ctx() ctx: Context) {

    const modelResponse = await ctx.prisma.user.findUnique({
      where: {
        id: collection.userId,

      },
    })

    return modelResponse
  }

  @FieldResolver(returns => Coin)
  async coin(@Root() collection: Collection, @Ctx() ctx: Context) {

    const modelResponse = await ctx.prisma.coin.findUnique({
      where: {
        id: collection.coinId,

      },
    })

    return modelResponse
  }

}

