import dayjs from "dayjs";
import { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

const labelsClasses = [
  {
    label: "Darajasiz",
    color: "bg-gray-200",
  },
  {
    label: "Eng muhim",
    color: "bg-red-400",
  },
  {
    label: "Muhim",
    color: "bg-orange-300",
  },
  {
    label: "O'rta",
    color: "bg-green-400",
  },
  {
    label: "Muhim emas",
    color: "bg-sky-400",
  },
];

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents?.filter(
      (evt) => dayjs(evt?.deadline).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`${
              labelsClasses.find((label) => label.label === evt.label)?.color
            } p-1 mr-3 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
