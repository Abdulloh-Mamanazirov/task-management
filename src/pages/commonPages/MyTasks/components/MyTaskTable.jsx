import Aos from "aos";
import React, { useState } from "react";
import EditTaskStatus from "./EditTaskStatus";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Checkbox,
  Dialog,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const MyTaskTable = ({ data, getData, fromManagerData }) => {
  Aos.init();
  const [modal, setModal] = useState({ open: false, data: null });
  const [sortField, setSortField] = useState(null);
  const [commentItem, setCommentItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const status = sessionStorage.getItem("status");

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
        <div className="border-4 border-custom-green bg-custom-light-green rounded-full px-3 py-[1px]">
          Bajarildi
        </div>
      );
    } else if (status === "doing") {
      return (
        <div className="border-4 border-custom-yellow bg-custom-light-yellow rounded-full px-3 py-[1px]">
          Jarayonda
        </div>
      );
    } else if (status === "missed") {
      return (
        <div className="border-4 border-custom-red bg-custom-light-red rounded-full px-3 py-[1px]">
          Bajarilmadi
        </div>
      );
    } else if (status === "canceled") {
      return (
        <div className="border-4 border-gray-500 bg-gray-200 rounded-full px-3 py-[1px] whitespace-nowrap">
          Bekor qilindi
        </div>
      );
    } else {
      return null;
    }
  };

  function compareDeadlines(a, b) {
    const dateA = new Date(a.deadline);
    const dateB = new Date(b.deadline);

    if (sortField === "deadline") {
      return dateA - dateB;
    }

    return 0;
  }
  return (
    <div>
      <div className="mb-2 mt-5">
        <div className="w-full">
          <h3 className="text-xl py-3 text-center">
            Direktor bergan topshiriqlar:
          </h3>
          <table className="w-full text-center border">
            <thead className="bg-[#F3C206]">
              <tr className="border">
                <th className="border p-3">No_</th>
                <th className="border p-3">Muammo</th>
                <th className="border p-3">Yechim</th>
                <th className="border p-3 w-32">
                  Muddat
                  <span
                    className="fa-solid fa-sort pl-3"
                    role="button"
                    onClick={() => {
                      setSortField(
                        sortField !== "deadline" ? "deadline" : null
                      );
                    }}
                  />
                </th>
                <th className="border p-3">Jami muddat</th>
                <th className="border p-3">Qolgan kun(lar)</th>
                <th className="border p-3">Xolati</th>
                {/* <th className="border p-3">Moliyaviy ko'mak</th> */}
                <th className="border p-3">
                  <span className="fa-solid fa-info-circle" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-dark-blue text-white">
                <td colSpan={11}>Qisqa muddatli</td>
              </tr>
              {Array.isArray(data)
                ? data
                    ?.filter?.((item) => findDiffFromNow(item?.deadline) < 30)
                    .sort(compareDeadlines)
                    ?.map?.((item, index) => (
                      <tr
                        data-aos="fade-up"
                        data-aos-offset="70"
                        data-aos-delay={100 + index * 10}
                        key={item?.id}
                        className="border"
                      >
                        <td className="border p-2">{index + 1}</td>
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
                                    // src={
                                    //   `https://xodim.pythonanywhere.com/` +
                                    //   photoItem?.photo
                                    // }
                                    src={photoItem?.photo}
                                  />
                                ))}
                            </AvatarGroup>
                          </div>
                        </td>
                        <td className="border p-2">{item?.deadline}</td>
                        <td className="border p-2">
                          {findDiff(item?.created_at, item?.deadline)}
                        </td>
                        <td className="border p-2">
                          {findDiffFromNow(item?.deadline) > 0 ||
                          item?.status === "finished" ? (
                            findDiffFromNow(item?.deadline)
                          ) : (
                            <span className="text-status-red">
                              -{Math.abs(findDiffFromNow(item?.deadline))}
                            </span>
                          )}
                        </td>
                        <td className="border p-2">
                          <div className="font-normal flex gap-2 items-center justify-end">
                            {getStatus(item?.status)}
                            {/* <Link
                              state={item}
                              to={`/${status}/finish-task/${item?.id}`}
                            >
                              <span className="fa-solid fa-edit text-blue-500 text-lg" />
                            </Link> */}
                            {/* <EditTaskStatus
                              data={item}
                              hidden={item?.status === "missed"}
                              getData={getData}
                            /> */}
                          </div>
                        </td>
                        {/* <td className="border p-2">
                          {item?.financial_help ? (
                            <span className="fa-solid fa-check text-status-green" />
                          ) : (
                            <span className="fa-solid fa-x text-red-500" />
                          )}
                        </td> */}
                        <td className="border p-2">
                          <StyledBadge
                            role={"button"}
                            onClick={(e) => {
                              setCommentItem(item);
                              setAnchorEl(e.currentTarget);
                            }}
                            badgeContent={item?.xabar}
                            color="secondary"
                            className="px-2 mr-1"
                          >
                            <span className="fa-solid fa-ellipsis-vertical text-blue-500 text-lg" />
                          </StyledBadge>
                        </td>
                      </tr>
                    ))
                : new Array(2).fill(null).map((_, ind) => (
                    <tr key={ind} className="border">
                      <td className="border p-2 text-center" colSpan={11}>
                        Bo'sh
                      </td>
                    </tr>
                  ))}
              <tr className="bg-dark-blue text-white">
                <td colSpan={11}>Uzoq muddatli</td>
              </tr>
              {Array.isArray(data)
                ? data
                    ?.filter?.((item) => findDiffFromNow(item?.deadline) > 30)
                    ?.map?.((item, index) => (
                      <tr
                        data-aos="fade-up"
                        data-aos-offset="30"
                        data-aos-delay={100 + index * 10}
                        key={item?.id}
                        className="border"
                      >
                        <td className="border p-2">{index + 1}</td>
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
                                    // src={
                                    //   `https://xodim.pythonanywhere.com/` +
                                    //   photoItem?.photo
                                    // }
                                    src={photoItem?.photo}
                                  />
                                ))}
                            </AvatarGroup>
                          </div>
                        </td>
                        <td className="border p-2">{item?.deadline}</td>
                        <td className="border p-2">
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
                          <div className="font-normal flex gap-2 items-center justify-end">
                            {getStatus(item?.status)}
                            {/* <Link
                              state={item}
                              to={`/${status}/finish-task/${item?.id}`}
                            >
                              <span className="fa-solid fa-edit text-blue-500 text-lg" />
                            </Link> */}
                            {/* <EditTaskStatus
                              data={item}
                              hidden={item?.status === "missed"}
                              getData={getData}
                            /> */}
                          </div>
                        </td>
                        {/* <td className="border p-2">
                          {item?.financial_help ? (
                            <span className="fa-solid fa-check text-status-green" />
                          ) : (
                            <span className="fa-solid fa-x text-red-500" />
                          )}
                        </td> */}
                        <td className="border p-2">
                          <StyledBadge
                            role={"button"}
                            onClick={(e) => {
                              setCommentItem(item);
                              setAnchorEl(e.currentTarget);
                            }}
                            badgeContent={item?.xabar}
                            color="secondary"
                            className="px-2 mr-1"
                          >
                            <span className="fa-solid fa-ellipsis-vertical text-blue-500 text-lg" />
                          </StyledBadge>
                        </td>
                      </tr>
                    ))
                : new Array(2).fill(null).map((_, ind) => (
                    <tr key={ind} className="border">
                      <td className="border p-2 text-center" colSpan={11}>
                        Bo'sh
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div className="w-full mt-10">
          <h3 className="text-xl py-3 text-center">
            {status === "xodim" ? "Menejer" : "Men"} bergan topshiriqlar:
          </h3>
          <table className="w-full text-center border">
            <thead className="bg-[#F3C206]">
              <tr className="border">
                <th className="border p-3">No_</th>
                <th className="border p-3">Muammo</th>
                <th className="border p-3">Yechim</th>
                <th className="border p-3 w-32">
                  Muddat
                  <span
                    className="fa-solid fa-sort pl-3"
                    role="button"
                    onClick={() => {
                      setSortField(
                        sortField !== "deadline" ? "deadline" : null
                      );
                    }}
                  />
                </th>
                <th className="border p-3">Jami muddat</th>
                <th className="border p-3">Qolgan kun(lar)</th>
                <th className="border p-3">Xolati</th>
                {/* <th className="border p-3">Moliyaviy ko'mak</th> */}
                <th className="border p-3">
                  <span className="fa-solid fa-info-circle" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-dark-blue text-white">
                <td colSpan={11}>Qisqa muddatli</td>
              </tr>
              {Array.isArray(fromManagerData)
                ? fromManagerData
                    ?.filter?.((item) => findDiffFromNow(item?.deadline) < 30)
                    .sort(compareDeadlines)
                    ?.map?.((item, index) => (
                      <tr
                        data-aos="fade-up"
                        data-aos-offset="70"
                        data-aos-delay={100 + index * 10}
                        key={item?.id}
                        className="border"
                      >
                        <td className="border p-2">{index + 1}</td>
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
                                    // src={
                                    //   `https://xodim.pythonanywhere.com/` +
                                    //   photoItem?.photo
                                    // }
                                    src={photoItem?.photo}
                                  />
                                ))}
                            </AvatarGroup>
                          </div>
                        </td>
                        <td className="border p-2">{item?.deadline}</td>
                        <td className="border p-2">
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
                          <div className="font-normal flex gap-2 items-center justify-end">
                            {getStatus(item?.status)}
                            {/* <Link
                              state={item}
                              to={`/${status}/finish-task/${item?.id}`}
                            >
                              <StyledBadge
                                badgeContent={"item?.xabar"}
                                color="secondary"
                              >
                                <span className="fa-solid fa-edit text-blue-500 text-lg" />
                              </StyledBadge>
                            </Link> */}
                            {/* <Link
                              state={item}
                              to={`/${status}/finish-task/${item?.id}`}
                            >
                              <span className="fa-solid fa-edit text-blue-500 text-lg" />
                            </Link> */}
                            {/* <EditTaskStatus
                              data={item}
                              hidden={item?.status === "missed"}
                              getData={getData}
                            /> */}
                          </div>
                        </td>
                        {/* <td className="border p-2">
                          {item?.financial_help ? (
                            <span className="fa-solid fa-check text-status-green" />
                          ) : (
                            <span className="fa-solid fa-x text-red-500" />
                          )}
                        </td> */}
                        <td className="border p-2">
                          <StyledBadge
                            role={"button"}
                            onClick={(e) => {
                              setCommentItem(item);
                              setAnchorEl(e.currentTarget);
                            }}
                            badgeContent={item?.xabar}
                            color="secondary"
                            className="px-2 mr-1"
                          >
                            <span className="fa-solid fa-ellipsis-vertical text-blue-500 text-lg" />
                          </StyledBadge>
                        </td>
                      </tr>
                    ))
                : new Array(2).fill(null).map((_, ind) => (
                    <tr key={ind} className="border">
                      <td className="border p-2 text-center" colSpan={11}>
                        Bo'sh
                      </td>
                    </tr>
                  ))}
              <tr className="bg-dark-blue text-white">
                <td colSpan={11}>Uzoq muddatli</td>
              </tr>
              {Array.isArray(fromManagerData)
                ? fromManagerData
                    ?.filter?.((item) => findDiffFromNow(item?.deadline) > 30)
                    ?.map?.((item, index) => (
                      <tr
                        data-aos="fade-up"
                        data-aos-delay={100 + index * 10}
                        key={item?.id}
                        className="border"
                      >
                        <td className="border p-2">{index + 1}</td>
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
                                    // src={
                                    //   `https://xodim.pythonanywhere.com/` +
                                    //   photoItem?.photo
                                    // }
                                    src={photoItem?.photo}
                                  />
                                ))}
                            </AvatarGroup>
                          </div>
                        </td>
                        <td className="border p-2">{item?.deadline}</td>
                        <td className="border p-2">
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
                          <div className="font-normal flex gap-2 items-center justify-end">
                            {getStatus(item?.status)}
                            {/* <Link
                              state={item}
                              to={`/${status}/finish-task/${item?.id}`}
                            >
                              <span className="fa-solid fa-edit text-blue-500 text-lg" />
                            </Link> */}
                            {/* <EditTaskStatus
                              data={item}
                              hidden={item?.status === "missed"}
                              getData={getData}
                            /> */}
                          </div>
                        </td>
                        {/* <td className="border p-2">
                          {item?.financial_help ? (
                            <span className="fa-solid fa-check text-status-green" />
                          ) : (
                            <span className="fa-solid fa-x text-red-500" />
                          )}
                        </td> */}
                        <td className="border p-2">
                          <StyledBadge
                            role={"button"}
                            onClick={(e) => {
                              setCommentItem(item);
                              setAnchorEl(e.currentTarget);
                            }}
                            badgeContent={item?.xabar}
                            color="secondary"
                            className="px-2 mr-1"
                          >
                            <span className="fa-solid fa-ellipsis-vertical text-blue-500 text-lg" />
                          </StyledBadge>
                        </td>
                      </tr>
                    ))
                : new Array(2).fill(null).map((_, ind) => (
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
                  alt="Vazifa rasmi"
                  key={item.id}
                  // src={`https://xodim.pythonanywhere.com/` + item?.photo}
                  src={item?.photo}
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
        <MenuItem>
          <Link
            state={commentItem}
            to={`/${status}/finish-task/${commentItem?.id}`}
          >
            Comment
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyTaskTable;
