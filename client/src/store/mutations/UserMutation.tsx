import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($data: IUser) {
    addUser(data: $data){
        id
        userName
        firstName
        lastName
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($data: UUser) {
    updateUser(data: $data){
        id
        userName
        firstName
        lastName
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id){
        id
        userName
        firstName
        lastName
    }
  }
`