import React, { useState } from "react";
import { 
  Container, 
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Box 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [scheduleTime, setScheduleTime] = useState('');
  const [selectedDays, setSelectedDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleDayChange = (day) => {
    setSelectedDays({
      ...selectedDays,
      [day]: !selectedDays[day],
    });
  };

  const handleSaveSchedule = () => {
    // Here you would implement the logic to save the schedule
    // and set up notifications
    console.log('Schedule Time:', scheduleTime);
    console.log('Selected Days:', selectedDays);
  };

  return (
    <Container maxWidth="sm">
      <h1>Set a schedule</h1>
      <p>When do you want to be reminded?</p>

      {/* Schedule Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Schedule Sessions
        </Typography>
        
        <TextField
          label="Session Time"
          type="time"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 300 }}
        />

        <FormGroup>
          {Object.keys(selectedDays).map((day) => (
            <FormControlLabel
              key={day}
              control={
                <Checkbox
                  checked={selectedDays[day]}
                  onChange={() => handleDayChange(day)}
                />
              }
              label={day.charAt(0).toUpperCase() + day.slice(1)}
            />
          ))}
        </FormGroup>

        <Button
          variant="contained"
          onClick={handleSaveSchedule}
          sx={{ mt: 2, mb: 2 }}
        >
          Save Schedule
        </Button>
      </Box>

      {/* Existing Buttons */}
      <Button variant="contained" onClick={() => navigate('/session')}>
        Session
      </Button>
      <Button variant="contained" onClick={() => navigate('/history')}>
        History
      </Button>
    </Container>
  );
};

export default Menu;
