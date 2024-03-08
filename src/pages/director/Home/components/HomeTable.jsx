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

const HomeTable = ({ getStats }) => {
  Aos.init();
  const [modal, setModal] = useState({ open: false, data: null });
  const [data, setData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStatusBolim, setSelectedStatusBolim] = useState("all");
  const [selectedStatusFrom, setSelectedStatusFrom] = useState("all");
  const [deletingDetails, setDeletingDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortFieldCreate, setSortFieldCreate] = useState(null);
  const [compactView, setCompactView] = useState(true);
  const open = Boolean(anchorEl);
  const status = sessionStorage.getItem("status");

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
    let response = await axios.get("/all/tasks/");
    setData([
      ...response?.data?.manager_tasks,
      ...response?.data?.xodimlar_tasks,
    ]);
  }

  async function handleArchive() {
    const data = {
      _to: deletingDetails?.to_id,
      _from: deletingDetails?.from_id,
    };

    await axios
      .patch(`/arxiv/task/${deletingDetails?.id}/`, data)
      .then(() => {
        toast.success("Vazifa arxivlandi");
        getData();
        getStats();
      })
      .catch((err) => toast.error("Vazifani arxivlashda xatolik!"));
    setDeletingDetails(null);
    setAnchorEl(null);
  }

  useEffect(() => {
    getData();
  }, []);

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
        <div className="border-4 border-custom-green bg-custom-light-green rounded-full px-3 py-[1px]">
          <span className="hidden md:inline-block ">Bajarildi</span>
        </div>
      );
    } else if (status === "doing") {
      return (
        <div className="border-4 border-custom-yellow bg-custom-light-yellow rounded-full px-3 py-[1px]">
          <span className="hidden md:inline-block ">Jarayonda</span>
        </div>
      );
    } else if (status === "missed") {
      return (
        <div className="border-4 border-custom-red bg-custom-light-red rounded-full px-3 py-[1px]">
          <span className="hidden md:inline-block ">Bajarilmadi</span>
        </div>
      );
    } else if (status === "canceled") {
      return (
        <div className="border-4 border-gray-500 bg-gray-200 rounded-full px-3 py-[1px] whitespace-nowrap">
          <span className="hidden md:inline-block"> Bekor qilindi</span>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="mt-16 overflow-x-auto max-w-[100vw] scrollbar-gutter">
      <div className="flex items-center w-full">
        <Button variant="outlined" onClick={() => setCompactView(!compactView)}>
          {compactView ? "To'liq" : "Ixcham"}
        </Button>
        <div className="w-full hidden md:flex justify-around gap-2 whitespace-nowrap">
          <div className="ml-3">
            <h3>Jami Tadbirlar soni - {data?.length} ta</h3>
          </div>
          <div className="flex items-center">
            <div className="bg-status-green text-white w-28 md:w-40 text-center ">
              Bajarilgan
            </div>
            <div className="bg-status-red text-white w-28 md:w-40 text-center">
              Bajarilmagan
            </div>
            <div className="bg-status-yellow w-28 md:w-40 text-center">
              Jarayonda
            </div>
            <div className="bg-status-gray text-white w-28 md:w-40 text-center">
              Bekor qilingan
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 mt-5">
        <div className="w-full">
          <table className="w-full text-center border text-[15px]">
            <thead className="bg-[#F3C206] w-full">
              <tr className="border w-full">
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
                <th hidden={status !== "admin"} className="border p-3">
                  Arxivlash
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-dark-blue text-white">
                <td colSpan={12}>Qisqa muddatli</td>
              </tr>
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
                    .filter((item) => findDiffFromNow(item?.deadline) < 30)
                    .map((item, index) => (
                      <tr
                        data-aos={compactView ? "" : "fade-up"}
                        data-aos-offset={compactView ? "0" : "50"}
                        key={item?.id}
                        className="border"
                      >
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2 min-w-[100px]">
                          {item?.bolim}
                        </td>
                        <td className="border p-2">{item?.problem}</td>
                        <td className="border px-2 max-w-md">
                          {item?.text?.[0]?.text
                            .replaceAll("[", "")
                            .replaceAll("]", "")
                            .replaceAll('"', "").length > 0
                            ? item?.text?.[0]?.text
                                .replaceAll("[", "")
                                .replaceAll("]", "")
                                .replaceAll('"', "")
                            : null}

                          <div>
                            {!item?.audio?.[0]?.audio.includes("null") &&
                              item?.audio?.length > 0 && (
                                <audio controls className="w-[250px] my-2">
                                  <source
                                    src={
                                      `https://xodim.pythonanywhere.com/` +
                                      item?.audio?.[0]?.audio
                                    }
                                  />
                                </audio>
                              )}
                          </div>
                          <div>
                            <AvatarGroup
                              onClick={() =>
                                setModal({ open: true, data: item.photo })
                              }
                              className="w-fit mx-auto"
                              max={4}
                              style={{ cursor: "pointer" }}
                            >
                              {item?.photo?.length > 0 &&
                                item?.photo?.map((photoItem, photoIndex) => (
                                  <Avatar
                                    alt={`Image ${photoIndex + 1}`}
                                    key={photoItem.id}
                                    src={
                                      `https://xodim.pythonanywhere.com/` +
                                      photoItem?.photo
                                    }
                                  />
                                ))}
                            </AvatarGroup>
                          </div>
                        </td>
                        <td className="border p-2">
                          {item?.first_name + " " + item?.last_name}
                        </td>
                        <td hidden={compactView} className="border p-2">
                          {item?.deadline}
                        </td>
                        <td hidden={compactView} className="border p-2">
                          {findDiff(item?.created_at, item?.deadline)}
                        </td>
                        <td className="border p-2">
                          {findDiffFromNow(item?.deadline) > 0 ||
                          item?.status === "finished" ? (
                            findDiffFromNow(item?.deadline)
                          ) : (
                            <span className="text-status-red">
                              {findDiffFromNow(item?.deadline)}
                            </span>
                          )}
                        </td>
                        <td className="border p-2">
                          <div className="font-normal flex gap-2 items-center justify-center">
                            {getStatus(item?.status)}
                          </div>
                        </td>
                        <td hidden={compactView} className="border p-2">
                          {item?.financial_help ? (
                            <span className="fa-solid fa-check text-status-green" />
                          ) : (
                            <span className="fa-solid fa-x text-red-500" />
                          )}
                        </td>
                        <td hidden={status !== "admin"} className="border p-2">
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
              <tr className="bg-dark-blue text-white">
                <td colSpan={11}>Uzoq muddatli</td>
              </tr>
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
                    ?.filter?.((item) => findDiffFromNow(item?.deadline) > 30)
                    ?.map?.((item, index) => (
                      <tr
                        data-aos="fade-up"
                        data-aos-offset="20"
                        key={item?.id}
                        className="border"
                      >
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2 min-w-[100px]">
                          {item?.bolim}
                        </td>
                        <td className="border p-2">{item?.problem}</td>{" "}
                        <td className="border px-2 max-w-md">
                          {item?.text?.[0]?.text
                            .replaceAll("[", "")
                            .replaceAll("]", "")
                            .replaceAll('"', "").length > 0
                            ? item?.text?.[0]?.text
                                .replaceAll("[", "")
                                .replaceAll("]", "")
                                .replaceAll('"', "")
                            : null}

                          <div>
                            {!item?.audio?.[0]?.audio.includes("null") &&
                              item?.audio?.length > 0 && (
                                <audio controls className="w-[250px] my-2">
                                  <source
                                    src={
                                      `https://xodim.pythonanywhere.com/` +
                                      item?.audio?.[0]?.audio
                                    }
                                  />
                                </audio>
                              )}
                          </div>
                          <div>
                            <AvatarGroup
                              onClick={() =>
                                setModal({ open: true, data: item.photo })
                              }
                              className="w-fit mx-auto"
                              max={4}
                              style={{ cursor: "pointer" }}
                            >
                              {item?.photo?.length > 0 &&
                                item?.photo?.map((photoItem, photoIndex) => (
                                  <Avatar
                                    alt={`Image ${photoIndex + 1}`}
                                    key={photoItem.id}
                                    src={
                                      `https://xodim.pythonanywhere.com/` +
                                      photoItem?.photo
                                    }
                                  />
                                ))}
                            </AvatarGroup>
                          </div>
                        </td>
                        <td className="border p-2">
                          {item?.first_name + " " + item?.last_name}
                        </td>
                        <td hidden={compactView} className="border p-2">
                          {item?.deadline}
                        </td>
                        <td hidden={compactView} className="border p-2">
                          {findDiff(item?.created_at, item?.deadline)}
                        </td>
                        <td className="border p-2">
                          {findDiffFromNow(item?.deadline) > 0 ? (
                            findDiffFromNow(item?.deadline)
                          ) : (
                            <span className="text-status-red">
                              -{Math.abs(findDiffFromNow(item?.deadline))}
                            </span>
                          )}
                        </td>
                        <td className="border p-2">
                          <div className="font-normal flex gap-2 items-center justify-center">
                            {getStatus(item?.status)}
                          </div>
                        </td>
                        <td hidden={compactView} className="border p-2">
                          {item?.financial_help ? (
                            <span className="fa-solid fa-check text-status-green" />
                          ) : (
                            <span className="fa-solid fa-x text-red-500" />
                          )}
                        </td>
                        <td hidden={status !== "admin"} className="border p-2">
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
                      <td className="border p-2 text-center" colSpan={11}>
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
                <img
                  alt="task image"
                  key={item.id}
                  src={`https://xodim.pythonanywhere.com/` + item?.photo}
                />
              </div>
            );
          })}
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
        <MenuItem onClick={() => handleArchive()}>Arxivlash</MenuItem>
      </Menu>
    </div>
  );
};

export default HomeTable;
