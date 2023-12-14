import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import LeftSideTask from "./LeftSideTask";
import RightSideTask from "./RightSideTask";

const Create = () => {
  const { task } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  async function handleCreateTask() {
    setLoading(true); 
    const formData = new FormData();
    formData.append("text", task.text);
    formData.append("photo", task.photo);
    formData.append("audio", task.audio);
    formData.append("deadline", task.deadline);
    formData.append("_to", task._to);
    await axios
      .patch("/task/", formData
      // , {
      //   headers: {
          // "Content-Disposition": "filename.jpg",
        //   "Accept-Encoding": "gzip, deflate, br",
        //   "Accept-Language":
        //     "en-GB,en;q=0.9,ru-RU;q=0.8,ru;q=0.7,en-US;q=0.6,uz;q=0.5",
        //   Connection: "keep-alive",
        //   "Content-Disposition": 'attachment; filename="filename.jpg"'

        // },
      // }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
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
