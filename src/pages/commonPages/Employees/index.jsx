import axios from "axios";
import React, { useEffect, useState } from "react";
import { Create } from "./components";
import {
  Box,
  Chip,
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
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const index = () => {
  const status = sessionStorage.getItem("status");
  const sector = sessionStorage.getItem("sector_id");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { sectors } = useSelector((state) => state.sector);
  const open = Boolean(anchorEl);

  async function getData() {
    if (status === "manager") {
      const response = await axios.get(`/bolim/${sector}/`);
      setData(response?.data?.xodim);
    } else if (status === "director") {
      const response = await axios.get(`/xodim/`);
      setData(response?.data);
    }
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
      .delete(`/user/edit/${deleteId}/`)
      .then((res) => {
        if (res.status === 204) {
          getData();
          toast.info("Xodim o'chirildi!");
        }
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
      <div className="border border-black/30 bg-white shadow-lg rounded-md pt-2">
        <h3 className="text-2xl font-medium p-2">Xodimlar ro'yxati:</h3>
        <TableContainer component={Paper} style={{ maxHeight: "70vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ backgroundColor: "#1976D2", color: "white" }}
                >
                  #
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#1976D2", color: "white" }}
                >
                  Ism Familiya
                </TableCell>
                {/* <TableCell
                  style={{ backgroundColor: "#1976D2", color: "white" }}
                >
                  Username
                </TableCell> */}
                <TableCell
                  style={{ backgroundColor: "#1976D2", color: "white" }}
                >
                  Bo'lim
                </TableCell>
                <TableCell
                  style={{ backgroundColor: "#1976D2", color: "white" }}
                >
                  Amallar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 ? (
                data
                  ?.slice?.(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  ?.map((item, ind) => (
                    <TableRow key={ind}>
                      <TableCell>{ind + 1}</TableCell>
                      <TableCell>
                        {item?.user?.first_name} {item?.user?.last_name}
                      </TableCell>
                      {/* <TableCell>{item?.user?.username}</TableCell> */}
                      <TableCell>
                        <Chip
                          label={
                            item?.user?.sector
                              ? sectors?.map?.(
                                  (i) => i.id === item?.user?.sector && i.name
                                )
                              : "Tayinlanmagan"
                          }
                          color={item?.user?.sector ? "success" : "error"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <IconButton
                            title="Xodimni o'chirish"
                            color="error"
                            onClick={(event) => {
                              setAnchorEl(event.currentTarget);
                              setDeleteId(item?.user?.id);
                            }}
                          >
                            <span className="fa-solid fa-trash" />
                          </IconButton>
                          <Link
                            title="Xodim profili"
                            to={
                              status === "director"
                                ? `/director/employees/${item?.user?.id}`
                                : `/manager/employees/${item?.user?.id}`
                            }
                          >
                            <span className="fa-solid fa-bars text-green-500 text-2xl" />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
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
                    {
                      label: "Hammasi",
                      value: data?.length,
                    },
                  ]}
                  colSpan={5}
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
      </div>

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
            <p className="text-lg font-medium">Xodimni o'chirmoqchimisiz?</p>
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
    </>
  );
};

export default index;
