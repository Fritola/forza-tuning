# 🏎️ Forza Horizon 6 - Tuning Hub & Telemetry

[English](#english) | [Português](#português)

---

## English

Welcome to the **Forza Horizon 6 Tuning Hub**! This is a real-time premium telemetry dashboard and professional tuning calculator for your game.

With it, you can track tire temperature (in Celsius), acceleration/cornering G-forces, steering percentage, engaged gear, and dynamic throttle/brake usage directly on your computer, tablet, or **smartphone**!

---

## 📋 Quick Start Guide

There are two ways to start your telemetry dashboard: the easiest way (using the ready-made executable) or running directly from the source code (for developers).

---

### 🟢 Option A: Use the Executable (Easiest)
If you downloaded the final version (Release), you don't need to install anything complicated!

1. Extract the downloaded file.
2. Ensure the **`dist`** folder is in the same directory as the **`forza-server.exe`** file.
3. Double-click on **`forza-server.exe`**!
   *A black window will open, indicating that the server is online.*
4. Open your browser (Chrome, Edge, etc.) on your PC and access: **`http://localhost:5173/`**
5. **To access on your phone/tablet**: Simply connect to the same Wi-Fi as your computer and type the IP address shown in the black window into your mobile browser (e.g., `http://192.168.15.85:5173`).

---

### 🔵 Option B: Run Directly from the Repository (Requires Node.js)
If you downloaded the entire source code or want to modify the dashboard, follow these steps:

1. Install **[Node.js](https://nodejs.org/)** on your computer (LTS version).
2. Open the `forza-tuning-hub` project folder.
3. In the folder's address bar, type **`cmd`** and press **Enter** to open the terminal.
4. Type the following command to install the dependencies (only needed the first time):
   ```bash
   npm install
   ```
5. To start the dashboard, type:
   ```bash
   npm run dev
   ```
   *The dashboard will load automatically and show the addresses (Local and Network) for you to access on your PC or phone.*

---

## 🎮 Step 5: Configure your Forza Horizon

Now we need to make the game send data to the dashboard.

1. Open your **Forza Horizon 4, 5, or 6** on PC or Xbox.
2. Go to **Options** (Settings) -> **HUD and Gameplay**.
3. Scroll to the bottom of the page and adjust the following options:
   - **Data Out**: Change to **ON**.
   - **Data Out IP Address**:
     - If you play on the **same PC** where you started the dashboard: Type **`127.0.0.1`**
     - If you play on **Xbox**: Type your **computer's IP** (the number from Step 4, like `192.168.15.85`).
   - **Data Out Port**: Type **`9999`**.

---

## 🏁 All Set! How to Use?

1. Get into a car and start driving in the game!
2. The dashboard on your phone or computer will detect the connection automatically and show a green light saying: **TELEMETRIA FH6 ATIVA / CONECTADO** (or active/connected).
3. **Dynamic Gauges:**
   - **Tires:** The dashboard shows real-time temperature. Cold tires are **Cyan**, ideal grip temperature is **Green**, and overheated from drifting are **Pink**.
   - **Steering and G-Force:** The dot on the graph moves according to the centripetal force in corners, ideal for tuning suspension and anti-roll bars.
   - **Gears and Pedals:** See the pressure you apply to the throttle and brake instantly!

---

### 🧪 Testing Tip (Without the Game Running)
Want to test the dashboard to see how it reacts without having to open the game?
Just click the **🎮 LIGAR MOCK** (TURN ON MOCK) button at the top of the dashboard. It will simulate a test run with perfect cornering and dynamic gear shifts for you to see the magic happen!

Perfect tunes and happy racing! 🏎️💨

---

## Português

Bem-vindo ao **Forza Horizon 6 Tuning Hub**! Este é um painel de telemetria premium em tempo real e calculadora de tunagem profissional para o seu jogo. 

Com ele, você pode acompanhar a temperatura dos pneus (em Celsius), as forças G de aceleração/curva, a porcentagem de esterço da direção, a marcha engatada e o uso de acelerador/freio de forma dinâmica diretamente no seu computador, tablet ou **celular**!

---

## 📋 Guia de Uso Rápido

Existem duas formas de ligar o seu painel de telemetria: a mais fácil (usando o executável pronto) ou rodando direto do código-fonte (para desenvolvedores).

---

### 🟢 Opção A: Usar o Executável Prático (Mais Fácil)
Se você baixou a versão final (Release), não precisa instalar nada complicado!

1. Extraia o arquivo baixado.
2. Certifique-se de que a pasta **`dist`** está junto com o arquivo **`forza-server.exe`**.
3. Dê um duplo-clique em **`forza-server.exe`**! 
   *Uma janela preta se abrirá informando que o servidor está online.*
4. Abra o seu navegador (Chrome, Edge, etc.) no PC e acesse: **`http://localhost:5173/`**
5. **Para acessar no celular/tablet**: Basta conectar no mesmo Wi-Fi do computador e digitar no navegador do celular o endereço IP que aparecer na janela preta (exemplo: `http://192.168.15.85:5173`).

---

### 🔵 Opção B: Rodar Direto do Repositório (Requer Node.js)
Se você baixou o código-fonte inteiro ou deseja modificar o painel, siga estes passos:

1. Instale o **[Node.js](https://nodejs.org/)** no seu computador (versão LTS).
2. Abra a pasta do projeto `forza-tuning-hub`.
3. Na barra de endereços da pasta, digite **`cmd`** e aperte **Enter** para abrir o terminal.
4. Digite o seguinte comando para instalar as dependências (necessário apenas na primeira vez):
   ```bash
   npm install
   ```
5. Para ligar o painel, digite:
   ```bash
   npm run dev
   ```
   *O painel carregará automaticamente e mostrará os endereços (Local e Network) para você acessar no PC ou celular.*

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
