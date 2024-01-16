import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import CalendarHeader from "./components/CalendarHeader";
function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-[calc(100vh-80px)] flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1 flex-col pb-10 md:mb-0 md:items-stretch md:flex-row">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
