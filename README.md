# 🏎️ Forza Horizon 6 - Tuning Hub & Telemetria

Bem-vindo ao **Forza Horizon 6 Tuning Hub**! Este é um painel de telemetria premium em tempo real e calculadora de tunagem profissional para o seu jogo. 

Com ele, você pode acompanhar a temperatura dos pneus (em Celsius), as forças G de aceleração/curva, a porcentagem de esterço da direção, a marcha engatada e o uso de acelerador/freio de forma dinâmica diretamente no seu computador, tablet ou **celular**!

---

## 📋 Guia de Instalação Rápida (Passo a Passo para Iniciantes)

Se você não tem nenhum conhecimento de programação ou tecnologia, não se preocupe! Este guia foi feito para você. Siga os passos abaixo e tudo funcionará perfeitamente.

### 🌐 Passo 1: Instalar o "Motor" do Aplicativo (Node.js)
Para o painel funcionar e ler os dados do Forza, precisamos de um programa leve e seguro chamado **Node.js**.

1. Acesse o site oficial: **[nodejs.org](https://nodejs.org/)**
2. Clique no botão que diz **LTS** (é a versão mais estável e recomendada para a maioria dos usuários).
3. Abra o arquivo baixado e instale como qualquer outro programa (basta clicar em *Next/Avançar*, aceitar os termos e clicar em *Finish/Concluir*).

---

### 📂 Passo 2: Abrir a Pasta do Painel
1. Certifique-se de que a pasta `forza-tuning-hub` está salva no seu computador.
2. Abra a pasta do projeto. No Windows, você pode clicar na barra de endereços no topo da pasta (onde mostra o caminho dos arquivos), digitar **`cmd`** e apertar **Enter**. 
   *Isso abrirá uma tela preta (Prompt de Comando) exatamente na pasta certa!*

---

### 🛠️ Passo 3: Preparar o Painel (Apenas na Primeira Vez)
Com a tela preta aberta, digite o seguinte comando e aperte **Enter**:
```bash
npm install
```
> **O que isso faz?** Ele vai baixar automaticamente todos os componentes visuais e de comunicação necessários para o painel rodar. Esse processo leva cerca de 10 a 30 segundos.

---

### 🚀 Passo 4: Ligar o Painel!
Agora que está tudo pronto, digite o comando abaixo na tela preta e aperte **Enter**:
```bash
npm run dev
```

Você verá mensagens na tela indicando que o servidor está rodando. O painel vai mostrar dois endereços para você acessar:
```text
  ➜  Local:   http://localhost:5173/          <-- Para abrir no seu computador
  ➜  Network: http://192.168.15.85:5173/      <-- Para abrir no seu CELULAR ou TABLET!
```

> 💡 **Para acessar no Celular:** Certifique-se de que o seu celular está conectado no **mesmo Wi-Fi** do computador. Abra o navegador do celular (Chrome, Safari, etc.) e digite o endereço que aparece em `Network` (exemplo: `http://192.168.15.85:5173`).

---

## 🎮 Passo 5: Configurar o seu Forza Horizon

Agora precisamos fazer o jogo enviar os dados para o painel.

1. Abra o seu **Forza Horizon 4, 5 ou 6** no PC ou no Xbox.
2. Vá em **Opções** (Settings) -> **Opções de HUD e Jogabilidade** (HUD and Gameplay).
3. Role até o final da página e ajuste as seguintes opções:
   - **Data Out (Saída de Dados)**: Mude para **LIGADO** (ON).
   - **Data Out IP Address (Endereço IP de Saída de Dados)**: 
     - Se você joga no **mesmo PC** onde ligou o painel: Digite **`127.0.0.1`**
     - Se você joga no **Xbox**: Digite o **IP do seu computador** (aquele número do Passo 4, como `192.168.15.85`).
   - **Data Out Port (Porta de Saída de Dados)**: Digite **`9999`**.

---

## 🏁 Tudo Pronto! Como Usar?

1. Entre em um carro e comece a dirigir no jogo!
2. O painel no seu celular ou computador vai detectar a conexão automaticamente e acender uma luz verde dizendo: **TELEMETRIA FH6 ATIVA / CONECTADO**.
3. **Medidores Dinâmicos:**
   - **Pneus:** O painel mostra a temperatura em tempo real. Pneus frios ficam **Cianos**, na temperatura ideal de aderência ficam **Verdes**, e superaquecidos por derrapagens ficam **Rosas**.
   - **Direção e G-Force:** O ponto no gráfico se move de acordo com a força centrípeta nas curvas, ideal para ajustar a suspensão e barras estabilizadoras.
   - **Marchas e Pedais:** Veja a pressão que você faz no acelerador e freio instantaneamente!

---

### 🧪 Dica de Teste (Sem o Jogo Ligado)
Quer testar o painel para ver como ele reage sem precisar abrir o jogo?
Basta clicar no botão **🎮 LIGAR MOCK** no topo do painel. Ele vai simular uma corrida de teste com curvas perfeitas e trocas de marchas dinâmicas para você ver a mágica acontecer!

Tunas perfeitas e boa corrida! 🏎️💨
