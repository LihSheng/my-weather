import { useTheme } from "@/app/contexts";
import { Dispatch, FC, SetStateAction, CSSProperties } from "react";

interface SearchBarProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  location,
  setLocation,
  onSearch,
}) => {
  const { isLightMode, setIsLightMode, theme } = useTheme();

  const styles: Record<string, CSSProperties> = {
    inputStyle: {
      width: "100%",
      padding: "1rem",
      borderRadius: "1rem",
      backgroundColor: theme.palette.background.primary,
    },
    formStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      maxWidth: "100%",
      padding: "0",
    },
    buttonStyle: {
      padding: "1rem",
      height: "100%",
      width: "4rem",
      cursor: "pointer",
      backgroundColor: isLightMode
        ? theme.palette.background.primary
        : theme.palette.background.secondary,
      borderRadius: "0.5rem",
    },
  };

  return (
    <div style={styles.formStyle}>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={styles.inputStyle}
        type="text"
        placeholder="Enter your location"
      />

      <button style={styles.buttonStyle} onClick={onSearch}>
        <img src="static/images/search-icon.png" alt="Search" />
      </button>

      <button
        style={styles.buttonStyle}
        onClick={() => {
          setIsLightMode((prev) => !prev);
        }}
      >
        {isLightMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
};
