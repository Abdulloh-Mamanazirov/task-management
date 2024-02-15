import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { EditTaskStatus } from "./components";

const ChatBubble = ({ msg, my }) => {
  const text = useRef();

  useEffect(() => {
    text.current.innerText = msg?.text;
  }, [msg]);

  return (
    <div
      className={`flex items-end gap-2 mb-7 ${
        my ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar
        src={`https://xodim.pythonanywhere.com/media/` + msg?.rasm}
        alt="profile image"
        className="mb-2 shadow-lg"
      />
      <div
        className={`relative sm:max-w-[45%] shadow-lg rounded-lg ${
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
          <p ref={text} />
        </div>
        <div className="absolute -bottom-4 w-full">
          <p className="whitespace-nowrap text-xs w-fit ml-auto">
            {msg?.ism + " " + msg?.familiya}
          </p>
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ state }) => {
  const user_status = sessionStorage.getItem("status");

  const getStatus = (status) => {
    if (status === "finished") {
      return (
        <div className="border-4 border-custom-green bg-custom-light-green rounded-full px-3 py-[1px]">
          <span className="hidden md:inline-block ">Bajarildi</span>
        </div>
      );
    } else if (status === "doing") {
      return (
        <div className="border-4 border-custom-yellow bg-custom-light-yellow rounded-full px-3 py-[1px]">
          <span className="hidden md:inline-block ">Jarayonda</span>
        </div>
      );
    } else if (status === "missed") {
      return (
        <div className="border-4 border-custom-red bg-custom-light-red rounded-full px-3 py-[1px]">
          <span className="hidden md:inline-block ">Bajarilmadi</span>
        </div>
      );
    } else if (status === "canceled") {
      return (
        <div className="border-4 border-gray-500 bg-gray-200 rounded-full px-3 py-[1px] whitespace-nowrap">
          <span className="hidden md:inline-block"> Bekor qilindi</span>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="p-2 bg-white shadow-xl mb-3 rounded-lg">
      <div className="w-full grid sm:grid-cols-2 gap-2">
        {state?.photo?.length > 0 &&
          state?.photo?.map?.((item) => (
            <img
              key={item?.id}
              src={`https://xodim.pythonanywhere.com/` + item?.photo}
            />
          ))}
      </div>
      <div className="flex items-center justify-between my-2">
        <div>
          {!state?.audio?.[0]?.audio.includes("null") &&
            state?.audio?.length > 0 && (
              <audio controls className="my-2 h-10">
                <source
                  src={
                    `https://xodim.pythonanywhere.com/` +
                    state?.audio?.[0]?.audio
                  }
                />
              </audio>
            )}
        </div>
        <div className="flex items-center gap-3">
          {getStatus(state?.status)}
          <EditTaskStatus data={state} hidden={user_status !== "admin"} />
        </div>
      </div>
      {state?.text?.[0] && (
        <div className="p-3">
          <p>
            {state?.text?.[0]?.text
              .replaceAll("[", "")
              .replaceAll("]", "")
              .replaceAll('"', "")}
          </p>
        </div>
      )}
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
    <div className="w-full h-[calc(100vh-100px)] sm:h-[calc(100vh-80px)] flex flex-col">
      <div className="flex-1 w-full p-1 overflow-y-auto bg-blue-50">
        <TaskCard state={state} />
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
