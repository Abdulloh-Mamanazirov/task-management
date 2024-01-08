import Aos from "aos";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pie, Rating, Tables } from "./components";

const index = () => {
  Aos.init();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [usersData, setUsersData] = useState(null);
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

  async function getUsersData() {
    if (status === "director") {
      const { data } = await axios.get(`/bolim/xodim/statistika/${id}/`);
      setUsersData(data);
    } else if (status === "manager") {
      const { data } = await axios.get(
        `/bolim/xodim/statistika/${sessionStorage.getItem("sector_id")}/`
      );
      setUsersData(data);
    }
  }

  useEffect(() => {
    getUsersData();
  }, [id]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        className="mx-auto h-96 my-5 grid md:grid-cols-2 items-start"
      >
        <Pie data={data} />
        <Rating users={usersData} />
      </div>
      <div>
        <Tables users={usersData} />
      </div>
    </div>
  );
};

export default index;
