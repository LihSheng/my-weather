import { ScreenClass } from "@/app/contexts";
import { CSSProperties } from "react";

export const getStyles = (
  theme: Record<string, any>,
  screenSize: ScreenClass,
  isLightMode: boolean
) => {
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

  return { details, temperature, weatherCard, weatherInfo, weatherImage };
};

export const formatDate = (timestamp: number) => {
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
