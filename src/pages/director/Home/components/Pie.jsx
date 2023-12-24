import { PieChart } from "@mui/x-charts/PieChart";

const chartSettings = {
  width:
    window.innerWidth > 1000
      ? window.innerWidth / 2
      : window.innerWidth > 600
      ? window.innerWidth - 300
      : window.innerWidth - 30,
  height: 300,
};

export default function index() {
  return (
    <div>
      <h3
        style={{
          width:
            window.innerWidth > 600
              ? window.innerWidth / 2
              : window.innerWidth - 30,
        }}
        className="text-center font-medium sm:text-xl"
      >
        Vazifalarni bajarish ko'rsatkichi <br /> (umumiy korxona bo'yicha)
      </h3>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 55, label: "Bajarilgan", color: "#00ef00" },
              { id: 1, value: 25, label: "Jarayonda", color: "#efef00" },
              { id: 2, value: 15, label: "Bajarilmagan", color: "#f00" },
              {
                id: 3,
                value: 5,
                label: "Bekor qilingan",
                color: "#bbb",
              },
            ],
            arcLabel: "value",
            cornerRadius: 5,
            innerRadius: 30,
            paddingAngle: 1,
          },
        ]}
        {...chartSettings}
      />
    </div>
  );
}
