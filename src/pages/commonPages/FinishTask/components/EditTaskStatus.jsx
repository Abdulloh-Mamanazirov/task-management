import axios from "axios";
import { forwardRef, useState } from "react";
import {
  Box,
  Slide,
  Radio,
  Dialog,
  Button,
  RadioGroup,
  DialogTitle,
  DialogContent,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditTaskStatus = ({ data, hidden }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { status } = e.target;
    const editData = {
      status: status.value,
    };
    await axios
      .patch(
        `/finish/task/${data?.id}/${data?.to_id}/${data?.from_id}/`,
        editData
      )
      .then((res) => {
        if (res.status === 200) {
          setOpen(false);
          navigate(-1);
          toast.success("Vazifa xolati tahrirladi");
        }
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi!"))
      .finally(() => setLoading(false));
  }

  return (
    <div hidden={hidden}>
      <span
        role={"button"}
        onClick={() => setOpen(true)}
        className="fa-solid fa-edit text-xl text-blue-500 cursor-pointer"
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        keepMounted
        aria-describedby="edit-status-modal"
      >
        <DialogTitle>{"Vazifa xolati"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <RadioGroup
              row
              defaultValue={data?.status}
              name="status"
              aria-labelledby="edit-status-modal"
            >
              <FormControlLabel
                value="finished"
                control={
                  <Radio
                    sx={{
                      color: "#14FF00",
                      "&.Mui-checked": {
                        color: "#14FF00",
                      },
                    }}
                  />
                }
                label="Bajarildi"
              />
              <FormControlLabel
                value="doing"
                control={
                  <Radio
                    sx={{
                      color: "#FFF500",
                      "&.Mui-checked": {
                        color: "#FFF500",
                      },
                    }}
                  />
                }
                label="Jarayonda"
              />
              <FormControlLabel
                value="canceled"
                control={
                  <Radio
                    sx={{
                      color: "gray",
                      "&.Mui-checked": {
                        color: "gray",
                      },
                    }}
                  />
                }
                label="Bekor qilindi"
              />
            </RadioGroup>
            <div className="flex items-center gap-3">
              <Button
                type="reset"
                onClick={() => setOpen(false)}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                startIcon={
                  <span
                    hidden={!loading}
                    className="fa-solid fa-spinner fa-spin"
                  />
                }
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Yuborish
              </Button>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTaskStatus;
