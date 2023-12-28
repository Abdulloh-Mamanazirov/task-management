import Aos from "aos";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pie, Tables } from "./components";

const index = () => {
  Aos.init();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const status = sessionStorage.getItem("status");
  const sector_id = sessionStorage.getItem("sector_id");

  async function getData() {
    if (status === "director") {
      let response = await axios.get(`/bolim/statistika/${id}/`);
      setData(response?.data);
    } else {
      let response = await axios.get(`/bolim/statistika/${sector_id}/`);
      setData(response?.data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div data-aos="fade-up" data-aos-delay="600" className="mx-auto h-96">
        <Pie data={data} />
      </div>
      <div>
        <Tables />
      </div>
    </div>
  );
};

export default index;
