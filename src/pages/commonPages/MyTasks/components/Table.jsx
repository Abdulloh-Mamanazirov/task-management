import {
  Chip,
  Paper,
  Table,
  Avatar,
  Button,
  Dialog,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableFooter,
  AvatarGroup,
  TableContainer,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TableTasks = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({ open: false, data: null });
  const [modalPlay, setModalPlay] = useState({ open: false, data: null });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "70vh" }}
        className="drop-shadow-xl mt-5"
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                #
              </TableCell>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                Xabar
              </TableCell>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                Audio
              </TableCell>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                Rasmlar
              </TableCell>
              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                Status
              </TableCell>

              <TableCell style={{ backgroundColor: "#1976D2", color: "white" }}>
                Qachon Tugashi
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) && data?.length > 0 ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind + 1}</TableCell>
                    <TableCell>
                      {data?.first_name?.length > 0
                        ? data?.first_name
                        : "Xabar"}
                    </TableCell>

                    <TableCell>
                      {/* {data?.audio?.length > 0 ? data?.audio : "audio yoq"} */}

                      <Button
                        size="small"
                        onClick={() => {
                          setModalPlay({ open: true, data: "modal data" });
                        }}
                        variant="contained"
                      >
                        Tinglash <span className="fa-solid fa-play ml-2" />
                      </Button>
                    </TableCell>

                    <TableCell>
                      <AvatarGroup
                        onClick={() =>
                          setModal({ open: true, data: "modal data" })
                        }
                        className="w-fit"
                        max={3}
                        style={{ cursor: "pointer" }}
                      >
                        {new Array(5).fill(null).map((_, ind) => (
                          <Avatar alt={`${ind}`} src="..." />
                        ))}
                      </AvatarGroup>
                    </TableCell>

                    <TableCell>
                      {/* {data?.status?.length > 0 ? data?.status : "Status"} */}
                      <Chip
                        label={
                          data?.sector
                            ? sectors?.map?.(
                                (i) => i.id === data?.sector && i.name
                              )
                            : "Tayinlanmagan"
                        }
                        color={data?.sector ? "success" : "error"}
                        variant="outlined"
                      />
                    </TableCell>

                    <TableCell>
                      {data?.edn_time?.length > 0
                        ? data?.edn_time
                        : "Tugash vaqti"}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
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
                colSpan={7}
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

      <Dialog
        open={modal.open}
        onClose={() => setModal({ open: false, data: null })}
        fullWidth
        keepMounted
        aria-describedby="edit-modal"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-5 mt-5 mb-5 rounded-md">
          <div className="cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
              className="rounded-xl"
              alt=""
            />
          </div>
          <div className="cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
              className="rounded-xl"
              alt=""
            />
          </div>
          <div className="cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
              className="rounded-xl"
              alt=""
            />
          </div>
          <div className="cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
              className="rounded-xl"
              alt=""
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        open={modalPlay.open}
        onClose={() => setModalPlay({ open: false, data: null })}
        fullWidth
        keepMounted
        aria-describedby="edit-modal"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-5 mt-5 mb-5 rounded-md">
          <audio controls>
            <source src=" https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" />
          </audio>
        </div>
      </Dialog>
    </>
  );
};

export default TableTasks;
