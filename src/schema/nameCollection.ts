
import { Field, InputType, ObjectType, ID, Query, Arg, Resolver, Ctx, FieldResolver, Root, Mutation } from 'type-graphql'
import { Coin } from './coin';
import { ArrayCode, ArrayNumber } from './common';
import { Context } from './context';


@InputType()
class InputNameCollection {
  @Field()
  name: string
}

@InputType()
export class NameCollectionWhereIdInput {
  @Field()
  id: ArrayNumber
}

@ObjectType()
export class NameCollection {
  @Field(type => ID)
  id: number;

  @Field()
  name: string
}

@Resolver(of => NameCollection)
export class NameCollectionResolver {
  @Query(_returns => [NameCollection])
  async nameCollections(@Ctx() ctx: Context) {
    return await ctx.prisma.nameCollection.findMany()
  }

  @FieldResolver(_returns => [Coin])
  async coins(@Root() nameCollection: NameCollection, @Ctx() ctx: Context) {
    const modelResponse = await ctx.prisma.nameCollection.findUnique({
      where: {
        id: nameCollection.id
      },
      include: {
        coins: true
      }
    })
    return modelResponse?.coins
  }

  @Mutation(_return => NameCollection)
  async createNameCollection(@Arg("input") input: InputNameCollection, @Ctx() ctx: Context) {
    return await ctx.prisma.nameCollection.create({
      data: { ...input }
    })
  }
}

