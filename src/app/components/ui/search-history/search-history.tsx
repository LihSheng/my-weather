import { FC } from "react";
import { SearchHistoryRecord } from "./search-history-record";
import { useTheme } from "@/app/contexts";

interface SearchHistoryListProps {
  history: Record<string, string>[];
  onReFetch: (history: Record<string, string>) => void;
  onDelete: (index: number) => void;
}

export const SearchHistoryList: FC<SearchHistoryListProps> = ({
  history,
  onReFetch,
  onDelete,
}) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: theme.palette.background.primary,
        borderRadius: "1rem",
        padding: "1rem",
        width: "100%",
        flex: "1",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          display: "flex",
          width: "100%",
          flex: "1",
        }}
      >
        Search History
      </p>
      {history.map((history, index) => (
        <SearchHistoryRecord
          key={index}
          location={history.location}
          time={history.time}
          onReFetch={() => onReFetch(history)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  );
};
