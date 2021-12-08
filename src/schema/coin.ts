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
	Authorized,
} from 'type-graphql';
import { Context } from './context';
import { Country, NestedCountyCreateInput, CountryWhereCodeInput } from './country';
import { Mint, NestedMintCreateInput } from './mind';
import { Currency, NestedCurrencyCreateInput } from './currency';
import { NameCollection, NameCollectionWhereIdInput } from './nameCollection';
import { includeFilter } from './common';
import { PreparedFilter, PreparedOneElemFilter } from './common';
import { Price } from './price';

@InputType()
export class NewCoinInput {
	@Field()
	name: string;

	@Field()
	url: string;

	@Field((types) => Int)
	year: number;

	@Field()
	description: string;

	@Field((returns) => Float)
	denomination: number;

	@Field((type) => NestedCountyCreateInput)
	country: NestedCountyCreateInput;

	@Field((type) => NestedMintCreateInput)
	mint: NestedMintCreateInput;

	@Field((type) => NestedCurrencyCreateInput)
	currency: NestedCurrencyCreateInput;

	@Field()
	current: boolean;

	@Field((types) => Int)
	circulation: number;
}

@ObjectType()
export class Coin {
	@Field((type) => String)
	id: string;

	@Field()
	name: string;

	@Field()
	url: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;

	@Field((returns) => Float)
	denomination: number;

	@Field()
	description: string;

	@Field()
	current: boolean;

	@Field((types) => Int)
	year: number;

	@Field()
	NameCollectionId: number;

	@Field((types) => Int)
	circulation: number;

	@Field((_type) => String)
	publicId(): string {
		const parts = this.url.split('/');
		return parts[parts.length - 1];
	}
}

@InputType()
export class CoinWhereUniqueInput {
	@Field()
	id: string;
}

@InputType()
export class NestedCoinCreateInput {
	@Field()
	connect: CoinWhereUniqueInput;
}

@InputType()
export class Filters {
	@Field({ nullable: true })
	country?: CountryWhereCodeInput;

	@Field({ nullable: true })
	NameCollection?: NameCollectionWhereIdInput;

	@Field({ nullable: true })
	name?: includeFilter;

	@Field((type) => [Filters], { nullable: true })
	AND?: Filters | Filters[];

	@Field((type) => [Filters], { nullable: true })
	OR?: Filters[];

}

@InputType()
export class RequestCoin {
	@Field()
	filter: Filters;

	@Field()
	first: number;

	@Field({ nullable: true })
	after?: string;
}

// @InputType()
// export class ORFilter {
//   @Field(type => [Filters])
//   OR: Filters[]
// }

@InputType()
export class WhereFilters {
	@Field({ nullable: true })
	where?: Filters;
}

@InputType()
export class favoriteCoinInput {
	@Field()
	id: string;

	@Field()
	favoriteState: boolean;
}

interface Filter {
	name: string;
	type: string;
	id: number;
}

export interface ItemFilter {
	name: string;
	id: number;
}

// Pagination
@ObjectType()
export class Edge {
	@Field()
	node: Coin;

	@Field()
	cursor: string;
}

@ObjectType()
export class PageInfo {
	@Field()
	endCursor: string;

	@Field()
	hasNextPage: boolean;
}

@ObjectType()
export class Response {
	@Field()
	pageInfo: PageInfo;

	@Field((type) => [Edge])
	edges: Edge[];
}

@Resolver((of) => Coin)
export class CoinResolver {
	@Query((_returns) => Coin)
	async coin(@Arg('id') id: string, @Ctx() ctx: Context) {
		return await ctx.prisma.coin.findUnique({
			where: {
				id,
			},
		});
	}

	@FieldResolver((returns) => Country)
	async country(@Root() coin: Coin, @Ctx() ctx: Context) {
		const modelResponse = await ctx.prisma.coin.findUnique({
			where: {
				id: coin.id,
			},
			include: {
				country: true,
			},
		});

		return modelResponse?.country;
	}

	@Query((_returns) => Response)
	async getCoins(@Ctx() ctx: Context, @Arg('filters') request: RequestCoin) {
		console.log('getCoins request');
		let queryResult = null;
		if (request.after) {
			queryResult = await ctx.prisma.coin.findMany({
				take: request.first,
				skip: 1,
				cursor: {
					id: request.after,
				},
				where: { ...request.filter },
			});
		} else {
			queryResult = await ctx.prisma.coin.findMany({
				take: request.first,
				where: { ...request.filter },
			});
		}
		// const result = await ctx.prisma.coin.findMany({
		// 	where: { ...filters },
		// });
		if (queryResult) {
			const lastCoinResults = queryResult[queryResult.length - 1];
			const myCursor = lastCoinResults.id;

			const secondaryQueryResult = await ctx.prisma.coin.findMany({
				take: request.first,
				cursor: {
					id: myCursor,
				},
				where: { ...request.filter },
			});

			const result = {
				pageInfo: {
					endCursor: myCursor,
					hasNextPage: secondaryQueryResult.length >= request.first,
				},
				edges: queryResult.map((coin) => ({ cursor: coin.id, node: coin })),
			};
			return result;
		}
		return {
			pageInfo: {
				endCursor: null,
				hasNextPage: false,
			},
			edges: [],
		};
		//return result;
	}

