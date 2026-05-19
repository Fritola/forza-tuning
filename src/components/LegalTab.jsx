import React from 'react';

export default function LegalTab() {
  return (
    <div className="legal-container">
      
      {/* ABOUT US */}
      <div className="glass-card" style={{ marginBottom: '30px' }} id="about">
        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--color-cyan)' }}>
          🏎️ Sobre o Forza Tuning Hub
        </h2>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <p>O Forza Tuning Hub nasceu da paixão pelo automobilismo virtual e pela franquia Forza Horizon. Construído por e para entusiastas do jogo, nossa missão é desmistificar o complexo sistema de tuning mecânico que o jogo oferece.</p>
          <br/>
          <p>Frequentemente, jogadores encontram dificuldades para estabilizar seus carros, sofrendo com saídas de traseira indesejadas (oversteer) ou recusa em fazer curvas (understeer). Utilizando fórmulas matemáticas baseadas no peso, distribuição de massa e tipo de tração (Drivetrain), nossa calculadora gera configurações base (baseline tunes) que transformam qualquer veículo em uma máquina competitiva nas pistas do festival.</p>
          <br/>
          <p>Além da calculadora estática, o Forza Tuning Hub conta com um painel de telemetria em tempo real que lê os dados via UDP diretamente do seu console ou PC. Com isso, elevamos o nível de análise, permitindo diagnosticar problemas dinâmicos de suspensão e tração durante a corrida.</p>
        </div>
      </div>

      {/* PRIVACY POLICY */}
      <div className="glass-card" style={{ marginBottom: '30px' }} id="privacy">
        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--text-primary)' }}>
          🔒 Política de Privacidade
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '15px' }}>Última atualização: 19 de Maio de 2026</p>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <p>A sua privacidade é importante para nós. Esta política explica como lidamos com seus dados quando você utiliza o Forza Tuning Hub.</p>
          <br/>
          <h4 style={{ color: '#fff', margin: '8px 0' }}>Coleta e Uso de Dados de Telemetria</h4>
          <p>Todos os dados de telemetria lidos do jogo Forza Horizon (via porta UDP) são processados <strong>localmente</strong> no seu navegador ou roteados através de um servidor local hospedado em sua própria máquina. Nós <strong>não</strong> armazenamos, rastreamos ou enviamos seus dados de gameplay para servidores externos em nuvem. O histórico de trajetórias é salvo exclusivamente no armazenamento local do seu navegador (Local Storage).</p>
          <br/>
          <h4 style={{ color: '#fff', margin: '8px 0' }}>Anúncios do Google AdSense</h4>
          <p>Trabalhamos com provedores de anúncios de terceiros, como o Google AdSense, para ajudar a manter o site gratuito. O Google utiliza cookies (incluindo o cookie DART) para veicular anúncios baseados nas suas visitas a este e a outros sites na internet. Você pode optar por não utilizar o cookie DART acessando a política de privacidade da rede de anúncios do Google.</p>
          <br/>
          <h4 style={{ color: '#fff', margin: '8px 0' }}>Cookies e Armazenamento Local</h4>
          <p>Utilizamos cookies estritamente necessários e o Local Storage do navegador apenas para salvar suas preferências de uso, como os setups de carros salvos por você. Nós não vendemos informações de navegação para terceiros.</p>
        </div>
      </div>

      {/* TERMS OF USE */}
      <div className="glass-card" style={{ marginBottom: '30px' }} id="terms">
        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--text-primary)' }}>
          ⚖️ Termos de Uso
        </h3>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <p>Ao acessar e utilizar o Forza Tuning Hub, você concorda em cumprir estes termos de uso.</p>
          <br/>
          <h4 style={{ color: '#fff', margin: '8px 0' }}>Uso Pessoal</h4>
          <p>O Forza Tuning Hub é oferecido "como está", sem garantias de qualquer tipo. O projeto não tem filiação direta com a Microsoft Corporation, Turn 10 Studios ou Playground Games. É uma ferramenta não-oficial criada por fãs.</p>
          <br/>
          <h4 style={{ color: '#fff', margin: '8px 0' }}>Isenção de Responsabilidade</h4>
          <p>As configurações geradas por esta calculadora são sugestões base (baselines). A eficácia das configurações no jogo dependerá das condições de pista, do controle utilizado e da habilidade do piloto. Não nos responsabilizamos por perdas de corridas online ou falhas de performance virtuais decorrentes do uso da ferramenta.</p>
        </div>
      </div>

    </div>
  );
}
