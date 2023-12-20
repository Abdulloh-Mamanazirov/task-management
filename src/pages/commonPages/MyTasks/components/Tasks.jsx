import { useState } from "react";
import { Avatar, AvatarGroup, Dialog } from "@mui/material";
import EditTaskStatus from "./EditTaskStatus";

const Tasks = ({ data }) => {
  const [modal, setModal] = useState({ open: false, data: null });

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
    <>
      <div className="w-full flex items-center flex-wrap gap-5 mt-5">
        {Array.isArray(data)
          ? data.map((item) => {
              return (
                <div
                  key={item?.id}
                  className="bg-white rounded-lg border border-gray-400 p-2  shadow-md flex items-start flex-col sm:flex-row gap-3 sm:gap-0 w-full sm:min-w-[404px] min-h-[221px] sm:w-auto"
                >
                  <div>
                    <p className="text-black font-normal text-lg max-w-xs">
                      {item?.text?.[0]?.text.length > 0
                        ? item?.text?.[0]?.text
                        : null}{" "}
                    </p>
                    <div className="mt-4 rounded-md">
                      <p className="text-left font-medium ">Audio:</p>
                      {!item?.audio?.[0]?.audio.includes("null") ? (
                        <audio controls className="sm:w-[250px]">
                          <source
                            src={
                              `https://xodim.pythonanywhere.com/` +
                              item?.audio?.[0]?.audio
                            }
                          />
                        </audio>
                      ) : (
                        <em className="text-sm">Audio mavjud emas</em>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-left font-medium ">Rasmlar:</p>
                      <AvatarGroup
                        onClick={() =>
                          setModal({ open: true, data: item.photo })
                        }
                        className="w-fit"
                        max={4}
                        style={{ cursor: "pointer" }}
                      >
                        {item?.photo?.length > 0 ? (
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
                          ))
                        ) : (
                          <em className="text-sm">Rasm mavjud emas</em>
                        )}
                      </AvatarGroup>
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <p className="text-right font-medium ">
                        Boshlanish sanasi:
                      </p>
                      <p className="text-right font-normal ">21-12-2024</p>
                    </div>
                    <div className="mt-5">
                      <p className="text-right font-medium">Tugash sanasi:</p>
                      <p className="text-right font-normal">{item?.deadline}</p>
                    </div>
                    <div className="mt-5 ">
                      <p className="text-right font-medium ">Status:</p>
                      <div className="font-normal flex gap-2 items-center justify-end">
                        {getStatus(item?.status)}
                        <EditTaskStatus/>
                        {/* <span className="fa-solid fa-edit text-xl text-blue-500 cursor-pointer" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : new Array(2).fill(null).map((_, ind) => {
              return (
                <div
                  key={ind}
                  className="bg-white rounded-lg border border-gray-400 p-2  shadow-md flex items-start flex-col sm:flex-row gap-3 sm:gap-0 w-full sm:min-w-[404px] min-h-[221px] sm:w-auto"
                >
                  <div>
                    <p className="text-black font-normal text-lg w-full p-3 bg-gray-200" />
                    <div className="mt-4 rounded-md">
                      <p className="text-black font-normal text-lg w-[200px] p-3 bg-gray-200" />
                    </div>
                    <div className="mt-4">
                      <p className="text-left font-medium ">Rasmlar:</p>
                      <AvatarGroup
                        className="w-fit"
                        max={4}
                        style={{ cursor: "pointer" }}
                      >
                        {new Array(3).fill(null).map((_, ind) => (
                          <Avatar alt={String(ind + 1)} key={ind} src={"..."} />
                        ))}
                      </AvatarGroup>
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <p className="text-black font-normal w-1/2 ml-auto p-3 bg-gray-200" />
                    </div>
                    <div className="mt-5">
                      <p className="text-black font-normal w-1/2 ml-auto p-3 bg-gray-200" />
                    </div>
                    <div className="mt-5 ">
                      <p className="text-black font-normal w-1/2 ml-auto p-3 bg-gray-200" />
                    </div>
                  </div>
                </div>
              );
            })}
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
    </>
  );
};

export default Tasks;
