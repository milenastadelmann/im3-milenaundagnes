<?php
// Include the config file
require_once 'config.php';
function getTrains ($train) {
    $url = 'https://data.sbb.ch/api/explore/v2.1/catalog/datasets/ist-daten-sbb/records?limit=20&refine=verkehrsmittel_text%3A%22IC%22&refine=linien_text%3A%22' . $train .'%22';
        // Initialisiert eine cURL-Sitzung
        $ch = curl_init($url);

        // Setzt Optionen
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
        // Führt die cURL-Sitzung aus und erhält den Inhalt
        $response = curl_exec($ch);
    
        // Schließt die cURL-Sitzung
        curl_close($ch);
    
        // Dekodiert die JSON-Antwort und gibt Daten zurück
        return json_decode($response, true);
}

function getDelayedTrains ($train) {
    $url = 'https://data.sbb.ch/api/explore/v2.1/catalog/datasets/ist-daten-sbb/records?limit=20&refine=verkehrsmittel_text%3A%22IC%22&refine=linien_text%3A%22' . $train . '%22&refine=ankunftsverspatung%3A%22true%22';
        // Initialisiert eine cURL-Sitzung
        $ch = curl_init($url);

        // Setzt Optionen
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
        // Führt die cURL-Sitzung aus und erhält den Inhalt
        $response = curl_exec($ch);
    
        // Schließt die cURL-Sitzung
        curl_close($ch);
    
        // Dekodiert die JSON-Antwort und gibt Daten zurück
        return json_decode($response, true);
}
var_dump(getTrains('IC5'));


// Establish database connection
try {
    $pdo = new PDO($dsn, $username, $password, $options);
    } catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
    }
    $sql = "INSERT INTO sbbneu (linie, abfahrten, verspaetet) VALUES (:linie, :abfahrten, :verspaetet)";
    $stmt = $pdo->prepare($sql);
    

    $zuege = ['IC1','IC2','IC3','IC5','IC6','IC8','IC21','IC51','IC61','IC81','IC'];
foreach($zuege as $zug) {
    
    $all_trains = getTrains($zug);
    $all_delayed_trains = getDelayedTrains($zug);

    $all_trains_count = $all_trains['total_count'];
    $all_delayed_trains_count = $all_delayed_trains['total_count'];

    $stmt->execute([
        ':linie' => $zug,
        ':abfahrten' => $all_trains_count,
        ':verspaetet' => $all_delayed_trains_count
        ]);

}

    echo "Data successfully inserted into the database.";

    ?>