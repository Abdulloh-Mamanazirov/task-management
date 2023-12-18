import { forwardRef, useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SeeAll = ({ id, title }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  async function getData() {
    if (!open) return;
    const { data } = await axios.get(`/bolim/${id}/`);
    setData(data);
  }

  useEffect(() => {
    getData();
  }, [id, open]);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} color="success">
        <span className="fa-solid fa-eye" />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => {
          setOpen(false);
          setData(null);
        }}
        fullWidth
        keepMounted
        aria-describedby="see-modal"
      >
        <DialogTitle>Bo'lim ma'lumotlari ({title})</DialogTitle>
        <DialogContent>
          <Box component="div" sx={{ mt: 1 }}>
            {Boolean(data) ? (
              <>
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
              </>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <img src="/empty.png" alt="no data" width={100} />
                <p className="text-gray-500">Ma'lumot mavjud emas.</p>
              </div>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SeeAll;
