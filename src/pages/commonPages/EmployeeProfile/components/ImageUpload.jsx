import axios from "axios";
import { toast } from "react-toastify";
import { styled, IconButton } from "@mui/material";

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

export default function InputFileUpload({ id, handleClose }) {
    async function handleImageUpload(image) {
        if (!image) return;
        const formData = new FormData();
        formData.append("photo", image);
        await axios
            .put(`/user/edit/${id}/`, formData)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Rasm yuklandi");
                    handleClose();
                }
            })
            .catch((err) => toast.error("Nimadadir xatolik ketdi!"));
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
