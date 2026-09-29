import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Code2, CheckCircle2, Clock, Sparkles } from "lucide-react";
import type { Question } from "../data/questions";
import { questions } from "../data/questions";
import CodeBlock from "./CodeBlock";
import ComingSoon from "./ComingSoon";

interface SolutionViewerProps {
  question: Question;
}

export default function SolutionViewer({ question }: SolutionViewerProps) {
  const navigate = useNavigate();
  const prevQ = questions.find((q) => q.id === question.id - 1);
  const nextQ = questions.find((q) => q.id === question.id + 1);

  return (
    <div className="solution-page fade-in-up">
      {/* Top Navigation Row */}
      <div className="solution-page-top">
        <button
          className="btn-back"
          onClick={() => navigate("/")}
          id="back-to-questions-btn"
          aria-label="Back to questions list"
          type="button"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>All Practicals</span>
        </button>

        <div
          style={{
            fontSize: "0.825rem",
            color: "var(--text-muted)",
            fontFamily: "'Fira Code', monospace",
          }}
        >
          Question {String(question.id).padStart(2, "0")} / {questions.length}
        </div>
      </div>

      {/* Question Header Card */}
      <div className="question-header-card">
        <div className="question-header-inner">
          {/* Question Number Badge */}
          <div className="q-num-badge" aria-hidden="true">
            {String(question.id).padStart(2, "0")}
          </div>

          <div className="q-header-content">
            <div className="q-header-title-row">
              <h1 className="q-header-h1">{question.title}</h1>
              <span
                className={`badge ${
                  question.solutionAvailable ? "badge-available" : "badge-coming-soon"
                }`}
              >
                {question.solutionAvailable ? (
                  <>
                    <CheckCircle2 size={11} aria-hidden="true" />
                    <span>Solution Available</span>
                  </>
                ) : (
                  <>
                    <Clock size={11} aria-hidden="true" />
                    <span>Coming Soon</span>
                  </>
                )}
              </span>
            </div>

            <p className="q-body-text">{question.question}</p>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div>
        <div className="solution-label-row">
          <div className="solution-label">
            <Code2 size={15} color="var(--accent-blue)" aria-hidden="true" />
            <span>Python 3 Solution</span>
          </div>
          {question.solutionAvailable && (
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--accent-green)",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <Sparkles size={12} aria-hidden="true" />
              Verified Output
            </span>
          )}
        </div>

        {question.solutionAvailable && question.solution ? (
          <CodeBlock
            code={question.solution}
            filename={`practical_${String(question.id).padStart(2, "0")}.py`}
          />
        ) : (
          <ComingSoon questionId={question.id} questionTitle={question.title} />
        )}
      </div>

      {/* Prev / Next Bottom Navigation */}
      <div className="q-nav">
        {prevQ ? (
          <button
            className="btn-secondary"
            onClick={() => navigate(`/question/${prevQ.id}`)}
            aria-label={`Previous: Practical ${prevQ.id} - ${prevQ.title}`}
            type="button"
            style={{ fontSize: "0.85rem", padding: "0.55rem 1rem" }}
          >
            <ChevronLeft size={16} aria-hidden="true" />
            <span>
              Prev: #{String(prevQ.id).padStart(2, "0")} {prevQ.title.slice(0, 22)}
              {prevQ.title.length > 22 ? "…" : ""}
            </span>
          </button>
        ) : (
          <div />
        )}

        {nextQ && (
          <button
            className="btn-secondary"
            onClick={() => navigate(`/question/${nextQ.id}`)}
            aria-label={`Next: Practical ${nextQ.id} - ${nextQ.title}`}
            type="button"
            style={{ fontSize: "0.85rem", padding: "0.55rem 1rem", marginLeft: "auto" }}
          >
            <span>
              Next: #{String(nextQ.id).padStart(2, "0")} {nextQ.title.slice(0, 22)}
              {nextQ.title.length > 22 ? "…" : ""}
            </span>
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
