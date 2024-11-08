import React from "react";
import { useTimer } from "react-timer-hook";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function MyTimer({ expiryTimestamp }) {
  const [selectedMinutes, setSelectedMinutes] = React.useState("");

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => console.warn("onExpire called"),
  });

  const handleTimeSubmit = () => {
    const mins = parseInt(selectedMinutes);
    if (!isNaN(mins) && mins > 0) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + mins * 60);
      restart(time);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Timer</h1>
      <div>
        <select
          value={selectedMinutes}
          onChange={(e) => setSelectedMinutes(e.target.value)}
        >
          <option value="">Select duration</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select>
        <button onClick={handleTimeSubmit}>Minutes start</button>
      </div>
      <div style={{ fontSize: "100px" }}>
        <span>{minutes}</span>:
        <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      {/* <button onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300); // 5 minutes default
        restart(time)
      }}>Restart (5min)</button> */}
    </div>
  );
}

function DiscreteSlider() {
  const [notes, setNotes] = React.useState('');
  const [painLevel, setPainLevel] = React.useState(3);
  const [depth, setDepth] = React.useState(3);

  const painMarks = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
  ];

  const getPainLabel = (value) => {
    switch (value) {
      case 1: return '1: No Pain';
      case 2: return '2: Slight Pain';
      case 3: return '3: Moderate Pain';
      case 4: return '4: Severe Pain';
      case 5: return '5: Extreme Pain';
      default: return value;
    }
  };

  const handleFinish = async () => {
    try {
      const sessionData = {
        user_id: 1,
        pain: painLevel,
        depth: depth,
        notes: notes
      };

      console.log('Sending data:', sessionData);

      const response = await fetch('http://localhost:4000/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionData)
      });

      const result = await response.json();
      console.log('Success:', result);

      // Clear form after successful save
      setNotes('');
      setPainLevel(3);
      setDepth(3);
      
      alert('Session saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save session data');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: 300 }}>
        <Typography gutterBottom>Pain Level</Typography>
        <Slider
          aria-label="Pain"
          value={painLevel}
          onChange={(e, newValue) => setPainLevel(newValue)}
          valueLabelDisplay="auto"
          valueLabelFormat={getPainLabel}
          step={1}
          marks={painMarks}
          min={1}
          max={5}
        />
        
        <Typography gutterBottom sx={{ mt: 4 }}>Depth</Typography>
        <Slider
          aria-label="Depth"
          value={depth}
          onChange={(e, newValue) => setDepth(newValue)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
        />

        <Typography gutterBottom sx={{ mt: 4 }}>Notes</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Session notes: no bleeding, smelled like fresh cut roses"
        />
        
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleFinish}
            style={{ marginTop: '20px' }}
          >
            Finish and Save Data
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export { MyTimer, DiscreteSlider };

// shows stopwatch style timer and start/reset controls; has the pain and depth sliders, a text input for notes, and a photo upload button. It also has a finish button that records the timer, pain slider, depth slider, notes, and the time/date the finish button was clicked.
