import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import GlobalContext from "../context/GlobalContext";
import { FormControl } from "@mui/material";

const labelsClasses = [
  {
    label: "Darajasiz",
    color: "accent-gray-500",
  },
  {
    label: "Eng muhim",
    color: "accent-red-500",
  },
  {
    label: "Muhim",
    color: "accent-orange-500",
  },
  {
    label: "O'rta",
    color: "accent-green-500",
  },
  {
    label: "Muhim emas",
    color: "accent-sky-500",
  },
];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [content, setDescription] = useState(
    selectedEvent ? selectedEvent.content : ""
  );
  const [time, setTime] = useState(
    selectedEvent
      ? selectedEvent?.deadline?.slice(11, 16)
      : `${new Date().getHours()}:${new Date().getMinutes()}`
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const event = new FormData();
    event.append("title", title);
    event.append("content", content);
    event.append("deadline", new Date(daySelected).toISOString());
    event.append("time", time);
    event.append("label", selectedLabel);
    event.append("user", sessionStorage.getItem("user_id"));

    if (selectedEvent) {
      const response = await axios.patch(
        `/qayd/edit/${selectedEvent?.id}/`,
        event
      );
      dispatchCalEvent({ type: "update", payload: response.data });
      toast.success("Qayd tahrirlandi!");
    } else {
      try {
        const response = await axios.post("/qayd/", event);
        dispatchCalEvent({ type: "push", payload: response.data });
        toast.success("Qayd qo'shildi!");
      } catch (error) {
        toast.error("Qayd qo'shishda xatolik!");
      }
    }

    setLoading(false);
    setShowEventModal(false);
  }

  async function handleDeleteEvent(event) {
    try {
      await axios.delete(`/qayd/edit/${event?.id}/`);
      dispatchCalEvent({ type: "delete", payload: { id: event?.id } });
      setShowEventModal(false);
      toast.info("Qayd o'chirildi!");
    } catch (error) {
      toast.error("Qaydni o'chirishda xatolik!");
    }
  }

  return (
    <div className="z-50 h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl w-11/12 md:w-1/2 lg:w-1/3"
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-end items-center">
          <div className="w-full flex items-center justify-between">
            {selectedEvent && (
              <span
                onClick={() => handleDeleteEvent(selectedEvent)}
                className="fa-solid fa-trash text-red-600 text-lg cursor-pointer"
              />
            )}
            <div />
            <button onClick={() => setShowEventModal(false)}>
              <span className="fa-solid fa-close text-lg" />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div />
            <input
              type="text"
              name="title"
              placeholder="Sarlavha"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="grid grid-cols-2">
              <div className="flex items-center gap-3">
                <span className="fa-solid fa-calendar text-gray-400" />
                <p>{daySelected.format("dddd, MMMM DD")}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="fa-solid fa-clock text-gray-400" />
                <input
                  required={!selectedEvent?.deadline}
                  type="time"
                  name="time"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                />
                <span>{time}</span>
              </div>
            </div>
            <textarea
              name="description"
              placeholder="Biror nima yozing..."
              value={content}
              required
              rows={4}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex gap-x-2 justify-between">
              {labelsClasses.map((lblClass, i) => (
                <div className="flex flex-col items-center">
                  <input
                    defaultChecked={lblClass.label === selectedEvent?.label}
                    type={"radio"}
                    key={i}
                    required
                    name="degree"
                    id={"degree" + i}
                    onClick={() => setSelectedLabel(lblClass.label)}
                    className={`${lblClass.color} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  />
                  <label
                    htmlFor={"degree" + i}
                    className={`${lblClass.color.replace("accent", "text")}`}
                  >
                    {lblClass.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            disabled={loading}
            className="w-28 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            {loading ? (
              <span className="fa-solid fa-spinner fa-spin-pulse" />
            ) : (
              "Saqlash"
            )}
          </button>
        </footer>
      </form>
    </div>
  );
}
