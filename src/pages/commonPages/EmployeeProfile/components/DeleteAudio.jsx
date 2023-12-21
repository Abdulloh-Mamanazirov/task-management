import axios from "axios";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import { Fragment, useState } from "react";

export default function EditDeadline({ id, getData }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`audio/delete/${id}/`);
      toast.info("Audio o'chirildi", { autoClose: 800 });
      getData();
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <IconButton
        disabled={loading}
        onClick={handleDelete}
        className="text-xl text-white cursor-pointer"
        color="error"
      >
        <span className="fa-solid fa-trash" />
      </IconButton>
    </Fragment>
  );
}
