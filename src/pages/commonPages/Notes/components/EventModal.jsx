import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

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
    color: "accent-purple-500",
  },
  {
    label: "O'rta",
    color: "accent-sky-500",
  },
  {
    label: "Muhim emas",
    color: "accent-green-500",
  },
];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="z-50 h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-2xl w-11/12 md:w-1/2 lg:w-1/3"
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-end items-center">
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="fa-solid fa-trash text-red-600 text-lg cursor-pointer mr-3"
              />
            )}
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
            <div className="flex items-center gap-3">
              <span className="fa-solid fa-calendar text-gray-400" />
              <p>{daySelected.format("dddd, MMMM DD")}</p>
            </div>
            <textarea
              name="description"
              placeholder="Biror nima yozing..."
              value={description}
              required
              rows={4}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex gap-x-2 justify-between">
              {labelsClasses.map((lblClass, i) => (
                <div className="flex flex-col items-center">
                  <input
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
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Saqlash
          </button>
        </footer>
      </form>
    </div>
  );
}
