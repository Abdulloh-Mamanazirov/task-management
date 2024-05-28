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
import { AudioIcon, ImageIcon } from "../../../../assets/task_icons";

const HomeTable = ({ getStats }) => {
  Aos.init();
  const [modal, setModal] = useState({ open: false, data: null });
  const [audioModal, setAudioModal] = useState({ open: false, data: null });
  const [data, setData] = useState(null);
  const [deletingDetails, setDeletingDetails] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const status = sessionStorage.getItem("status");

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

  return (
    <div className="mt-16 overflow-x-auto max-w-[100vw] scrollbar-gutter">
      <div className="mb-2 mt-5">
        <div className="w-full">
          {/* table for phone & tablet */}
          <table className="table md:hidden w-full border text-[15px]">
            <tbody className="bg-white">
              {Array.isArray(data)
                ? data?.map((item, index) => (
                    <tr className="border" key={item?.id}>
                      <table>
                        <tbody>
                          <tr>
                            <td className="p-2 whitespace-nowrap">No_</td>
                            <td className="p-2">{index + 1}</td>
                          </tr>
                          <tr>
                            <td className="p-2 whitespace-nowrap">Bo'lim</td>
                            <td className="p-2">{item?.bolim}</td>
                          </tr>
                          <tr>
                            <td className="p-2 whitespace-nowrap">Muammo</td>
                            <td className="p-2">{item?.problem}</td>
                          </tr>
                          <tr>
                            <td className="p-2 whitespace-nowrap">Yechim</td>
                            <td className="p-2">
                              {item?.text?.[0]?.text
                                .replaceAll("[", "")
                                .replaceAll("]", "")
                                .replaceAll('"', "")}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 whitespace-nowrap">Ma'sul</td>
                            <td className="p-2">
                              {item?.first_name + " " + item?.last_name}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 whitespace-nowrap">Muddat</td>
                            <td className="p-2">{item?.deadline}</td>
                          </tr>
                          <tr>
                            <td className="p-2 whitespace-nowrap">
                              Jami muddat
                            </td>
                            <td className="p-2">
                              {findDiff(item?.created_at, item?.deadline)}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 whitespace-nowrap">
                              Qolgan kunlar
                            </td>
                            <td className="p-2">
                              {findDiffFromNow(item?.deadline)}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 whitespace-nowrap">Xolati</td>
                            <td className="p-2">{getStatus(item?.status)}</td>
                          </tr>
                          <tr>
                            <td className="p-2 whitespace-nowrap">
                              Moliyaviy ko'mak
                            </td>
                            <td className="p-2">
                              {item?.financial_help ? (
                                <span className="fa-solid fa-check text-status-green" />
                              ) : (
                                <span className="fa-solid fa-x text-red-500" />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </tr>
                  ))
                : new Array(1).fill(null).map((_, ind) => (
                    <tr key={ind} className="border">
                      <td className="border p-2 text-center" colSpan={2}>
                        Bo'sh
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>

          {/* table for pc */}
          <table className="hidden md:table w-full border text-[15px]">
            <thead className="bg-[#EEF0F4] w-full">
              <tr className="border w-full">
                <th className="border p-3">No_</th>
                <th className="border p-3">Bo'lim</th>
                <th className="border p-3">Muammo</th>
                <th className="border p-3">Yechim</th>
                <th className="border p-3">Ma'sul</th>
                <th className="border p-3">Muddat</th>
                <th className="border p-3">Jami muddat</th>
                <th className="border p-3">Qolgan kunlar</th>
                <th className="border p-3">Xolati</th>
                <th className="border p-3">Moliyaviy ko'mak</th>
                <th hidden={status !== "admin"} className="border p-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Array.isArray(data)
                ? data?.map((item, index) => (
                    <tr
                      data-aos={"fade-up"}
                      data-aos-offset={"50"}
                      key={item?.id}
                      className="border"
                    >
                      <td className="p-2 text-center">{index + 1}</td>
                      <td className="p-2">{item?.bolim}</td>
                      <td className="p-2">{item?.problem}</td>
                      <td className="p-2">
                        {item?.text?.[0]?.text
                          .replaceAll("[", "")
                          .replaceAll("]", "")
                          .replaceAll('"', "").length > 0
                          ? item?.text?.[0]?.text
                              .replaceAll("[", "")
                              .replaceAll("]", "")
                              .replaceAll('"', "")
                          : null}

                        <div className="flex items-center gap-3 pl-2">
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
                      <td className="p-2 text-center">
                        {findDiff(item?.created_at, item?.deadline)}
                      </td>
                      <td className="p-2 text-center">
                        {findDiffFromNow(item?.deadline) > 0 ||
                        item?.status === "finished" ? (
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
                      <td className="p-2">
                        {item?.financial_help ? (
                          <span className="fa-solid fa-check text-status-green" />
                        ) : (
                          <span className="fa-solid fa-x text-red-500" />
                        )}
                      </td>
                      <td hidden={status !== "admin"} className="p-2">
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
        <MenuItem onClick={() => handleArchive()}>Arxivlash</MenuItem>
      </Menu>
    </div>
  );
};

export default HomeTable;
