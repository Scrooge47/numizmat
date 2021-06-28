import { AuthChecker } from "type-graphql";
import { Context } from "./context";

export const authChecker: AuthChecker<Context> = ({ context }) => {
  const { session } = context;
  return !!session;
};
