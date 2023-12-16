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
import { useDispatch, useSelector } from "react-redux";
import { setDeadline, setTo } from "../../../../redux";

export default function RightSideTask() {
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state);
  const [getManger, setGetManger] = useState([]);
  const [showOnlyManagers, setShowOnlyManagers] = useState(false);

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
        <DatePicker
          format="DD/MM/YYYY"
          label="Tugash sanasi *"
          disablePast
          onChange={(e) => dispatch(setDeadline(new Date(e)))}
        />
        {/* <TimePicker label="Tugash soati *" /> */}
      </LocalizationProvider>
      <FormControl size="medium" required>
        <InputLabel htmlFor="manager-label">Vazifa qabul qiluvchi</InputLabel>
        <Select
          labelId="manager-label"
          size="medium"
          id="manager"
          label="Vazifa qabul qiluvchi"
          name="manager"
          value={task._to}
          onChange={(e) => dispatch(setTo(e.target.value))}
        >
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
    </div>
  );
}
