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
            <div className="grid md:grid-cols-3 gap-10 justify-between mt-5">
                <div className="md:w-full bg-white rounded-[5px] border border-zinc-800 p-5  shadow-md">
                    <div className="flex items-center justify-around gap-10">
                        <div>
                            <p className="text-black font-normal">
                                some text here and <br /> here and here
                            </p>
                            <div className="mt-4 rounded-md">
                                <audio controls className="w-[250px]">
                                    <source src=" https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" />
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
                            <div className="mt-5 ml-5 ">
                                <div className="text-black  font-medium ">
                                    Tugash sanasi:
                                </div>
                                <div className="text-black text-center  font-normal ">
                                    21-12-2024
                                </div>
                            </div>
                            <div className="mt-5 ">
                                <div className="text-black text-center font-medium ">
                                    Status:
                                </div>
                                <div className="text-black font-normal flex items-center justify-between ">
                                    <Chip
                                        label={
                                            data?.sector
                                                ? sectors?.map?.(
                                                    (i) => i.id === data?.sector && i.name
                                                )
                                                : "tayinlanmadi"
                                        }
                                        color={data?.sector ? "primary" : "error"}
                                        variant="outlined"
                                    />
                                    <div>
                                        <span className="fa-solid fa-edit text-xl text-blue-500 cursor-pointer" />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-full  bg-white rounded-[5px] border border-zinc-800 p-5">
                    <div className="flex items-center justify-around gap-10">
                        <div>
                            <p className="text-black font-normal">
                                some text here and <br /> here and here
                            </p>
                            <div className="mt-4 rounded-md">
                                <audio controls className="w-[250px]">
                                    <source src=" https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" />
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
                            <div className="mt-5 ml-5">
                                <div className="text-black font-medium ">
                                    Tugash sanasi:
                                </div>
                                <div className="text-black text-center  font-normal ">
                                    21-12-2024
                                </div>
                            </div>
                            <div className="mt-5 ">
                                <div className="text-black text-center font-medium ">
                                    Status:
                                </div>
                                <div className="text-black font-normal flex items-center justify-between ">
                                    <Chip
                                        label={
                                            data?.sector
                                                ? sectors?.map?.(
                                                    (i) => i.id === data?.sector && i.name
                                                )
                                                : "tayinlanmadi"
                                        }
                                        color={data?.sector ? "primary" : "error"}
                                        variant="outlined"
                                    />
                                    <div>
                                        <span className="fa-solid fa-edit text-xl text-blue-500 cursor-pointer" />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-full  bg-white rounded-[5px] border border-zinc-800 p-5">
                    <div className="flex items-center justify-around gap-10">
                        <div>
                            <p className="text-black font-normal">
                                some text here and <br /> here and here
                            </p>
                            <div className="mt-4 rounded-md">
                                <audio controls className="w-[250px]">
                                    <source src=" https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" />
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
                            <div className="mt-5 ml-5">
                                <div className="text-black  font-medium ">
                                    Tugash sanasi:
                                </div>
                                <div className="text-black text-center  font-normal ">
                                    21-12-2024
                                </div>
                            </div>
                            <div className="mt-5 ">
                                <div className="text-black text-center font-medium ">
                                    Status:
                                </div>
                                <div className="text-black font-normal flex items-center justify-between ">
                                    <Chip
                                        label={
                                            data?.sector
                                                ? sectors?.map?.(
                                                    (i) => i.id === data?.sector && i.name
                                                )
                                                : "tayinlanmadi"
                                        }
                                        color={data?.sector ? "primary" : "error"}
                                        variant="outlined"
                                    />
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
