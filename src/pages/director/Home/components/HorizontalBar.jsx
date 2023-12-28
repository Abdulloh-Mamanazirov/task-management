import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

// let bar_data = [
//   {
//     sector: "Sotuv",
//     Bajarilgan: 18,
//     BajarilganColor: "lime",
//     Jarayonda: 8,
//     JarayondaColor: "yellow",
//     Bajarilmagan: 5,
//     BajarilmaganColor: "red",
//     "Bekor qilingan": 4,
//     "Bekor qilinganColor": "#bbb",
//   },
//   {
//     sector: "Marketing",
//     Bajarilgan: 45,
//     BajarilganColor: "lime",
//     Jarayonda: 23,
//     JarayondaColor: "yellow",
//     Bajarilmagan: 6,
//     BajarilmaganColor: "red",
//     "Bekor qilingan": 10,
//     "Bekor qilinganColor": "#bbb",
//   },
// ];

const Bar = ({ data }) => {
  const [bar_data, setBarData] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setBarData(
        data?.map?.((i) => {
          return {
            sector: i?.bolim ?? 0,
            Bajarilgan: i?.finished ?? 0,
            BajarilganColor: "lime",
            Jarayonda: i?.doing ?? 0,
            JarayondaColor: "yellow",
            Bajarilmagan: i?.missed ?? 0,
            BajarilmaganColor: "red",
            "Bekor qilingan": i?.canceled ?? 0,
            "Bekor qilinganColor": "#bbb",
          };
        })
      );
    }
  }, [data]);

  return (
    <ResponsiveBar
      data={bar_data}
      valueFormat={(v) => `${v} ta`}
      keys={["Bajarilgan", "Jarayonda", "Bajarilmagan", "Bekor qilingan"]}
      indexBy="sector"
      colors={({ id, data }) => data[`${id}Color`]}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisBottom={{
        legend: "Bo'limlarning topshiriqlarni bajarish ko'rsatkichi",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Statistics"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in sector: " + e.indexValue
      }
    />
  );
};
export default Bar;
