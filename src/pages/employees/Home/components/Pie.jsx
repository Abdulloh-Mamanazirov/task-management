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
            { id: 0, value: 68, label: "Bajarilgan", color: "#00ef00" },
            { id: 1, value: 12, label: "Jarayonda", color: "#efef00" },
            { id: 2, value: 16, label: "Bajarilmagan", color: "#f00" },
            {
              id: 3,
              value: 4,
              label: "Bekor qilingan",
              color: "#bbb",
            },
          ],
          arcLabel: "value",
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
      width={window.innerWidth > 600 ? 500 : window.innerWidth - 100}
      height={250}
    >
      <PieCenterLabel>Topshiriqlar</PieCenterLabel>
    </PieChart>
  );
}
