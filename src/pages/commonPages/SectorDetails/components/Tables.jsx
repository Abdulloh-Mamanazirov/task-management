import Aos from "aos";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Popover } from "@mui/material";
import { setTriggerGetSectors } from "../../../../redux";
import EditModal from "./EditModal";
import { HappyFace, SadFace } from "../../../../assets";

const Table = ({ users, sectorDetails }) => {
  Aos.init();
  const navigate = useNavigate();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, data: {} });
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  async function handleDelete() {
    await axios
      .delete(`/bolim/edit/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          navigate("/");
          dispatch(setTriggerGetSectors());
          toast.info("Bo'lim o'chirildi!");
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"))
      .finally(() => {
        setAnchorEl(null);
      });
  }

  function getStatsNumber(value) {
    if (Number(value) >= 50) {
      return (
        <div
          className={`w-fit px-5 py-2 my-2 inline-flex gap-1 items-center justify-center text-finished bg-finished/10 border rounded-xl`}
        >
          <img src={HappyFace} alt="smile" className="w-5 aspect-square" />
          <p className="font-medium">{value}%</p>
        </div>
      );
    } else {
      return (
        <div
          className={`w-fit px-5 py-2 my-2 inline-flex gap-1 items-center justify-center text-missed bg-missed/10 border rounded-xl`}
        >
          <img src={SadFace} alt="smile" className="w-5 aspect-square" />
          <p className="font-medium">{value}%</p>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-lg sm:text-2xl font-medium text-center p-2">
          Topshiriqlarning bajarilish tahlili jadvali
        </h3>
        <div className="overflow-x-auto max-w-[100vw] scrollbar-gutter">
          <table className="hidden md:table w-full border text-[15px]">
            <thead className="bg-[#EEF0F4] w-full">
              <tr className="border w-full">
                <th className="border p-3">Xodim</th>
                <th className="border p-3">Jami</th>
                <th className="border p-3">O'z vaqtida bajarilishi</th>
                <th className="border p-3">Bajarilgan</th>
                <th className="border p-3">Jarayonda</th>
                <th className="border p-3">Bajarilmagan</th>
                <th className="border p-3">Bekor qilingan</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users?.map?.((item, ind) => {
                  return (
                    <tr
                      key={ind}
                      data-aos="fade-up"
                      data-aos-offset="70"
                      className="border"
                    >
                      <td className="p-2">
                        {item?.first_name + " " + item?.last_name}
                      </td>
                      <td className="p-2 text-center">
                        {isNaN(
                          item?.finished +
                            item?.doing +
                            item?.canceled +
                            item?.missed
                        )
                          ? 0
                          : item?.finished +
                            item?.doing +
                            item?.canceled +
                            item?.missed}
                      </td>
                      <td>
                        <div className="w-full grid place-items-center">
                          {getStatsNumber(
                            item?.finished_protsent
                              ? item?.finished_protsent?.toFixed(1)
                              : "50.0"
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-center">{item?.finished ?? 0}</td>
                      <td className="p-2 text-center">{item?.doing ?? 0}</td>
                      <td className="p-2 text-center">{item?.missed ?? 0}</td>
                      <td className="p-2 text-center">{item?.canceled ?? 0}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center gap-3">
                      <img src="/empty.png" alt="no data" width={100} />
                      <p className="text-gray-500">Ma'lumot mavjud emas.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full flex items-center justify-end gap-5 mt-20">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setEditModal({ open: true, data: sectorDetails });
          }}
          startIcon={<span className="fa-solid fa-edit" />}
        >
          Tahrirlash
        </Button>
        <Button
          color="error"
          variant="outlined"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          size="small"
        >
          <span className="fa-solid fa-trash text-lg" />
        </Button>
      </div>
      {/* pop confirm */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: "5px 10px" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="fa-solid fa-trash text-red-500" />
            <p className="text-lg font-medium">
              Bu bo'limni o'chirmoqchimisiz?
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              onClick={() => setAnchorEl(null)}
              variant="outlined"
              color="primary"
              size="small"
            >
              Yo'q
            </Button>
            <Button
              onClick={() => handleDelete()}
              variant="contained"
              color="error"
              size="small"
            >
              Ha
            </Button>
          </div>
        </Box>
      </Popover>

      {/* edit Modal */}
      <EditModal
        open={editModal?.open}
        data={editModal?.data}
        handleClose={() => {
          setEditModal({ open: false, data: {} });
        }}
      />
    </div>
  );
};

export default Table;
