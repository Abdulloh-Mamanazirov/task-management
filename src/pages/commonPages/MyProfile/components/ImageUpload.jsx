import { styled, IconButton } from "@mui/material";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload() {
  async function handleImageUpload(image) {
    if (!image) return;
    console.log(image);
    // await axios
  }

  return (
    <IconButton component="label">
      <span className="fa-solid fa-camera text-white" />
      <VisuallyHiddenInput
        onChange={(e) => handleImageUpload(e.target.files[0])}
        type="file"
      />
    </IconButton>
  );
}
