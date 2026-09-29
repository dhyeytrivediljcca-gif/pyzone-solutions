import { useState, useMemo } from "react";
import { questions } from "../data/questions";
import QuestionCard from "./QuestionCard";
import SearchBar from "./SearchBar";
import { Filter, Layers, CheckCircle2, Clock } from "lucide-react";

type FilterType = "all" | "available" | "coming-soon";

export default function QuestionList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      // Status filter
      if (filter === "available" && !q.solutionAvailable) return false;
      if (filter === "coming-soon" && q.solutionAvailable) return false;

      // Text query filter
      if (!search.trim()) return true;
      const s = search.toLowerCase();
      return (
        q.title.toLowerCase().includes(s) ||
        q.question.toLowerCase().includes(s) ||
        String(q.id).includes(s)
      );
    });
  }, [search, filter]);

  const availableCount = questions.filter((q) => q.solutionAvailable).length;
  const comingSoonCount = questions.filter((q) => !q.solutionAvailable).length;

  return (
    <section id="questions" className="questions-section" aria-label="Python Practical Questions Library">
      {/* Section Header */}
      <div className="questions-header-bar">
        <div>
          <div className="section-eyebrow">
            <Layers size={13} aria-hidden="true" />
            <span>PRACTICAL LIBRARY</span>
          </div>
          <h2 className="section-heading">Python Practicals & Solutions</h2>
          <p className="section-subtitle">
            Browse through all {questions.length} practical problems. Select any card to inspect the solution and copy code.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Filter by solution status">
          <button
            className={`filter-tab-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
            role="tab"
            aria-selected={filter === "all"}
            type="button"
          >
            <Filter size={13} aria-hidden="true" />
            <span>All ({questions.length})</span>
          </button>
          <button
            className={`filter-tab-btn ${filter === "available" ? "active" : ""}`}
            onClick={() => setFilter("available")}
            role="tab"
            aria-selected={filter === "available"}
            type="button"
          >
            <CheckCircle2 size={13} aria-hidden="true" />
            <span>Available ({availableCount})</span>
          </button>
          <button
            className={`filter-tab-btn ${filter === "coming-soon" ? "active" : ""}`}
            onClick={() => setFilter("coming-soon")}
            role="tab"
            aria-selected={filter === "coming-soon"}
            type="button"
          >
            <Clock size={13} aria-hidden="true" />
            <span>Coming Soon ({comingSoonCount})</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Result Summary */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginBottom: "1.75rem",
        }}
      >
        <SearchBar value={search} onChange={setSearch} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.825rem",
            color: "var(--text-muted)",
          }}
          aria-live="polite"
        >
          <span>
            Showing <strong style={{ color: "var(--text-primary)" }}>{filtered.length}</strong> of {questions.length} practicals
            {search ? ` for "${search}"` : ""}
          </span>
          {(search || filter !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--accent-blue)",
                fontSize: "0.825rem",
                fontFamily: "'Inter', sans-serif",
                textDecoration: "underline",
                padding: "0.2rem 0.4rem",
              }}
              type="button"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Questions Grid */}
      {filtered.length > 0 ? (
        <div className="question-grid" role="list">
          {filtered.map((q) => (
            <div key={q.id} role="listitem">
              <QuestionCard question={q} />
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px dashed var(--border)",
            borderRadius: "16px",
            padding: "3.5rem 1.5rem",
            textAlign: "center",
          }}
          aria-live="polite"
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🔍</div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
            No matching practical questions
          </h3>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
            We couldn't find any questions matching your current search query or filter.
          </p>
          <button
            className="btn-secondary"
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
            type="button"
          >
            Clear Search & Filters
          </button>
        </div>
      )}
    </section>
  );
}
