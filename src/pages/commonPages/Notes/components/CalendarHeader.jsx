import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 py-2 flex items-center justify-center">
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
        Bugun<span className="hidden md:inline-block">ga qaytish</span>
      </button>
      <button
        onClick={handlePrevMonth}
        className="w-8 aspect-square inline-grid place-items-center rounded-full border"
      >
        <span className="fa-solid fa-chevron-left" />
      </button>
      <h2 className="mx-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      <button
        onClick={handleNextMonth}
        className="w-8 aspect-square inline-grid place-items-center rounded-full border"
      >
        <span className="fa-solid fa-chevron-right" />
      </button>
    </header>
  );
}
