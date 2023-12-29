import Aos from "aos";
import axios from "axios";
import { Stats } from "../../../components";
import { useEffect, useState } from "react";
import { Pie, Results, ThreePage } from "./components";

const index = () => {
  Aos.init();
  const [data, setData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const user_id = sessionStorage.getItem("user_id");

  async function getData() {
    const response = await axios.get(`/task/one/manager/${user_id}/`);
    setData(response?.data?.filter((item) => item.status === "doing"));
    const res = await axios.get(
      `/manager/statistika/${sessionStorage.getItem("user_id")}/`
    );
    setStatsData(res?.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Stats
        all={
          statsData?.finished +
          statsData?.doing +
          statsData?.missed +
          statsData?.canceled
        }
        finished={statsData?.finished}
        doing={statsData?.doing}
        missed={statsData?.missed}
        cancelled={statsData?.canceled}
      />
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
          <p className="border-b py-2 font-medium ">Diagramm</p>
          <Pie data={statsData} />
        </div>

        <div
          data-aos="fade-right"
          data-aos-delay="700"
          className="shadow-md rounded-md overflow-y-auto p-5 w-full h-[350px]"
        >
          <p className="border-b py-2 font-medium ">Mavjud topshiriqlar</p>
          <ThreePage data={data} />
        </div>
      </div>
    </>
  );
};

export default index;
