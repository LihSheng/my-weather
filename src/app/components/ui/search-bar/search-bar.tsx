import { useTheme } from "@/app/contexts";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface SearchBarProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  location: city,
  setLocation: setCity,
  onSearch,
}) => {
  const { isLightMode, setIsLightMode, theme } = useTheme();

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "1rem",
    borderRadius: "1rem",
    backgroundColor: theme.palette.background.primary,
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    maxWidth: "100%",
    padding: "0",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "1rem",
    height: "100%",
    width: "4rem",
    cursor: "pointer",
    backgroundColor: isLightMode
      ? theme.palette.background.primary
      : theme.palette.background.secondary,
    borderRadius: "0.5rem",
  };

  return (
    <div style={formStyle}>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={inputStyle}
        type="text"
      />

      <button style={buttonStyle} onClick={onSearch}>
        <img src="static/images/search-icon.png" alt="Search" />
      </button>

      <button
        style={buttonStyle}
        onClick={() => {
          setIsLightMode((prev) => !prev);
        }}
      >
        {isLightMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
};
