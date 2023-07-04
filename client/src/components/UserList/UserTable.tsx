import { FC, useEffect } from 'react';
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import UserData from '../../hooks/useUser';

interface UserTableProps {
  className?: string;
  getUser: (id: number) => void
}

const UserTable: FC<UserTableProps> = ({ getUser }) => {
  const { userList, fetchUserList, deleteUser } = UserData();

  useEffect(() => {
    fetchUserList();
  }, []);

  const theme = useTheme();
  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>No</TableCell>
              <TableCell align='center'>User Name</TableCell>
              <TableCell align='center'>First Name</TableCell>
              <TableCell align='center'>Last Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user, index) => {
              return (
                <TableRow
                  hover
                  key={user.id}
                >
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.userName}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.firstName}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        sx={{
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => getUser(user.id)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        sx={{
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => deleteUser(user.id)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default UserTable;
