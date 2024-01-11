import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const labelsClasses = [
  {
    label: "Darajasiz",
    color: "accent-gray-500",
  },
  {
    label: "Eng muhim",
    color: "accent-red-400",
  },
  {
    label: "Muhim",
    color: "accent-orange-300",
  },
  {
    label: "O'rta",
    color: "accent-green-400",
  },
  {
    label: "Muhim emas",
    color: "accent-sky-400",
  },
];

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Darajalar</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`h-5 w-5 ${
              labelsClasses.find((label) => label.label === lbl)?.color
            } rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}
