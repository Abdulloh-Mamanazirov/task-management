import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LeftSideTask from "./LeftSideTask";
import RightSideTask from "./RightSideTask";
import { toast } from "react-toastify";
import { removeTask } from "../../../../redux";

const Create = () => {
  const { task } = useSelector((state) => state);
  const dispatch = useDispatch();
  const status = sessionStorage.getItem("status");
  const [loading, setLoading] = useState(false);

  async function handleCreateTask() {
    setLoading(true);
    const formData = new FormData();
    formData.append("text", JSON.stringify(task.text));
    formData.append("photo", task.photo);
    formData.append("audio", task.audio);
    formData.append("deadline", task.deadline);
    formData.append("_to", task._to);
    await axios
      .patch(status === "manager" ? "/task/" : "/task/to_manager/", formData)
      .then((res) => {
        if (res?.data?.id) {
          dispatch(removeTask());
          toast.success("Vazifa yuklandi!");
        }
      })
      .catch((err) => toast.error("Vazifa yuklashda xato!"))
      .finally(() => setLoading(false));
  }
  return (
    <div className="grid gap-5 md-lg:grid-cols-2 justify-around items-start">
      <LeftSideTask />
      <div>
        <RightSideTask />
        <div className="mt-5">
          <Button
            disabled={loading}
            startIcon={
              <span hidden={!loading} className="fa-solid fa-spinner fa-spin" />
            }
            onClick={handleCreateTask}
            variant="contained"
            color="primary"
          >
            Vazifani yuklash
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
