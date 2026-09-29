import { useParams, useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import SolutionViewer from "../components/SolutionViewer";
import Footer from "../components/Footer";
import { PyzoneIcon } from "../components/Logo";
import { ArrowLeft } from "lucide-react";

export default function Solution() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const questionId = Number(id);
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    return (
      <main id="main-content" role="main">
        <div
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            padding: "clamp(4rem, 10vw, 7rem) 1.25rem",
            textAlign: "center",
          }}
          className="fade-in-up"
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }} aria-hidden="true">
            <PyzoneIcon size={54} />
          </div>
          <h1
            style={{
              fontSize: "clamp(1.3rem, 4vw, 1.7rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Question Not Found
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.925rem",
              marginBottom: "1.85rem",
              lineHeight: 1.65,
            }}
          >
            The requested practical does not exist. There are {questions.length} practical questions available in the Pyzone-Solutions library.
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate("/")}
            aria-label="Return to practical questions library"
            id="not-found-home-btn"
            type="button"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to All Practicals</span>
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main id="main-content" role="main">
      <SolutionViewer question={question} />
      <Footer />
    </main>
  );
}
