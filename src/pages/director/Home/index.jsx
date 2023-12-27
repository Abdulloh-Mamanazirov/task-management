import { useEffect, useState } from "react";
import { Bar, Pie, HorizontalBar, HomeTable } from "./components";
import axios from "axios";

const index = () => {
  const [data, setData] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const status = sessionStorage.getItem("status");
  const user_id = sessionStorage.getItem("user_id");

  async function getData() {
    if (status === "manager") {
      const response = await axios.get(`/task/one/manager/${user_id}/`);
      setData(response?.data);
    } else {
      const response = await axios.get(`/task/${user_id}/`);
      setData(response?.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  window.onresize = (e) => {
    setWindowWidth(e.target.innerWidth);
  };
  console.log(data);

  return (
    <div>
      {/* <Bar /> */}
      <Pie />
      <hr className="my-10" />
      <HorizontalBar />
      <div>
        <HomeTable data={data} />
      </div>
    </div>
  );
};

export default index;
