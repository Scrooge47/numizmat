import { Condition } from "src/utils/types";
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
  Authorized,
  registerEnumType
} from "type-graphql";
import { Coin } from "./coin";

import { Context } from "./context";
import { Currency } from "./currency";


registerEnumType(Condition, {
  name: "Condition", // this one is mandatory
});

@ObjectType()
export class Price {
  @Field()
  id: string

  @Field()
  price: number

  @Field()
  coinId: string

  @Field()
  currencyId: string

  @Field(type => Condition, { nullable: false })
  condition: Condition

}


@InputType()
export class newPriceInput {
  @Field()
  coinId: string

  @Field(type => Condition, { nullable: false })
  condition: Condition

  @Field()
  price: number

  @Field()
  currencyId: string
}


@Resolver(of => Price)
export class PriceResolver {

  //@Authorized()
  @Query(_return => [Price])
  async prices(@Ctx() ctx: Context) {
    const UserId = ctx.session?.user.id;
    const result = await ctx.prisma.price.findMany({

    })

    console.log("result", result);
    return result;

  }

  @Mutation((_returns => Price))
  async addPrice(@Arg('input') input: newPriceInput, @Ctx() ctx: Context) {

    return await ctx.prisma.price.upsert({
      where: {
        Price_coinId_condition_currencyId_key: {
          coinId: input.coinId,
          condition: input.condition,
          currencyId: input.currencyId
        }
      },
      create: {
        coin: {
          connect: {
            id: input.coinId
          }
        },
        price: input.price,
        condition: input.condition,
        currency: {
          connect: {
            code: input.currencyId
          }
        }
      },
      update: {
        coin: {
          connect: {
            id: input.coinId
          }
        },
        price: input.price,
        condition: input.condition,
        currency: {
          connect: {
            code: input.currencyId
          }
        }
      }
    })
  }

  @FieldResolver(returns => Coin)
  async coin(@Root() price: Price, @Ctx() ctx: Context) {

    const modelResponse = await ctx.prisma.coin.findUnique({
      where: {
        id: price.coinId,
      },
    })

    return modelResponse
  }

  @FieldResolver(returns => Currency)
  async currency(@Root() price: Price, @Ctx() ctx: Context) {

    const modelResponse = await ctx.prisma.currency.findUnique({
      where: {
        code: price.currencyId
      },
    })

    return modelResponse
  }

  @FieldResolver(returns => Number)
  async count(@Root() price: Price, @Ctx() ctx: Context) {
    const userId = ctx.session?.user.id;
    if (!userId) return 0;
    const result = await ctx.prisma.collection.findUnique({
      where: {
        coinId_userId_condition: {
          coinId: price.coinId,
          condition: price.condition,
          userId: userId
        }
      }
    })

    return result?.count ? result.count : 0;
  }

}

