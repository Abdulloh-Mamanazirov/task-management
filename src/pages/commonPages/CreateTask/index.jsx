import React, { useRef, useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import RightSideTask from "./RightSideTask";
import Button from "@mui/material/Button";
import { Popover, Box } from "@mui/material";

const CreateTaskindex = () => {
  const audioList = useRef([]);
  const [audioKey, setAudioKey] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [Message, setMessage] = useState([])

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audioKey = `audio_${Date.now()}`;
    audioList.current.push({
      key: audioKey,
      url: url,
    });
    setAudioKey(audioKey);
  };

  const deleteAudioElement = (key) => {
    setAnchorEl(document.getElementById(`deleteButton_${key}`));
    setOpen(true);
  };
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const confirmDelete = (key) => {
    const updatedAudioList = audioList.current.filter((audio) => audio.key !== key);
    audioList.current = updatedAudioList;
    setAudioKey(updatedAudioList.length > 0 ? updatedAudioList[0].key : null);
    setOpen(false);
  };
  const handleUpload = async () => {
    const data = {
      message,
      audioList: audioList.current.map((audio) => audio.url),
    };

    try {
      const response = await axios.post("http://localhost:5173/director/tasks", data);
      console.log("Task created successfully!", response.data);
    } catch (error) {
      console.error("Error creating task:", error.message);
    }
  };

  return (
    <div className="">
      <div className="grid md:grid-cols-3 gap-5 lg:grid-cols-2 justify-around items-center">
        <div className="">
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => setOpen(false)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box sx={{ padding: "5px 10px" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="fa-solid fa-trash text-red-500" />
                <p className="text-lg font-medium">
                  Bu bo'limni o'chirmoqchimisiz?
                </p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <Button
                  onClick={() => setOpen(false)}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  Yo'q
                </Button>
                <Button
                  onClick={() => confirmDelete(audioKey)}
                  variant="contained"
                  color="error"
                  size="small"
                >
                  Ha
                </Button>
              </div>
            </Box>
          </Popover>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium dark:text-gray-400">
              Message
            </label>
            <textarea
              className="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:border-gray-900 dark:bg-gray-800"
              name="field-name"
              rows="5"
              placeholder="Write something..."
              onChange={handleInputChange}
            />
          </div>
          <div className="pb-5">
            <AudioRecorder
              onRecordingComplete={addAudioElement}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              downloadOnSavePress={true}
              downloadFileExtension="mp3"
            />
            <ul>
              {audioList.current.map((audio) => (
                <li key={audio.key}>
                  <audio controls src={audio.url}></audio>
                  <button
                    id={`deleteButton_${audio.key}`}
                    onClick={() => deleteAudioElement(audio.key)}
                    type="button"
                    className="inline-flex gap-2 items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <span className="fa-solid fa-trash" />
                    O'chirish
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <RightSideTask handleUpload={handleUpload} />
      </div >
    </div >
  );
};

export default CreateTaskindex;
