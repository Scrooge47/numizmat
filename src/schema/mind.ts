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
} from "type-graphql";

import { Context } from './context'
import { Country, NestedCountyCreateInput } from "./country";

@ObjectType()
export class Mint {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  shortName: string;
}

@InputType()
class InputMint {
  @Field()
  name: string;

  @Field()
  shortName: string;

  @Field(type => NestedCountyCreateInput)
  country: NestedCountyCreateInput;
}

@InputType()
export class MintWhereUniqueInput {
  @Field({ nullable: true })
  id: number
}

@InputType()
export class NestedMintCreateInput {
  @Field()
  connect: MintWhereUniqueInput
}

@Resolver(of => Mint)
export class MintResolver {

  @FieldResolver(returns => Country)
  async country(@Root() mint: Mint, @Ctx() ctx: Context) {
    const modelResponse = await ctx.prisma.mint.findUnique({
      where: {
        id: mint.id
      },
      include: {
        country: true
      }
    })
    return modelResponse?.country
  }

  @Query(returns => [Mint])
  async mints(@Ctx() ctx: Context) {
    return await ctx.prisma.mint.findMany();
  }

  @Query(returns => [Mint])
  async getMints(@Arg("country") country: string, @Ctx() ctx: Context) {
    return await ctx.prisma.mint.findMany({
      where: {
        country: {
          code: country
        }
      }
    });
  }


  @Mutation(returns => Mint)
  async createMint(@Arg("input") input: InputMint, @Ctx() ctx: Context) {
    return await ctx.prisma.mint.create({
      data: { ...input }
    })
  }
}