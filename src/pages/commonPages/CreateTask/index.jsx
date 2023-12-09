import { useRef } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

const CreateTaskindex = () => {
  const audioList = useRef()
  
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
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
      <ul ref={audioList}>
        xx
      </ul>
      </div>
    </div>
  );
};

export default CreateTaskindex;
