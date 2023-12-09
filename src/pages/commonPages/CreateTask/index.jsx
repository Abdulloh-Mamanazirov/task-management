import { useRef } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

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
    <div>
      <div>
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
    </div>
  );
};

export default CreateTaskindex;
