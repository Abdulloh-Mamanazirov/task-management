import axios from "axios";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { EditModal, ImageUpload } from "./components";

const index = () => {
  const id = sessionStorage.getItem("user_id");
  const [data, setData] = useState({});
  const [imageUpdate, setImageUpdate] = useState(false);

  const [editModal, setEditModal] = useState({ open: false, data: {} });

  async function getData() {
    axios.get(`/user/edit/${id}/`).then((res) => setData(res?.data));
  }

  useEffect(() => {
    getData();
  }, []);

  function handleMouseEnterImage(e) {
    setImageUpdate(true);
  }

  function handleMouseLeaveImage(e) {
    setImageUpdate(false);
  }

  return (
    <>
      <div className="relative w-full min-h-[40vh] bg-gradient-to-br from-primary to-blue-400 rounded-tr-full md-lg:rounded-bl-full md-lg:rounded-tr-none">
        {/* image */}
        <div className="w-fit ml-auto md-lg:absolute z-10 bottom-0 left-10">
          <div
            onMouseOver={handleMouseEnterImage}
            onMouseOut={handleMouseLeaveImage}
            className="relative w-48 aspect-square rounded-full border-2 border-primary shadow-lg bg-gradient-to-tr from-gray-300 to-white"
          >
            <img
              src={data?.photo}
              alt="user image"
              className="w-full rounded-full aspect-square object-cover"
            />
            <div
              className={`${imageUpdate ? "grid" : "hidden"
                } place-items-center absolute inset-0 rounded-full transition-all duration-300 bg-black/30`}
            >
              <ImageUpload id={id} handleClose={getData} />
            </div>
          </div>
          <p className="w-fit mx-auto text-center text-lg bg-white rounded-md border p-1 shadow-lg">
            {data?.first_name?.length > 0 ? data?.first_name : "Ism"}{" "}
            {data?.last_name?.length > 0 ? data?.last_name : "Familiya"}
          </p>
        </div>

        {/* personal information */}
        <div className="md-lg:grid grid-cols-3">
          <div />
          <div className="md-lg:col-span-2 w-full p-2">
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
                  <th className="text-left py-1">Status</th>
                  <td>
                    {data?.status?.length > 0 ? (
                      data?.status
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
            {/* edit button */}
            <div className="w-fit ml-auto mt-3 text-white">
              <Button
                color="inherit"
                variant="outlined"
                endIcon={<span className="fa-solid fa-edit" />}
                onClick={() => {
                  setEditModal({ open: true, data });
                }}
              >
                Tahrirlash
              </Button>
            </div>
          </div>
        </div>
      </div>
      <EditModal
        open={editModal?.open}
        data={editModal?.data}
        handleClose={() => {
          setEditModal({ open: false, data: {} });
          getData();
        }}
      />
    </>
  );
};

export default index;
