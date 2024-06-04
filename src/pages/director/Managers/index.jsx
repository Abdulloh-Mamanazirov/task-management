import axios from "axios";
import React, { useEffect, useState } from "react";
import { Create, EditStatus } from "./components";
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
import { Dropdown } from "../../../components";

const index = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [promoteAnchorEl, setPromoteAnchorEl] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [promotionId, setPromotionId] = useState(null);
  const [isDemoting, setIsDemoting] = useState(false);
  const { sectors } = useSelector((state) => state.sector);
  const open = Boolean(anchorEl);
  const promote_open = Boolean(promoteAnchorEl);
  const status = sessionStorage.getItem("status");

  async function getData() {
    const response = await axios.get("/manager/");
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
      .delete(`/user/edit/${deleteId}/`)
      .then((res) => {
        if (res.status === 204) {
          getData();
          toast.info("Menejer o'chirildi!");
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"))
      .finally(() => {
        setDeleteId(null);
        setAnchorEl(null);
      });
  }

  async function handlePromote() {
    await axios
      .patch(`/assigned/${promotionId}/`)
      .then((res) => {
        if (res.status === 200) {
          getData();
          if (isDemoting) {
            toast.info("Direktor maqomi olindi!");
          } else {
            toast.success("Menejer saylandi!");
          }
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"))
      .finally(() => {
        setPromotionId(null);
        setPromoteAnchorEl(null);
        setIsDemoting(null);
      });
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between my-5">
          <h3 className="text-2xl font-medium">Menejerlar ro'yxati</h3>
          <Create getData={() => getData()} />
        </div>
        <TableContainer component={Paper} style={{ maxHeight: "70vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: "#EEF0F4" }}>#</TableCell>
                <TableCell style={{ backgroundColor: "#EEF0F4" }}>
                  Ism Familiya
                </TableCell>
                <TableCell style={{ backgroundColor: "#EEF0F4" }}>
                  Bo'lim
                </TableCell>
                <TableCell style={{ backgroundColor: "#EEF0F4" }}>
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
                        <Dropdown
                          items={[
                            <Link
                              to={`/${status}/employees/${item?.user?.id}`}
                              className="flex items-center gap-2 whitespace-nowrap"
                            >
                              <span className="fa-solid fa-bars" />
                              <p>Profil</p>
                            </Link>,
                            item?.user?.is_director ? (
                              <button
                                onClick={(event) => {
                                  setPromoteAnchorEl(event.currentTarget);
                                  setPromotionId(item?.user?.id);
                                  setIsDemoting(true);
                                }}
                                className="flex items-center gap-2 whitespace-nowrap"
                              >
                                <span className="fa-solid fa-arrow-down" />
                                <p>Tushirish</p>
                              </button>
                            ) : (
                              <button
                                onClick={(event) => {
                                  setPromoteAnchorEl(event.currentTarget);
                                  setPromotionId(item?.user?.id);
                                  setIsDemoting(false);
                                }}
                                className="flex items-center gap-2 whitespace-nowrap"
                              >
                                <span className="fa-solid fa-arrow-up" />
                                <p>Saylash</p>
                              </button>
                            ),
                            status === "admin" && (
                              <EditStatus data={item} getData={getData} />
                            ),
                            <button
                              onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                                setDeleteId(item?.user?.id);
                              }}
                              className="flex items-center gap-2 whitespace-nowrap text-red-500"
                            >
                              <span className="fa-solid fa-trash" />
                              <p>O'chirish</p>
                            </button>,
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
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
            <p className="text-lg font-medium">Menejerni o'chirmoqchimisiz?</p>
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

      {/* promotion confirm */}
      <Popover
        open={promote_open}
        anchorEl={promoteAnchorEl}
        onClose={() => setPromoteAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box sx={{ padding: "5px 10px" }}>
          <div className="flex items-start gap-2">
            {isDemoting ? (
              <span className="fa-solid fa-arrow-down text-red-500" />
            ) : (
              <span className="fa-solid fa-arrow-up text-green-500" />
            )}
            {isDemoting ? (
              <p className="text-lg font-medium">
                Menejerdan direktor <br /> maqomini olmoqchimisiz?
              </p>
            ) : (
              <p className="text-lg font-medium">
                Menejerga direktor <br /> maqomini bermoqchimisiz?
              </p>
            )}
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              onClick={() => setPromoteAnchorEl(null)}
              variant="outlined"
              color="primary"
              size="small"
            >
              Yo'q
            </Button>
            <Button
              onClick={() => handlePromote()}
              variant="contained"
              color={isDemoting ? "error" : "success"}
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
