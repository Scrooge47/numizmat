import { CoinFilter } from "src/schema/collection";

export const filterDefault = (inputValue: string): CoinFilter => ({
  coin: {
    AND: [
      {
        OR: [
          {
            country: {
              name: {
                contains: inputValue,
                mode: 'insensitive',
              },
            },
          },
          {
            name: {
              contains: inputValue,
              mode: 'insensitive',
            },
          },
        ],
      },
    ],
  },
});