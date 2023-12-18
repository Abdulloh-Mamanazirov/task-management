import axios from "axios";
import { useEffect, useState } from "react";
import { Tasks, Calendar } from "./components";

const index = () => {
  const [data, setData] = useState();
  const user_id = sessionStorage.getItem("user_id");

  async function getData() {
    const response = await axios.get(`/task/${user_id}/`);
    setData(response?.data);
  }

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
      <div>
        <Calendar data={data} />
      </div>
      <div>
        <Tasks data={data} />
      </div>
    </>
  );
};

export default index;
