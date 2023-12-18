import { Avatar, AvatarGroup, Chip, Dialog } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const TableTasks = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({ open: false, data: null });
  const [modalPlay, setModalPlay] = useState({ open: false, data: null });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

    const user_id = sessionStorage.getItem("user_id")
    console.log(user_id);
    async function getData() {
        const response = await axios.get(`/task/${user_id}/`);
        setData(response?.data);
    }
    console.log(data, "task");


    const getStatusColor = (status) => {
        if (status === "bajarildi") {
            return "green-500";
        } else if (status === "Bajarilmoqda") {
            return "#D6DB00";
        } else {
            return "red";
        }
    };

    return (
        <>
            <div className="grid md:grid-cols-3 justify-between mt-5">
                <div className="w-[500px] bg-white rounded-[5px] border border-zinc-800 p-5  shadow-md">
                    <div className="flex items-center justify-around gap-10">
                        <div>
                            <p className="text-black font-normal">
                                {data?.text?.length > 0 ? data?.text : "Some Text and nimadur"}{" "}
                            </p>
                            <div className="mt-4 rounded-md">
                                <audio controls className="w-[250px]">
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
                        <div>
                            <div className=" ">
                                <div className="text-black  font-medium ">
                                    Boshlanish sanasi:
                                </div>
                                <div className="text-black text-center  font-normal ">
                                    21-12-2024
                                </div>
                            </div>
                            <div className="mt-5 ">
                                <div className="text-black  font-medium ">Tugash sanasi:</div>
                                <div className="text-black text-center  font-normal ">
                                    21-12-2024
                                </div>
                            </div>
                            <div className="mt-5 ">
                                <div className="text-black text-center font-medium ">
                                    Status:
                                </div>
                                <div className="text-black font-normal flex items-center justify-between ">
                                    {data?.sector ? (
                                        <div
                                            style={{
                                                backgroundColor: getStatusColor(data.sector),
                                                padding: "5px 10px",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            {sectors?.find((i) => i.id === data.sector)?.name ||
                                                "tayinlanmadi"}
                                        </div>
                                    ) : (
                                        <div
                                            className="text-white"
                                            style={{
                                                backgroundColor: getStatusColor("default"),
                                                padding: "5px 10px",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            tayinlanmadi
                                        </div>
                                    )}
                                    <div>
                                        <span className="fa-solid fa-edit text-xl text-blue-500 cursor-pointer" />
                                    </div>
                                </div>
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

export default TableTasks;