	@Query((_returns) => PreparedFilter)
	async getFiltersFromCoins(@Ctx() ctx: Context) {
		const data = await ctx.prisma.$queryRaw<Filter[]>(`
    SELECT type , id, name FROM
    ( SELECT DISTINCT 'country' as type, CAST("countryId" as int) as id, countries."name" as name FROM public.collections
    LEFT JOIN coins 
    ON coins.id = "coinId"
    LEFT JOIN countries
    ON coins."countryId" = countries.code

    UNION	

    SELECT DISTINCT 'nameCollection', "nameCollectionId", "NameCollection".name  FROM public.collections
    LEFT JOIN coins 
    ON coins.id = "coinId"
    LEFT JOIN "NameCollection"
    ON coins."nameCollectionId" = "NameCollection".id
   ) as filters `);

		const sortData = data.reduce(
			(
				prev: PreparedFilter | { [key: string]: PreparedOneElemFilter[] },
				i: Filter,
			): PreparedFilter | {} => {
				if (prev[i.type] === undefined) prev[i.type] = [];
				const { id, name } = i;
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
	@FieldResolver((returns) => Int)
	async count(@Root() coin: Coin, @Ctx() ctx: Context) {
		const id = ctx.session?.user.id;
		const modelResponse = await ctx.prisma.coin.findUnique({
			where: {
				id: coin.id,
			},
			include: {
				collections: {
					where: {
						userId: id,
					},
				},
			},
		});
		return modelResponse?.collections[0]?.count === undefined
			? 0
			: modelResponse?.collections[0]?.count;
	}
	@Mutation((_returns) => Coin)
	async createCoin(@Arg('input') input: NewCoinInput, @Ctx() ctx: Context) {
		console.log(input);
		return await ctx.prisma.coin.create({
			data: { ...input },
		});
	}

	@Authorized()
	@Mutation((_return) => Coin)
	async favoriteCoin(@Arg('input') input: favoriteCoinInput, @Ctx() ctx: Context) {
		const UserId = ctx.session?.user.id;
		const { id, favoriteState } = input;
		const connectState = favoriteState ? 'connect' : 'disconnect';
		return await ctx.prisma.coin.update({
			where: { id: input.id },
			data: {
				favorites: {
					[connectState]: { id: UserId },
				},
			},
		});
	}

	@Authorized()
	@Query((_return) => [Coin])
	async getFavoriteCoin(@Ctx() ctx: Context) {
		const UserId = ctx.session?.user.id;
		const result = await ctx.prisma.user
			.findUnique({
				where: {
					id: UserId,
				},
			})
			.favoriteCoins();

		return result;
	}

	@FieldResolver((returns) => Mint)
	async mint(@Root() coin: Coin, @Ctx() ctx: Context) {
		const modelResponse = await ctx.prisma.coin.findUnique({
			where: {
				id: coin.id,
			},
			include: {
				mint: true,
			},
		});

		return modelResponse?.mint;
	}

	@FieldResolver((returns) => Currency)
	async currency(@Root() coin: Coin, @Ctx() ctx: Context) {
		const modelResponse = await ctx.prisma.coin.findUnique({
			where: {
				id: coin.id,
			},
			include: {
				currency: true,
			},
		});

		return modelResponse?.currency;
	}

	@FieldResolver((returns) => NameCollection)
	async nameCollection(@Root() coin: Coin, @Ctx() ctx: Context) {
		const modelResponse = await ctx.prisma.coin.findUnique({
			where: {
				id: coin.id,
			},
			include: {
				NameCollection: true,
			},
		});

		return modelResponse?.NameCollection;
	}

	@FieldResolver((returns) => [Price])
	async prices(@Root() coin: Coin, @Ctx() ctx: Context) {
		return await ctx.prisma.coin
			.findUnique({
				where: {
					id: coin.id,
				},
			})
			.prices();
	}

	@FieldResolver((returns) => Boolean)
	async favorite(@Root() coin: Coin, @Ctx() ctx: Context) {
		const UserId = ctx.session?.user.id;
		if (!UserId) return false;
		const modelResponse = await ctx.prisma.coin.findUnique({
			where: {
				id: coin.id,
			},
			include: {
				favorites: {
					where: {
						id: UserId,
					},
				},
			},
		});

		return !!modelResponse?.favorites[0];
	}
}
