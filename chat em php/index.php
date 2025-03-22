<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat em php</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="chat-window">
        <!-- Header -->
        <div class="chat-header">
    <div class="user-info">
        <img src="bullseye.jpg" alt="User Avatar" class="avatar">
        <span id="nickname">Usuário</span> <!-- Valor padrão -->
    </div>
    <!-- Botão de Atualização -->
    <button class="refresh-button" onclick="loadMessages()">
        <i class="fas fa-sync-alt"></i> <!-- Ícone de atualização -->
    </button>
    <!-- Botão de Configuração -->
    <button class="config-button" onclick="openConfigModal()">
        <i class="fas fa-cog"></i>
    </button>
        </div>
        <!-- Botão de Limpar Chat -->
    <button class="clear-button" onclick="clearChat()">
        <i class="fas fa-trash-alt"></i> <!-- Ícone de lixeira -->
    </button>

        <!-- Message Area -->
        <div class="message-area" id="message-area">
            <!-- Messages will be dynamically loaded here -->
        </div>

        <!-- Input Area -->
        <div class="input-area">
            <input type="text" id="message-input" placeholder="Escreva a mensagem">
            <button onclick="sendMessage()" id="send"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>

    <!-- Modal de Configuração -->
    <div id="config-modal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeConfigModal()">&times;</span>
            <h2>Alterar Apelido</h2>
            <input type="text" id="modal-nickname-input" placeholder="Novo apelido">
            <button onclick="changeNickname()">Salvar</button>
        </div>
    </div>

    

    <!-- JavaScript -->
    <script src="script.js"></script>
</body>
</html>