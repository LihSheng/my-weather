import { useTheme } from "@/app/contexts";
import { CSSProperties, FC } from "react";

interface SearchHistoryRecordProps {
  location: string;
  time: string;
  onReFetch: () => void;
  onDelete: () => void;
}

export const SearchHistoryRecord: FC<SearchHistoryRecordProps> = ({
  location,
  time,
  onReFetch,
  onDelete,
}) => {
  const { isLightMode, theme } = useTheme();

  const searchHistoryRecord: CSSProperties = {
    backgroundColor: theme.palette.background.primary,
    borderRadius: "1rem",
    padding: "1rem",
    width: "100%",
    marginTop: "1rem",
  };

  const buttonStyle: CSSProperties = {
    cursor: "pointer",
    padding: "0.5rem",
    border: "none",
    borderRadius: "50%",
    backgroundColor: theme.palette.background.primary,
    display: "flex",
    alignItems: "center", // Center align the icon
    justifyContent: "center",
    width: "2rem",
    height: "2rem",
  };

  return (
    <div style={searchHistoryRecord}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
          }}
        >
          <p style={{ margin: 0 }}>{location}</p>
          <p style={{ margin: 0 }}>{time}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "15%",
            padding: "0 2rem",
          }}
        >
          <button onClick={onReFetch} style={buttonStyle}>
            <img
              src={`static/images/search-${isLightMode ? "dark" : "light"}.png`}
              alt="search icon"
            />
          </button>
          <button
            onClick={onDelete}
            style={{ ...buttonStyle, marginLeft: "0.5rem" }}
          >
            <img
              src={`static/images/dustbin-${
                isLightMode ? "dark" : "light"
              }.png`}
              alt="search icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
