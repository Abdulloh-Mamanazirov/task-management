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
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "top", horizontal: "middle" },
            padding: 0,
          },
        }}
        margin={{ top: 55 }}
        {...chartSettings}
      />
      <h3
        style={{
          width:
            window.innerWidth > 1000
              ? window.innerWidth / 2
              : window.innerWidth > 600
              ? window.innerWidth - 300
              : window.innerWidth - 30,
        }}
        className="text-center"
      >
        Vazifalarni bajarish ko'rsatkichi{" "}
        <span className="text-black/50 text-center">
          (umumiy korxona bo'yicha)
        </span>
      </h3>
    </div>
  );
}
