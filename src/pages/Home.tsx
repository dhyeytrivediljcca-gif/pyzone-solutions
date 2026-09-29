import Hero from "../components/Hero";
import Stats from "../components/Stats";
import QuestionList from "../components/QuestionList";
import About from "../components/About";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main id="main-content" role="main">
      <Hero />
      <Stats />
      <div
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-secondary)",
          transition: "background 0.25s ease, border-color 0.25s ease",
        }}
      >
        <QuestionList />
      </div>
      <About />
      <Footer />
    </main>
  );
}
