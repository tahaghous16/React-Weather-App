import React, { useEffect, useRef, useState } from "react";
import "./Wheather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Wheather = () => {
  const inputRef = useRef();
  const [wheatherData, setWheatherData] = useState(false);
  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "03d": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": search_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = allIcon[data.weather[0].icon] || clear_icon;

      setWheatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWheatherData(false);
    }
  };

  useEffect(() => {
    search("Karachi");
  }, []);

  return (
    <div className="wheather">
      <div className="search-wrapper">
        {" "}
        <div className="search-bar">
          <input
            ref={inputRef}
            type="text"
            placeholder="search"
            name=""
            id=""
          />
          <img
            src={search_icon}
            alt=""
            onClick={() => {
              search(inputRef.current.value);
            }}
          />
        </div>
      </div>

      {wheatherData ? (
        <>
          <img src={wheatherData.icon} alt="" className="wheather-icon" />
          <p className="temperature">{wheatherData.temperature}°C</p>
          <p className="location">{wheatherData.location}</p>

          <div className="wheather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{wheatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{wheatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Wheather;
