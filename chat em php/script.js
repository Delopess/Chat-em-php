function changeNickname() {
    const nicknameInput = document.getElementById('nickname-input');
    const nickname = document.getElementById('nickname');

    if (savedNickname) {
        document.getElementById('nickname').textContent = savedNickname;
        disableNicknameChange(); // Desativa a alteração do apelido
    }
}

// Função para abrir o modal de configuração
function openConfigModal() {
    const modal = document.getElementById('config-modal');
    modal.style.display = 'flex';
}

// Função para fechar o modal de configuração
function closeConfigModal() {
    const modal = document.getElementById('config-modal');
    modal.style.display = 'none';
}

// Função para desativar a alteração do apelido
function disableNicknameChange() {
    const configButton = document.querySelector('.config-button');
    configButton.style.display = 'none'; // Oculta o botão de configuração
}

// Função para alterar o apelido
function changeNickname() {
    const nicknameInput = document.getElementById('modal-nickname-input');
    const nickname = document.getElementById('nickname');

    if (nicknameInput.value.trim() !== '') {
        const newNickname = nicknameInput.value.trim();
        nickname.textContent = newNickname;

        // Salva o apelido no LocalStorage
        localStorage.setItem('nickname', newNickname);

        // Desativa a alteração do apelido
        disableNicknameChange();

        // Fecha o modal
        closeConfigModal();

        // Limpa o campo de input
        nicknameInput.value = '';
    }
}

function loadNickname() {
    const savedNickname = localStorage.getItem('nickname');
    if (savedNickname) {
        document.getElementById('nickname').textContent = savedNickname;
        disableNicknameChange(); // Desativa a alteração do apelido
    }
}

// Função para limpar o chat
function clearChat() {
    if (confirm('Tem certeza que deseja limpar o chat? Isso apagará todas as mensagens.')) {
        fetch('clear_chat.php', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                loadMessages(); // Recarrega as mensagens (que agora estarão vazias)
            }
        });
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageArea = document.getElementById('message-area');
    const currentUser = document.getElementById('nickname').textContent;

    if (messageInput.value.trim() !== '') {
        // Cria uma nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user'; // Por padrão, assume que é do usuário atual

        const senderSpan = document.createElement('span');
        senderSpan.className = 'sender';
        senderSpan.textContent = `${currentUser} escreveu:`; // Mostra o remetente

        const messageText = document.createElement('p');
        messageText.textContent = messageInput.value.trim();

        const timestamp = document.createElement('span');
        timestamp.className = 'timestamp';
        timestamp.textContent = new Date().toLocaleTimeString();

        messageDiv.appendChild(senderSpan);
        messageDiv.appendChild(messageText);
        messageDiv.appendChild(timestamp);

        // Adiciona a mensagem à área de mensagens
        messageArea.appendChild(messageDiv);

        // Limpa o campo de input
        messageInput.value = '';

        // Scroll automático para o final
        messageArea.scrollTop = messageArea.scrollHeight;

        // Envia a mensagem para o servidor (via AJAX)
        const formData = new FormData();
        formData.append('nickname', currentUser);
        formData.append('message', messageText.textContent);

        fetch('save_message.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('Mensagem salva com sucesso!');
            }
        });
    }
}

// Função para carregar as mensagens
function loadMessages() {
    fetch('load_message.php')
        .then(response => response.text())
        .then(data => {
            const messageArea = document.getElementById('message-area');
            messageArea.innerHTML = data;

            // Se não houver mensagens, exibe uma mensagem padrão
            if (messageArea.innerHTML.trim() === '') {
                messageArea.innerHTML = '<div class="message"></div>';
            }

            messageArea.scrollTop = messageArea.scrollHeight;

            // Aplica o estilo correto para cada mensagem
            const messages = document.querySelectorAll('.message');
            const currentUser = document.getElementById('nickname').textContent;

            messages.forEach(message => {
                const sender = message.querySelector('.sender').textContent;
                if (sender.includes(currentUser)) {
                    message.classList.add('user');
                } else {
                    message.classList.add('other');
                }
            });
        });
}


// Função para fechar o modal de configuração
function closeConfigModal() {
    const modal = document.getElementById('config-modal');
    modal.style.display = 'none';
}

// Função para abrir o modal de configuração
function openConfigModal() {
    const modal = document.getElementById('config-modal');
    modal.style.display = 'flex';
}

function disableNicknameChange() {
    const configButton = document.querySelector('.config-button');
    configButton.classList.add('hidden'); // Oculta o botão de configuração
}

// Carrega as mensagens quando a página é carregada
document.addEventListener('DOMContentLoaded', loadMessages);
setInterval(loadMessages, 50); // Atualiza a cada 5 segundos