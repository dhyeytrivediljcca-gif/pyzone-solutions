import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import type { Question } from "../data/questions";

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/question/${question.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="question-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`Practical ${question.id}: ${question.title}. ${
        question.solutionAvailable ? "Solution available" : "Coming soon"
      }`}
      id={`question-card-${question.id}`}
    >
      {/* Question Number Badge */}
      <div className="q-number" aria-hidden="true">
        {String(question.id).padStart(2, "0")}
      </div>

      {/* Main Details */}
      <div className="q-content">
        <div className="q-top-row">
          <h3 className="q-title-text">{question.title}</h3>
          <span
            className={`badge ${
              question.solutionAvailable ? "badge-available" : "badge-coming-soon"
            }`}
          >
            {question.solutionAvailable ? (
              <>
                <CheckCircle2 size={11} aria-hidden="true" />
                <span>Available</span>
              </>
            ) : (
              <>
                <Clock size={11} aria-hidden="true" />
                <span>Coming Soon</span>
              </>
            )}
          </span>
        </div>

        <p className="q-preview">{question.question}</p>
      </div>

      {/* Action Arrow */}
      <div className="q-arrow-icon" aria-hidden="true">
        <ArrowRight size={17} />
      </div>
    </div>
  );
}
