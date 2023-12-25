import { styled } from "@mui/material";
import { useDrawingArea } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function index() {
  return (
    <PieChart
      series={[
        {
          innerRadius: 60,
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
        },
      ]}
      width={
        window.innerWidth > 600
          ? 500
          : window.innerWidth - 100
      }
      height={200}
    >
      <PieCenterLabel>Topshiriqlar</PieCenterLabel>
    </PieChart>
  );
}
