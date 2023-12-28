import Aos from "aos";
import axios from "axios";
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
      {/* <Bar /> */}
      <div className="grid md:grid-cols-2">
        <div data-aos="fade-right" data-aos-delay="500" className="h-96">
          <Pie data={data} />
        </div>
        <div data-aos="fade-right" data-aos-delay="700" className="h-96">
          <HorizontalBar data={sectorsData} />
        </div>
      </div>
      <div data-aos="fade-up" data-aos-delay="600">
        <HomeTable />
      </div>
    </div>
  );
};

export default index;
