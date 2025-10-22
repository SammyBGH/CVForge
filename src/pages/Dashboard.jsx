import React, { useEffect, useRef, useState } from "react";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";

/**
 * CVCard - self-contained card component with working 3-dots dropdown menu.
 * Props:
 *  - title (string)
 *  - lastUpdated (string | Date)
 *  - id (string)
 *  - onDelete (fn)
 */
function CVCard({ id, title, lastUpdated, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleAction = (action) => {
    setOpen(false);
    if (action === "edit") {
      console.log("Edit", id);
      // navigate/edit logic
    } else if (action === "download") {
      console.log("Download", id);
    } else if (action === "duplicate") {
      console.log("Duplicate", id);
    } else if (action === "delete") {
      if (window.confirm("Delete this CV?")) onDelete?.(id);
    }
  };

  return (
    <article className="cv-card" aria-labelledby={`cv-title-${id}`}>
      <header className="cv-card-header">
        <h4 id={`cv-title-${id}`} className="cv-title">
          {title || "Untitled CV"}
        </h4>

        <div className="cv-card-menu">
          {/* toggle button */}
          <button
            ref={toggleRef}
            className="menu-toggle"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls={`cv-menu-${id}`}
            onClick={() => setOpen((s) => !s)}
            title="Open menu"
          >
            ⋮
          </button>

          {/* dropdown - rendered in DOM only when open */}
          {open && (
            <div
              id={`cv-menu-${id}`}
              ref={menuRef}
              className="cv-dropdown"
              role="menu"
              aria-labelledby={`cv-title-${id}`}
            >
              <button role="menuitem" onClick={() => handleAction("edit")}>
                ✏️ Edit
              </button>
              <button role="menuitem" onClick={() => handleAction("duplicate")}>
                ⎘ Make a copy
              </button>
              <button role="menuitem" onClick={() => handleAction("download")}>
                ⬇️ Download PDF
              </button>

              <div className="menu-divider" aria-hidden />

              <button
                role="menuitem"
                className="danger"
                onClick={() => handleAction("delete")}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="cv-card-preview">
        <span className="preview-icon" aria-hidden>
          📄
        </span>
        <p className="preview-text">Preview</p>
      </div>

      <footer className="cv-card-footer">
        <span className="last-updated">
          🕒{" "}
          {lastUpdated
            ? `Updated ${new Date(lastUpdated).toLocaleDateString()}`
            : "Not updated yet"}
        </span>
        <Link to={`/builder/${id}`} className="btn-open">
          Open
        </Link>
      </footer>
    </article>
  );
}

/**
 * Dashboard - page component
 */
export default function Dashboard() {
  // sample data (replace with real state / API)
  const [cvs, setCvs] = useState([
    {
      id: "1",
      title: "Software Engineer CV",
      lastUpdated: "2025-10-20T14:30:00Z",
    },
    {
      id: "2",
      title: "Marketing Manager",
      lastUpdated: "2025-10-15T09:15:00Z",
    },
    {
      id: "3",
      title: "Graphic Designer",
      lastUpdated: "2025-10-10T16:45:00Z",
    },
  ]);

  const stats = {
    totalCVs: cvs.length,
    lastUpdated: cvs[0]?.lastUpdated ?? null,
    templatesUsed: 2,
  };

  const handleDelete = (id) => {
    // temporary removal to show UI reaction
    setCvs((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>My Dashboard</h1>
          <p className="welcome">Welcome back! Here's an overview of your CVs.</p>
        </div>

        <Link to="/builder" className="btn-primary">
          ➕ Create New CV
        </Link>
      </header>

      <section className="stats">
        <div className="stat-card">
          <div className="stat-emoji">📊</div>
          <div>
            <h3>Total CVs</h3>
            <p className="stat-value">{stats.totalCVs}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-emoji">⏱️</div>
          <div>
            <h3>Last Updated</h3>
            <p className="stat-value">
              {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : "Never"}
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-emoji">🎨</div>
          <div>
            <h3>Templates Used</h3>
            <p className="stat-value">{stats.templatesUsed}</p>
          </div>
        </div>
      </section>

      <section className="recent">
        <div className="section-header">
          <h2>Recent CVs</h2>
          <div /> {/* spacer - we intentionally keep top-right action reserved */}
        </div>

        {cvs.length ? (
          <div className="cv-grid">
            {cvs.map((cv) => (
              <CVCard
                key={cv.id}
                id={cv.id}
                title={cv.title}
                lastUpdated={cv.lastUpdated}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No CVs yet. Create your first CV to get started.</p>
            <Link to="/builder" className="btn-primary">
              ➕ Create Your First CV
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
