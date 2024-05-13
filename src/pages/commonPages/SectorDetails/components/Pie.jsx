import { ResponsivePie } from "@nivo/pie";

const Pie = ({ data }) => {
  let pie_data = [
    {
      id: "Bajarilgan",
      label: "Bajarilgan",
      value: data?.finished_protsent?.toFixed(2),
      color: "#4ECB71",
    },
    {
      id: "Jarayonda",
      label: "Jarayonda",
      value: data?.doing_protsent?.toFixed(2),
      color: "#FFD233",
    },
    {
      id: "Bajarilmagan",
      label: "Bajarilmagan",
      value: data?.missed_protsent?.toFixed(2),
      color: "#FF6262",
    },
    {
      id: "Bekor qilingan",
      label: "Bekor qilingan",
      value: data?.canceled_protsent?.toFixed(2),
      color: "#01A1B7",
    },
  ];

  return (
    <ResponsivePie
      data={pie_data}
      valueFormat={(v) => `${v} %`}
      colors={(d) => d.data.color}
      margin={
        window.innerWidth > 800
          ? { top: 40, right: 80, bottom: 80, left: 0 }
          : { top: 40, right: 0, bottom: 80, left: 0 }
      }
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
          anchor: window.innerWidth > 800 ? "right" : "bottom",
          direction: window.innerWidth > 800 ? "column" : "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 10,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "square",
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
