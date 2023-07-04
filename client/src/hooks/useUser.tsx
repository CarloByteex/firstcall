import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRedux } from "../store";
import { GET_USER_LIST, GET_USER_DATA } from "../store/queries/UserQuery";
import { ADD_USER, UPDATE_USER, DELETE_USER } from "../store/mutations/UserMutation";
import { setUserList, setSelectedUser, IUser } from "../store/slices/User";
import { User } from "../models/users";

const UserData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [getUserList] = useLazyQuery(GET_USER_LIST);
  const [getUser] = useLazyQuery(GET_USER_DATA);
  const [add] = useMutation(ADD_USER);
  const [update] = useMutation(UPDATE_USER);
  const [remove] = useMutation(DELETE_USER);

  const fetchUserList = () => {
    return new Promise((resolve) => {
      getUserList({
        onCompleted: (res) => {
          dispatch(setUserList({ users: res.users }));
          resolve(true);
        },
        onError: (err) => {
          console.log(err);
          resolve(false);
        }
      })
    })
  }

  const fetchUser = (id: number) => {
    return new Promise((resolve) => {
      getUser({
        variables: { id: id },
        onCompleted: (res) => {
          dispatch(setSelectedUser({ user: res.user }));
          resolve(true);
        },
        onError: (err) => {
          console.log(err);
          resolve(false);
        }
      })
    })
  }

  const addUser = (user: IUser) => {
    return new Promise((resolve) => {
      add({
        variables: { data: user },
        onCompleted: (res) => {
          dispatch(setUserList({ users: res.addUser }));
          resolve(true);
        },
        onError: (err) => {
          console.log(err);
          resolve(false);
        }
      })
    })
  }

  const updateUser = (user: User) => {
    return new Promise((resolve) => {
      update({
        variables: { data: user },
        onCompleted: (res) => {
          dispatch(setUserList({ users: res.updateUser }));
          resolve(true);
        },
        onError: (err) => {
          console.log(err);
          resolve(false);
        }
      })
    })
  }

  const deleteUser = (id: number) => {
    return new Promise((resolve) => {
      remove({
        variables: { id: id },
        onCompleted: (res) => {
          dispatch(setUserList({ users: res.deleteUser }));
          resolve(true);
        },
        onError: (err) => {
          console.log(err);
          resolve(false);
        }
      })
    })
  }

  const userList = useSelector<IRedux, User[]>(state => state.reducers.user.userList);
  const selectedUser = useSelector<IRedux, User>(state => state.reducers.user.selectedUser);

  return {
    userList: userList,
    selectedUser: selectedUser,
    fetchUserList,
    fetchUser,
    addUser,
    updateUser,
    deleteUser
  }
}

export default UserData;