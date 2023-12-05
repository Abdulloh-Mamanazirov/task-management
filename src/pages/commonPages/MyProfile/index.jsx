import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const index = () => {
  const id = sessionStorage.getItem("user_id");
  const [data, setData] = useState({});

  async function getData() {
    axios.get(`/user/edit/${id}/`).then((res) => setData(res?.data));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="relative w-full min-h-[40vh] bg-gradient-to-br from-primary to-blue-400 rounded-bl-full">
        {/* image */}
        <div className="absolute z-10 bottom-0 left-10">
          <div className="w-48 aspect-square rounded-full border-2 border-primary shadow-lg bg-gradient-to-tr from-gray-300 to-white">
            <img
              src={data?.photo}
              alt="user image"
              className="w-full rounded-full object-cover"
            />
          </div>
          <p className="text-center text-lg bg-white rounded-md border p-1 shadow-lg">
            {data?.first_name?.length > 0 ? data?.first_name : "Ism"}{" "}
            {data?.last_name?.length > 0 ? data?.last_name : "Familiya"}
          </p>
        </div>

        {/* personal information */}
        <div className="grid grid-cols-3">
          <div />
          <div className="col-span-2 w-full p-2">
            <h2 className="text-center text-2xl font-medium text-white">
              Shaxsiy ma'lumotlar:
            </h2>
            <table className="w-full text-white">
              <thead>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <th className="text-left py-1">Username</th>
                  <td>
                    {data?.username?.length > 0 ? (
                      data?.username
                    ) : (
                      <em>Kiritilmagan</em>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-left py-1">Tug'ilgan sana</th>
                  <td>
                    {data?.birth_date?.length > 0 ? (
                      data?.birth_date
                    ) : (
                      <em>Kiritilmagan</em>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-left py-1">Telefon raqam</th>
                  <td>
                    {data?.phone_number?.length > 0 ? (
                      data?.phone_number
                    ) : (
                      <em>Kiritilmagan</em>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-left py-1">Asosiy vazifa</th>
                  <td>
                    {data?.main_task?.length > 0 ? (
                      data?.main_task
                    ) : (
                      <em>Kiritilmagan</em>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <th className="text-left py-1">Shior</th>
                  <td>
                    {data?.shior?.length > 0 ? (
                      data?.shior
                    ) : (
                      <em>Kiritilmagan</em>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* edit button */}
        <div className="absolute right-2 bottom-2 text-white">
          <Button
            color="inherit"
            variant="outlined"
            endIcon={<span className="fa-solid fa-edit" />}
          >
            Tahrirlash
          </Button>
        </div>
      </div>
    </>
  );
};

export default index;
