// Pàgina de resultats - Carrers Engalanats
// Data Visualization Dashboard

import type { Env } from '../types';

export async function renderResultsPage(env: Env): Promise<Response> {
  const html = `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Results Dashboard - Carrers Engalanats Competition">
  <title>Results Dashboard - Carrers Engalanats</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-primary: #2563eb;
      --color-secondary: #1e40af;
      --color-success: #10b981;
      --color-warning: #f59e0b;
      --color-danger: #ef4444;
      --color-dark: #0f172a;
      --color-gray-50: #f8fafc;
      --color-gray-100: #f1f5f9;
      --color-gray-200: #e2e8f0;
      --color-gray-300: #cbd5e1;
      --color-gray-400: #94a3b8;
      --color-gray-500: #64748b;
      --color-gray-600: #475569;
      --color-gray-700: #334155;
      --color-gray-800: #1e293b;
      --color-gray-900: #0f172a;
      --font-base: 'Inter', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: var(--font-base);
      line-height: 1.6;
      color: var(--color-gray-900);
      background: var(--color-gray-50);
      -webkit-font-smoothing: antialiased;
    }

    .header {
      background: white;
      border-bottom: 1px solid var(--color-gray-200);
      padding: 1.5rem 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-sm);
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .header-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-gray-900);
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--color-success);
      color: white;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: var(--font-mono);
    }

    .live-indicator {
      width: 0.5rem;
      height: 0.5rem;
      background: white;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s;
    }

    .stat-card:hover {
      box-shadow: var(--shadow-md);
    }

    .stat-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-gray-500);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-gray-900);
      font-family: var(--font-mono);
      line-height: 1;
    }

    .stat-value.text {
      font-size: 1.5rem;
      font-family: var(--font-base);
    }

    .results-section {
      background: white;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.75rem;
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-gray-200);
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-gray-900);
    }

    .last-update {
      font-size: 0.75rem;
      color: var(--color-gray-500);
      font-family: var(--font-mono);
    }

    .results-list {
      list-style: none;
      display: grid;
      gap: 1.5rem;
    }

    .result-item {
      padding: 1.5rem;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.5rem;
      transition: all 0.2s;
    }

    .result-item:hover {
      border-color: var(--color-gray-300);
      box-shadow: var(--shadow-sm);
    }

    .result-item.rank-1 {
      border-color: var(--color-primary);
      border-width: 2px;
      background: linear-gradient(to right, rgba(37, 99, 235, 0.02), transparent);
    }

    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      gap: 1rem;
    }

    .result-left {
      flex: 1;
    }

    .rank-badge {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      background: var(--color-gray-100);
      border-radius: 0.375rem;
      text-align: center;
      line-height: 2rem;
      font-weight: 700;
      font-family: var(--font-mono);
      color: var(--color-gray-700);
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .result-item.rank-1 .rank-badge {
      background: var(--color-primary);
      color: white;
    }

    .street-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-gray-900);
      margin-bottom: 0.5rem;
    }

    .vote-stats {
      display: flex;
      gap: 1.5rem;
      font-size: 0.875rem;
      color: var(--color-gray-600);
      font-family: var(--font-mono);
    }

    .vote-count {
      font-weight: 600;
      color: var(--color-gray-900);
    }

    .progress-container {
      margin-top: 1rem;
    }

    .progress-bar {
      height: 0.75rem;
      background: var(--color-gray-100);
      border-radius: 0.375rem;
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: var(--color-gray-400);
      transition: width 1s ease;
      position: relative;
    }

    .result-item.rank-1 .progress-fill {
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    }

    .progress-label {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.625rem;
      font-weight: 700;
      color: var(--color-gray-900);
      font-family: var(--font-mono);
    }

    .result-item.rank-1 .progress-label {
      color: white;
    }

    .actions {
      background: white;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.75rem;
      padding: 2rem;
      text-align: center;
    }

    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      border-radius: 0.5rem;
      transition: all 0.2s;
      margin: 0.5rem;
    }

    .btn-primary {
      background: var(--color-primary);
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background: var(--color-secondary);
      box-shadow: var(--shadow-md);
    }

    .btn-secondary {
      background: white;
      color: var(--color-gray-700);
      border: 1px solid var(--color-gray-300);
    }

    .btn-secondary:hover {
      background: var(--color-gray-50);
    }

    .footer {
      text-align: center;
      padding: 2rem;
      color: var(--color-gray-500);
      font-size: 0.75rem;
      font-family: var(--font-mono);
    }

    .loading {
      text-align: center;
      padding: 3rem;
      color: var(--color-gray-500);
    }

    .loading-spinner {
      width: 2rem;
      height: 2rem;
      border: 3px solid var(--color-gray-200);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        align-items: flex-start;
      }
      .result-header {
        flex-direction: column;
      }
      .vote-stats {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-content">
      <div class="header-title">Results Dashboard</div>
      <div class="header-badge">
        <span class="live-indicator"></span>
        <span>Live Data</span>
      </div>
    </div>
  </header>

  <div class="container">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Total Votes</div>
        <div class="stat-value" id="totalVotes">-</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Leading Entry</div>
        <div class="stat-value text" id="leaderName">-</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Entries</div>
        <div class="stat-value">6</div>
      </div>
    </div>

    <div class="results-section">
      <div class="section-header">
        <h2 class="section-title">Competition Rankings</h2>
        <div class="last-update">Auto-refresh: 30s</div>
      </div>

      <div id="resultsContainer">
        <div class="loading">
          <div class="loading-spinner"></div>
          <p>Loading results...</p>
        </div>
      </div>
    </div>

    <div class="actions">
      <a href="/" class="btn btn-primary">Submit Vote</a>
      <a href="/api/admin/dashboard" class="btn btn-secondary">Admin Access</a>
    </div>

    <footer class="footer">
      Carrers Engalanats · XII Edition · Sant Joan 2026 · Associació Veïnal del Raval d'Elx
    </footer>
  </div>

  <script>
    let updateInterval;

    async function loadResults() {
      try {
        const response = await fetch('/api/resultats');
        const data = await response.json();

        if (data && data.results) {
          renderResults(data);
          updateStats(data);
        }
      } catch (error) {
        console.error('Error loading results:', error);
        document.getElementById('resultsContainer').innerHTML =
          '<div class="loading"><p>Error loading results. Retrying...</p></div>';
      }
    }

    function updateStats(data) {
      document.getElementById('totalVotes').textContent = data.total_votes.toLocaleString('en-US');

      if (data.results && data.results.length > 0 && data.results[0].vote_count > 0) {
        const leader = data.results[0].display_name;
        document.getElementById('leaderName').textContent = leader;
      } else {
        document.getElementById('leaderName').textContent = 'No votes yet';
      }
    }

    function renderResults(data) {
      const resultsHtml = data.results.map((result, index) => {
        const rank = index + 1;
        const isLeader = rank === 1 && result.vote_count > 0;

        return \`
          <li class="result-item rank-\${rank}">
            <div class="result-header">
              <div class="result-left">
                <div class="rank-badge">\${String(rank).padStart(2, '0')}</div>
                <div class="street-name">\${result.display_name}</div>
                <div class="vote-stats">
                  <span>Votes: <span class="vote-count">\${result.vote_count}</span></span>
                  <span>Share: <span class="vote-count">\${result.percentage}%</span></span>
                </div>
              </div>
            </div>
            <div class="progress-container">
              <div class="progress-bar" role="progressbar"
                   aria-valuenow="\${result.percentage}"
                   aria-valuemin="0"
                   aria-valuemax="100">
                <div class="progress-fill" style="width: \${result.percentage}%">
                  <span class="progress-label">\${result.percentage}%</span>
                </div>
              </div>
            </div>
          </li>
        \`;
      }).join('');

      document.getElementById('resultsContainer').innerHTML = \`
        <ul class="results-list" role="list">
          \${resultsHtml}
        </ul>
      \`;
    }

    loadResults();
    updateInterval = setInterval(loadResults, 30000);

    window.addEventListener('beforeunload', () => {
      clearInterval(updateInterval);
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
