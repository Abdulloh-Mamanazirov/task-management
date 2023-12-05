import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Popover,
  Box,
} from "@mui/material";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers([...data, ...data]));
  }, []);

  return (
    <div>
      <TableContainer component={Paper} style={{ maxHeight: "70vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                Name
              </TableCell>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                Phone
              </TableCell>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                Email
              </TableCell>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, ind) => (
              <TableRow key={ind}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button color="primary">Edit</Button>
                  <Button
                    color="error"
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                  >
                    Delete
                  </Button>
                  <Button color="success">See More</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={200}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* pop confirm */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: "5px 10px" }}>
          <div className="flex items-center gap-2">
            <span className="fa-solid fa-trash text-red-500" />
            <p className="text-lg font-medium">Delete this item?</p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              onClick={() => setAnchorEl(null)}
              variant="contained"
              color="primary"
              size="small"
            >
              No
            </Button>
            <Button variant="contained" color="error" size="small">
              Yes
            </Button>
          </div>
        </Box>
      </Popover>
    </div>
  );
};

export default UsersTable;
