import React from 'react';

export default function ArticlesTab() {
  return (
    <div className="articles-container">
      <div className="glass-card" style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px', color: 'var(--color-cyan)' }}>
          📚 Guias Definitivos de Tuning no Forza Horizon
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Bem-vindo à nossa base de conhecimento oficial. Para dominar as pistas no Forza Horizon, não basta
          apenas acelerar; é preciso entender a física por trás de cada ajuste. Abaixo, preparamos artigos
          detalhados para ajudar você a extrair cada milésimo de segundo do seu carro.
        </p>
      </div>

      <div className="glass-card article-card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
          🏎️ Entendendo a Telemetria: A Chave para a Vitória
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '15px' }}>Publicado em 19 de Maio, 2026</p>
        
        <div className="article-content" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <p>A telemetria é frequentemente ignorada por jogadores casuais, mas é a ferramenta mais poderosa no arsenal de um piloto avançado. No Forza Horizon, você pode ativar a telemetria pressionando o direcional para baixo (D-Pad) ou a tecla designada no teclado.</p>
          <br/>
          <h4 style={{ color: '#fff', margin: '10px 0' }}>1. Analisando a Fricção dos Pneus</h4>
          <p>Na tela de fricção, você notará círculos que representam cada pneu. A cor indica a aderência e a temperatura. Um pneu que fica constantemente vermelho está superaquecendo, o que significa que a pressão pode estar muito baixa ou a cambagem muito agressiva. Ajustar a pressão dos pneus (geralmente entre 28 e 32 PSI no asfalto) garante que a área de contato do pneu com o solo seja maximizada.</p>
          <br/>
          <h4 style={{ color: '#fff', margin: '10px 0' }}>2. Suspensão e Trabalho de Molas</h4>
          <p>A tela de suspensão mostra quão comprimida está cada mola. Se, ao fazer uma curva fechada ou passar por uma zebra, as barras atingirem o máximo (bottoming out), seu carro perderá estabilidade instantaneamente. Para corrigir isso, você deve endurecer ligeiramente as molas ou aumentar a altura de percurso do veículo.</p>
          <br/>
          <p>O segredo é usar o <strong>Forza Tuning Hub</strong> lado a lado com a sua sessão de jogo. Colete os dados de algumas voltas e deixe a calculadora ajustar os valores ideais de barra estabilizadora (ARB) e rigidez de molas com base no peso e distribuição do seu carro.</p>
        </div>
      </div>

      <div className="glass-card article-card" style={{ marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
          🔄 A Arte do Drift: Configuração e Controle
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '15px' }}>Publicado em 15 de Maio, 2026</p>
        
        <div className="article-content" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <p>Fazer drift no Forza não é apenas sobre usar o freio de mão; requer uma configuração mecânica que induza a sobre-esterço de forma controlada. Aqui estão os passos essenciais para criar um monstro do drift.</p>
          <br/>
          <h4 style={{ color: '#fff', margin: '10px 0' }}>Diferencial (Diff)</h4>
          <p>Para o drift (especialmente RWD), o diferencial traseiro de aceleração deve estar travado ou quase travado (entre 80% e 100%). Isso garante que ambas as rodas traseiras percam tração simultaneamente e girem na mesma velocidade, permitindo que você mantenha o ângulo da derrapagem através da curva usando apenas o acelerador.</p>
          <br/>
          <h4 style={{ color: '#fff', margin: '10px 0' }}>Alinhamento (Câmber e Cáster)</h4>
          <p>A configuração de alinhamento clássica para drift exige muito Câmber Negativo na frente (cerca de -3.0 a -5.0). Isso porque, quando as rodas dianteiras estão totalmente viradas contra o sentido da curva (counter-steering), a roda de fora se "levanta" e fica plana no chão, proporcionando a máxima aderência direcional. O ângulo de Cáster deve estar em torno de 7.0 para garantir que o volante centralize rapidamente.</p>
          <br/>
          <h4 style={{ color: '#fff', margin: '10px 0' }}>Pressão dos Pneus</h4>
          <p>Diferente de carros de corrida (Grip), carros de drift costumam rodar com pressão mais alta nos pneus traseiros (acima de 35 PSI). Um pneu mais cheio esquenta menos rápido e se deforma menos, facilitando a quebra de tração. Na frente, mantenha a pressão mais baixa (28-30 PSI) para reter o controle da direção.</p>
        </div>
      </div>
    </div>
  );
}
