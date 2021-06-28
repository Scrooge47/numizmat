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
import { Coin, NestedCoinCreateInput, Filters, ORFilter } from "./coin";
import { includeFilter } from "./common";
import { Context } from "./context";
import { User } from "./user";

@ObjectType()
class Collection {
  @Field()
  count: number

  @Field()
  coinId: string

  @Field()
  userId: string
}

@ObjectType()
class Test {
  @Field()
  count: number
}

@ObjectType()
class Filter {
  @Field()
  name: string

  @Field()
  type: string

  @Field()
  id: number

}

@ObjectType()
class PreparedOneElemFilter {
  @Field()
  name: string

  @Field()
  id: number

}
@ObjectType()
class PreparedFilter {
  [key: string]: PreparedOneElemFilter[]

  @Field(type => [PreparedOneElemFilter], { nullable: true })
  "country": PreparedOneElemFilter[]

  @Field(type => [PreparedOneElemFilter], { nullable: true })
  "nameCollection": PreparedOneElemFilter[]
}

@InputType()
export class newCollectionInput {
  @Field(type => Int)
  count: number

  @Field()
  coin: NestedCoinCreateInput
}

@InputType()
export class CoinFilter {
  @Field({ nullable: true })
  coin?: Filters
}
@Resolver(of => Collection)
export class CollectionResolver {

  @Authorized()
  @Query(_return => [Collection])
  async collectionOfUser(@Ctx() ctx: Context, @Arg("filters", { nullable: true }) filters?: CoinFilter) {
    const id = ctx.session?.user.id as string;
    return await ctx.prisma.collection.findMany({
      where: {
        user: {
          id
        },
        ...filters
      }
    })

  }

  @Authorized()
  @Query(_return => PreparedFilter)
  async getFiltersFromCoinsOfUser(@Ctx() ctx: Context) {
    const id = ctx.session?.user?.id as string;
    const data = await ctx.prisma.$queryRaw<Filter[]>(`
      SELECT type , id, name FROM
      ( SELECT DISTINCT 'country' as type, CAST("countryId" as int) as id, countries."name" as name FROM public.collections
			LEFT JOIN coins 
			ON coins.id = "coinId"
			LEFT JOIN countries
			ON coins."countryId" = countries.code
			WHERE  "userId" = '98237245-42cd-4953-8728-6411e9482ba4'

			UNION	

			SELECT DISTINCT 'nameCollection', "nameCollectionId", "NameCollection".name  FROM public.collections
			LEFT JOIN coins 
			ON coins.id = "coinId"
			LEFT JOIN "NameCollection"
			ON coins."nameCollectionId" = "NameCollection".id
			WHERE  "userId" = '98237245-42cd-4953-8728-6411e9482ba4') as filters 
  `);

    const sortData = data.reduce((prev: PreparedFilter, i): PreparedFilter => {
      if (prev[i.type] === undefined) prev[i.type] = [];
      const { id, name } = i;
      console.log(prev[i.type], name);
      prev[i.type].push({
        id,
        name
      })
      return prev
    }, {})

    return sortData
  }

  @Authorized()
  @Mutation((_returns => Collection))
  async addCoinToCollection(@Arg('input') input: newCollectionInput, @Ctx() ctx: Context) {
    const id = ctx.session?.user?.id as string;
    return await ctx.prisma.collection.upsert({
      where: {
        coinId_userId: {
          userId: id,
          coinId: input.coin.connect.id
        }
      },
      update: { count: input.count },
      create: { ...input, user: { connect: { id } } }
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

