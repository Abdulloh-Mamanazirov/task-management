import { BarChart } from "@mui/x-charts";

const HorizontalBar = () => {
  return (
    <div>
      <BarChart
        series={[
          {
            data: [3, 4, 1],
            stack: "A",
            label: "Bajarilgan",
            color: "#00ef00",
            valueFormatter: (value) => `${value}s`,
          },
          {
            data: [4, 2, 1],
            stack: "A",
            label: "Jarayonda",
            color: "#efef00",
            valueFormatter: (value) => `${value}s`,
          },
          {
            data: [4, 1, 2],
            stack: "A",
            label: "Bajarilmagan",
            color: "#f00",
            valueFormatter: (value) => `${value}s`,
          },
          {
            data: [4, 1, 2],
            stack: "A",
            label: "Bekor qilingan",
            color: "#bbb",
            valueFormatter: (value) => `${value}s`,
          },
        ]}
        xAxis={[
          {
            label: "Vazifalarni bajarish foizi (%)",
          },
        ]}
        layout="horizontal"
        width={600}
        height={350}
      />
    </div>
  );
};

export default HorizontalBar;
