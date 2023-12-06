import { Pie, Results, ThreePage } from "./components";

const index = () => {
  return (
    <div className="grid md:grid-cols-3 gap-5 items-start justify-between">
      <div className="shadow-md rounded-md h-[400px] p-5">
        <p className="border-b py-2 font-medium ">Your stats</p>
        <Results />
      </div>

      <div className="shadow-md rounded-md p-5 h-[300px]" >
        <p className="border-b py-2 font-medium ">Diagramm</p>
        <Pie />
      </div>

      <div className="shadow-md rounded-md  p-5 h-[350px]">
        <p className="border-b py-2 font-medium ">Active Tasks</p>
        <ThreePage />
      </div>
    </div>
  );
};

export default index;
