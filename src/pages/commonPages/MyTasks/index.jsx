import axios from "axios";
import { useEffect, useState } from "react";
import { Tasks, Calendar, MyTaskTable } from "./components";

const index = () => {
  const [data, setData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [fromManagerData, setFromManagerData] = useState([]);
  const status = sessionStorage.getItem("status");
  const user_id = sessionStorage.getItem("user_id");

  async function getData() {
    if (status === "xodim") {
      const response = await axios.get(`/task/${user_id}/`);
      setData(response?.data);
      const res = await axios.get(`/task/one/manager/${user_id}/`);
      setFromManagerData(res?.data);
    } else if (status === "manager") {
      const response = await axios.get(
        `/tasks/to_assigned/manager/${user_id}/`
      );
      setData(response?.data?.manager_tasks);
      const res = await axios.get(`/tasks/manager/to_xodim/${user_id}/`);
      setFromManagerData(res?.data?.manager_tasks);
    }
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
        <Calendar
          data={status === "xodim" ? [...data, ...fromManagerData] : data}
        />
      </div>
      {windowWidth > 1 ? (
        <div className="overflow-x-auto scrollbar-gutter">
          <MyTaskTable
            data={data}
            fromManagerData={fromManagerData}
            getData={getData}
          />
        </div>
      ) : (
        <div>
          <Tasks
            data={status === "xodim" ? [...data, ...fromManagerData] : data}
            getData={getData}
          />
        </div>
      )}
    </>
  );
};

export default index;
