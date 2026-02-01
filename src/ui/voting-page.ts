// Pàgina de votació - Carrers Engalanats
// Data Visualization Project

import type { Env } from '../types';

export async function renderVotingPage(env: Env): Promise<Response> {
  const html = `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Concurs de Carrers Engalanats del Raval d'Elx - Plataforma de votació digital">
  <title>Carrers Engalanats - Voting Platform</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --color-primary: #2563eb;
      --color-secondary: #1e40af;
      --color-accent: #3b82f6;
      --color-success: #10b981;
      --color-danger: #ef4444;
      --color-warning: #f59e0b;
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
      --font-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
      --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
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
      -moz-osx-font-smoothing: grayscale;
    }

    /* Header */
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

    .header-left {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .header-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-gray-900);
      letter-spacing: -0.025em;
    }

    .header-subtitle {
      font-size: 0.875rem;
      color: var(--color-gray-500);
      font-family: var(--font-mono);
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.375rem 0.75rem;
      background: var(--color-gray-100);
      color: var(--color-gray-700);
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: var(--font-mono);
    }

    /* Container */
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    /* Hero Section */
    .hero {
      background: white;
      border-radius: 0.75rem;
      padding: 3rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--color-gray-200);
    }

    .hero-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-gray-900);
      margin-bottom: 1rem;
      letter-spacing: -0.025em;
    }

    .hero-description {
      font-size: 1.125rem;
      color: var(--color-gray-600);
      max-width: 800px;
      line-height: 1.7;
    }

    /* Info Grid */
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .info-card {
      background: white;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: all 0.2s;
    }

    .info-card:hover {
      box-shadow: var(--shadow-md);
      border-color: var(--color-gray-300);
    }

    .info-card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .info-card-icon {
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

    .info-card-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-gray-900);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .info-card-content {
      font-size: 0.875rem;
      color: var(--color-gray-600);
      line-height: 1.6;
    }

    /* Section */
    .section {
      margin-bottom: 3rem;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-gray-900);
      letter-spacing: -0.025em;
    }

    .section-count {
      font-size: 0.875rem;
      color: var(--color-gray-500);
      font-family: var(--font-mono);
      background: var(--color-gray-100);
      padding: 0.25rem 0.75rem;
      border-radius: 0.375rem;
    }

    /* Gallery */
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .gallery {
        grid-template-columns: 1fr;
      }
    }

    .street-card {
      background: white;
      border: 2px solid var(--color-gray-200);
      border-radius: 0.75rem;
      overflow: hidden;
      transition: all 0.2s;
      cursor: pointer;
    }

    .street-card:hover {
      border-color: var(--color-primary);
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }

    .street-card.selected {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .street-image-container {
      position: relative;
      height: 280px;
      background: var(--color-gray-100);
      overflow: hidden;
    }

    .street-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .street-card:hover .street-image {
      transform: scale(1.05);
    }

    .street-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-gray-700);
      font-family: var(--font-mono);
      box-shadow: var(--shadow-sm);
    }

    .street-info {
      padding: 1.5rem;
    }

    .street-name {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--color-gray-900);
    }

    .street-description {
      font-size: 0.875rem;
      color: var(--color-gray-600);
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .vote-radio {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: var(--color-gray-50);
      border-radius: 0.5rem;
      transition: background 0.2s;
    }

    .street-card.selected .vote-radio {
      background: rgba(37, 99, 235, 0.05);
    }

    .vote-radio input[type="radio"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: var(--color-primary);
    }

    .vote-radio label {
      cursor: pointer;
      font-weight: 500;
      color: var(--color-gray-700);
      font-size: 0.875rem;
      margin: 0;
    }

    /* Form */
    .form-section {
      background: white;
      border: 1px solid var(--color-gray-200);
      border-radius: 0.75rem;
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .form-header {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-gray-200);
    }

    .form-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-gray-900);
      margin-bottom: 0.5rem;
    }

    .form-subtitle {
      font-size: 0.875rem;
      color: var(--color-gray-600);
    }

    .message {
      padding: 1rem;
      margin-bottom: 1.5rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
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

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--color-gray-900);
      font-size: 0.875rem;
    }

    input[type="email"] {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      font-family: var(--font-base);
      border: 1px solid var(--color-gray-300);
      border-radius: 0.5rem;
      transition: all 0.2s;
      background: white;
    }

    input[type="email"]:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .input-help {
      display: block;
      margin-top: 0.5rem;
      color: var(--color-gray-500);
      font-size: 0.75rem;
      line-height: 1.5;
    }

    .submit-btn {
      width: 100%;
      padding: 0.875rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      font-family: var(--font-base);
      color: white;
      background: var(--color-primary);
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
      min-height: 48px;
    }

    .submit-btn:hover:not(:disabled) {
      background: var(--color-secondary);
      box-shadow: var(--shadow-md);
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .submit-btn:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    /* Footer */
    .footer {
      text-align: center;
      padding: 2rem;
      margin-top: 3rem;
      border-top: 1px solid var(--color-gray-200);
    }

    .footer-link {
      display: inline-block;
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.875rem;
      transition: color 0.2s;
    }

    .footer-link:hover {
      color: var(--color-secondary);
    }

    .footer-info {
      margin-top: 1rem;
      font-size: 0.75rem;
      color: var(--color-gray-500);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <div class="header-title">Carrers Engalanats Raval d'Elx</div>
        <div class="header-subtitle">XII Edition · Sant Joan 2026</div>
      </div>
      <div class="header-badge">Data Visualization Project</div>
    </div>
  </header>

  <div class="container">
    <section class="hero">
      <h1 class="hero-title">Annual Street Decoration Competition</h1>
      <p class="hero-description">
        Community voting platform for the 12th edition of Carrers Engalanats.
        This project, initiated by Associació Veïnal del Raval in 2011, promotes
        neighborhood engagement and celebrates local tradition through decorated streets
        during the Sant Joan festivities.
      </p>
    </section>

    <div class="info-grid">
      <div class="info-card">
        <div class="info-card-header">
          <div class="info-card-icon">◆</div>
          <div class="info-card-title">Project Scope</div>
        </div>
        <div class="info-card-content">
          Evaluation of artistic quality, originality, and community participation
          across six participating streets in the Raval district.
        </div>
      </div>

      <div class="info-card">
        <div class="info-card-header">
          <div class="info-card-icon">◇</div>
          <div class="info-card-title">Evaluation Criteria</div>
        </div>
        <div class="info-card-content">
          Assessment based on creativity, use of recycled materials, design quality,
          and contribution to neighborhood atmosphere.
        </div>
      </div>

      <div class="info-card">
        <div class="info-card-header">
          <div class="info-card-icon">◈</div>
          <div class="info-card-title">Data Collection</div>
        </div>
        <div class="info-card-content">
          Single-vote system with email validation to ensure data integrity
          and prevent duplicate entries.
        </div>
      </div>

      <div class="info-card">
        <div class="info-card-header">
          <div class="info-card-icon">◉</div>
          <div class="info-card-title">Historical Context</div>
        </div>
        <div class="info-card-content">
          Tradition recovered in 2011, celebrating 12 years of community
          engagement and cultural preservation in 2026.
        </div>
      </div>
    </div>

    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Street Entries</h2>
        <span class="section-count">6 participants</span>
      </div>

      <fieldset style="border: none; padding: 0;">
        <legend class="sr-only">Select a street to vote</legend>
        <div class="gallery" id="streetsGallery" role="radiogroup" aria-label="Participating streets">
          <!-- Street cards will load here -->
        </div>
      </fieldset>
    </section>

    <section class="form-section">
      <div class="form-header">
        <h3 class="form-title">Submit Vote</h3>
        <p class="form-subtitle">Enter your email to register your vote</p>
      </div>

      <form id="voteForm" aria-label="Voting form">
        <div id="message" class="message" style="display: none;" role="alert" aria-live="polite"></div>

        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="your.email@example.com"
            aria-required="true"
            aria-describedby="email-help"
          >
          <small id="email-help" class="input-help">
            Email is used solely for vote validation. No data sharing with third parties.
          </small>
        </div>

        <button type="submit" class="submit-btn" id="submitBtn">
          Submit Vote
        </button>
      </form>
    </section>

    <footer class="footer">
      <a href="/resultats" class="footer-link">View Results Dashboard →</a>
      <div class="footer-info">
        Associació Veïnal del Raval d'Elx · XII Carrers Engalanats Competition · Sant Joan 2026
      </div>
    </footer>
  </div>

  <script>
    let selectedStreetId = null;

    async function loadStreets() {
      try {
        const response = await fetch('/api/carrers');
        const data = await response.json();

        if (data.success && data.streets) {
          renderStreets(data.streets);
        }
      } catch (error) {
        console.error('Error loading streets:', error);
      }
    }

    function renderStreets(streets) {
      const gallery = document.getElementById('streetsGallery');
      gallery.innerHTML = streets.map((street, index) => \`
        <div class="street-card"
             data-street-id="\${street.id}"
             tabindex="0"
             role="radio"
             aria-checked="false"
             aria-label="\${street.display_name}">
          <div class="street-image-container">
            <div class="street-badge">Entry \${String(index + 1).padStart(2, '0')}</div>
            <img
              src="\${street.image_url}"
              alt="Street decoration of \${street.display_name}"
              class="street-image"
              loading="lazy"
            >
          </div>
          <div class="street-info">
            <div class="street-name">\${street.display_name}</div>
            <div class="street-description">\${street.description || ''}</div>
            <div class="vote-radio">
              <input
                type="radio"
                name="street"
                value="\${street.id}"
                id="street-\${street.id}"
                aria-label="Vote for \${street.display_name}"
              >
              <label for="street-\${street.id}">Select this entry</label>
            </div>
          </div>
        </div>
      \`).join('');

      document.querySelectorAll('.street-card').forEach(card => {
        card.addEventListener('click', () => selectStreet(card));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectStreet(card);
          }
        });
      });

      document.querySelectorAll('input[name="street"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          const card = e.target.closest('.street-card');
          selectStreet(card);
        });
      });
    }

    function selectStreet(card) {
      const streetId = parseInt(card.dataset.streetId);
      selectedStreetId = streetId;

      document.querySelectorAll('.street-card').forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-checked', 'false');
      });
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');

      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      document.querySelector('.form-section').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

    function showMessage(text, type) {
      const messageDiv = document.getElementById('message');
      messageDiv.textContent = text;
      messageDiv.className = \`message \${type}\`;
      messageDiv.style.display = 'block';
      messageDiv.focus();
    }

    document.getElementById('voteForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const submitBtn = document.getElementById('submitBtn');

      if (!selectedStreetId) {
        showMessage('Please select a street before submitting your vote.', 'error');
        document.querySelector('.gallery').scrollIntoView({ behavior: 'smooth' });
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      try {
        const response = await fetch('/api/vot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            street_id: selectedStreetId,
            email: email
          })
        });

        const data = await response.json();

        if (data.success) {
          showMessage('Vote submitted successfully. Thank you for participating!', 'success');
          document.getElementById('email').value = '';
          selectedStreetId = null;
          document.querySelectorAll('.street-card').forEach(c => {
            c.classList.remove('selected');
            c.setAttribute('aria-checked', 'false');
          });
          document.querySelectorAll('input[name="street"]').forEach(r => r.checked = false);

          setTimeout(() => {
            if (confirm('Would you like to view the current results?')) {
              window.location.href = '/resultats';
            }
          }, 2000);
        } else {
          showMessage(data.message, 'error');
        }
      } catch (error) {
        showMessage('Connection error. Please try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Vote';
      }
    });

    loadStreets();
  </script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
