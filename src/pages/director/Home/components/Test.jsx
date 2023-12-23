import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  xAxis: [
    {
      label: "Vazifalarni bajarish ko'rsatkichi (%)",
    },
  ],
  yAxis: [{ scaleType: "band", dataKey: "sector" }],
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
  width: 500,
  height: 300,
};

const dataset = [
  {
    finished: 43,
    doing: 37,
    not_finished: 15,
    cancelled: 5,
    sector: "Marketing",
  },
  {
    finished: 59,
    doing: 11,
    not_finished: 20,
    cancelled: 10,
    sector: "Sotuv",
  },
];

const valueFormatter = (value) => `${value}%`;

export default function BarsDataset() {
  return (
    <div className="">
      <BarChart
        dataset={dataset}
        series={[
          {
            dataKey: "finished",
            stack: "a",
            label: "Bajarilgan",
            color: "#00ef00",
            valueFormatter,
          },
          { dataKey: "doing", stack: "a", label: "Jarayonda", 
            color: "#efef00",valueFormatter },
          {
            dataKey: "not_finished",
            stack: "a",
            label: "Bajarilmagan",
            color: "#f00",
            valueFormatter,
          },
          {
            dataKey: "cancelled",
            stack: "a",
            label: "Bekor qilingan",
            color: "#bbb",
            valueFormatter,
          },
        ]}
        layout="horizontal"
        {...chartSetting}
      />
    </div>
  );
}
