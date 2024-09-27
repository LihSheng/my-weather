import { useTheme } from "@/app/contexts";
import { FC } from "react";
import { formatDate, getStyles } from "./config";

interface WeatherCardProps {
  weather: Record<string, any>;
}

export const WeatherCard: FC<WeatherCardProps> = ({ weather }) => {
  const { isLightMode, theme, screenSize } = useTheme();
  const { details, temperature, weatherCard, weatherInfo, weatherImage } =
    getStyles(theme, screenSize, isLightMode);

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
