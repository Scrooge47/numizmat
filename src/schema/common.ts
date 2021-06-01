import { Field, InputType } from "type-graphql";

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


