import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ChatBubble = ({ msg, my }) => {
  return (
    <div
      className={`max-w-[45%] mb-3 shadow-lg rounded-lg ${
        my
          ? "ml-auto bg-blue-200 rounded-br-sm"
          : "mr-auto bg-white rounded-bl-sm"
      }`}
    >
      <div className="flex flex-col">
        {msg?.photo?.map?.((item) => (
          <img
            key={item?.id}
            src={`https://xodim.pythonanywhere.com/` + item?.photo}
            alt="image"
            className="border rounded-lg"
          />
        ))}
      </div>
      <div className="p-2">
        <p>{msg?.text}</p>
      </div>
    </div>
  );
};

const index = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const my_id = sessionStorage.getItem("user_id");

  async function getComments() {
    let response = await axios.patch(`/create/comment/${state?.id}/`, {
      _to: state?.to_id,
      _from: state?.from_id,
    });
    setData(response?.data);
  }

  useEffect(() => {
    getComments();
  }, [state]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { msg, img } = e.target;
    const data = new FormData();
    data.append("_to", state.to_id);
    data.append("_from", state.from_id);
    if (msg.value) data.append("comment", msg.value);
    if (img.files)
      for (let i = 0; i < img.files.length; i++) {
        data.append("photo", img.files[i]);
      }

    await axios
      .post(`create/comment/${state?.id}/`, data)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Comment yuklandi!");
          getComments();
          e.target.reset();
        }
      })
      .catch((err) => toast.error("Comment yuklashda xato!"))
      .finally(() => setLoading(false));
  }

  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col">
      <div className="flex-1 w-full p-1 overflow-y-auto bg-blue-50">
        {data?.map?.((item) => {
          return (
            <ChatBubble
              key={item?.id}
              msg={item}
              my={String(item?.user) === String(my_id)}
            />
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 p-2">
        <div className="relative w-full">
          <textarea
            required
            name="msg"
            rows={3}
            className="outline-none w-full p-2 border border-gray-300 rounded-md resize-none"
          />
          <div className="absolute top-3 right-3">
            <label
              htmlFor="img"
              role={"button"}
              className="border border-blue-500 w-7 h-7 grid place-items-center rounded-full"
            >
              <span className="fa-solid fa-image text-blue-500" />
            </label>
            <input
              multiple
              type="file"
              name="img"
              id="img"
              className="w-0 absolute"
            />
          </div>
        </div>
        <Button
          disabled={loading}
          type="submit"
          variant="contained"
          size="large"
        >
          {loading ? (
            <span className="fa-solid fa-circle-notch fa-spin" />
          ) : (
            <span className="fa-solid fa-paper-plane" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default index;
