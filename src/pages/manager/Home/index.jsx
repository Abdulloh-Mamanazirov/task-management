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
    const response = await axios.get(`/tasks/to_assigned/manager//${user_id}/`);
    setData(
      response?.data?.manager_tasks?.filter((item) => item.status === "doing")
    );
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
      <div className="grid gap-5 mt-5">
        {/* <div className="shadow-md rounded-md h-[400px] p-5">
        <p className="border-b py-2 font-medium ">Your stats</p>
        <Results />
      </div> */}

        <div
          data-aos="fade-right"
          data-aos-delay="500"
          className="w-full bg-white rounded-3xl mt-5 mb-3"
        >
          <h3 className="text-xl pt-5 pl-5 font-medium">Umumiy statistika</h3>
          <div className="h-96 w-full lg:w-2/3">
            <Pie data={statsData} />
          </div>
        </div>

        <div data-aos="fade-right" className="w-full bg-white rounded-3xl mb-3">
          <h3 className="text-xl pt-5 pl-5 font-medium">Mavjud topshiriqlar</h3>
          <div className="overflow-y-auto max-h-[265px]">
            <ThreePage data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
