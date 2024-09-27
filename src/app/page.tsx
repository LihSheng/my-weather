"use client";

import { Weather } from "./components";
import { ThemeProvider } from "./contexts";

export default function Home() {
  return (
    <ThemeProvider>
      <Weather />
    </ThemeProvider>
  );
}
