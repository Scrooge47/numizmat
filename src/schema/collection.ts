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
} from 'type-graphql';
import { Coin, NestedCoinCreateInput, Filters } from './coin';

import { Context } from './context';
import { User } from './user';
import { PreparedFilter, PreparedOneElemFilter } from './common';
import { Condition } from 'src/utils/types';

@ObjectType()
class Collection {
	@Field()
	count: number;

	@Field()
	coinId: string;

	@Field()
	userId: string;

	@Field()
	condition: Condition;
}

interface Filter {
	name: string;
	type: string;
	id: number;
}

@InputType()
export class newCollectionInput {
	@Field((type) => Int)
	count: number;

	@Field()
	coin: NestedCoinCreateInput;

	@Field()
	condition: Condition;
}

@InputType()
export class CoinFilter {
	@Field({ nullable: true })
	coin?: Filters;
}

@Resolver((of) => Collection)
export class CollectionResolver {
	@Authorized()
	@Query((_return) => [Collection])
	async collectionOfUser(
		@Ctx() ctx: Context,
		@Arg('filters', { nullable: true }) filters?: CoinFilter,
	) {
		const id = ctx.session?.user.id as string;
		const result = await ctx.prisma.collection.findMany({
			where: {
				user: {
					id,
				},
				...filters,
			},
		});

		console.log('result', result);
		return result;
	}

	@Authorized()
	@Query((_return) => PreparedFilter)
	async getFiltersFromCoinsOfUser(@Ctx() ctx: Context) {
		const id = ctx.session?.user?.id as string;
		const data = await ctx.prisma.$queryRaw<Filter[]>(`
      SELECT type , id, name FROM
      ( SELECT DISTINCT 'country' as type, CAST("countryId" as int) as id, countries."name" as name FROM public.collections
  		LEFT JOIN coins 
  		ON coins.id = "coinId"
  		LEFT JOIN countries
  		ON coins."countryId" = countries.code
  		WHERE  "userId" = '${id}'
  		UNION	

  		SELECT DISTINCT 'nameCollection', "nameCollectionId", "NameCollection".name  FROM public.collections
  		LEFT JOIN coins 
  		ON coins.id = "coinId"
  		LEFT JOIN "NameCollection"
  		ON coins."nameCollectionId" = "NameCollection".id
  		WHERE  "userId" = '${id}') as filters 
  `);

		const sortData = data.reduce(
			(
				prev: PreparedFilter | { [key: string]: PreparedOneElemFilter[] },
				i: Filter,
			): PreparedFilter | {} => {
				if (prev[i.type] === undefined) prev[i.type] = [];
				const { id, name } = i;
				console.log(prev[i.type], name);
				prev[i.type].push({
					id,
					name,
				});
				return prev;
			},
			{},
		);

		return sortData;
	}

	@Authorized()
	@Mutation((_returns) => Collection)
	async addCoinToCollection(@Arg('input') input: newCollectionInput, @Ctx() ctx: Context) {
		const id = ctx.session?.user?.id as string;
		console.log('condition', input.condition);

		const coinId = input.coin.connect.id;
		const newCollection = ctx.prisma.collection.upsert({
			where: {
				coinId_userId_condition: {
					userId: id,
					coinId,
					condition: input.condition,
				},
			},
			update: { count: input.count },
			create: { ...input, user: { connect: { id } } },
		});

		const isPrice = await ctx.prisma.price.findMany({
			where: {
				coinId,
				condition: input.condition,
			},
		});

		let res;
		if (!isPrice.length) {
			const newPrice = ctx.prisma.price.create({
				data: {
					coin: {
						connect: {
							id: coinId,
						},
					},
					condition: input.condition,
					currency: {
						connect: {
							code: '643',
						},
					},
					price: 0,
				},
			});

			res = await ctx.prisma.$transaction([newCollection, newPrice]);
		} else {
			res = await ctx.prisma.$transaction([newCollection]);
		}

		return res[0];
	}

	@FieldResolver((returns) => User)
	async user(@Root() collection: Collection, @Ctx() ctx: Context) {
		const modelResponse = await ctx.prisma.user.findUnique({
			where: {
				id: collection.userId,
			},
		});

		return modelResponse;
	}

	@FieldResolver((returns) => Coin)
	async coin(@Root() collection: Collection, @Ctx() ctx: Context) {
		const modelResponse = await ctx.prisma.coin.findUnique({
			where: {
				id: collection.coinId,
			},
		});

		return modelResponse;
	}
}
