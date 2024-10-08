async function fetchData() {
    try {
        const response = await fetch('https://etl.mmp.li/sbb/etl/unload.php');
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Es gab ein Problem mit dem Abrufen der Daten:', error);
    }
}

function createChart(data) {
    // Daten vorbereiten
    const linien = Object.keys(data); // ['IC1', 'IC2', ...]
    const abfahrten = linien.map(linie => data[linie].reduce((sum, entry) => sum + entry.abfahrten, 0));
    const verspaetungen = linien.map(linie => data[linie].reduce((sum, entry) => sum + entry.verspaetet, 0));
    const ausfaelle = linien.map(linie => data[linie].reduce((sum, entry) => sum + entry.ausfall, 0));

    // Chart.js Bar Chart erstellen
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: linien,
            datasets: [
                {
                    label: 'Abfahrten',
                    data: abfahrten,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Verspätungen',
                    data: verspaetungen,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Ausfälle',
                    data: ausfaelle,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Daten abrufen und Chart erstellen
fetchData().then(data => {
    if (data) {
        createChart(data);
    }
});
