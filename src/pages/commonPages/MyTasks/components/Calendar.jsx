import dayjs from "dayjs";
import { useState, useEffect } from "react";
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

  const isSelected = highlightedDates?.includes?.(dayString);

  function getNumberOfSameDates(array, value) {
    let count = 0;
    array.forEach((v) => v === value && count++);
    return count;
  }

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
        sx={isSelected ? { bgcolor: "#f051a115" } : {}}
        onDaySelect={(e) => {
          if (isSelected)
            setModal({ open: true, data: `${e.$y}-${e.$M + 1}-${e.$D}` });
        }}
        outsideCurrentMonth={outsideCurrentMonth}
      />
      <Dialog
        open={modal.open}
        onClose={() => setModal({ open: false, data: null })}
        fullWidth
        keepMounted
        aria-describedby="task-modal"
      >
        <p className="p-3">
          Sizning <span className="font-medium">{modal?.data}</span> gacha
          tugatishingiz kerak bo'lgan{" "}
          <span className="font-bold underline">
            {getNumberOfSameDates(highlightedDates, modal?.data)}
          </span>{" "}
          ta vazifangiz bor.
        </p>
      </Dialog>
    </Badge>
  );
}

const Calendar = ({ data }) => {
  const [highlightedDates, setHighlightedDates] = useState([]);

  function handleDates(data) {
    let dates = [];
    for (let i = 0; i < data?.length; i++) {
      dates.push(data[i]?.deadline);
    }
    setHighlightedDates(dates);
    dates = [];
  }

  useEffect(() => {
    setTimeout(() => {
      handleDates(data);
    }, 0);
  }, [data]);

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

export default Calendar;
