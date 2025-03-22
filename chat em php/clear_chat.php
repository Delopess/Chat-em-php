<?php
// Arquivo para limpar o chat
$file = 'messages.json';

// Verifica se o arquivo existe
if (file_exists($file)) {
    // Limpa o conteúdo do arquivo
    file_put_contents($file, json_encode([])); // Sobrescreve o arquivo com um array vazio
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Arquivo de mensagens não encontrado.']);
}
?>