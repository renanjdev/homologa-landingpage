
export const getEmailHtml = (rank: string) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação HOMOLOGA Plus</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      margin-top: 40px;
      margin-bottom: 40px;
    }
    .header {
      background-color: #000000;
      padding: 0;
      text-align: center;
    }
    .header img {
      width: 100%;
      height: auto;
      display: block;
    }
    .content {
      padding: 40px;
      color: #111827;
      line-height: 1.6;
    }
    .logo-container {
      text-align: center;
      margin-bottom: 24px;
    }
    .logo {
      width: 80px;
      height: auto;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #000000;
      text-align: center;
    }
    p {
      font-size: 16px;
      margin-bottom: 24px;
    }
    .rank-card {
      background-color: #f3f4f6;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin-bottom: 32px;
      border: 1px solid #e5e7eb;
    }
    .rank-label {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #6b7280;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .rank-value {
      font-size: 48px;
      font-weight: 800;
      color: #10b981;
      margin: 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #000000;
      color: #ffffff !important;
      padding: 16px 32px;
      border-radius: 9999px;
      text-decoration: none;
      font-weight: 600;
      text-align: center;
      width: 100%;
      box-sizing: border-box;
    }
    .footer {
      padding: 32px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      background-color: #f9fafb;
    }
    .social-links {
      margin-top: 16px;
    }
    .social-links a {
      margin: 0 8px;
      color: #6b7280;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://i.imgur.com/PqVmFJJ.png" alt="HOMOLOGA Plus Header" referrerPolicy="no-referrer">
    </div>
    <div class="content">
      <div class="logo-container">
        <img src="https://i.imgur.com/Sm4PqXw.png" alt="HOMOLOGA Plus Logo" class="logo" referrerPolicy="no-referrer">
      </div>
      <h1>Você está na lista! 🚀</h1>
      <p>Olá! Seu acesso antecipado foi confirmado. Você agora faz parte do grupo exclusivo de projetistas que terão prioridade no lançamento da plataforma <strong>HOMOLOGA Plus</strong>.</p>
      
      <div class="rank-card">
        <div class="rank-label">Sua posição na fila</div>
        <div class="rank-value">#${rank}</div>
      </div>

      <p>Os primeiros usuários terão acesso ao <strong>Plano Fundador</strong> com condições especiais e ferramentas inéditas para acelerar suas homologações.</p>
      
      <p>Quer subir na fila? Compartilhe seu link exclusivo com outros projetistas solares e ganhe posições a cada indicação confirmada.</p>
      
      <a href="https://homologaplus.com.br" class="cta-button">Ver meu painel</a>
    </div>
    <div class="footer">
      <p>&copy; 2026 HOMOLOGA Plus. Todos os direitos reservados.</p>
      <p>Transformando a homologação solar no Brasil.</p>
    </div>
  </div>
</body>
</html>
`;
