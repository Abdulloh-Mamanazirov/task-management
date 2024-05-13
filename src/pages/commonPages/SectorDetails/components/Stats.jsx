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
      className="h-36 border rounded-3xl px-2 py-5 bg-white flex items-center flex-col transition-all hover:scale-[1.03]"
    >
      <div className="mb-3">
        <img src={img} alt="Icon" className="max-w-full" />
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <h3 className="text-lg text-black/60 whitespace-nowrap">{title}</h3>
    </div>
  );
};

const Stats = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md-lg:grid-cols-3 lg:grid-cols-5 gap-2 mt-3">
      <Card
        delay={100}
        title={"Barchasi"}
        value={data?.all_tasks ?? 0}
        img={Tasks}
      />
      <Card
        delay={200}
        value={data?.finished ?? 0}
        title={"Bajarilgan"}
        img={Finished}
      />
      <Card
        delay={300}
        title={"Jarayonda"}
        value={data?.doing ?? 0}
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
        value={data?.canceled ?? 0}
        img={Cancelled}
      />
    </div>
  );
};

export default Stats;
