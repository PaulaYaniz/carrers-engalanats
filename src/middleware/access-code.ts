// Middleware per protegir l'accés amb codi (opcional)
// Només descomenta si vols afegir protecció extra

export function requireAccessCode(request: Request): boolean {
  // Comprovar si hi ha una cookie de sessió
  const cookies = request.headers.get('Cookie') || '';
  if (cookies.includes('access_granted=true')) {
    return true;
  }

  // Comprovar si hi ha un codi d'accés a la URL
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  // Codi d'accés secret (canvia'l!)
  const ACCESS_CODE = 'RAVAL2026';

  return code === ACCESS_CODE;
}

export function createAccessResponse(validUntil: Date): Response {
  const html = `<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8">
  <title>Accés - Carrers Engalanats</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #D32F2F 0%, #F57C00 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      color: white;
    }
    .access-box {
      background: white;
      color: #333;
      padding: 50px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      text-align: center;
      max-width: 400px;
    }
    h1 { margin-bottom: 20px; }
    input {
      width: 100%;
      padding: 15px;
      font-size: 1.1rem;
      border: 2px solid #ddd;
      border-radius: 10px;
      margin: 20px 0;
    }
    button {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #D32F2F, #F57C00);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="access-box">
    <h1>🔒 Accés Restringit</h1>
    <p>Introdueix el codi d'accés per participar en la votació:</p>
    <form method="GET">
      <input type="text" name="code" placeholder="Codi d'accés" required autofocus>
      <button type="submit">Accedir</button>
    </form>
    <small style="color: #666; margin-top: 20px; display: block;">
      Si no tens el codi, contacta amb l'Associació Veïnal del Raval
    </small>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Set-Cookie': `access_granted=true; Path=/; Max-Age=${Math.floor((validUntil.getTime() - Date.now()) / 1000)}; HttpOnly; Secure; SameSite=Strict`
    }
  });
}
