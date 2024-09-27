import { useTheme } from "@/app/contexts";
import { CSSProperties, FC, PropsWithChildren } from "react";

interface LayoutProps {
  style?: CSSProperties;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        ...style,
        display: "flex",
        flexDirection: "column",
        backgroundImage: theme.palette.backgroundImage,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.font.primary,
        backgroundSize: "cover",
        minHeight: "100vh",
        minWidth: "100vw",
        height: "100vh",
        overflow: "hidden",
        gap: "1rem",
        paddingLeft: "10rem",
        paddingRight: "10rem",
      }}
    >
      {children}
    </div>
  );
};
