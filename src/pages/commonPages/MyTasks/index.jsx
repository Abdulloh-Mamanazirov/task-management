import axios from "axios";
import { useEffect, useState } from "react";
import { Tasks, Calendar, MyTaskTable } from "./components";

const index = () => {
  const [data, setData] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const user_id = sessionStorage.getItem("user_id");

  async function getData() {
    const response = await axios.get(`/task/${user_id}/`);
    setData(response?.data);
  }

  useEffect(() => {
    getData();
  }, []);

  window.onresize = (e) => {
    setWindowWidth(e.target.innerWidth);
  };

  return (
    <>
      <div>
        <Calendar data={data} />
      </div>
      {windowWidth > 1000 ? (
        <div className="overflow-x-auto">
          <MyTaskTable data={data} />
        </div>
      ) : (
        <div>
          <Tasks data={data} />
        </div>
      )}
    </>
  );
};

export default index;
