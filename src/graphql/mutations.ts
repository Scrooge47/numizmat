import { gql } from '@apollo/client';

export const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;

export const CREATE_COIN = gql`
mutation CreateCoin($input: NewCoinInput!){
  createCoin(input: $input){
    id
  }
}`

export const ADD_COIN_TO_COLLECTION = gql`
mutation addCoinToCollection($input: newCollectionInput!){
  addCoinToCollection(input: $input){
    count
  }
}
`
export const CREATE_USER = gql`
  mutation User($input: NewUserInput!){
    createUser(input: $input){
      id
      email
    }
}
`


