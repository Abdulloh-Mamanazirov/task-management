import { Avatar, AvatarGroup, Checkbox, Dialog } from "@mui/material";
import React, { useState } from "react";
import EditTaskStatus from "./EditTaskStatus";

const MyTaskTable = ({ data }) => {
  console.log(data, "data item");
  const [modal, setModal] = useState({ open: false, data: null });

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
    return diffDays + 1;
  }

  const getStatus = (status) => {
    if (status === "bajarildi") {
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
    } else if (status === "bajarilmadi") {
      return (
        <div className="border-4 border-custom-red bg-custom-light-red rounded-full px-3 py-[1px]">
          Bajarilmadi
        </div>
      );
    } else if (status === "bekor") {
      return (
        <div className="border-4 border-gray-500 bg-gray-200 rounded-full px-3 py-[1px]">
          Bekor qilindi
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <div className="mb-2 mt-5">
        <div className="w-full">
          <table className="w-full text-center border">
            <thead className="bg-[#F3C206]">
              <tr className="border">
                <th className="border p-3">No_</th>
                <th className="border p-3">Topshiriq</th>
                <th className="border p-3">Sabab</th>
                <th className="border p-3">Tadbir</th>
                <th className="border p-3">Mas'ul</th>
                <th className="border p-3">Muddat</th>
                <th className="border p-3">Jami muddat</th>
                <th className="border p-3">Qolgan kun(lar)</th>
                <th className="border p-3">Xolati</th>
                <th className="border p-3">Moliyaviy ko'mak</th>
                <th className="border p-3">Arxivlash</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-dark-blue text-white">
                <td colSpan={11}>Qisqa muddat</td>
              </tr>
              {Array.isArray(data)
                ? data.map((item, index) => (
                    <tr key={item?.id} className="border">
                      <td className="border p-2">{index + 1}</td>
                      <td>
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
                      <td className="border p-2">{item?.reason}</td>{" "}
                      <td className="border p-2">{item?.event}</td>
                      <td className="border p-2">{item?._from}</td>
                      <td className="border p-2">{item?.deadline}</td>
                      <td className="border p-2">
                        {findDiff(item?.created_at, item?.deadline)}
                      </td>
                      <td className="border p-2">
                        {findDiffFromNow(item?.deadline)}
                      </td>
                      <td className="border p-2">
                        <div className="font-normal flex gap-2 items-center justify-end">
                          {getStatus(item?.status)}
                          <EditTaskStatus />
                        </div>
                      </td>
                      <td className="border p-2">
                        {item?.financial_help ? (
                          <span className="fa-solid fa-check text-status-green" />
                        ) : (
                          <span className="fa-solid fa-x text-red-500" />
                        )}
                      </td>
                      <td className="border p-2">
                        <Checkbox />
                      </td>
                    </tr>
                  ))
                : new Array(2).fill(null).map((_, ind) => (
                    <tr key={ind} className="border">
                      <td className="border p-2" colSpan={11}>
                        &nbsp;
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
                  alt="salom"
                  key={item.id}
                  src={`https://xodim.pythonanywhere.com/` + item?.photo}
                />
              </div>
            );
          })}
        </div>
      </Dialog>
    </div>
  );
};

export default MyTaskTable;
