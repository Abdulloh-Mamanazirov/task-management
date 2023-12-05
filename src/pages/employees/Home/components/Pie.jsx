import { styled } from "@mui/material";
import { useDrawingArea } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";


const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
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
                        { id: 0, value: 10, label: "series A" },
                        { id: 1, value: 15, label: "series B" },
                        { id: 2, value: 20, label: "series C" },
                    ],
                },
            ]}
            width={400}
            height={200}
        >
            <PieCenterLabel>Total tasks</PieCenterLabel>
        </PieChart>
    );
}
