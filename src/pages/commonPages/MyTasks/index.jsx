import dayjs from "dayjs";
import { useState } from "react";
import { Badge, Dialog } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  PickersDay,
  DateCalendar,
  DayCalendarSkeleton,
  LocalizationProvider,
} from "@mui/x-date-pickers";

function ServerDay(props) {
  const [modal, setModal] = useState({ open: false, data: null });
  const { highlightedDates = [], day, outsideCurrentMonth, ...other } = props;

  const dayString = dayjs(day).format("YYYY-MM-DD");

  const isSelected = highlightedDates.includes(dayString);

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <span className="fa-solid fa-thumbtack text-red-600 rotate-45" />
        ) : null
      }
    >
      <PickersDay
        {...other}
        day={day}
        sx={isSelected ? { bgcolor: "#0051a105" } : {}}
        onDaySelect={(e) => {
          if (isSelected) setModal({ open: true, data: e });
        }}
        outsideCurrentMonth={outsideCurrentMonth}
      />
      <Dialog
        open={modal.open}
        onClose={() => setModal({ open: false, data: null })}
        fullWidth
        keepMounted
        aria-describedby="edit-modal"
      >
        {new Date(modal?.data).toDateString()}
      </Dialog>
    </Badge>
  );
}

const index = () => {
  const [highlightedDates, setHighlightedDates] = useState([
    "2023-12-01",
    "2023-12-02",
    "2023-12-15",
    "2024-01-12",
  ]);

  return (
    <div className="bg-white border rounded-lg shadow-lg">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDates,
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default index;
