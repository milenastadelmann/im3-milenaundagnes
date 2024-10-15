<?php

require_once '001_config_empty.php'; // Ensure this points to your actual config file

header('Content-Type: application/json');

try {
    // Establish the database connection
    $pdo = new PDO($dsn, $username, $password, $options);

    // Define an array to store the train lines you want to retrieve data for
    $trains = ['IC1','IC2','IC3','IC5','IC6','IC8','IC21','IC51','IC61','IC81','IC'];
    $results = [];

    // Loop through each train line and fetch the corresponding data from the database
    foreach ($trains as $train) {
        // Prepare the SQL query to select data from the 'sbbneu' table
        $stmt = $pdo->prepare("SELECT linie, abfahrten, verspaetet, ausfall, zeit FROM sbbneu WHERE linie = :train");
        $stmt->execute([':train' => $train]); // Execute the query for the current train line
        $results[$train] = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch the results as an associative array
    }

    // Return the results in JSON format
    echo json_encode($results);
    
} catch (PDOException $e) {
    // Return an error in JSON format if a database exception occurs
    echo json_encode(['error' => $e->getMessage()]);
}
?>