import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import * as LottiePackage from "lottie-react";

console.log(LottiePackage);

import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
} from "react-icons/wi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );


      setWeather(res.data);
    } catch (error) {
      alert("City not found");
    }
  };

  const getSummary = () => {
    if (!weather) return "";

    const temp = weather.main.temp;

    if (temp > 35)
      return "🔥 Very hot weather. Stay hydrated and avoid direct sunlight.";

    if (temp > 25)
      return "☀️ Pleasant weather. Great time for outdoor activities.";

    if (temp > 15)
      return "🌤 Mild weather. Comfortable throughout the day.";

    return "❄️ Cool weather. Carry a light jacket.";
  };

  const getBackground = () => {
    if (!weather)
      return "from-slate-950 via-blue-950 to-black";

    const desc = weather.weather[0].description.toLowerCase();

    if (desc.includes("thunder"))
      return "from-purple-900 via-slate-950 to-black";

    if (desc.includes("rain") || desc.includes("drizzle"))
      return "from-blue-900 via-slate-900 to-black";

    if (desc.includes("snow"))
      return "from-sky-200 via-slate-300 to-slate-500";

    if (desc.includes("cloud"))
      return "from-slate-700 via-slate-800 to-slate-900";

    if (desc.includes("clear"))
      return "from-orange-500 via-yellow-500 to-sky-500";

    return "from-slate-950 via-blue-950 to-black";
  };



  return (
    <div
      className={`
min-h-screen
bg-gradient-to-br
${getBackground()}
flex
items-center
justify-center
p-4
overflow-hidden
relative
`}

    >

      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[150px] rounded-full -top-20 -left-20"></div>

      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 blur-[150px] rounded-full -bottom-20 -right-20"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}
        className="
        relative z-10
backdrop-blur-2xl
bg-white/5
border
border-cyan-400/20
rounded-3xl
p-4
sm:p-5
w-full
max-w-[380px]
sm:max-w-[420px]
md:max-w-[480px]
shadow-[0_0_40px_rgba(34,211,238,0.25)]
"
      >
        <h1 className="text-3xl sm:text-5xl font-black text-center text-white mb-2">
          WeatherSphere <span className="text-cyan-400">AI</span>
        </h1>

        <p className="text-center text-cyan-200 mb-4 tracking-wider">
          Real-Time AI Powered Weather Experience
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search any city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getWeather();
              }
            }}
            className="
flex-1
p-4
rounded-2xl
bg-white/10
border
border-cyan-400/20
text-white
placeholder:text-slate-300
outline-none
focus:border-cyan-400
focus:shadow-[0_0_20px_rgba(34,211,238,0.5)]
transition
"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={getWeather}
            className="
bg-cyan-500
hover:bg-cyan-400
transition
px-5
rounded-xl
text-white
font-semibold
"
          >
            Search
          </motion.button>
        </div>

        {weather && (
          <motion.div
            className="mt-2 text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mt-1">
              <motion.div
                className="flex justify-center mb-0"
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt="weather"
                  className="w-28 h-28"
                />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold">
                {Math.round(weather.main.temp)}°C
              </h2>

              <p className="text-lg text-blue-200 mt-1">
                {weather.name}
              </p>

              <p className="text-sm capitalize mt-1 text-slate-300">
                {weather.weather[0].description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">

              <div className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-[11px] text-slate-300">
                  Humidity
                </p>

                <p className="font-bold mt-1 text-sm">
                  {weather.main.humidity}%
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-[11px] text-slate-300">
                  Wind
                </p>

                <p className="font-bold mt-1 text-sm">
                  {weather.wind.speed}
                </p>
              </div>

              <div className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-[11px] text-slate-300">
                  Feels Like
                </p>

                <p className="font-bold mt-2">
                  {Math.round(weather.main.feels_like)}°
                </p>
              </div>

            </div>

            <div className="mt-2 p-2 bg-white/10 rounded-xl">
              <h3 className="font-bold text-sm mb-2">
                AI Weather Insight
              </h3>

              <p className="text-sm">
                {getSummary()}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;