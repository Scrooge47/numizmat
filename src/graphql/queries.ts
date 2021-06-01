
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

export const COINS_QUERY = gql`
  query getCoins($filters: WhereFilters!) {
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

export const AVAILABLE_COUNTIES = gql`
 query filters {
  getFiltersFromCoins {
    country {
      code
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
