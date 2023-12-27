import { Bar, Pie, HorizontalBar, HomeTable } from "./components";

const index = () => {
  return (
    <div>
      {/* <Bar /> */}
      <div className="w-fit mx-auto">
        <Pie />
        <hr className="my-10" />
        <HorizontalBar />
      </div>
      <div className="overflow-x-auto mt-20 hidden sm:block">
        <HomeTable />
      </div>
    </div>
  );
};

export default index;
