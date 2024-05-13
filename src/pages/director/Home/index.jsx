import Aos from "aos";
import axios from "axios";
import { Stats } from "../../../components";
import { useEffect, useState } from "react";
import { Bar, Pie, HorizontalBar, HomeTable } from "./components";

const index = () => {
  Aos.init();
  const [data, setData] = useState(null);
  const [sectorsData, setSectorsData] = useState(null);

  async function getData() {
    let response = await axios.get("/general/statistika/");
    setData(response?.data);
    let res = await axios.get("/all/bolim/statistika/");
    setSectorsData(res?.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Stats
        all={data?.all_tasks}
        finished={data?.finished}
        doing={data?.doing}
        missed={data?.missed}
        canceled={data?.canceled}
      />
      {/* <Bar /> */}
      <div>
        <div
          data-aos="fade-right"
          data-aos-delay="500"
          className="w-full bg-white rounded-3xl mt-5 mb-3"
        >
          <h3 className="text-xl pt-5 pl-5 font-medium">Umumiy statistika</h3>
          <div className="h-96 w-full lg:w-2/3">
            <Pie data={data} />
          </div>
        </div>
        <div
          data-aos="fade-right"
          data-aos-delay="500"
          className="w-full bg-white rounded-3xl mt-5 mb-3"
        >
          <h3 className="text-xl pt-5 pl-5 font-medium">
            Yillik statistika diagrammasi
          </h3>
          <div className="h-96 w-full">
            <HorizontalBar data={sectorsData} />
          </div>
        </div>
      </div>
      <div data-aos="fade-up" data-aos-delay="600" data-aos-offset="0">
        <HomeTable getStats={getData} />
      </div>
    </div>
  );
};

export default index;
