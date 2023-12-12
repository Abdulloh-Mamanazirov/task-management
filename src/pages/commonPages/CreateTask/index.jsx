import { useRef, useState } from "react";
import { Box, Button, Popover } from "@mui/material";
import { AudioRecorder } from "react-audio-voice-recorder";
import RightSideTask from "./RightSideTask";

const CreateTaskindex = () => {
  const audioList = useRef([]);
  const [audioKey, setAudioKey] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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

  const confirmDelete = (key) => {
    const updatedAudioList = audioList.current.filter(
      (audio) => audio.key !== key
    );
    audioList.current = updatedAudioList;
    setAudioKey(updatedAudioList.length > 0 ? updatedAudioList[0].key : null);
    setOpen(false);
  };

  const selectImages = (e) => {
    let images = [];
console.log(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
    }

    setSelectedImages(e.target.files);
    setImagePreviews(images);
  };

  // const handleUpload = async () => {
  //   const data = {
  //     message,
  //     audioList: audioList.current.map((audio) => audio.url),
  //   };

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5173/director/tasks",
  //       data
  //     );
  //     console.log("Task created successfully!", response.data);
  //   } catch (error) {
  //     console.error("Error creating task:", error.message);
  //   }
  // };

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2 justify-around items-center">
        <div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Xabar: <span className="text-red-500">*</span>
            </label>
            <textarea
              className="block w-full p-3 mb-2 placeholder-gray-500 bg-white border rounded hover:border-black focus:outline-primary"
              name="message"
              rows="5"
              placeholder="Biror nima yozing..."
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
                <li key={audio.key} className="flex items-center gap-2 my-2">
                  <audio controls src={audio.url}></audio>
                  <button
                    id={`deleteButton_${audio.key}`}
                    onClick={() => deleteAudioElement(audio.key)}
                    type="button"
                    className="rounded-full bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <span className="fa-solid fa-trash" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-400"
            >
              Rasm tanlang:
            </label>
            <input
              required
              type="file"
              id="image"
              name="image"
              onChange={selectImages}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div>
            {imagePreviews.map((i)=>i)}
          </div>
        </div>
        <RightSideTask
        // handleUpload={handleUpload}
        />
      </div>

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
            <p className="text-lg font-medium">Bu audioni o'chirmoqchimisiz?</p>
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
    </>
  );
};

export default CreateTaskindex;
