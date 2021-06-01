import {
  ObjectType,
  InputType,
  Field,
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import { Context } from "./context";

@InputType()
class NewUserInput {
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

@InputType()
export class UserWhereUniqueInput {
  @Field()
  id: string
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
    return await ctx.prisma.user.create({
      data: { ...input }
    })
  }
}

