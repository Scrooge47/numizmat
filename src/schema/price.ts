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

export enum Condition {
  G = "G",
  VG = "VG",
  F = "F",
  VF = "VF",
  XF = "XF",
  UNC = "UNC",
  PROOF = "PROOF"
}

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

    return await ctx.prisma.price.findMany({

    })

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

}

