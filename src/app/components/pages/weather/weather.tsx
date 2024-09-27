import { useCallback, useState } from "react";
import { Layout, WeatherCard, SearchHistoryList } from "../../ui";
import { SearchBar } from "../../ui/search-bar";
import { weatherApi } from "../../../apis/weather-api";
import { useTheme } from "@/app/contexts";

export const Weather = () => {
  const { theme } = useTheme();

  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<Record<string, any> | null>(null);
  const [history, setHistory] = useState<Record<string, string>[]>([]);
  const [showError, setShowError] = useState<string | null>(null);

  const onClear = () => {
    setLocation("");
  };

  const fetchData = async (inputLocation: string) => {
    try {
      await weatherApi.get(inputLocation).then((data) => {
        if (data.cod !== 200) {
          setShowError(data.message);
          return;
        }

        setShowError(null);
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
      if (location) {
        fetchData(location);
      } else {
        setShowError("Please enter a location");
      }
    } catch (error) {
      console.error(error);
    }
  }, [location]);

  return (
    <Layout>
      <SearchBar
        location={location}
        setLocation={setLocation}
        onSearch={onSearch}
      />
      {showError && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: theme.palette.font.primary,
            backgroundColor: theme.palette.background.error,
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          {showError.toLocaleUpperCase()}
        </div>
      )}
      <div
        style={{
          display: "flex",
          marginTop: "6rem",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: theme.palette.background.primary,
          borderRadius: "1rem",
          padding: "1rem",
        }}
      >
        {weather ? (
          <WeatherCard weather={weather} />
        ) : (
          <div
            style={{ textAlign: "center", color: theme.palette.font.primary }}
          >{`Stay ahead of the weather with our real-time forecasts and personalized updates.`}</div>
        )}
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
