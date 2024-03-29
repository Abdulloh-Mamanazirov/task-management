import { useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
} from "@mui/material";
import { AudioRecorder } from "react-audio-voice-recorder";
import { useDispatch, useSelector } from "react-redux";
import {
  setAudio,
  setHelp,
  setPhoto,
  setProblem,
  setText,
} from "../../../../redux";

const LeftSideTask = () => {
  const audioList = useRef([]);
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state);
  const [audioKey, setAudioKey] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const status = sessionStorage.getItem("status");

  const addAudioElement = (blob) => {
    dispatch(setAudio(blob));
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
    dispatch(setPhoto(e.target.files));

    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]));
    }
    setImagePreviews(images);
    images = [];
  };

  return (
    <div>
      <div>
        <div className="mb-6">
          <label
            htmlFor="problem"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            Muammo:
          </label>
          <textarea
            className="block w-full p-3 mb-2 placeholder-gray-500 bg-white border rounded hover:border-black focus:outline-primary"
            name="problem"
            rows="5"
            placeholder="Muammoni yozing..."
            value={task.problem}
            onChange={(e) => dispatch(setProblem(e.target.value))}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            Yechim (Xabar):
          </label>
          <textarea
            className="block w-full p-3 mb-2 placeholder-gray-500 bg-white border rounded hover:border-black focus:outline-primary"
            name="message"
            rows="5"
            placeholder="Biror nima yozing..."
            value={task.text}
            onChange={(e) => dispatch(setText([e.target.value]))}
          />
        </div>
        {status === "admin" && (
          <div className="mb-6">
            <FormControlLabel
              required
              control={
                <Checkbox
                  checked={task.help}
                  onChange={(e) => dispatch(setHelp(e.target.checked))}
                />
              }
              label="Moliyaviy ko'mak"
            />
          </div>
        )}
        <div className="pb-5">
          {audioList.current?.length > 0 ? null : (
            <AudioRecorder
              onRecordingComplete={addAudioElement}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              downloadOnSavePress={true}
              downloadFileExtension="mp3"
            />
          )}
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
            multiple={true}
            // accept="image/*"
            onChange={selectImages}
            className="block  text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 items-start">
          {imagePreviews.map((i) => (
            <img src={i} alt="Image" className="border" />
          ))}
        </div>
      </div>

      {/* delete audio */}
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
    </div>
  );
};

export default LeftSideTask;
