import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

// let bar_data = [
//   {
//     sector: "Sotuv",
//     Bajarilgan: 18,
//     BajarilganColor: "#4ECB71",
//     Jarayonda: 8,
//     JarayondaColor: "#FFD233",
//     Bajarilmagan: 5,
//     BajarilmaganColor: "#FF6262",
//     "Bekor qilingan": 4,
//     "Bekor qilinganColor": "#01A1B7",
//   },
//   {
//     sector: "Marketing",
//     Bajarilgan: 45,
//     BajarilganColor: "#4ECB71",
//     Jarayonda: 23,
//     JarayondaColor: "#FFD233",
//     Bajarilmagan: 6,
//     BajarilmaganColor: "#FF6262",
//     "Bekor qilingan": 10,
//     "Bekor qilinganColor": "#01A1B7",
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
            BajarilganColor: "#4ECB71",
            Jarayonda: i?.doing ?? 0,
            JarayondaColor: "#FFD233",
            Bajarilmagan: i?.missed ?? 0,
            BajarilmaganColor: "#FF6262",
            "Bekor qilingan": i?.canceled ?? 0,
            "Bekor qilinganColor": "#01A1B7",
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
      margin={{ top: 50, right: 130, bottom: 70, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisBottom={{
        // legend: "Bo'limlarning topshiriqlarni bajarish ko'rsatkichi",
        // legendPosition: "middle",
        legendOffset: 40,
        tickRotation: -40,
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
          translateX: 10,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 0,
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
