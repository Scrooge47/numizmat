import {
  ObjectType,
  InputType,
  Field,
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Authorized
} from "type-graphql";
import { Context } from "./context";
import { registerSchema } from 'src/validation'
import { ValidationError } from "yup";
import { UserInputError } from 'apollo-server-micro'
import { formatYupError } from 'src/utils/formatYupErrors'
import bcrypt from 'bcrypt';
import { NameCollection } from "./nameCollection";
import * as _ from 'lodash'
@InputType()
export class NewUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;

}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class DataUserCollection {
  @Field()
  nameCollection: NameCollection;

  @Field()
  totalCoin: number;

  @Field()
  numberCoinOfUser: number;
}


@InputType()
export class UserWhereUniqueInput {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  email: string
}

@InputType()
export class NestedUserCreateInput {
  @Field()
  connect: UserWhereUniqueInput
}

@Resolver()
export class UserResolver {
  @Query((_returns) => User)
  async user(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await ctx.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  @Mutation((_returns) => User)
  async createUser(@Arg("input") input: NewUserInput, @Ctx() ctx: Context) {

    const { email, password, confirmPassword } = input;

    try {
      await registerSchema.validate({ email, password, confirmPassword }, { abortEarly: false });
    } catch (err: unknown | Error | ValidationError) {
      throw new UserInputError('Invalid validation', formatYupError(err as ValidationError))
    }

    const user = await ctx.prisma.user.findUnique({
      where: {
        email: input.email
      }
    })

    if (user) {
      throw new UserInputError('Email is already taken', {
        1: { path: 'email', message: 'Email is already taken' },
      })
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    try {
      const newUser = await ctx.prisma.user.create({
        data: { email, password: hashPassword }
      })
      return newUser
    } catch (e) {
      throw new Error(e.message)
    }

  }

  @Authorized()
  @Query(returns => [DataUserCollection])
  async userInfoCoin(@Ctx() ctx: Context) {

    const UserId = ctx.session?.user.id;

    const numberCoinOfUser = await ctx.prisma.coin.groupBy({
      by: ['nameCollectionId'],

      where: {
        collections: {
          some: {
            userId: UserId
          }
        }
      },
      _count: {
        nameCollectionId: true
      },

    });

    const totalCoin = await ctx.prisma.coin.groupBy({
      by: ['nameCollectionId'],
      _count: {
        nameCollectionId: true
      }
    })

    const dataUser = await Promise.all(totalCoin.map(async (i) => {
      const nameCollection = await ctx.prisma.nameCollection.findUnique({
        where: {
          id: i.nameCollectionId
        }
      });
      const item = { nameCollection, numberCoinOfUser: 0, totalCoin: i._count.nameCollectionId };
      const Index = _.findIndex(numberCoinOfUser, { nameCollectionId: i.nameCollectionId });
      if (Index != -1) {
        item.numberCoinOfUser = numberCoinOfUser[Index]._count.nameCollectionId
      }
      return item
    }))

    return dataUser
  }
}

