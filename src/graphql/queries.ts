
import { gql } from '@apollo/client'

// export const COINS_QUERY = gql`
//   query getCoins($filters: WhereFilters!) {
//     getCoins(filters: $filters) {
//       id
//       name
//       country{
//         name
//       }
//       publicId
//       year
//       description
//       denomination
//       mint {
//         name
//       }
//       current
//       currency{
//         name
//       }
//       count
//     }
//   }
// `

export const COLLECTION_OF_USER = gql`
  query collection($filters: CoinFilter!) {
    collectionOfUser(filters: $filters)  {
      coin {
        name
        count
        publicId
        id
      }
    }
  }
`

export const COINS_QUERY = gql`
  query getCoins($filters: Filters!) {
    getCoins(filters: $filters) {
      id
      name
      country{
        name
      }
      publicId
      year
      description
      denomination
      mint {
        name
      }
      current
      currency{
        name
      }
      count
    }
  }
`

export const AVAILABLE_FILTERS = gql`
 query filters {
  getFiltersFromCoins {
    country {
      id
      name
    }
    nameCollection {
     id
     name
    }
  }
 }
`
export const AVAILABLE_FILTERS_OF_USER = gql`
 query filtersOfUser {
  getFiltersFromCoinsOfUser {
    country {
      id
      name
    }
    nameCollection {
     id
     name
    }
  }
 }
`

export const SEARCH_COUNTRIES_QUERY = gql`
query searchCountry($search: String!) {
    searchCountry(search: $search) {
      name
      code
    }
}
`
export const GET_CURRENCIES = gql`
query currencies {
  currencies{
    code
    name
  }
}
`

export const GET_MINTS_BY_COUNTRY = gql`
query getMints($country: String!) {
  getMints(country: $country){
    id
    name
  }
}
`
export const GET_COIN = gql`
query coin($id: String!) {
  coin(id: $id){
    id
      name
      country{
        name
      }
      publicId
      year
      description
      denomination
      mint {
        name
      }
      current
      currency{
        name
        code
      }
      count
  }
}
`
