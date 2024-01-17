import Aos from "aos";
import {
  Tasks,
  Finished,
  Doing,
  Missed,
  Cancelled,
} from "../../../../assets/task_icons/index";

const Card = ({ title, value, img, delay }) => {
  Aos.init();
  return (
    <div
      data-aos="fade"
      data-aos-delay={delay}
      className="border rounded-xl p-2 bg-white shadow-md shadow-black/30 grid grid-cols-3 transition-all hover:scale-[1.03]"
    >
      <div className="col-span-2 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-black/60 whitespace-nowrap">
          {title}
        </h3>
        <p className="text-2xl">{value}</p>
      </div>
      <div className="max-w-full ml-auto">
        <img src={img} alt="Icon" className="max-w-full" />
      </div>
    </div>
  );
};

const Stats = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md-lg:grid-cols-3 lg:grid-cols-5 gap-2 mt-3">
      <Card
        delay={100}
        title={"Jami"}
        value={data?.all_tasks ?? 0}
        img={Tasks}
      />
      <Card
        delay={200}
        value={data?.doing ?? 0}
        title={"Bajarilgan"}
        img={Finished}
      />
      <Card
        delay={300}
        title={"Jarayonda"}
        value={data?.finished ?? 0}
        img={Doing}
      />
      <Card
        delay={400}
        title={"Bajarilmagan"}
        value={data?.missed ?? 0}
        img={Missed}
      />
      <Card
        delay={500}
        title={"Bekor qilingan"}
        value={data?.cancelled ?? 0}
        img={Cancelled}
      />
    </div>
  );
};

export default Stats;
