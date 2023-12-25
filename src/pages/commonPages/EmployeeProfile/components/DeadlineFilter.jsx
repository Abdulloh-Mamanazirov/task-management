import { useState } from "react";
import { Box, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

export default function DeadlineFilter({ data, filter }) {
  const [dates, setDates] = useState({
    start: null,
    end: null,
  });

  function handleDateFilter(e) {
    e.preventDefault();
    let filtered = data.filter(
      (task) =>
        new Date(task.deadline) >= new Date(dates.start) &&
        new Date(task.deadline) <= new Date(dates.end)
    );
    filter(filtered);
  }

  function disableEndDays(date) {
    return new Date(date).getDate() < new Date(dates.start).getDate();
  }

  return (
    <Box component={"form"} onSubmit={handleDateFilter} className="my-5">
      <div className="mb-2 ml-1">
        <h4 className="font-medium text-lg">Tanlangan sanalar:</h4>
        <div className="flex items-center gap-3 whitespace-nowrap">
          <p>{dates.start}</p>
          {"-"}
          <p>{dates.end}</p>
        </div>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="grid sm:grid-cols-2 gap-3">
          <DatePicker
            format="DD/MM/YYYY"
            label="sanadan *"
            onChange={(e) =>
              setDates((old) => ({
                ...old,
                start: `${e.$y}-${e.$M + 1}-${e.$D}`,
              }))
            }
          />
          <DatePicker
            format="DD/MM/YYYY"
            label="sanagacha *"
            disabled={!dates.start}
            shouldDisableDate={disableEndDays}
            onChange={(e) =>
              setDates((old) => ({
                ...old,
                end: `${e.$y}-${e.$M + 1}-${e.$D}`,
              }))
            }
          />
        </div>
      </LocalizationProvider>
      <div className="grid grid-cols-3 gap-3">
        <Button
          disabled={!dates.start || !dates.end}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          className="col-span-2"
        >
          Izlash
        </Button>
        <Button
          type="reset"
          fullWidth
          variant="outlined"
          color="error"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => filter(data)}
        >
          O'chirish
        </Button>
      </div>
    </Box>
  );
}
