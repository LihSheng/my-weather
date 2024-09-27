import { useTheme } from "@/app/contexts";
import { CSSProperties, FC, PropsWithChildren } from "react";

interface LayoutProps {
  style?: CSSProperties;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  style,
}) => {
  const { theme, screenSize } = useTheme();

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
        gap: "1rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        paddingLeft: screenSize.sm ? "2rem" : screenSize.md ? "5rem" : "10rem",
        paddingRight: screenSize.sm ? "2rem" : screenSize.md ? "5rem" : "10rem",
      }}
    >
      {children}
    </div>
  );
};
