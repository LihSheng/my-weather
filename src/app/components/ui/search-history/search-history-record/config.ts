import { ScreenClass } from "@/app/contexts";
import { CSSProperties } from "react";

export const getStyles = (
  theme: Record<string, any>,
  screenSize: ScreenClass
) => {
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

  return { searchHistoryRecord, buttonStyle, detailInfo };
};
