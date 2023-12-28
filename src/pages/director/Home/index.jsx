import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Pie, HorizontalBar, HomeTable } from "./components";

const index = () => {
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
        <div className="h-96">
          <Pie data={data} />
        </div>
        <div className="h-96">
          <HorizontalBar data={sectorsData} />
        </div>
      </div>
      <div>
        <HomeTable />
      </div>
    </div>
  );
};

export default index;
