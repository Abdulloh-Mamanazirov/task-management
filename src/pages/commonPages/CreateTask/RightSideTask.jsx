import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');

export default function RightSideTask() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                    components={[
                        'DatePicker',
                        'DateTimePicker',
                        'TimePicker',
                        'DateRangePicker',
                    ]}
                >
                    <DemoItem label="DatePicker">
                        <DatePicker
                            defaultValue={yesterday}
                            disablePast
                            views={['year', 'month', 'day']}
                        />
                    </DemoItem>
                    <DemoItem label="TimePicker">
                        <TimePicker defaultValue={todayStartOfTheDay} disablePast />
                    </DemoItem>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <DemoItem label="DateTimePicker">
                        <DateTimePicker
                            defaultValue={yesterday}
                            disablePast
                            views={['year', 'month', 'day', 'hours', 'minutes']}
                        />
                    </DemoItem>
                    <DemoItem label="DateRangePicker" component="DateRangePicker">
                        <DateRangePicker defaultValue={[yesterday, today]} disablePast />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>

            <div className='mt-5 float-right'>
                <Button variant="contained" >
                    Submit
                </Button>
            </div>
        </div>
    );
}
