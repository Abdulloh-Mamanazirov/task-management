import { Bar, Pie, HorizontalBar, HomeTable } from "./components";

const index = () => {
  return (
    <div>
      {/* <Bar /> */}
      <div className="grid md:grid-cols-2">
        <div className="h-96">
          <Pie />
        </div>
        <div className="h-96">
          <HorizontalBar />
        </div>
      </div>
      <div className="overflow-x-auto mt-20 hidden sm:block">
        <HomeTable />
      </div>
    </div>
  );
};

export default index;
