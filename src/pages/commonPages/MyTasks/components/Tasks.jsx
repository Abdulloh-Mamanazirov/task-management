import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Dialog } from "@mui/material";

const Tasks = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({ open: false, data: null });
  const user_id = sessionStorage.getItem("user_id");

  async function getData() {
    const response = await axios.get(`/task/${user_id}/`);
    setData(response?.data);
  }
  console.log(data, "task");

  useEffect(() => {
    getData();
  }, []);

  const getStatus = (status) => {
    if (status === "bajarildi") {
      return (
        <div className="border-4 border-custom-green bg-custom-light-green rounded-full px-3 py-[1px]">
          Bajarildi
        </div>
      );
    } else if (status === "jarayonda") {
      return (
        <div className="border-4 border-custom-yellow bg-custom-light-yellow rounded-full px-3 py-[1px]">
          Jarayonda
        </div>
      );
    } else {
      return (
        <div className="border-4 border-custom-red bg-custom-light-red rounded-full px-3 py-[1px]">
          Bajarilmadi
        </div>
      );
    }
  };

  return (
    <>
      <div className="w-full flex items-center flex-wrap gap-5 mt-5">
        <div className="bg-white rounded-lg border border-gray-400 p-2  shadow-md flex items-start flex-col sm:flex-row gap-3 sm:gap-0 w-full sm:w-auto">
          <div>
            <p className="text-black font-normal text-lg max-w-xs">
              {data?.text?.length > 0 ? data?.text : "Some Text and nimadur"}{" "}
            </p>
            <div className="mt-4 rounded-md">
              <audio controls className="sm:w-[250px]">
                <source src={data?.audio} />
              </audio>
            </div>
            <div className="mt-4">
              <AvatarGroup
                onClick={() => setModal({ open: true, data: "modal data" })}
                className="w-fit"
                max={4}
                style={{ cursor: "pointer" }}
              >
                {new Array(5).fill(null).map((_, ind) => (
                  <Avatar alt={`${ind}`} src="..." />
                ))}
              </AvatarGroup>
            </div>
          </div>
          <div className="w-full">
            <div>
              <p className="text-right font-medium ">Boshlanish sanasi:</p>
              <p className="text-right font-normal ">21-12-2024</p>
            </div>
            <div className="mt-5">
              <p className="text-right font-medium">Tugash sanasi:</p>
              <p className="text-right font-normal">21-12-2024</p>
            </div>
            <div className="mt-5 ">
              <p className="text-right font-medium ">Status:</p>
              <div className="font-normal flex gap-2 items-center justify-end">
                {getStatus("jarayonda")}
                <span className="fa-solid fa-edit text-xl text-blue-500 cursor-pointer" />
              </div>
            </div>
          </div>
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
          {data?.photo?.map((item) => {
            return (
              <div className="cursor-pointer" key={item.id}>
                {console.log(item.photo.photo)}
                <img src={item.photo} className="rounded-xl" alt="" />
              </div>
            );
          })}
        </div>
      </Dialog>
    </>
  );
};

export default Tasks;
