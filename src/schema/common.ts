import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class ArrayCode {
  @Field(type => [String])
  in: string[]
}

@InputType()
export class ArrayNumber {
  @Field(type => [Number])
  in: number[]
}


@InputType()
export class includeFilter {
  @Field({ nullable: true })
  contains?: string

  @Field({ nullable: true })
  mode?: string
}

@ObjectType()
export class PreparedOneElemFilter {
  @Field()
  name: string

  @Field()
  id: number

}
@ObjectType()
export class PreparedFilter {
  [key: string]: PreparedOneElemFilter[]

  @Field(type => [PreparedOneElemFilter], { nullable: true })
  "country": PreparedOneElemFilter[]

  @Field(type => [PreparedOneElemFilter], { nullable: true })
  "nameCollection": PreparedOneElemFilter[]
}
