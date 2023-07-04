import express from "express"

interface User {
  id: number
  userName: string
  firstName: string
  lastName: string
}

interface IUser {
  userName: string
  firstName: string
  lastName: string
}

interface IAddUser {
  data: IUser
}

interface IUpdateUser {
  data: User
}

var users: User[] = [
  {
    id: 1,
    userName: "dev",
    firstName: "First",
    lastName: "Call"
  },
  {
    id: 2,
    userName: "dev",
    firstName: "First",
    lastName: "Call"
  },
  {
    id: 3,
    userName: "dev",
    firstName: "First",
    lastName: "Call"
  },
  {
    id: 4,
    userName: "dev",
    firstName: "First",
    lastName: "Call"
  }
];

var length: number = users.length;

export const getUserList = async (root: any, args: any, req: express.Request) => {
  return users;
};

export const getUser = (root: any, args: { id: number }) => {
  const { id } = args;
  return users.find((user) => {
    return user.id === id;
  });
};

export const addUser = async (root: any, args: IAddUser, req: express.Request) => {
  const { data } = args;
  let newUser: User = {
    id: length + 1,
    userName: data.userName,
    firstName: data.firstName,
    lastName: data.lastName
  };
  length++;
  users.push(newUser);
  return users;
};

export const updateUser = async (root: any, args: IUpdateUser, req: express.Request) => {
  const { data } = args;
  console.log(data)
  const updatedUsers: User[] = users.map((user) => {
    if (user.id === data.id) {
      user.userName = data.userName;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
    }
    return user;
  })
  return updatedUsers;
};

export const deleteUser = async (root: any, args: { id: number }) => {
  const { id } = args;
  const index = users.findIndex(user => user.id === id);
  if (index > -1) {
    users.splice(index, 1);
  }
  return users;
};