import Aos from "aos";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pie, Results, ThreePage } from "./components";

const index = () => {
  Aos.init();
  const [data, setData] = useState(null);
  const [statsData, setStatsData] = useState(null);

  async function getData() {
    const response = await axios.get(
      `/task/${sessionStorage.getItem("user_id")}/`
    );
    setData(response?.data?.filter((item) => item.status === "doing"));
    const res = await axios.get(
      `/xodim/statistika/${sessionStorage.getItem("user_id")}/`
    );
    setStatsData(res?.data);
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
        className="shadow-md rounded-md p-5 h-96 w-full min-w-[90vw] sm:min-w-0"
      >
        <p className="border-b py-2 font-medium">Diagramm</p>
        <Pie data={statsData} />
      </div>

      <div
        data-aos="fade-right"
        data-aos-delay="700"
        className="shadow-md rounded-md  p-5 overflow-y-auto w-full h-[350px]"
      >
        <p className="border-b py-2 font-medium ">Mavjud topshiriqlar</p>
        <ThreePage data={data} />
      </div>
    </div>
  );
};

export default index;
