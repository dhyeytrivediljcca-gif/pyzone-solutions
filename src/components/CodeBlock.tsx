import { useState, useCallback } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  filename?: string;
}

// ── Python Tokenizer ──────────────────────────────────────────────────────────
const KEYWORDS = new Set([
  "False", "None", "True", "and", "as", "assert", "async", "await",
  "break", "class", "continue", "def", "del", "elif", "else", "except",
  "finally", "for", "from", "global", "if", "import", "in", "is", "lambda",
  "nonlocal", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield",
]);

const BUILTINS = new Set([
  "print", "input", "int", "float", "str", "list", "dict", "set", "tuple", "bool",
  "len", "range", "enumerate", "zip", "map", "filter", "sorted", "reversed",
  "type", "isinstance", "hasattr", "getattr", "setattr", "super", "abs", "max", "min",
  "sum", "round", "open", "eval", "exec", "repr", "id", "hash", "hex", "oct", "bin",
  "chr", "ord", "any", "all", "next", "iter", "array",
]);

type Token = { text: string; cls: string };

function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    // Comment
    if (line[i] === "#") {
      tokens.push({ text: line.slice(i), cls: "tk-comment" });
      break;
    }

    // Decorator
    if (line[i] === "@") {
      let j = i + 1;
      while (j < line.length && /\w/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), cls: "tk-deco" });
      i = j;
      continue;
    }

    // Formatted or regular strings
    const strPrefixMatch = /^[frburb]{0,2}/i.exec(line.slice(i));
    const pfxLen = strPrefixMatch ? strPrefixMatch[0].length : 0;
    const afterPfx = i + pfxLen;
    if (pfxLen > 0 && (line[afterPfx] === '"' || line[afterPfx] === "'")) {
      let j = afterPfx;
      const q = line[j];
      const triple = line.slice(j, j + 3);
      if (triple === '"""' || triple === "'''") {
        j += 3;
        while (j < line.length && line.slice(j, j + 3) !== triple) j++;
        j = Math.min(j + 3, line.length);
      } else {
        j++;
        while (j < line.length && line[j] !== q) {
          if (line[j] === "\\") j++;
          j++;
        }
        j++;
      }
      tokens.push({ text: line.slice(i, j), cls: "tk-string" });
      i = j;
      continue;
    }
    if (line[i] === '"' || line[i] === "'") {
      const q = line[i];
      const triple = line.slice(i, i + 3);
      let j = i;
      if (triple === '"""' || triple === "'''") {
        j += 3;
        while (j < line.length && line.slice(j, j + 3) !== triple) j++;
        j = Math.min(j + 3, line.length);
      } else {
        j++;
        while (j < line.length && line[j] !== q) {
          if (line[j] === "\\") j++;
          j++;
        }
        j++;
      }
      tokens.push({ text: line.slice(i, j), cls: "tk-string" });
      i = j;
      continue;
    }

    // Number literals
    if (/[0-9]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[0-9._xXbBoO]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), cls: "tk-number" });
      i = j;
      continue;
    }

    // Identifier / Keyword / Function / Class
    if (/[a-zA-Z_]/.test(line[i])) {
      let j = i;
      while (j < line.length && /\w/.test(line[j])) j++;
      const word = line.slice(i, j);
      const isCall = line[j] === "(";
      let cls = "";
      if (word === "True" || word === "False" || word === "None") cls = "tk-bool";
      else if (KEYWORDS.has(word)) cls = "tk-keyword";
      else if (isCall && BUILTINS.has(word)) cls = "tk-builtin";
      else if (isCall) cls = "tk-function";
      else if (/^[A-Z]/.test(word)) cls = "tk-class";
      tokens.push({ text: word, cls });
      i = j;
      continue;
    }

    // Multi-char operators
    const op2 = line.slice(i, i + 2);
    if (["==", "!=", "<=", ">=", "**", "//", "->", ":=", "+=", "-=", "*=", "/="].includes(op2)) {
      tokens.push({ text: op2, cls: "tk-operator" });
      i += 2;
      continue;
    }

    // Single-char operators
    if (["+", "-", "*", "/", "%", "=", "<", ">", "&", "|", "^", "~", "!"].includes(line[i])) {
      tokens.push({ text: line[i], cls: "tk-operator" });
      i++;
      continue;
    }

    // Other characters (delimiters, brackets, etc.)
    tokens.push({ text: line[i], cls: "" });
    i++;
  }

  return tokens;
}

function HighlightedLine({ line }: { line: string }) {
  const tokens = tokenize(line);
  return (
    <>
      {tokens.map((tok, i) =>
        tok.cls ? (
          <span key={i} className={tok.cls}>
            {tok.text}
          </span>
        ) : (
          <span key={i}>{tok.text}</span>
        )
      )}
    </>
  );
}

export default function CodeBlock({ code, filename = "solution.py" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lines = code.split("\n");

  return (
    <div className="code-block-outer" aria-label="Python code solution">
      {/* Editor Header Bar */}
      <div className="code-toolbar">
        <div className="code-toolbar-left">
          <div className="traffic-lights" aria-hidden="true">
            <div className="tl" style={{ background: "#ef4444" }} />
            <div className="tl" style={{ background: "#f59e0b" }} />
            <div className="tl" style={{ background: "#10b981" }} />
          </div>
          <div className="code-toolbar-info">
            <Terminal size={13} aria-hidden="true" />
            <span>{filename}</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
            <span style={{ color: "#38bdf8" }}>Python 3</span>
          </div>
        </div>

        {/* Copy Button */}
        <button
          className={`copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          aria-label={copied ? "Code copied to clipboard" : "Copy Python code"}
          title="Copy code"
          type="button"
          id="copy-code-btn"
        >
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          <span>{copied ? "Copied ✓" : "Copy Code"}</span>
        </button>
      </div>

      {/* Editor Code Area */}
      <div className="code-area" role="region" aria-label="Code viewer" tabIndex={0}>
        {lines.map((line, idx) => (
          <div key={idx} className="code-line">
            <span className="line-number" aria-hidden="true">
              {idx + 1}
            </span>
            <span className="line-content">
              <HighlightedLine line={line} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
