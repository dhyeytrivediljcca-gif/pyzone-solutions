import { useState, useEffect, useRef } from "react";
import { BookOpen, CheckCircle2, Clock } from "lucide-react";
import { totalQuestions, availableSolutions, comingSoonCount } from "../data/questions";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  isVisible: boolean;
}

function StatCard({ icon, value, label, color, bgColor, borderColor, isVisible }: StatItemProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      className="stat-card"
      style={{
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div
        className="stat-icon-wrap"
        style={{
          background: bgColor,
          color: color,
          border: `1px solid ${borderColor}`,
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="stat-info">
        <div className="stat-value" style={{ color }}>
          {count}
        </div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: <BookOpen size={22} />,
      value: totalQuestions,
      label: "Practical Questions",
      color: "var(--accent-blue)",
      bgColor: "rgba(56, 189, 248, 0.12)",
      borderColor: "rgba(56, 189, 248, 0.25)",
    },
    {
      icon: <CheckCircle2 size={22} />,
      value: availableSolutions,
      label: "Available Solutions",
      color: "var(--accent-green)",
      bgColor: "rgba(34, 197, 94, 0.12)",
      borderColor: "rgba(34, 197, 94, 0.25)",
    },
    {
      icon: <Clock size={22} />,
      value: comingSoonCount,
      label: "Coming Soon",
      color: "var(--accent-yellow)",
      bgColor: "rgba(250, 204, 21, 0.12)",
      borderColor: "rgba(250, 204, 21, 0.25)",
    },
  ];

  return (
    <section ref={sectionRef} className="stats-section" aria-label="Library Statistics">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <StatCard
            key={i}
            icon={s.icon}
            value={s.value}
            label={s.label}
            color={s.color}
            bgColor={s.bgColor}
            borderColor={s.borderColor}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}
