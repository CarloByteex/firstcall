import { gql } from "@apollo/client";

export const GET_USER_LIST = gql`
  query getUserList {
    users {
      id
      userName
      firstName
      lastName
    }
  }
`

export const GET_USER_DATA = gql`
  query getUser($id: Int!) {
    user(id: $id) {
      id
      userName
      firstName
      lastName
    }
  }
`