import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-container">
      <Search size={17} className="search-icon" aria-hidden="true" />
      <input
        type="text"
        className="search-input"
        placeholder="Search questions by title, keyword, or number..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="search-questions-input"
        aria-label="Search Python practical questions by number, title, or topic"
        autoComplete="off"
        spellCheck={false}
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange("")}
          aria-label="Clear search input"
          title="Clear search"
          type="button"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
