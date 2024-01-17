import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { setDeadline, setTo, setToStatus } from "../../../../redux";

export default function RightSideTask() {
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state);
  const status = sessionStorage.getItem("status");
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);

  async function getPeople() {
    await axios.get("/manager/").then((res) => {
      setManagers(res?.data);
    });
    await axios.get("/xodim/").then((res) => {
      setEmployees(res?.data);
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
      {status !== "manager" && (
        <FormControl size="medium">
          <InputLabel htmlFor="manager-label">Menejer tanlang</InputLabel>
          <Select
            labelId="manager-label"
            size="medium"
            id="manager"
            label="Menejer tanlang"
            name="manager"
            value={task._to}
            onChange={(e) => {
              dispatch(setTo(e.target.value));
              dispatch(setToStatus("manager"));
            }}
          >
            {Array.isArray(managers) &&
              managers?.map?.((option, ind) => (
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
      )}
      <FormControl size="medium">
        <InputLabel htmlFor="employee-label">Xodim tanlang</InputLabel>
        <Select
          labelId="employee-label"
          size="medium"
          id="employee"
          label="Xodim tanlang"
          name="employee"
          value={task._to}
          onChange={(e) => {
            dispatch(setTo(e.target.value));
            dispatch(setToStatus("xodim"));
          }}
        >
          {Array.isArray(employees) &&
            employees?.map?.((option, ind) => (
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
