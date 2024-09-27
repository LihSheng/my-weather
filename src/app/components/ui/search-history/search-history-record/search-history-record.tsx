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
  const { isLightMode, theme, screenSize } = useTheme();

  const searchHistoryRecord: CSSProperties = {
    backgroundColor: theme.palette.background.primary,
    borderRadius: "1rem",
    padding: "1rem",
    width: "100%",
    marginTop: "1rem",
  };

  const buttonStyle: CSSProperties = {
    cursor: "pointer",
    border: "none",
    borderRadius: "50%",
    backgroundColor: theme.palette.background.primary,
    display: "flex",
    width: "3rem",
    height: "3rem",
    alignItems: "center",
    justifyContent: "center",
  };

  const detailInfo: CSSProperties = screenSize.sm
    ? {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "80%",
      }
    : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
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
        <div style={detailInfo}>
          <p
            style={{
              display: "flex",
            }}
          >
            {location}
          </p>
          <p style={{ display: "flex", paddingRight: "1rem" }}>{time}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button onClick={onReFetch} style={buttonStyle}>
            <img
              style={{ width: "1.5rem" }}
              src={`static/images/search-${isLightMode ? "dark" : "light"}.png`}
              alt="search icon"
            />
          </button>
          <button
            onClick={onDelete}
            style={{ ...buttonStyle, marginLeft: "0.5rem" }}
          >
            <img
              style={{ width: "1.5rem" }}
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
