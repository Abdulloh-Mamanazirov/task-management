import axios from "axios";
import React, { useEffect, useState } from "react";
import { Create, EditModal, SeeAll } from "./components";
import {
  Box,
  Table,
  Paper,
  Button,
  Popover,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TableFooter,
  TableContainer,
  TablePagination,
} from "@mui/material";

const index = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, data: {} });
  const open = Boolean(anchorEl);

  async function getData() {
    const response = await axios.get("bolim/");
    setData(response?.data);
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getData();
  }, []);

  async function handleDelete() {
    await axios
      .delete(`/bolim/edit/${deleteId}/`)
      .then((res) => {
        if (res.status === 204) getData();
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"))
      .finally(() => {
        setDeleteId(null);
        setAnchorEl(null);
      });
  }

  return (
    <>
      <Create getData={() => getData()} />
      <TableContainer
        component={Paper}
        style={{ maxHeight: "70vh" }}
        className="drop-shadow-xl"
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                #
              </TableCell>
              <TableCell
                width={"50%"}
                style={{ backgroundColor: "#1976D2", color: "white" }}
              >
                Nomi
              </TableCell>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                Amallar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <SeeAll id={item?.id} title={item.name}/>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setEditModal({ open: true, data: item });
                        }}
                      >
                        <span className="fa-solid fa-edit" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={(event) => {
                          setAnchorEl(event.currentTarget);
                          setDeleteId(item?.id);
                        }}
                      >
                        <span className="fa-solid fa-trash" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <div className="flex flex-col items-center gap-3">
                    <img src="/empty.png" alt="no data" width={100} />
                    <p className="text-gray-500">Ma'lumot mavjud emas.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  10,
                  20,
                  50,
                  { label: "Hammasi", value: data?.length },
                ]}
                colSpan={3}
                count={data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                labelRowsPerPage="Bir sahifadagi qatorlar"
                labelDisplayedRows={({ from, to, count }) =>
                  `${count} ning ${from}-${to} tasi`
                }
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

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
          <div className="flex items-center gap-2 mb-2">
            <span className="fa-solid fa-trash text-red-500" />
            <p className="text-lg font-medium">
              Bu bo'limni o'chirmoqchimisiz?
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              onClick={() => setAnchorEl(null)}
              variant="outlined"
              color="primary"
              size="small"
            >
              Yo'q
            </Button>
            <Button
              onClick={() => handleDelete()}
              variant="contained"
              color="error"
              size="small"
            >
              Ha
            </Button>
          </div>
        </Box>
      </Popover>

      {/* edit Modal */}
      <EditModal
        open={editModal?.open}
        data={editModal?.data}
        handleClose={() => {
          setEditModal({ open: false, data: {} });
          getData();
        }}
      />
    </>
  );
};

export default index;
