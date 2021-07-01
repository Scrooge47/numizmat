import { Filters } from "src/schema/coin";
import { CoinFilter } from "src/schema/collection";
import { Model } from "src/utils/types";


export const filterDefault = (inputValue: string, model: Model): CoinFilter | Filters => {

  if (model === Model.Coin) return {
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
  }

  return {
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

  }
}