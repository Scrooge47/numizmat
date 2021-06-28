
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
} from "type-graphql";
import { Context } from "./context";
import { Country, NestedCountyCreateInput, CountryWhereCodeInput } from './country'
import { Mint, NestedMintCreateInput } from "./mind";
import { Currency, NestedCurrencyCreateInput } from "./currency";
import { NameCollection, NameCollectionWhereIdInput } from "./nameCollection";
import { includeFilter } from "./common";

@InputType()
export class NewCoinInput {

  @Field()
  name: string;

  @Field()
  url: string;

  @Field(types => Int)
  year: number;

  @Field()
  description: string;

  @Field(returns => Float)
  denomination: number

  @Field(type => NestedCountyCreateInput)
  country: NestedCountyCreateInput;

  @Field(type => NestedMintCreateInput)
  mint: NestedMintCreateInput;

  @Field(type => NestedCurrencyCreateInput)
  currency: NestedCurrencyCreateInput;

  @Field()
  current: boolean
}

@ObjectType()
export class Coin {
  @Field(type => String)
  id: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(returns => Float)
  denomination: number

  @Field()
  description: string

  @Field()
  current: boolean

  @Field(types => Int)
  year: number;

  @Field((_type) => String)
  publicId(): string {
    const parts = this.url.split("/");
    return parts[parts.length - 1];
  }
}

@InputType()
export class CoinWhereUniqueInput {
  @Field()
  id: string
}

@InputType()
export class NestedCoinCreateInput {
  @Field()
  connect: CoinWhereUniqueInput
}

@InputType()
export class Filters {
  @Field({ nullable: true })
  country?: CountryWhereCodeInput

  @Field({ nullable: true })
  NameCollection?: NameCollectionWhereIdInput

  @Field({ nullable: true })
  name?: includeFilter

  @Field(type => [Filters], { nullable: true })
  AND?: Filters[]

  @Field(type => [Filters], { nullable: true })
  OR?: Filters[]
}

@InputType()
export class ORFilter {
  @Field(type => [Filters])
  OR: Filters[]
}


@InputType()
export class WhereFilters {
  @Field({ nullable: true })
  where?: Filters
}


@Resolver(of => Coin)
export class CoinResolver {

  @Query(_returns => Coin)
  async coin(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await ctx.prisma.coin.findUnique({
      where: {
        id
      }
    })
  }

  @Query(_returns => [Coin])
  async getCoins(@Ctx() ctx: Context, @Arg("filters") filters: WhereFilters) {

    return await ctx.prisma.coin.findMany({
      ...filters
    });
  }


  @Query(_returns => [Coin])
  async getFiltersFromCoins(@Ctx() ctx: Context) {
    const coins = await ctx.prisma.coin.findMany({
      select: {
        id: true,
        country: {
          select: {
            code: true,
            name: true
          },

        },
        NameCollection: {
          select: {
            name: true
          }
        }
      },
      distinct: ['countryId', 'nameCollectionId']
    })
    return coins
  }

  @Authorized()
  @FieldResolver(returns => Int)
  async count(@Root() coin: Coin, @Ctx() ctx: Context) {

    const id = ctx.session?.user.id;
    const modelResponse = await ctx.prisma.coin.findUnique({
      where: {
        id: coin.id
      },
      include: {
        collections: {
          where: {
            userId: id
          }
        }
      }
    })
    console.log(modelResponse?.collections[0]?.count);
    return modelResponse?.collections[0]?.count === undefined ? 0 : modelResponse?.collections[0]?.count
  }
  @Mutation(_returns => Coin)
  async createCoin(@Arg("input") input: NewCoinInput, @Ctx() ctx: Context) {
    console.log(input);
    return await ctx.prisma.coin.create({

      data: { ...input }
    })
  }

  @FieldResolver(returns => Country)
  async country(@Root() coin: Coin, @Ctx() ctx: Context) {

    const modelResponse = await ctx.prisma.coin.findUnique({
      where: {
        id: coin.id
      },
      include: {
        country: true
      }
    })

    return modelResponse?.country
  }

  @FieldResolver(returns => Mint)
  async mint(@Root() coin: Coin, @Ctx() ctx: Context) {

    const modelResponse = await ctx.prisma.coin.findUnique({
      where: {
        id: coin.id
      },
      include: {
        mint: true
      }
    })

    return modelResponse?.mint
  }

  @FieldResolver(returns => Currency)
  async currency(@Root() coin: Coin, @Ctx() ctx: Context) {

    const modelResponse = await ctx.prisma.coin.findUnique({
      where: {
        id: coin.id
      },
      include: {
        currency: true
      }
    })

    return modelResponse?.currency
  }

  @FieldResolver(returns => NameCollection)
  async nameCollection(@Root() coin: Coin, @Ctx() ctx: Context) {

    const modelResponse = await ctx.prisma.coin.findUnique({
      where: {
        id: coin.id
      },
      include: {
        NameCollection: true
      }
    })

    return modelResponse?.NameCollection
  }

}

