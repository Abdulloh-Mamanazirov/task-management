import { ResponsivePie } from "@nivo/pie";

const Pie = ({ data }) => {
  let pie_data = [
    {
      id: "Bajarilgan",
      label: "Bajarilgan",
      value: data?.finished_protsent,
      color: "lime",
    },
    {
      id: "Jarayonda",
      label: "Jarayonda",
      value: data?.doing_protsent,
      color: "yellow",
    },
    {
      id: "Bajarilmagan",
      label: "Bajarilmagan",
      value: data?.missed_protsent,
      color: "red",
    },
    {
      id: "Bekor qilingan",
      label: "Bekor qilingan",
      value: data?.canceled_protsent,
      color: "#bbb",
    },
  ];

  return (
    <ResponsivePie
      data={pie_data}
      valueFormat={(v) => `${v} %`}
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
};
export default Pie;
