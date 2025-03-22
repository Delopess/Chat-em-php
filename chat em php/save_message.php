<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nickname = htmlspecialchars($_POST['nickname']);
    $message = htmlspecialchars($_POST['message']);
    
    $data = [
        'nickname' => $nickname,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s') // Usando data e hora formatadas
    ];
    
    // Abre o arquivo de mensagens para adicionar a nova mensagem
    $file = 'messages.json';
    $messages = [];
    
    // Se o arquivo já existe, carrega as mensagens existentes
    if (file_exists($file)) {
        $messages = json_decode(file_get_contents($file), true);
    }
    
    // Adiciona a nova mensagem ao array de mensagens
    $messages[] = $data;
    
    // Salva o array de mensagens de volta no arquivo JSON
    file_put_contents($file, json_encode($messages));
    
    echo json_encode(['status' => 'success']);
}
?>