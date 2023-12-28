import Aos from "aos";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pie, Results, ThreePage } from "./components";

const index = () => {
  Aos.init();
  const [data, setData] = useState(null);
  const user_id = sessionStorage.getItem("user_id");

  async function getData() {
    const response = await axios.get(`/task/one/manager/${user_id}/`);
    setData(response?.data?.filter((item) => item.status === "doing"));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid md-lg:grid-cols-2 gap-5 items-start justify-between">
      {/* <div className="shadow-md rounded-md h-[400px] p-5">
        <p className="border-b py-2 font-medium ">Your stats</p>
        <Results />
      </div> */}

      <div
        data-aos="fade-right"
        data-aos-delay="500"
        className="shadow-md rounded-md p-5 h-96"
      >
        <p className="border-b py-2 font-medium ">Diagramm</p>
        <Pie />
      </div>

      <div
        data-aos="fade-right"
        data-aos-delay="700"
        className="shadow-md rounded-md overflow-y-auto p-5 h-[350px]"
      >
        <p className="border-b py-2 font-medium ">Mavjud topshiriqlar</p>
        <ThreePage data={data} />
      </div>
    </div>
  );
};

export default index;
