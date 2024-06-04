import {
  Avatar,
  AvatarGroup,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import Aos from "aos";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AudioIcon, ImageIcon } from "../../../assets/task_icons";

const HomeTable = () => {
  Aos.init();
  const [modal, setModal] = useState({ open: false, data: null });
  const [audioModal, setAudioModal] = useState({ open: false, data: null });
  const [compactView, setCompactView] = useState(true);
  const [data, setData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStatusBolim, setSelectedStatusBolim] = useState("all");
  const [selectedStatusFrom, setSelectedStatusFrom] = useState("all");
  const [sortField, setSortField] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deletingDetails, setDeletingDetails] = useState(null);
  const [sortFieldCreate, setSortFieldCreate] = useState(null);
  const open = Boolean(anchorEl);
  const status = sessionStorage.getItem("status");
  const user_id = sessionStorage.getItem("user_id");

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  const handleChangeBolim = (event) => {
    setSelectedStatusBolim(event.target.value);
  };
  const handleChangeFrom = (event) => {
    setSelectedStatusFrom(event.target.value);
  };

  async function getData() {
    if (status === "director" || status === "admin") {
      let response = await axios.get("/arxiv/list/");
      setData([
        ...response?.data?.manager_bergan_arxiv,
        ...response?.data?.managerga_berilgan_arxiv,
        ...response?.data?.xodim_arxiv,
      ]);
    } else {
      let response = await axios.get(`/arxiv/user/${user_id}/`);
      setData([
        ...response?.data?.manager_bergan_arxiv,
        ...response?.data?.managerga_berilgan_arxiv,
        ...response?.data?.xodim_arxiv,
      ]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleDeleteTask() {
    await axios
      .delete(
        `delete/${deletingDetails?.id}/${deletingDetails?.to_id}/${deletingDetails?.from_id}/`
      )
      .then((res) => {
        getData();
        setAnchorEl(null);
        toast.info("Vazifa o'chirildi");
      })
      .catch((err) => toast.error("Vazifani o'chirishda xato!"));
  }

  function findDiff(created_day, deadline) {
    let date1 = new Date(created_day);
    let date2 = new Date(deadline);
    let diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
    return diffDays + 1;
  }
  function findDiffFromNow(deadline) {
    let currentDate = new Date();
    let date2 = new Date(deadline);
    let diffDays = parseInt((date2 - currentDate) / (1000 * 60 * 60 * 24), 10);
    return diffDays < 0 ? diffDays : diffDays + 1;
  }

  function compareDeadlines(a, b) {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);

    if (sortField === "deadline") {
      return dateA - dateB;
    }

    return 0;
  }
  function compareCreated(a, b) {
    const dateA = new Date(a.created_day);
    const dateB = new Date(b.created_day);
    if (sortFieldCreate === "created_day") {
      return dateA - dateB;
    }
    return 0;
    // return dateA - dateB;
    // return 0;
  }

  const getStatus = (status) => {
    if (status === "finished") {
      return (
        <div className="h-5 w-5 aspect-square bg-finished rounded-full">
          <span className="hidden">Bajarildi</span>
        </div>
      );
    } else if (status === "doing") {
      return (
        <div className="h-5 w-5 aspect-square bg-doing rounded-full">
          <span className="hidden">Jarayonda</span>
        </div>
      );
    } else if (status === "missed") {
      return (
        <div className="h-5 w-5 aspect-square bg-missed rounded-full">
          <span className="hidden">Bajarilmadi</span>
        </div>
      );
    } else if (status === "canceled") {
      return (
        <div className="h-5 w-5 aspect-square  bg-canceled rounded-full">
          <span className="hidden"> Bekor qilindi</span>
        </div>
      );
    } else {
      return null;
    }
  };
  const checkAdminOrDirectorStatus = (status) => {
    if (status === "admin") return false;
    else if (status === "director") return false;
    else return true;
  };

  return (
    <div className="mt-5 overflow-x-auto max-w-[100vw] scrollbar-gutter">
      <div className="flex items-center w-full justify-between flex-wrap">
        <Button variant="outlined" onClick={() => setCompactView(!compactView)}>
          {compactView ? "To'liq" : "Ixcham"}
        </Button>
        <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-xl">
          <Button
            onClick={() => setSelectedStatus("all")}
            variant={selectedStatus === "all" ? "outlined" : "text"}
          >
            Barchasi
          </Button>
          <Button
            onClick={() => setSelectedStatus("finished")}
            variant={selectedStatus === "finished" ? "outlined" : "text"}
          >
            Bajarilgan
          </Button>
          <Button
            onClick={() => setSelectedStatus("missed")}
            variant={selectedStatus === "missed" ? "outlined" : "text"}
          >
            Bajarilmagan
          </Button>
          <Button
            onClick={() => setSelectedStatus("doing")}
            variant={selectedStatus === "doing" ? "outlined" : "text"}
          >
            Jarayonda
          </Button>
          <Button
            onClick={() => setSelectedStatus("canceled")}
            variant={selectedStatus === "canceled" ? "outlined" : "text"}
          >
            Bekor qilingan
          </Button>
        </div>
      </div>
      <div className="mb-2 mt-5">
        <div className="w-full">
          <table className="w-full border text-[15px]">
            <thead className="bg-[#EEF0F4]">
              <tr className="border">
                <th className="border p-3">No_</th>
                <th className="border p-3">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Bolim</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="Bo'lim"
                      id="demo-simple-select"
                      value={selectedStatusBolim}
                      onChange={handleChangeBolim}
                    >
                      <MenuItem value={"all"}>Barchasi</MenuItem>
                      {Array.isArray(data) &&
                        [...new Set(data.map((item) => item.bolim))].map(
                          (uniqueValue, i) => (
                            <MenuItem key={i} value={uniqueValue}>
                              {uniqueValue}
                            </MenuItem>
                          )
                        )}
                    </Select>
                  </FormControl>
                </th>
                <th className="border p-3 w-5/12">Muammo</th>
                <th className="border p-3 w-5/12">Yechim</th>
                <th className="border p-3">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Ma'sul
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="Ma'sul"
                      id="demo-simple-select"
                      value={selectedStatusFrom}
                      onChange={handleChangeFrom}
                    >
                      <MenuItem value={"all"}>Barchasi</MenuItem>
                      {Array.isArray(data) &&
                        [
                          ...new Set(
                            data.map(
                              (item) => item?.first_name + " " + item?.last_name
                            )
                          ),
                        ].map((s, i) => (
                          <MenuItem key={i} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </th>
                <th
                  hidden={compactView}
                  className="border p-3 w-32 whitespace-nowrap"
                >
                  Muddat
                  <span
                    className="fa-solid fa-sort pl-1"
                    role="button"
                    onClick={() => {
                      setSortField(
                        sortField !== "deadline" ? "deadline" : null
                      );
                    }}
                  />
                </th>
                <th hidden={compactView} className="border p-3 w-32">
                  Jami Muddat
                </th>
                <th className="border p-3">Qolgan kun(lar)</th>
                <th className="border p-3">
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">
                      Xolati
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="Xolati"
                      id="demo-simple-select"
                      value={selectedStatus}
                      onChange={handleChange}
                    >
                      <MenuItem value={"all"}>Barchasi</MenuItem>
                      <MenuItem value={"finished"}>Bajarilgan</MenuItem>
                      <MenuItem value={"missed"}>Bajarilmagan</MenuItem>
                      <MenuItem value={"doing"}>Jarayonda</MenuItem>
                      <MenuItem value={"canceled"}> Bekor qilingan</MenuItem>
                    </Select>
                  </FormControl>
                </th>
                <th hidden={compactView} className="border p-3">
                  Moliyaviy ko'mak
                </th>
                <th
                  hidden={checkAdminOrDirectorStatus(status)}
                  className="border p-3"
                >
                  <span className="fa-solid fa-info-circle" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Array.isArray(data)
                ? data
                    .filter((item) =>
                      selectedStatusBolim === "all"
                        ? true
                        : item.bolim === selectedStatusBolim
                    )
                    .filter((item) =>
                      selectedStatus === "all"
                        ? true
                        : item.status === selectedStatus
                    )
                    .filter((item) =>
                      selectedStatusFrom === "all"
                        ? true
                        : item?.first_name + " " + item?.last_name ===
                          selectedStatusFrom
                    )
                    .sort(compareDeadlines)
                    .sort(compareCreated)
                    .map((item, index) => (
                      <tr key={item?.id} className="border">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2 min-w-[100px]">{item?.bolim}</td>
                        <td className="p-2">{item?.problem}</td>
                        <td className="px-2 max-w-md">
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                item?.text?.[0]?.text
                                  .replaceAll("[", "")
                                  .replaceAll("]", "")
                                  .replaceAll('"', "").length > 0
                                  ? item?.text?.[0]?.text
                                      .replaceAll("[", "")
                                      .replaceAll("]", "")
                                      .replaceAll('"', "")
                                  : null,
                            }}
                          />

                          <div className="flex items-center gap-3 pl-2 my-1">
                            {!item?.audio?.[0]?.audio.includes("null") &&
                              item?.audio?.length > 0 && (
                                <button
                                  onClick={() =>
                                    setAudioModal({
                                      open: true,
                                      data: item?.audio?.[0]?.audio,
                                    })
                                  }
                                >
                                  <img
                                    src={AudioIcon}
                                    alt="icon"
                                    className="w-5 aspect-square"
                                  />
                                </button>
                              )}
                            {item?.photo?.length > 0 && (
                              <button
                                onClick={() =>
                                  setModal({ open: true, data: item.photo })
                                }
                              >
                                <img
                                  src={ImageIcon}
                                  alt="icon"
                                  className="w-5 aspect-square"
                                />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="p-2">
                          {item?.first_name + " " + item?.last_name}
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          {item?.deadline}
                        </td>
                        <td hidden={compactView} className="p-2">
                          {findDiff(item?.created_at, item?.deadline)}
                        </td>
                        <td hidden={compactView} className="p-2">
                          {findDiffFromNow(item?.deadline) > 0 ? (
                            findDiffFromNow(item?.deadline)
                          ) : (
                            <span className="text-status-red">
                              {findDiffFromNow(item?.deadline)}
                            </span>
                          )}
                        </td>
                        <td className="p-2">
                          <div className="font-normal flex gap-2 items-center justify-center">
                            {getStatus(item?.status)}
                          </div>
                        </td>
                        <td hidden={compactView} className="p-2">
                          {item?.financial_help ? (
                            <span className="fa-solid fa-check text-status-green" />
                          ) : (
                            <span className="fa-solid fa-x text-red-500" />
                          )}
                        </td>
                        <td
                          hidden={checkAdminOrDirectorStatus(status)}
                          className="p-2"
                        >
                          <IconButton
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => {
                              setDeletingDetails(item);
                              setAnchorEl(e.currentTarget);
                            }}
                          >
                            <span className="fa-solid fa-ellipsis-vertical px-2" />
                          </IconButton>
                        </td>
                      </tr>
                    ))
                : new Array(1).fill(null).map((_, ind) => (
                    <tr key={ind} className="border">
                      <td className="border p-2 text-center" colSpan={10}>
                        Bo'sh
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* images modal */}
      <Dialog
        open={modal.open}
        onClose={() => setModal({ open: false, data: null })}
        fullWidth
        keepMounted
        aria-describedby="edit-modal"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 px-5 mt-5 mb-5 rounded-md">
          {modal.data?.map((item) => {
            return (
              <div className="cursor-pointer" key={item.id}>
                <img alt="task image" key={item.id} src={item?.photo} />
              </div>
            );
          })}
        </div>
      </Dialog>

      {/* audio modal */}
      <Dialog
        open={audioModal.open}
        onClose={() => setAudioModal({ open: false, data: null })}
        fullWidth
        keepMounted
        aria-describedby="edit-audioModal"
      >
        <div className="px-5 mt-5 mb-5 rounded-md">
          <audio controls className="w-[250px] my-2">
            <source src={`https://xodim.pythonanywhere.com/` + data} />
          </audio>
        </div>
      </Dialog>

      {/* archive dropdown */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleDeleteTask()}>
          <p className="text-red-500">O'chirish</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default HomeTable;
