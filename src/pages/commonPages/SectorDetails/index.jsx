import Aos from "aos";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Pie, Rating, Stats, Tables } from "./components";

const index = () => {
  Aos.init();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const status = sessionStorage.getItem("status");
  const sector_id = sessionStorage.getItem("sector_id");
  const sectors = useSelector((state) => state.sector.sectors);

  async function getData() {
    if (id) {
      let response = await axios.get(`/bolim/statistika/${id}/`);
      setData(response?.data);
    } else {
      let response = await axios.get(`/bolim/stat/${sector_id}/`);
      setData(response?.data);
    }
  }

  async function getUsersData() {
    if (id) {
      const { data } = await axios.get(`/bolim/xodim/statistika/${id}/`);
      setUsersData(data);
    } else if (status === "manager") {
      const { data } = await axios.get(
        `/one/bolim/xodim/statistika/${sector_id}/`
      );
      setUsersData(data);
    }
  }

  useEffect(() => {
    getUsersData();
  }, [id]);

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      <div data-aos="fade-up" data-aos-delay="600">
        <Stats data={data} />
      </div>
      {sectors?.length > 0 && (
        <h2 className="text-center text-2xl mt-2">
          <span className="uppercase">
            {
              sectors?.find?.((sector) =>
                id ? sector?.id == id : sector?.id == sector_id
              )?.name
            }
          </span>{" "}
          <span>bo'limi</span>
        </h2>
      )}
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        className="mx-auto my-5 grid md:grid-cols-2 items-start"
      >
        <div className="h-96">
          <Pie data={data} />
        </div>
        <Rating users={usersData?.stat ? usersData?.stat : usersData} />
      </div>
      <div>
        <Tables
          users={usersData?.stat ? usersData?.stat : usersData}
          sectorDetails={sectors?.find?.((sector) =>
            id ? sector?.id == id : sector?.id == sector_id
          )}
        />
      </div>
    </div>
  );
};

export default index;
