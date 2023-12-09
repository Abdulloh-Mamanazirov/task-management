import { useRef } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import RightSideTask from "./RightSideTask";

const CreateTaskindex = () => {
  const audioList = useRef();

  const addAudioElement = (blob) => {
    console.log(blob);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    audioList.current.appendChild(audio);
  };

  return (
    <div className="">
      <div className="grid md:grid-cols-3 lg:grid-cols-2 justify-around items-center">
        <div className="">
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium dark:text-gray-400"
              for=""
            >
              Message
            </label>
            <textarea
              className="block w-full md:w-1/2 px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:border-gray-900 dark:bg-gray-800"
              name="field-name"
              rows="5"
              placeholder="Write something..."
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
            <ul ref={audioList}></ul>
          </div>
          <div>
            <div class="flex items-center justify-center md:w-1/2">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </div>
        </div>
        {/* import right side */}
        <RightSideTask />
      </div>
    </div>
  );
};

export default CreateTaskindex;
