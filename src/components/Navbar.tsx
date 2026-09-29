import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Questions", anchor: "questions" },
  { label: "About", anchor: "about" },
];

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll for elevated navbar state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleNavClick = (anchor?: string, href?: string) => {
    setMobileOpen(false);
    if (anchor) {
      if (location.pathname !== "/") {
        window.location.href = `/#${anchor}`;
        return;
      }
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 50);
    } else if (href === "/") {
      if (location.pathname !== "/") {
        window.location.href = "/";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`} role="banner">
      <nav className="navbar-inner" role="navigation" aria-label="Main navigation">
        {/* Brand */}
        <Link to="/" className="navbar-brand" aria-label="Pyzone-Solutions Homepage">
          <Logo size={32} showText={true} />
        </Link>

        {/* Right side container */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Desktop Nav Links (Only Home, Questions, About) */}
          <div className="nav-links" style={{ display: "none" }} id="desktop-nav-container">
            {navLinks.map((link) => (
              <button
                key={link.label}
                className="nav-link-btn"
                onClick={() => handleNavClick(link.anchor, link.href)}
                type="button"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action controls: Single Theme Toggle + Mobile Menu Button */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              type="button"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              ref={menuBtnRef}
              className="icon-btn mobile-menu-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-menu" id="mobile-menu" ref={menuRef} role="menu">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className="mobile-nav-btn"
              onClick={() => handleNavClick(link.anchor, link.href)}
              role="menuitem"
              type="button"
            >
              <span>{link.label}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>→</span>
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          #desktop-nav-container { display: flex !important; }
          .mobile-menu-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
