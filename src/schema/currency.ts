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
} from "type-graphql";
import { Context } from "./context";

@ObjectType()
export class Currency {

  @Field()
  name: string

  @Field()
  code: string

  @Field()
  alphabeticCode: string
}

@InputType()
class InputCurrency {
  @Field()
  name: string

  @Field()
  code: string

  @Field()
  alphabeticCode: string

}

@InputType()
export class CurrencyWhereUniqueInput {
  @Field((type => ID), { nullable: true })
  id?: number

  @Field({ nullable: true })
  code?: string
}

@InputType()
export class NestedCurrencyCreateInput {
  @Field()
  connect: CurrencyWhereUniqueInput
}

@Resolver()
export class CurrencyResolver {

  @Mutation(types => Currency)
  async createCurrency(@Arg('input') input: InputCurrency, @Ctx() ctx: Context) {
    return await ctx.prisma.currency.create({
      data: { ...input }
    })
  }

  @Query(types => [Currency])
  async currencies(@Ctx() ctx: Context) {
    return await ctx.prisma.currency.findMany();
  }
}