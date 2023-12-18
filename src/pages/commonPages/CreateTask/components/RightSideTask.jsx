import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { setDeadline, setTo } from "../../../../redux";

export default function RightSideTask() {
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state);
  const status = sessionStorage.getItem("status");
  const [people, setPeople] = useState([]);

  async function getPeople() {
    if (status === "director")
      await axios.get("/manager/").then((res) => {
        setPeople(res?.data);
      });
    else if (status === "manager")
      await axios.get("/xodim/").then((res) => {
        setPeople(res?.data);
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
          onChange={(e) => dispatch(setDeadline(`${e.$D}-${e.$M + 1}-${e.$y}`))}
        />
      </LocalizationProvider>
      <FormControl size="medium" required>
        <InputLabel htmlFor="manager-label">
          {status === "director"
            ? "Menejer tanlang"
            : status === "manager"
            ? "Xodim tanlang"
            : ""}
        </InputLabel>
        <Select
          labelId="manager-label"
          size="medium"
          id="manager"
          label={
            status === "director"
              ? "Menejer tanlang"
              : status === "manager"
              ? "Xodim tanlang"
              : ""
          }
          name="manager"
          value={task._to}
          onChange={(e) => dispatch(setTo(e.target.value))}
        >
          {Array.isArray(people) &&
            people?.map?.((option, ind) => (
              <MenuItem key={ind} value={option?.user?.id}>
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
    </div>
  );
}
