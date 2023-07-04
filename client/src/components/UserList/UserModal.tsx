import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";

import UserData from "../../hooks/useUser";

const UserModal = (props: any) => {
  const { open, onClose, id } = props;
  const { selectedUser, addUser, updateUser } = UserData();

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const userLength = useMemo(() => (userName.length > 40 || userName.length < 3), [userName]);
  const firstLength = useMemo(() => (firstName.length > 55 || firstName.length < 3), [firstName]);
  const lastLength = useMemo(() => (lastName.length > 55), [lastName]);

  useEffect(() => {
    if (id < 0) {
      setUserName("");
      setFirstName("");
      setLastName("");
    } else {
      setUserName(selectedUser.userName);
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
    }
  }, [id]);

  const handleSubmit = () => {
    if (userLength || firstLength || lastLength) return;

    const data = { userName: userName, firstName: firstName, lastName: lastName };
    if (id < 0) {
      addUser(data).then(res => {
        if (res) {
          onClose();
        }
      })
    } else {
      updateUser({
        id: id,
        userName: userName,
        firstName: firstName,
        lastName: lastName
      }).then(res => {
        if (res) {
          onClose();
        }
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle display="flex" justifyContent="space-between">
        <Typography variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          User Info
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container display={'flex'} alignItems={'center'} p={2}>
          <Grid item xs={12}>
            {id < 0 && <TextField
              fullWidth
              label="User Name"
              required
              value={userName}
              error={userLength}
              onChange={e => {
                setUserName(e.target.value)
              }} />}
            {id > 0 && <TextField
              fullWidth
              label="User Name"
              disabled = {true}
              required
              value={userName}
              error={userLength} />}
          </Grid>
        </Grid>
        <Grid container display={'flex'} alignItems={'center'} p={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              required
              value={firstName}
              error={firstLength}
              onChange={e => {
                setFirstName(e.target.value)
              }} />
          </Grid>
        </Grid>
        <Grid container display={'flex'} alignItems={'center'} p={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              error={lastLength}
              onChange={e => {
                setLastName(e.target.value)
              }} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>{id < 0 ? "Create" : "Update"}</Button>
        <Button onClick={onClose} >Cancel</Button>
      </DialogActions>
    </Dialog >
  )
}

export default UserModal;