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
import { ArrayCode } from "./common";
import { Context } from "./context";

@InputType()
export class CountryWhereUniqueInput {
  @Field()
  code: string
}

@InputType()
export class NestedCountyCreateInput {
  @Field()
  connect?: CountryWhereUniqueInput
}

@InputType()
class NewCountryInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  alfaCode2: string;

  @Field()
  alfaCode3: string;

  @Field()
  iso: string;
}

@ObjectType()
export class Country {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  alfaCode2: string;

  @Field()
  alfaCode3: string;

  @Field()
  iso: string;
}


@InputType()
export class CountryWhereCodeInput {
  @Field()
  code: ArrayCode
}

@Resolver()
export class CountryResolver {
  @Query((_returns) => Country)
  async country(@Arg("code") code: string, @Ctx() ctx: Context) {
    return await ctx.prisma.country.findUnique({
      where: {
        code
      }
    })
  }

  @Query((_returns) => [Country])
  async countries(@Ctx() ctx: Context) {
    return await ctx.prisma.country.findMany()
  }

  @Query((_returns) => [Country])
  async searchCountry(@Arg("search") search: string, @Ctx() ctx: Context) {
    return await ctx.prisma.country.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        }
      }
    })
  }

  @Mutation((_returns) => Country)
  async createCountry(@Arg("input") input: NewCountryInput, @Ctx() ctx: Context) {
    return await ctx.prisma.country.create({
      data: { ...input }
    })
  }
}

