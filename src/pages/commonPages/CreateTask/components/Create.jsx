import React from "react";
import { useSelector } from "react-redux";
import LeftSideTask from "./LeftSideTask";
import RightSideTask from "./RightSideTask";

const Create = () => {
  const { task } = useSelector((state) => state);
  console.log(task);
  return (
    <div className="grid gap-5 md-lg:grid-cols-2 justify-around items-start">
      <LeftSideTask />
      <RightSideTask />
    </div>
  );
};

export default Create;
