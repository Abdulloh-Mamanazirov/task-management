import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import axios from "axios";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "set":
      return payload;
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  async function createEvent(event) {
    try {
      const response = await axios.post("/qayd/", event);
      dispatchCalEvent({ type: "push", payload: response.data });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  }

  async function updateEvent(event) {
    try {
      const response = await axios.patch(`/qayd/edit/${event.id}`, event);
      dispatchCalEvent({ type: "update", payload: response.data });
    } catch (error) {
      console.error("Error updating event:", error);
    }
  }

  async function deleteEvent(id) {
    try {
      await axios.delete(`/qayd/edit/${id}`);
      dispatchCalEvent({ type: "delete", payload: { id } });
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/qayd/");
        dispatchCalEvent({ type: "set", payload: response.data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateBackend = async () => {
      await axios.post("/qayd/", savedEvents);
    };

    updateBackend();
  }, [savedEvents]);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
