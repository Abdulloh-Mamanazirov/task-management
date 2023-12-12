import React from "react";
import LeftSideTask from "./LeftSideTask";
import RightSideTask from "./RightSideTask";

const Create = () => {
  return (
    <div className="grid gap-5 md-lg:grid-cols-2 justify-around items-start">
      <LeftSideTask />
      <RightSideTask />
    </div>
  );
};

export default Create;
