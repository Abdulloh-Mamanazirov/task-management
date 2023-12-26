import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Table = () => {
  // const { id } = useParams();
  // const [data, setData] = useState(null);
  // const status = sessionStorage.getItem("status");

  // async function getData() {
  //   if (status === "director") {
  //     const { data } = await axios.get(`/bolim/${id}/`);
  //     setData(data);
  //   } else if (status === "manager") {
  //     const { data } = await axios.get(
  //       `/bolim/${sessionStorage.getItem("sector_id")}/`
  //     );
  //     setData(data);
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // }, [id]);

  function getStatsNumber(color, value, shape) {
    if (shape === "rectangle") {
      return (
        <div
          className={`bg-status-${color} text-${
            color === "yellow" ? "black" : "white"
          } w-full p-3 inline-flex items-center justify-center`}
        >
          {value}
        </div>
      );
    } else {
      return (
        <div
          className={`bg-status-${color} text-${
            color === "yellow" ? "black" : "white"
          } w-10 aspect-square rounded-full border border-black shadow-md shadow-black mx-auto inline-flex items-center justify-center`}
        >
          {value}
        </div>
      );
    }
  }

  return (
    <div>
      {/* {Boolean(data) ? (
        <div className="mt-5 overflow-x-auto">
          <div className="text-lg flex items-center gap-3">
            <h3 className="font-medium">Menejer:</h3>
            <p>
              {data?.manager?.user?.first_name ?? (
                <em className="text-sm">Ism kiritilmagan</em>
              )}{" "}
              {data?.manager?.user?.last_name ?? (
                <em className="text-sm">Familiya kiritilmagan</em>
              )}
            </p>
          </div>
          <hr className="my-3" />
          <div>
            <h3 className="text-lg font-medium">
              Xodimlar ro'yxati ({data?.xodim?.length} ta):
            </h3>
            <table className="w-full text-center border">
              <thead>
                <tr className="border">
                  <th className="border p-2">Ism</th>
                  <th className="border p-2">Familiya</th>
                </tr>
              </thead>
              <tbody>
                {data?.xodim?.map?.((e, ind) => (
                  <tr key={ind} className="border">
                    <td className="border p-2">
                      {e?.user?.first_name?.length > 0 ? (
                        e?.user?.first_name
                      ) : (
                        <em className="text-sm">Ism kiritilmagan</em>
                      )}
                    </td>
                    <td className="border p-2">
                      {e?.user?.last_name?.length > 0 ? (
                        e?.user?.last_name
                      ) : (
                        <em className="text-sm">Familiya kiritilmagan</em>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 mt-5 overflow-x-auto">
          <img src="/empty.png" alt="no data" width={100} />
          <p className="text-gray-500">Ma'lumot mavjud emas.</p>
        </div>
      )} */}

      <div className="mb-2">
        <h3 className="text-lg sm:text-2xl font-medium text-center p-2">
          Topshiriqlarning bajarilish tahlili jadvali
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-center border">
            <thead className="bg-dark-blue text-white">
              <tr className="border">
                <th className="border p-3">Xodimlar</th>
                <th className="border p-3">Jami</th>
                <th className="border p-3">O'z vaqtida bajarilishi</th>
                <th className="border p-3">Bajarilgan</th>
                <th className="border p-3">Jarayonda</th>
                <th className="border p-3">Bajarilmagan</th>
                <th className="border p-3">Bekor qilingan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <td className="border p-2">John Doe</td>
                <td className="border p-2">12</td>
                <td className="border">
                  {getStatsNumber("orange", "80%", "rectangle")}
                </td>
                <td className="border p-2">{getStatsNumber("green", 5)}</td>
                <td className="border p-2">{getStatsNumber("yellow", 3)}</td>
                <td className="border p-2">{getStatsNumber("red", 2)}</td>
                <td className="border p-2">{getStatsNumber("gray", 1)}</td>
              </tr>
              <tr className="border">
                <td className="border p-2">Sarah Thompson</td>
                <td className="border p-2">20</td>
                <td className="border">
                  {getStatsNumber("green", "88%", "rectangle")}
                </td>
                <td className="border p-2">{getStatsNumber("green", 5)}</td>
                <td className="border p-2">{getStatsNumber("yellow", 3)}</td>
                <td className="border p-2">{getStatsNumber("red", 2)}</td>
                <td className="border p-2">{getStatsNumber("gray", 1)}</td>
              </tr>
              <tr className="border">
                <td className="border p-2">Arthur Johnathan</td>
                <td className="border p-2">16</td>
                <td className="border">
                  {getStatsNumber("red", "60%", "rectangle")}
                </td>
                <td className="border p-2">{getStatsNumber("green", 5)}</td>
                <td className="border p-2">{getStatsNumber("yellow", 3)}</td>
                <td className="border p-2">{getStatsNumber("red", 2)}</td>
                <td className="border p-2">{getStatsNumber("gray", 1)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
