import Aos from "aos";
import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, AvatarGroup, Checkbox, Dialog } from "@mui/material";

const HomeTable = () => {
  Aos.init();
  const [modal, setModal] = useState({ open: false, data: null });
  const [data, setData] = useState(null);

  async function getData() {
    let response = await axios.get("/all/tasks/");
    setData([
      ...response?.data?.manager_tasks,
      ...response?.data?.xodimlar_tasks,
    ]);
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

  return (
    <div className="mt-16 overflow-x-auto max-w-[100vw] scrollbar-gutter">
      <div className="hidden sm:flex justify-around gap-2 whitespace-nowrap">
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
      <div className="mb-2 mt-5">
        <div className="w-full">
          <table className="w-full text-center border">
            <thead className="bg-[#F3C206]">
              <tr className="border">
                <th className="border p-3">No_</th>
                <th className="border p-3">Bo'lim</th>
                <th className="border p-3">Topshiriq</th>
                <th className="border p-3">Sabab</th>
                <th className="border p-3">Tadbir</th>
                <th className="border p-3">Mas'ul</th>
                <th className="border p-3 w-32">Muddat</th>
                <th className="border p-3">Jami muddat</th>
                <th className="border p-3">Qolgan kun(lar)</th>
                <th className="border p-3">Xolati</th>
                <th className="border p-3">Moliyaviy ko'mak</th>
                <th className="border p-3">Arxivlash</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-dark-blue text-white">
                <td colSpan={12}>Qisqa muddatli</td>
              </tr>
              {Array.isArray(data)
                ? data
                    ?.filter?.((item) => findDiffFromNow(item?.deadline) < 30)
                    ?.map?.((item, index) => (
                      <tr
                        data-aos="fade-up"
                        data-aos-offset="100"
                        key={item?.id}
                        className="border"
                      >
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2 min-w-[100px]">
                          {item?.bolim}
                        </td>
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
                        <td className="border p-2">{item?.reason}</td>{" "}
                        <td className="border p-2">{item?.event}</td>
                        <td className="border p-2">
                          {item?.first_name + " " + item?.last_name}
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
                              -{findDiffFromNow(item?.deadline)}
                            </span>
                          )}
                        </td>
                        <td className="border p-2">
                          <div className="font-normal flex gap-2 items-center justify-center">
                            {getStatus(item?.status)}
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
                      <td className="border p-2 text-center" colSpan={11}>
                        Bo'sh
                      </td>
                    </tr>
                  ))}
              <tr className="bg-dark-blue text-white">
                <td colSpan={12}>Uzoq muddatli</td>
              </tr>
              {Array.isArray(data)
                ? data
                    ?.filter?.((item) => findDiffFromNow(item?.deadline) > 30)
                    ?.map?.((item, index) => (
                      <tr
                        data-aos="fade-up"
                        data-aos-offset="100"
                        key={item?.id}
                        className="border"
                      >
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2 min-w-[100px]">
                          {item?.bolim}
                        </td>
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
                        <td className="border p-2">{item?.reason}</td>{" "}
                        <td className="border p-2">{item?.event}</td>
                        <td className="border p-2">
                          {item?.first_name + " " + item?.last_name}
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
                          <div className="font-normal flex gap-2 items-center justify-center">
                            {getStatus(item?.status)}
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

export default HomeTable;
