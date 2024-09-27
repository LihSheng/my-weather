import { useTheme } from "@/app/contexts";
import { FC } from "react";
import { getStyles } from "./config";

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
  const { searchHistoryRecord, buttonStyle, detailInfo } = getStyles(
    theme,
    screenSize
  );

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
