<?php

require_once '001_config_empty.php'; // Ensure this points to your actual config file

header('Content-Type: application/json');

try {
    // Establish the database connection
    $pdo = new PDO($dsn, $username, $password, $options);

    // Check if the 'linie' parameter is set in the URL
    if (isset($_GET['linie'])) {
        $train = $_GET['linie']; // Get the train line from the URL parameter

        // Prepare the SQL query to select data from the 'sbbneu' table for the specific train line
        $stmt = $pdo->prepare("SELECT linie, abfahrten, verspaetet, ausfall, zeit 
        FROM sbbneu 
        WHERE linie = :train 
        ORDER BY zeit DESC 
        LIMIT 1");
        $stmt->execute([':train' => $train]); // Execute the query for the specific train line

        // Fetch the results as an associative array
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Check if results were found
        if ($results) {
            // Return the results in JSON format
            echo json_encode($results);
        } else {
            // Return an empty array if no results are found
            echo json_encode(['message' => 'No results found for the specified train line.']);
        }
    } else {
        // Return an error if the 'linie' parameter is missing
        echo json_encode(['error' => 'No train line specified. Please provide a "linie" parameter in the URL.']);
    }

} catch (PDOException $e) {
    // Return an error in JSON format if a database exception occurs
    echo json_encode(['error' => $e->getMessage()]);
}
?>
