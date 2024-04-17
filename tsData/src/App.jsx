import { useEffect, useState } from 'react';
import { FaTemperatureThreeQuarters, FaTemperatureArrowUp, FaTemperatureArrowDown, FaCity } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import axios from 'axios';
import './App.css'
import Loader from './Component/Loader';

function App() {
  const [json, setJson] = useState([]);
  const [isLoader, setLoader] = useState(true);
  const [response, setSesponse] = useState([]);
  const [weather, setWeather] = useState({
    name: '',
    main: {
      temp: '',
      temp_min: '',
      temp_max: '',
      humidity: '',
    }
  });
  useEffect(() => {
    getRecord();
    getWeather();
  }, []);

  async function getRecord() {
    try {
      const result = await axios.get('http://localhost:3000/getSharedData');
      setSesponse(result.data);
      if (!result) {
        throw new Error('Failed to fetch data');
      }
      const data = result.data.data;
      const newData = [];

      for (let i = 0; i < data.length; i++) {
        const currentItem = data[i];
        const currentTime = new Date(currentItem.ts).getTime();
        newData.push(currentItem);
        if (i > 0) {
          const prevTime = new Date(data[i - 1].ts).getTime();
          if (currentTime - prevTime > 1000) {
            const newItem = {
              "ts": new Date(prevTime + 1000).toISOString(),
              "machine_status": null,
              "vibration": 0
            };
            newData.push(newItem);
          }
        }
      }
      setJson(newData);
      setLoader(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function getWeather() {
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=pune&appid=${process.env.REACT_APP_APIKEY}`);
    setWeather(result.data);
  }

  function renderColor(machine_status) {
    if (machine_status == 0) return 'yellow'
    if (machine_status == 1) return 'green'
    return 'red'
  }
  function getHoursAndMinute(ts) {
    const tym = new Date(ts);;
    let tym_hour = tym.getUTCHours();
    let tym_minutes = tym.getUTCMinutes();
    let tym_seconds = tym.getUTCSeconds();
    if (tym_minutes == 0 && tym_seconds == 1) {
      return `${tym_hour}:00:00`
    }
  }

  return (
    <>
      {
        isLoader ? <Loader /> : null
      }
      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', justifySelf: 'center', margin: '10px' }}>
        <p><FaCity /> {weather.name}</p>
        <p><FaTemperatureThreeQuarters />{(weather.main.temp - 273.15).toFixed(2)}</p>
        <p><FaTemperatureArrowUp />{(weather.main.temp_min - 273.15).toFixed(2)}</p>
        <p><FaTemperatureArrowDown />{(weather.main.temp_max - 273.15).toFixed(2)}</p>
        <p><WiHumidity />{weather.main.humidity}</p>
      </div> <hr />
      <p>Cycle Status</p>
      <div style={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
        {
          json.map((sample, index) => (
            <>
              {
                <div key={index} style={{ width: '1px', height: '50px', backgroundColor: renderColor(sample.machine_status), borderBottom: '2px solid black' }}></div>
              }
            </>
          ))
        }
      </div>
      <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
        {
          json.map((sample, index) => (
            <label>
              {
                getHoursAndMinute(sample.ts)
              }
            </label>
          ))
        }
      </div>
      <div style={{ marginTop: '30px',textAlign:'center' }}>
        <p>Total record:{response.totalItem}</p>
        <p>Number of 0s:{response.total0s}</p>
        <p>Number of 1s:{response.total1s}</p>
        <p>0s and 1s Combinations:{response.combination}</p>
      </div>
    </>
  )
}

export default App
