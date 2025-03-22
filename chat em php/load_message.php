<?php
$file = 'messages.json';

if (file_exists($file)) {
    $messages = json_decode(file_get_contents($file), true);
    
    foreach ($messages as $msg) {
        echo "<div class='message'>";
        echo "<span class='sender'>{$msg['nickname']} escreveu:</span>";
        echo "<p>{$msg['message']}</p>";
        echo "<span class='timestamp'>{$msg['timestamp']}</span>";
        echo "</div>";
    }
} else {
    echo "<div class='message'>Nenhuma mensagem ainda.</div>";
}
?>