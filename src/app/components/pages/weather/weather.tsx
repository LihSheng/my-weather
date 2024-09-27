import { useCallback, useEffect, useState } from "react";
import { Layout, WeatherCard, SearchHistoryList } from "../../ui";
import { SearchBar } from "../../ui/search-bar";
import { weatherApi } from "../../../apis/weather-api";
import { useTheme } from "@/app/contexts";
const dummyData = {
  coord: {
    lon: 103.5,
    lat: 2,
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04n",
    },
  ],
  base: "stations",
  main: {
    temp: 25.57,
    feels_like: 26.53,
    temp_min: 25.13,
    temp_max: 25.57,
    pressure: 1011,
    humidity: 90,
    sea_level: 1011,
    grnd_level: 1000,
  },
  visibility: 10000,
  wind: {
    speed: 0.66,
    deg: 250,
    gust: 0.71,
  },
  clouds: {
    all: 100,
  },
  dt: 1727358020,
  sys: {
    type: 1,
    id: 9435,
    country: "MY",
    sunrise: 1727304850,
    sunset: 1727348427,
  },
  timezone: 28800,
  id: 1733049,
  name: "Johor",
  cod: 200,
};
export const Weather = () => {
  const { isLightMode, setIsLightMode, theme } = useTheme();

  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<Record<string, any> | null>(dummyData);
  const [history, setHistory] = useState<Record<string, string>[]>([
    { location: "Johor,MY", time: "9/27/2024, 4:50:21 PM" },
    { location: "Johor,MY", time: "9/27/2024, 4:50:21 PM" },
    { location: "Johor,MY", time: "9/27/2024, 4:50:21 PM" },
    { location: "Johor,MY", time: "9/27/2024, 4:50:21 PM" },
    { location: "Johor,MY", time: "9/27/2024, 4:50:21 PM" },
  ]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  const onClear = () => {
    setLocation("");
  };

  const fetchData = async (inputLocation: string) => {
    try {
      await weatherApi.get(inputLocation).then((data) => {
        console.log("Data: ", data);

        if (data.cod !== 200) {
          alert(data.message);
          return;
        }

        setWeather(data);
        setHistory([
          ...history,
          {
            location: `${data.name},${data.sys.country}`,
            time: new Date().toLocaleString(),
          },
        ]);
        onClear();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSearch = useCallback(async () => {
    try {
      console.log("Searching for location: ", location);
      fetchData(location);
    } catch (error) {
      console.error(error);
    }
  }, [location]);

  return (
    <Layout style={{ paddingTop: "1rem" }}>
      <div
        id="linksToVisitPage"
        onClick={() => {
          setIsLightMode(!isLightMode);
        }}
        style={{
          position: "fixed",
          top: "0px",
          right: "0px",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          backgroundColor: theme.palette.background.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {isLightMode ? "🌙" : "☀️"}
      </div>
      <SearchBar
        location={location}
        setLocation={setLocation}
        onSearch={onSearch}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: theme.palette.background.primary,
          borderRadius: "1rem",
          padding: "1rem",
        }}
      >
        {weather && <WeatherCard weather={weather} />}
        {history.length > 0 && (
          <SearchHistoryList
            history={history}
            onReFetch={(history: Record<string, string>) => {
              console.log("Re-fetching data");
              fetchData(history.location);
            }}
            onDelete={(index: number) => {
              setHistory((prev) =>
                prev.filter((_, historyIndex) => historyIndex !== index)
              );
            }}
          />
        )}
      </div>
    </Layout>
  );
};
