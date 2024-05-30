import React from "react";
import { Pfp } from "../../../../assets";

const UserRankingRow = ({ data }) => {
  return (
    <div className="w-full p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <img
          src={Pfp}
          alt="profile"
          className="w-8 aspect-square rounded-full object-cover outline outline-1 outline-gray-200"
        />
        <p>{data?.first_name + " " + data?.last_name}</p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="relative h-2">
          <div
            className={`z-[1] absolute h-2 bg-finished rounded-full`}
            style={{ width: `${Number(data?.finished_protsent).toFixed(0)}%` }}
          ></div>
          <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <p>{data?.place}-o'rin</p>
          <p>{Number(data?.finished_protsent).toFixed(2)}%</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

const UserRankingTable = ({ users }) => {
  return (
    <div className="w-full bg-white rounded-3xl mt-5 mb-3">
      <h3 className="text-xl pt-5 pl-5 font-medium">Xodimlar</h3>
      {users
        ?.sort?.((a, b) => b.finished_protsent - a.finished_protsent)
        ?.map((item, ind) => (
          <UserRankingRow key={ind} data={{ ...item, place: ind + 1 }} />
        ))}
    </div>
  );
};

export default UserRankingTable;
