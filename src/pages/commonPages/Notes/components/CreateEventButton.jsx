import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center gap-2 shadow-md hover:shadow-2xl"
    >
      <span className="fa-solid fa-plus text-2xl text-primary" />
      <span>Qayd qo'shish</span>
    </button>
  );
}
