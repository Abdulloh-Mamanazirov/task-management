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
  const [people, setPeople] = useState({
    managers: [],
    employees: [],
  });

  async function getPeople() {
    await axios.get("/xodim/").then((res) => {
      setPeople((old) => ({ ...old, employees: res?.data }));
    });
    await axios.get("/manager/").then((res) => {
      setPeople((old) => ({ ...old, managers: res?.data }));
    });
  }

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div className="flex flex-col gap-5 mt-5">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="DD/MM/YYYY"
          label="Tugash sanasi *"
          disablePast
          onChange={(e) => dispatch(setDeadline(new Date(e)))}
        />
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
          {Array.isArray(people.employees) &&
            people.employees.map((option, ind) => (
              <MenuItem key={ind} value={option.id}>
                {option?.user?.first_name?.length > 0 ? (
                  option?.user?.first_name
                ) : (
                  <em className="text-sm">Ism kiritilmagan</em>
                )}
                &nbsp;
                {option?.user?.last_name?.length > 0 ? (
                  option?.user?.last_name
                ) : (
                  <em className="text-sm">Familiya kiritilmagan</em>
                )}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
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
