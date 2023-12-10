import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as React from 'react';
import { useDispatch } from "react-redux";
import { getManager as setReduxSectors } from "../../../redux/sectors/index";

import axios from 'axios';
import { useState } from 'react';

const today = dayjs();
const yesterday = dayjs().subtract(1, 'day');
const todayStartOfTheDay = today.startOf('day');

export default function RightSideTask({ handleUpload }) {
    const [age, setAge] = React.useState('');
    const [getManger, setGetManger] = useState([]);
    const [showOnlyManagers, setShowOnlyManagers] = useState(false);
    const [selectedManager, setSelectedManager] = useState('')
    const dispatch = useDispatch();

    React.useEffect(() => {
        axios.get('/manager/').then((res) => {
            dispatch(setReduxSectors(res?.data));
            setGetManger(res?.data);
        });
    }, []);


    console.log(getManger, "manager");

    const filteredManagers = showOnlyManagers
        ? getManger.filter((option) => option.status === 'manager')
        : getManger;

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                    components={[
                        'DatePicker',
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
                    <FormControl size="small" required>
                        <InputLabel htmlFor="sector-label">Manager</InputLabel>
                        <Select
                            labelId="sector-label"
                            size="small"
                            id="sector"
                            label="Bo'lim"
                            name="sector"
                            value={selectedManager}
                            onChange={(e) => setSelectedManager(e.target.value)}
                        >
                            <MenuItem value="">Select Manager</MenuItem>
                            {Array.isArray(filteredManagers) &&
                                filteredManagers.map((option, ind) => (
                                    <MenuItem key={ind} value={option.id}>
                                        {option?.first_name}
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
                </DemoContainer>
            </LocalizationProvider>

            <div className='mt-5 float-right'>
                <Button onClick={handleUpload} variant="contained" color="primary">
                    Create Task
                </Button>
            </div>
        </div>
    );
}
