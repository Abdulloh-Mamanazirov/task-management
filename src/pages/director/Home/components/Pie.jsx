import { ResponsivePie } from "@nivo/pie";

let data = [
  {
    id: "Bajarilgan",
    label: "Bajarilgan",
    value: 98,
    color: "lime",
  },
  {
    id: "Jarayonda",
    label: "Jarayonda",
    value: 19,
    color: "yellow",
  },
  {
    id: "Bajarilmagan",
    label: "Bajarilmagan",
    value: 72,
    color: "red",
  },
  {
    id: "Bekor qilingan",
    label: "Bekor qilingan",
    value: 11,
    color: "#bbb",
  },
];

const Pie = ({}) => (
  <ResponsivePie
    data={data}
    colors={(d) => d.data.color}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    legends={[
      {
        anchor: "bottom",
        direction: window.innerWidth > 500 ? "row" : "column",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);
export default Pie;
