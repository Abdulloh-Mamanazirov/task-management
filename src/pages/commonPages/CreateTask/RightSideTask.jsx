import axios from "axios";
import { useState, useEffect } from "react";
import {
  Select,
  Button,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function RightSideTask({ handleUpload }) {
  const [getManger, setGetManger] = useState([]);
  const [showOnlyManagers, setShowOnlyManagers] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");

  useEffect(() => {
    axios.get("/signup/").then((res) => {
      setGetManger(res?.data);
    });
  }, []);

  const filteredManagers = showOnlyManagers
    ? getManger.filter((option) => option.status === "manager")
    : getManger;

  return (
    <div className="flex flex-col gap-5 mt-5">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker format="DD/MM/YYYY" label="Tugash sanasi *" disablePast />
        <TimePicker label="Tugash soati *" />
      </LocalizationProvider>
      <FormControl size="medium" required>
        <InputLabel htmlFor="manager-label">Vazifa qabul qiluvchi</InputLabel>
        <Select
          labelId="manager-label"
          size="medium"
          id="manager"
          label="Vazifa qabul qiluvchi"
          name="manager"
          value={selectedManager}
          onChange={(e) => setSelectedManager(e.target.value)}
        >
          <MenuItem value="">Select Manager</MenuItem>
          {Array.isArray(filteredManagers) &&
            filteredManagers.map((option, ind) => (
              <MenuItem key={ind} value={option.id}>
                {option?.username}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={showOnlyManagers}
            onChange={() => setShowOnlyManagers(!showOnlyManagers)}
            name="showOnlyManagers"
            color="primary"
          />
        }
        label="Faqat menejerlarni ko'rsatish"
      />

      <div className="mt-5 float-right">
        <Button onClick={handleUpload} variant="contained" color="primary">
          Create Task
        </Button>
      </div>
    </div>
  );
}
