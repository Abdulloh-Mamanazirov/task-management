import { Avatar, AvatarGroup, Dialog } from "@mui/material";
import React, { useState } from "react";

const ThreePage = ({ data }) => {
  const [modal, setModal] = useState({ open: false, data: null });

  return (
    <>
      <div className="mt-5 p-3">
        {data?.length > 0 ? (
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border p-2 w-10/12">Vazifa</th>
                <th className="border p-2 w-2/12">Tugash sanasi</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, ind) => (
                <tr key={ind} className="border text-center">
                  <th className="border p-2 w-10/12">
                    {item?.text?.length > 0 &&
                      item?.text?.[0]?.text
                        .replaceAll("[", "")
                        .replaceAll("]", "")
                        .replaceAll('"', "")}
                    <div className="mt-2 mx-auto">
                      {!item?.audio?.[0]?.audio.includes("null") &&
                        item?.audio?.length > 0 && (
                          <audio controls className="sm:w-[210px] mx-auto h-10">
                            <source
                              src={
                                `https://xodim.pythonanywhere.com/` +
                                item?.audio?.[0]?.audio
                              }
                            />
                          </audio>
                        )}
                    </div>
                    <div className="mt-2">
                      <AvatarGroup
                        onClick={() =>
                          setModal({ open: true, data: item.photo })
                        }
                        className="w-fit mx-auto"
                        max={4}
                        style={{ cursor: "pointer" }}
                      >
                        {item?.photo?.length > 0 &&
                          item?.photo?.map((item) => (
                            <Avatar
                              alt="Image"
                              style={{ border: "1px solid black" }}
                              key={item.id}
                              src={
                                `https://xodim.pythonanywhere.com/` +
                                item?.photo
                              }
                            />
                          ))}
                      </AvatarGroup>
                    </div>
                  </th>
                  <td className="border p-2 w-2/12">{item?.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col gap-2 items-center">
            <img src="empty.png" alt="empty" className="w-32 mx-auto" />
            <p>Topshiriq mavjud emas</p>
          </div>
        )}
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
                  alt="task image"
                  key={item.id}
                  src={`https://xodim.pythonanywhere.com/` + item?.photo}
                />
              </div>
            );
          })}
        </div>
      </Dialog>
    </>
  );
};

export default ThreePage;
