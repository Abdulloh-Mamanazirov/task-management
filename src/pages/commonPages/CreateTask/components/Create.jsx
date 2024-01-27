import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LeftSideTask from "./LeftSideTask";
import RightSideTask from "./RightSideTask";

const Create = () => {
  const { task } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const status = sessionStorage.getItem("status");
  const sector_id = sessionStorage.getItem("sector_id");

  function returnUrl() {
    if (status === "director" || status === "admin") {
      if (task._to_status === "xodim") {
        return "/task/";
      } else if (task._to_status === "manager") {
        return "/task/to_manager/";
      }
    } else if (status === "manager") {
      return `/task/bolim/${sector_id}/`;
    }
  }

  async function handleCreateTask() {
    setLoading(true);
    const formData = new FormData();
    formData.append("text", JSON.stringify(task.text));
    for (let i = 0; i < task.photo.length; i++) {
      formData.append("photo", task.photo[i]);
    }
    formData.append("audio", task.audio);
    formData.append("deadline", task.deadline);
    formData.append("muammo", task.problem);
    formData.append("help", task.help ? "True" : "False");
    formData.append("_to", task._to);

    if (!task._to) {
      setLoading(false);
      return toast.warning("Vazifani qabul qiluvchini tanlang!");
    }

    await axios
      .patch(returnUrl(), formData)
      .then((res) => {
        if (res?.data?.id) {
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
