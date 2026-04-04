import React, { useEffect, useCallback } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import './helixis.css';
import BrowserThemeProvider from './../Theme';

export default function HelixisNewTab() {
  useEffect(() => {
    document.title = 'Helixis';
  }, []);

  const handleSearchKeyDown = useCallback((e) => {
    if (e.key !== 'Enter') return;
    const query = e.target.value.trim();
    if (!query) return;

    // Bare domain (e.g. github.com) — navigate directly.
    if (/^[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test(query)) {
      window.location.href = 'https://' + query;
      return;
    }
    // Already a URL — navigate directly.
    if (/^https?:\/\//i.test(query)) {
      window.location.href = query;
      return;
    }
    // Otherwise, Google search.
    window.location.href =
      'https://www.google.com/search?q=' + encodeURIComponent(query);
  }, []);

  const quickLinks = [
    { label: "Gmail", href: "https://mail.google.com" },
    { label: "Calendar", href: "https://calendar.google.com" },
    { label: "Drive", href: "https://drive.google.com" },
    { label: "Buildium", href: "https://app.buildium.com" },
    { label: "News", href: "https://news.google.com" },
    { label: "Messages", href: "https://messages.google.com" },
  ];

  return (
    <BrowserThemeProvider>
      <CssBaseline />
      <div className="helixis-ntp">
        <div className="helixis-bg-glow" />

        <header className="helixis-header">
          <span className="helixis-wordmark">Helixis</span>
          <span className="helixis-chip">Agentic browser copilot</span>
        </header>

        <main className="helixis-main">
          <section className="helixis-hero">
            <h1 className="helixis-logo">Helixis</h1>
            <p className="helixis-tagline">
              AI-powered browser workspace for operators, property managers, and founders.
            </p>

            <div className="helixis-search">
              <input
                type="text"
                placeholder="Search the web or type a URL..."
                aria-label="Search Helixis or type a URL"
                onKeyDown={handleSearchKeyDown}
                autoFocus
              />
            </div>
          </section>

          <section className="helixis-quick-section">
            <div className="helixis-quick-header">
              <h2>Quick actions</h2>
              <span>Jump back into your daily tools</span>
            </div>

            <div className="helixis-quick-grid">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  className="helixis-quick-card"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="helixis-quick-icon">
                    {link.label.charAt(0)}
                  </div>
                  <div className="helixis-quick-label">{link.label}</div>
                </a>
              ))}
            </div>
          </section>
        </main>

        <footer className="helixis-footer">
          <span>Helixis • AI-powered browser</span>
        </footer>
      </div>
    </BrowserThemeProvider>
  );
}
