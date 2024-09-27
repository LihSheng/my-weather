import { useTheme } from "@/app/contexts";
import { CSSProperties, FC } from "react";

interface WeatherCardProps {
  weather: Record<string, any>;
}

export const WeatherCard: FC<WeatherCardProps> = ({ weather }) => {
  const { isLightMode, theme, screenSize } = useTheme();

  const details: CSSProperties = {
    margin: "0.5rem 0",
    color: theme.palette.font.secondary,
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
  };

  const temperature: CSSProperties = {
    fontFamily: theme.typography.fontFamily,
    color: isLightMode ? "#5c2d91" : theme.palette.font.primary,
    display: "flex",
    fontSize: "6rem",
    fontWeight: "bold",
    margin: 0,
  };

  const weatherInfo: CSSProperties = screenSize.sm
    ? {
        fontFamily: theme.typography.fontFamily,
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        flex: 1,
      }
    : screenSize.md
    ? {
        fontFamily: theme.typography.fontFamily,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flex: 1,
      }
    : {
        fontFamily: theme.typography.fontFamily,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flex: 1,
      };

  const weatherImage: CSSProperties = {
    overflow: "auto",
    position: "absolute",
    ...(screenSize.sm
      ? { display: "none" }
      : screenSize.md
      ? { width: "20rem", left: "19rem", bottom: "5rem" }
      : {
          width: "23rem",
          left: "15rem",
          bottom: "1rem",
        }),
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date
      .toLocaleString("en-GB", options)
      .replace(",", "")
      .replaceAll("/", "-");
  };

  const {
    weather: [{ main: weatherCondition }],
    main: {
      temp,
      temp_min: temperatureMin,
      temp_max: temperatureMax,
      humidity,
    },
    name: location,
    dt: time,
    sys: { country },
  } = weather;

  return (
    <div style={weatherCard}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <p
            style={{
              margin: 0,
              color: theme.palette.font.primary,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {`Today's weather`}
          </p>
          <p style={temperature}>{Math.round(temp)}°</p>
          <p style={details}>
            {` H: ${temperatureMin}°C L: ${temperatureMax}°C`}
          </p>
        </div>

        <img
          style={weatherImage}
          src={`static/images/cloud.png`}
          alt="weather icon"
        />
        <img
          style={weatherImage}
          src={`static/images/sun.png`}
          alt="weather icon"
        />
      </div>
      <div style={weatherInfo}>
        <p style={details}>
          {location}, {country}
        </p>
        <p style={details}>{formatDate(time)}</p>
        <p style={details}>{`Humidity: ${humidity}%`}</p>
        <p style={details}>{weatherCondition}</p>
      </div>
    </div>
  );
};

const weatherCard: CSSProperties = {
  display: "flex",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  borderRadius: "1rem",
  width: "100%",
  color: "#5c2d91",
  fontFamily: "Arial sans-serif",
};
