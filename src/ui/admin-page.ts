// Dashboard d'administració - Carrers Engalanats
// Admin Panel

import type { Env } from '../types';

export async function renderAdminPage(env: Env): Promise<Response> {
  const html = `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel - Carrers Engalanats</title>
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
      background: var(--color-dark);
      color: white;
      padding: 1.5rem 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-lg);
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
    }

    .header-subtitle {
      font-size: 0.75rem;
      color: var(--color-gray-400);
      font-family: var(--font-mono);
    }

    .header-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      font-family: var(--font-base);
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }

    .btn-primary {
      background: var(--color-primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--color-secondary);
    }

    .btn-success {
      background: var(--color-success);
      color: white;
    }

    .btn-success:hover {
      background: #059669;
    }

    .btn-danger {
      background: var(--color-danger);
      color: white;
    }

    .btn-danger:hover {
      background: #dc2626;
    }

    .btn-secondary {
      background: white;
      color: var(--color-gray-700);
    }

    .btn-secondary:hover {
      background: var(--color-gray-100);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

    .stat-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .stat-icon {
      width: 2.5rem;
      height: 2.5rem;
      background: var(--color-gray-100);
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      color: var(--color-gray-700);
    }

    .stat-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-gray-500);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-gray-900);
      font-family: var(--font-mono);
      line-height: 1;
    }

    .stat-value.text {
      font-size: 1.25rem;
      font-family: var(--font-base);
    }

    .message {
      padding: 1rem;
      margin-bottom: 2rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .message.success {
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #10b981;
    }

    .message.error {
      background: #fee2e2;
      color: #991b1b;
      border: 1px solid #ef4444;
    }

    .data-section {
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
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-gray-200);
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-gray-900);
    }

    .table-wrapper {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    thead {
      background: var(--color-gray-50);
    }

    th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: var(--color-gray-900);
      border-bottom: 1px solid var(--color-gray-200);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      font-family: var(--font-mono);
    }

    td {
      padding: 0.875rem 1rem;
      border-bottom: 1px solid var(--color-gray-100);
      color: var(--color-gray-700);
    }

    tbody tr {
      transition: background 0.2s;
    }

    tbody tr:hover {
      background: var(--color-gray-50);
    }

    .vote-id {
      font-weight: 600;
      color: var(--color-primary);
      font-family: var(--font-mono);
    }

    .vote-time {
      color: var(--color-gray-500);
      font-family: var(--font-mono);
      font-size: 0.8125rem;
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
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-content">
      <div>
        <div class="header-title">Administration Panel</div>
        <div class="header-subtitle">Carrers Engalanats Management System</div>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" onclick="loadData()">
          <span>↻</span>
          <span>Refresh</span>
        </button>
        <button class="btn btn-success" onclick="exportCSV()">
          <span>↓</span>
          <span>Export CSV</span>
        </button>
        <button class="btn btn-danger" onclick="confirmReset()">
          <span>×</span>
          <span>Reset Data</span>
        </button>
        <a href="/" class="btn btn-secondary">
          <span>←</span>
          <span>Exit</span>
        </a>
      </div>
    </div>
  </header>

  <div class="container">
    <div id="message" style="display: none;"></div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon">■</div>
          <div class="stat-label">Total Votes</div>
        </div>
        <div class="stat-value" id="totalVotes">-</div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon">▲</div>
          <div class="stat-label">Leading Entry</div>
        </div>
        <div class="stat-value text" id="winnerStreet">-</div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon">●</div>
          <div class="stat-label">Last Activity</div>
        </div>
        <div class="stat-value text" id="lastVote">-</div>
      </div>
    </div>

    <div class="data-section">
      <div class="section-header">
        <h2 class="section-title">Recent Votes (Last 100)</h2>
      </div>

      <div class="table-wrapper">
        <div id="votesContainer">
          <div class="loading">
            <div class="loading-spinner"></div>
            <p>Loading data...</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    const token = localStorage.getItem('admin_token');

    if (!token) {
      const password = prompt('Enter administrator password:');
      if (password) {
        login(password);
      } else {
        window.location.href = '/';
      }
    } else {
      loadData();
    }

    async function login(password) {
      try {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });

        const data = await response.json();

        if (data.success && data.token) {
          localStorage.setItem('admin_token', data.token);
          loadData();
        } else {
          alert('Incorrect password');
          window.location.href = '/';
        }
      } catch (error) {
        alert('Connection error');
        window.location.href = '/';
      }
    }

    async function loadData() {
      const token = localStorage.getItem('admin_token');

      try {
        const resultsResponse = await fetch('/api/resultats');
        const resultsData = await resultsResponse.json();

        if (resultsData) {
          document.getElementById('totalVotes').textContent =
            resultsData.total_votes.toLocaleString('en-US');

          if (resultsData.results && resultsData.results.length > 0) {
            const winner = resultsData.results[0];
            document.getElementById('winnerStreet').textContent =
              winner.vote_count > 0 ? winner.display_name : 'None';
          }
        }

        const votesResponse = await fetch('/api/admin/resultats', {
          headers: { 'Authorization': \`Bearer \${token}\` }
        });

        if (votesResponse.status === 401) {
          localStorage.removeItem('admin_token');
          alert('Session expired. Please login again.');
          window.location.reload();
          return;
        }

        const votesData = await votesResponse.json();

        if (votesData.success && votesData.votes) {
          renderVotes(votesData.votes);

          if (votesData.votes.length > 0) {
            const lastVoteDate = new Date(votesData.votes[0].voted_at);
            const now = new Date();
            const diffMinutes = Math.floor((now - lastVoteDate) / 60000);

            let timeText;
            if (diffMinutes < 1) {
              timeText = 'Just now';
            } else if (diffMinutes < 60) {
              timeText = \`\${diffMinutes}m ago\`;
            } else {
              const diffHours = Math.floor(diffMinutes / 60);
              timeText = \`\${diffHours}h ago\`;
            }

            document.getElementById('lastVote').textContent = timeText;
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
        showMessage('Error loading data', 'error');
      }
    }

    function renderVotes(votes) {
      const tableHtml = \`
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Street</th>
              <th>Timestamp</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            \${votes.map(vote => \`
              <tr>
                <td class="vote-id">#\${vote.id}</td>
                <td>\${vote.display_name}</td>
                <td class="vote-time">\${new Date(vote.voted_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                })}</td>
                <td>\${vote.ip_address || '-'}</td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      \`;

      document.getElementById('votesContainer').innerHTML = tableHtml;
    }

    async function exportCSV() {
      const token = localStorage.getItem('admin_token');

      try {
        const response = await fetch('/api/admin/export', {
          method: 'POST',
          headers: { 'Authorization': \`Bearer \${token}\` }
        });

        if (response.status === 401) {
          localStorage.removeItem('admin_token');
          alert('Session expired');
          window.location.reload();
          return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = \`carrers-engalanats-\${new Date().toISOString().split('T')[0]}.csv\`;
        a.click();
        window.URL.revokeObjectURL(url);

        showMessage('CSV exported successfully', 'success');
      } catch (error) {
        console.error('Export error:', error);
        showMessage('Export failed', 'error');
      }
    }

    function confirmReset() {
      const confirmation = confirm(
        'WARNING: This will permanently delete ALL votes.\\n\\n' +
        'This action CANNOT be undone.\\n\\n' +
        'Continue?'
      );

      if (confirmation) {
        const doubleCheck = prompt('Type "DELETE" in capitals to confirm:');
        if (doubleCheck === 'DELETE') {
          resetVotes();
        } else {
          alert('Cancelled. No data deleted.');
        }
      }
    }

    async function resetVotes() {
      const token = localStorage.getItem('admin_token');

      try {
        const response = await fetch('/api/admin/reset', {
          method: 'DELETE',
          headers: { 'Authorization': \`Bearer \${token}\` }
        });

        if (response.status === 401) {
          localStorage.removeItem('admin_token');
          alert('Session expired');
          window.location.reload();
          return;
        }

        const data = await response.json();

        if (data.success) {
          showMessage('All votes deleted successfully', 'success');
          setTimeout(() => loadData(), 1000);
        } else {
          showMessage('Delete operation failed', 'error');
        }
      } catch (error) {
        console.error('Delete error:', error);
        showMessage('Delete operation failed', 'error');
      }
    }

    function showMessage(text, type) {
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = text;
      messageDiv.className = \`message \${type}\`;
      messageDiv.style.display = 'block';

      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 5000);
    }

    setInterval(loadData, 30000);
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
