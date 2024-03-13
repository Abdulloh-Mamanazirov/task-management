import Aos from "aos";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Popover } from "@mui/material";
import { setTriggerGetSectors } from "../../../../redux";
import EditModal from "./EditModal";

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

  function getStatsNumber(color, value, shape) {
    if (shape === "rectangle") {
      return (
        <div
          className={`${color} text-${
            color === "yellow" ? "black" : "white"
          } w-full p-3 inline-flex items-center justify-center`}
        >
          {value}
        </div>
      );
    } else {
      return (
        <div
          className={`${color} text-${
            color === "bg-status-yellow" ? "black" : "white"
          } w-10 aspect-square rounded-full border border-black shadow-md shadow-black mx-auto inline-flex items-center justify-center`}
        >
          {value}
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
              {users?.length > 0 ? (
                users?.map?.((item, ind) => {
                  return (
                    <tr
                      key={ind}
                      data-aos="fade-up"
                      data-aos-offset="70"
                      className="border"
                    >
                      <td className="border p-2">
                        {item?.first_name + " " + item?.last_name}
                      </td>
                      <td className="border p-2">
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
                      <td className="border">
                        {getStatsNumber(
                          item?.finished_protsent < 60
                            ? "bg-status-red"
                            : item?.finished_protsent < 80
                            ? "bg-status-orange"
                            : "bg-status-green",
                          `${
                            item?.finished_protsent
                              ? item?.finished_protsent?.toFixed(2)
                              : "0"
                          } %`,
                          "rectangle"
                        )}
                      </td>
                      <td className="border p-2">
                        {getStatsNumber("bg-status-green", item?.finished ?? 0)}
                      </td>
                      <td className="border p-2">
                        {getStatsNumber("bg-status-yellow", item?.doing ?? 0)}
                      </td>
                      <td className="border p-2">
                        {getStatsNumber("bg-status-red", item?.missed ?? 0)}
                      </td>
                      <td className="border p-2">
                        {getStatsNumber("bg-status-gray", item?.canceled ?? 0)}
                      </td>
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
