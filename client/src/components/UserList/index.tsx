import { useState } from "react";

import { Grid, Container, Card } from '@mui/material';

import UserData from "../../hooks/useUser";
import UserTable from './UserTable';
import PageHeader from "./PageHeader";
import UserModal from './UserModal';

function Users() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);
  const { fetchUser } = UserData();

  const getUser = (id: number) => {
    fetchUser(id).then(res => {
      if (res) {
        setId(id);
        setOpen(true);
      }
    })
  }

  const onClose = () => {
    setOpen(false);
    setId(-1);
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "50px", minWidth: "800px" }}>
        <PageHeader createUser={() => setOpen(true)} />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <UserTable getUser={getUser} />
            </Card>
          </Grid>
        </Grid>
        <UserModal open={open} onClose={onClose} id={id} />
      </Container>
    </>
  );
}

export default Users;
