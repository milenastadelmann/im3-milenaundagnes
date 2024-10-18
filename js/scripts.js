// Mapbox setup
mapboxgl.accessToken = 'pk.eyJ1IjoibWlsZW5hc3RhZGVsbWFubiIsImEiOiJjbTFxdHRtY2wwM2VqMmtxem82emUzamtuIn0.P2B20sBbGljY0rGXZwOqeQ';
const map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/mapbox/light-v10',
});

const switzerlandBounds = [
  [5.9559, 45.8179], 
  [10.4920, 47.8085]
];

map.fitBounds(switzerlandBounds, {
  padding: { top: 50, bottom: 50, left: 50, right: 50 }, 
  maxZoom: 8
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// Resizing map on window resize
window.addEventListener('resize', function () {
  map.fitBounds(switzerlandBounds, { padding: { top: 50, bottom: 50, left: 50, right: 50 }, maxZoom: 8 });
});

// Scroll to data section (only one function is enough)
document.getElementById('scroll-button').addEventListener('click', function() {
  document.getElementById('data-section').scrollIntoView({ behavior: 'smooth' });
});

 // Reset button functionality
 document.getElementById('reset-map-btn').addEventListener('click', function () {
  map.fitBounds(switzerlandBounds, {
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
    maxZoom: 8
  });
});

     // Separate sources and layers for each IC line
     map.on('load', function () {

       // Set the text color of all existing settlement labels to black
    map.setPaintProperty('settlement-label', 'text-color', '#000000'); // Set text color to black

    // Optional: Enhance readability by setting a white halo around the text (if needed)
    map.setPaintProperty('settlement-label', 'text-halo-color', '#ffffff'); // White halo for better visibility
    map.setPaintProperty('settlement-label', 'text-halo-width', 1); // Halo width

  // IC1 Line (Red, No Offset)
  map.addSource('ic1-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [6.1093, 46.2329], // Genève Aéroport
          [7.4391, 46.9481], // Bern
          [8.5401, 47.3782], // Zürich HB
          [9.3697, 47.4239]  // St. Gallen
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic1-line-layer',
    'type': 'line',
    'source': 'ic1-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#ff0000',
      'line-width': 4,
      'line-offset': 0,
      'line-opacity': 1 // Initial opacity
    }
  });

  // Add hover effect for IC1 line
  map.on('mouseenter', 'ic1-line-layer', function () {
    map.setPaintProperty('ic1-line-layer', 'line-opacity', 0.5); // Set opacity to 50%
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic1-line-layer', function () {
    map.setPaintProperty('ic1-line-layer', 'line-opacity', 1); // Reset opacity to 100%
    map.getCanvas().style.cursor = '';
  });

  // IC2 Line (Purple, Positive Offset)
  map.addSource('ic2-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [8.5401, 47.3782], // Zürich HB
          [8.5174, 47.1724], // Zug
          [8.9495, 46.0037]  // Lugano
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic2-line-layer',
    'type': 'line',
    'source': 'ic2-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#800080',
      'line-width': 4,
      'line-offset': 4,
      'line-opacity': 1
    }
  });

  // Add hover effect for IC2 line
  map.on('mouseenter', 'ic2-line-layer', function () {
    map.setPaintProperty('ic2-line-layer', 'line-opacity', 0.5);
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic2-line-layer', function () {
    map.setPaintProperty('ic2-line-layer', 'line-opacity', 1);
    map.getCanvas().style.cursor = '';
  });

  // IC3 Line (Dark Green, Negative Offset)
  map.addSource('ic3-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [7.5896, 47.5475], // Basel SBB
          [8.5401, 47.3782], // Zürich HB
          [9.5304, 46.8508]  // Chur
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic3-line-layer',
    'type': 'line',
    'source': 'ic3-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#006400',
      'line-width': 4,
      'line-offset': -4,
      'line-opacity': 1
    }
  });

  // Add hover effect for IC3 line
  map.on('mouseenter', 'ic3-line-layer', function () {
    map.setPaintProperty('ic3-line-layer', 'line-opacity', 0.5);
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic3-line-layer', function () {
    map.setPaintProperty('ic3-line-layer', 'line-opacity', 1);
    map.getCanvas().style.cursor = '';
  });

  // IC5 Line (Orange, Larger Positive Offset)
  map.addSource('ic5-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [6.1093, 46.2329], // Genève Aéroport
          [6.6336, 46.5197], // Lausanne
          [7.2499, 47.1399], // Biel/Bienne
          [8.5401, 47.3782], // Zürich HB
          [9.3697, 47.4239], // St. Gallen
          [9.4987, 47.4786]  // Rorschach
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic5-line-layer',
    'type': 'line',
    'source': 'ic5-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#FFA500',
      'line-width': 4,
      'line-offset': 6,
      'line-opacity': 1
    }
  });

  // Add hover effect for IC5 line
  map.on('mouseenter', 'ic5-line-layer', function () {
    map.setPaintProperty('ic5-line-layer', 'line-opacity', 0.5);
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic5-line-layer', function () {
    map.setPaintProperty('ic5-line-layer', 'line-opacity', 1);
    map.getCanvas().style.cursor = '';
  });

  // IC6 Line (Light Green, Larger Negative Offset)
  map.addSource('ic6-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [7.5896, 47.5475], // Basel SBB
          [7.4391, 46.9481], // Bern
          [7.9873, 46.3172]  // Brig
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic6-line-layer',
    'type': 'line',
    'source': 'ic6-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#90EE90',
      'line-width': 4,
      'line-offset': -8,
      'line-opacity': 1
    }
  });

  // Add hover effect for IC6 line
  map.on('mouseenter', 'ic6-line-layer', function () {
    map.setPaintProperty('ic6-line-layer', 'line-opacity', 0.5);
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic6-line-layer', function () {
    map.setPaintProperty('ic6-line-layer', 'line-opacity', 1);
    map.getCanvas().style.cursor = '';
  });

  // IC8 Line (Blue, Small Positive Offset)
  map.addSource('ic8-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [7.9873, 46.3172], // Brig
          [7.4391, 46.9481], // Bern
          [8.5401, 47.3782], // Zürich HB
          [9.3770, 47.5663]  // Romanshorn
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic8-line-layer',
    'type': 'line',
    'source': 'ic8-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#0000FF',
      'line-width': 4,
      'line-offset': 2,
      'line-opacity': 1
    }
  });

  // Add hover effect for IC8 line
  map.on('mouseenter', 'ic8-line-layer', function () {
    map.setPaintProperty('ic8-line-layer', 'line-opacity', 0.5);
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic8-line-layer', function () {
    map.setPaintProperty('ic8-line-layer', 'line-opacity', 1);
    map.getCanvas().style.cursor = '';
  });

  // IC21 Line (Yellow, Small Negative Offset)
  map.addSource('ic21-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [7.5896, 47.5475], // Basel SBB
          [8.3104, 47.0502], // Luzern
          [8.9495, 46.0037]  // Lugano
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic21-line-layer',
    'type': 'line',
    'source': 'ic21-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#FFFF00',
      'line-width': 4,
      'line-offset': -2,
      'line-opacity': 1
    }
  });

  // Add hover effect for IC21 line
  map.on('mouseenter', 'ic21-line-layer', function () {
    map.setPaintProperty('ic21-line-layer', 'line-opacity', 0.5);
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic21-line-layer', function () {
    map.setPaintProperty('ic21-line-layer', 'line-opacity', 1);
    map.getCanvas().style.cursor = '';
  });

  // IC51 Line (Wine Red, Positive Offset)
  map.addSource('ic51-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [7.5896, 47.5475], // Basel SBB
          [7.2499, 47.1399]  // Biel/Bienne
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic51-line-layer',
    'type': 'line',
    'source': 'ic51-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#8B0000',
      'line-width': 4,
      'line-offset': 4,
      'line-opacity': 1
    }
  });

  // Add hover effect for IC51 line
  map.on('mouseenter', 'ic51-line-layer', function () {
    map.setPaintProperty('ic51-line-layer', 'line-opacity', 0.5);
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic51-line-layer', function () {
    map.setPaintProperty('ic51-line-layer', 'line-opacity', 1);
    map.getCanvas().style.cursor = '';
  });

  // IC61 Line (Pink, Negative Offset)
  map.addSource('ic61-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [7.5896, 47.5475], // Basel SBB
          [7.4391, 46.9481], // Bern
          [7.8680, 46.6914]  // Interlaken Ost
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic61-line-layer',
    'type': 'line',
    'source': 'ic61-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#FFC0CB',
      'line-width': 4,
      'line-offset': -3,
      'line-opacity': 1
    }
  });

  // Add hover effect for IC61 line
  map.on('mouseenter', 'ic61-line-layer', function () {
    map.setPaintProperty('ic61-line-layer', 'line-opacity', 0.5);
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic61-line-layer', function () {
    map.setPaintProperty('ic61-line-layer', 'line-opacity', 1);
    map.getCanvas().style.cursor = '';
  });

  // IC81 Line (Light Grey, Larger Positive Offset)
  map.addSource('ic81-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [7.8680, 46.6914], // Interlaken Ost
          [7.4391, 46.9481], // Bern
          [8.5401, 47.3782], // Zürich HB
          [9.3770, 47.5663]  // Romanshorn
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic81-line-layer',
    'type': 'line',
    'source': 'ic81-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#D3D3D3',
      'line-width': 4,
      'line-offset': 7,
      'line-opacity': 1
    }
  });

  // Add hover effect for IC81 line
  map.on('mouseenter', 'ic81-line-layer', function () {
    map.setPaintProperty('ic81-line-layer', 'line-opacity', 0.5);
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic81-line-layer', function () {
    map.setPaintProperty('ic81-line-layer', 'line-opacity', 1);
    map.getCanvas().style.cursor = '';
  });

  // IC Line (Dark Grey, Larger Negative Offset)
  map.addSource('ic-line', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [
          [8.5401, 47.3782], // Zürich HB
          [8.6327708, 47.6982703]  // Schaffhausen
        ]
      }
    }
  });

  map.addLayer({
    'id': 'ic-line-layer',
    'type': 'line',
    'source': 'ic-line',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#A9A9A9',
      'line-width': 4,
      'line-offset': -6,
      'line-opacity': 1
    }
  });

  // Add hover effect for IC line
  map.on('mouseenter', 'ic-line-layer', function () {
    map.setPaintProperty('ic-line-layer', 'line-opacity', 0.5);
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'ic-line-layer', function () {
    map.setPaintProperty('ic-line-layer', 'line-opacity', 1);
    map.getCanvas().style.cursor = '';
  });

// Move IC1 line below the city labels
map.moveLayer('ic1-line-layer', 'settlement-label');

// Move IC2 line below the city labels
map.moveLayer('ic2-line-layer', 'settlement-label');

// Move IC3 line below the city labels
map.moveLayer('ic3-line-layer', 'settlement-label');

// Move IC5 line below the city labels
map.moveLayer('ic5-line-layer', 'settlement-label');

// Move IC6 line below the city labels
map.moveLayer('ic6-line-layer', 'settlement-label');

// Move IC8 line below the city labels
map.moveLayer('ic8-line-layer', 'settlement-label');

// Move IC21 line below the city labels
map.moveLayer('ic21-line-layer', 'settlement-label');

// Move IC51 line below the city labels
map.moveLayer('ic51-line-layer', 'settlement-label');

// Move IC61 line below the city labels
map.moveLayer('ic61-line-layer', 'settlement-label');

// Move IC81 line below the city labels
map.moveLayer('ic81-line-layer', 'settlement-label');

// Move IC line below the city labels
map.moveLayer('ic-line-layer', 'settlement-label');

// Click event for IC1
map.on('click', 'ic1-line-layer', function (e) {
  showPopup('IC1', 'Genève-Aéroport - Bern - Zürich HB - St. Gallen');
});

// Click event for IC2
map.on('click', 'ic2-line-layer', function (e) {
  showPopup('IC2', 'Zürich HB - Zug - Lugano');
});

// Click event for IC3
map.on('click', 'ic3-line-layer', function (e) {
  showPopup('IC3', 'Basel SBB - Zürich HB - Chur');
});

// Click event for IC5
map.on('click', 'ic5-line-layer', function (e) {
  showPopup('IC5', 'Genève-Aéroport/Lausanne - Biel/Bienne - Zürich HB (- St. Gallen/Rorschach)');
});

// Click event for IC6
map.on('click', 'ic6-line-layer', function (e) {
  showPopup('IC6', 'Basel SBB - Bern - Brig');
});

// Click event for IC8
map.on('click', 'ic8-line-layer', function (e) {
  showPopup('IC8', 'Brig - Bern - Zürich HB - Romanshorn');
});

// Click event for IC21
map.on('click', 'ic21-line-layer', function (e) {
  showPopup('IC21', 'Basel SBB - Luzern - Lugano');
});

// Click event for IC51
map.on('click', 'ic51-line-layer', function (e) {
  showPopup('IC51', 'Basel SBB - Biel/Bienne');
});

// Click event for IC61
map.on('click', 'ic61-line-layer', function (e) {
  showPopup('IC61', 'Basel SBB - Bern - Interlaken Ost');
});

// Click event for IC81
map.on('click', 'ic81-line-layer', function (e) {
  showPopup('IC81', 'Interlaken Ost - Bern - Zürich HB - Romanshorn');
});

// Click event for IC (Zürich - Schaffhausen)
map.on('click', 'ic-line-layer', function (e) {
  showPopup('IC', 'Zürich HB - Schaffhausen');
});
});

// Function to show popup with unique data
async function showPopup(line, description) {
  const popup = document.getElementById('popup-window');

  // Ensure popup exists and is referenced correctly
  if (popup) {
    // Fetch data dynamically from the endpoint
    try {
      const response = await fetch(`https://etl.mmp.li/sbb/etl/unloadsingleline.php?linie=${line}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Assuming the endpoint returns data in a format like:
      // { linie: 'IC1', abfahrten: 100, verspaetet: 40, ausfall: 5, description: '...' }
    
      let verspaetet = data[0].verspaetet;
      let ausfall = data[0].ausfall;

// Update the popup content dynamically
document.getElementById('popup-title').textContent = `Linie ${line}`;
document.getElementById('line-description').textContent = description;
document.getElementById('additional-info').textContent = "Auf den Streckenabschnitten dieser IC-Linie kam es gestern insgesamt zu:";
document.getElementById('delayed-trains').textContent = verspaetet;
document.getElementById('cancelled-trains').textContent = ausfall;


      // Make the popup visible
      popup.style.display = 'block';
    } catch (error) {
      console.error('Fetch error:', error);

     // Optionally, you can handle the error by showing a message in the popup
      document.getElementById('popup-title').textContent = 'Fehler beim Laden der Daten';
      document.getElementById('line-description').textContent = ''; // Clear description on error
      document.getElementById('delayed-trains').textContent = '0'; // Clear data
      document.getElementById('cancelled-trains').textContent = '0'; // Clear data
      popup.style.display = 'block';
    }
  } else {
    console.log('Popup element not found');
  }
}

// Close the popup only when clicking outside the lines
map.on('click', function (e) {
  // Check if the click event target is not a line (using feature state)
  const features = map.queryRenderedFeatures(e.point, {
    layers: ['ic1-line-layer', 'ic2-line-layer', 'ic3-line-layer', 'ic5-line-layer', 'ic6-line-layer', 'ic8-line-layer', 'ic21-line-layer', 'ic51-line-layer', 'ic61-line-layer', 'ic81-line-layer', 'ic-line-layer']
  });

  // If no features are clicked, hide the popup
  if (features.length === 0) {
    const popup = document.getElementById('popup-window');
    popup.style.display = 'none';
  }
});

// Funktion, um das Popup-Fenster zu schließen, wenn die Data Section sichtbar wird
const popup = document.getElementById('popup-window');
const dataSection = document.getElementById('data-section');

// Funktion zum Ausblenden des Popups
function hidePopup() {
  if (popup.style.display === 'block') {
    popup.style.display = 'none'; // Popup ausblenden
  }
}

// Intersection Observer konfigurieren, um die Data Section zu überwachen
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      hidePopup(); // Popup ausblenden, wenn Data Section sichtbar wird
    }
  });
}, { threshold: 0.1 }); // Trigger when at least 10% of the data section is visible

// Start monitoring the Data Section
observer.observe(dataSection);

// Use Scroll Event as a fallback to ensure the popup is closed
window.addEventListener('scroll', function() {
  const dataSectionTop = dataSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  // If the top of the Data Section is visible, hide the popup
  if (dataSectionTop <= windowHeight) {
    hidePopup();
  }
});

// Function to close the popup when clicking on the map
map.on('click', function (e) {
  const popup = document.getElementById('popup-window');
  popup.style.display = 'none';
});

// Mouse hover effect for each line
map.on('mouseenter', 'ic1-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic1-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'ic2-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic2-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'ic3-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic3-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'ic5-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic5-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'ic6-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic6-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'ic8-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic8-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'ic21-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic21-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'ic51-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic51-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'ic61-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic61-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'ic81-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic81-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'ic-line-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'ic-line-layer', function () {
  map.getCanvas().style.cursor = '';
});

// Define the chart variable globally
let myChart;

// Function to fetch data for both charts from the API
async function fetchData() {
  try {
    const response = await fetch('https://etl.mmp.li/sbb/etl/unload.php');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("Fetched Data:", data); // Debug: Log fetched data to verify its content
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Function to filter data from the last 7 days
function filterLast7Days(data) {
  const last7Days = {};
  const now = new Date();

  // Filter entries within the last 7 days, adjusting to represent the previous day's data
  Object.keys(data).forEach(line => {
    last7Days[line] = data[line].filter(entry => {
      const entryDate = new Date(entry.zeit);
      entryDate.setDate(entryDate.getDate() - 1); // Adjust to the previous day (data represents the day before)

      // Calculate the difference in days from today
      const diffDays = Math.floor((now - entryDate) / (1000 * 60 * 60 * 24));

      // We want data from the past 7 days, excluding today itself
      return diffDays >= 1 && diffDays <= 7; // Include data from 1 to 7 days ago
    });
  });

  return last7Days;
}

// Function to create the "Vortag" chart (previous day chart)
async function createChart() {
  const data = await fetchData();

  if (data) {
    const yesterdaysData = [];
    const linien = Object.keys(data);

    // Extract data for the previous day
    linien.forEach(linie => {
      const latestEntry = data[linie][data[linie].length - 1];
      if (latestEntry) {
        const entryDate = new Date(latestEntry.zeit);
        entryDate.setDate(entryDate.getDate() - 1); // Adjust to the previous day

        const abfahrten = latestEntry.abfahrten;
        const verspaetet = latestEntry.verspaetet;
        const ausfall = latestEntry.ausfall;
        const puenktlich = abfahrten - verspaetet - ausfall;

        // Format the date as "Weekday, day.month"
        const options = { weekday: 'long' };
        const weekdayName = entryDate.toLocaleDateString('de-DE', options);
        const dayMonth = `${entryDate.getDate()}.${(entryDate.getMonth() + 1).toString().padStart(2, '0')}`;
        const formattedLabel = `${weekdayName}, ${dayMonth}`;

        yesterdaysData.push({
          linie: linie,
          puenktlich: puenktlich,
          verspaetet: verspaetet,
          ausfall: ausfall,
          datum: formattedLabel // Only the formatted label
        });
      }
    });

    // Line labels and corresponding data
    const linienLabels = yesterdaysData.map(entry => entry.linie);
    const puenktlichData = yesterdaysData.map(entry => entry.puenktlich);
    const verspaetetData = yesterdaysData.map(entry => entry.verspaetet);
    const ausfallData = yesterdaysData.map(entry => entry.ausfall);

    // Destroy the previous chart if it exists
    if (myChart) {
      myChart.destroy();
    }

   // Responsive chart context
   const ctx = document.getElementById('myChart').getContext('2d');

   
    // Set chart height dynamically based on screen size
    const screenWidth = window.innerWidth;
    let chartHeight;

    if (screenWidth < 390) {
      chartHeight = '800px';  // Higher for very small screens
    } else if (screenWidth < 480) {
      chartHeight = '600px';  // Standard height for small screens
    } else {
      chartHeight = '400px';  // Default height for larger screens
    }

    document.getElementById('myChart').style.height = chartHeight; // Set height of the canvas


   // Create a new chart for the previous day's data
myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: linienLabels,
    datasets: [
      {
        label: 'Pünktlich',
        data: puenktlichData,
        backgroundColor: 'green',
      },
      {
        label: 'Verspätet',
        data: verspaetetData,
        backgroundColor: 'orange',
      },
      {
        label: 'Ausgefallen',
        data: ausfallData,
        backgroundColor: 'red',
      }
    ]
  },
  options: {
    indexAxis: 'x',
    plugins: {
      title: {
        display: true,
        text: `Daten vom ${yesterdaysData[0]?.datum || ''}`,
        font: {
          size: window.innerWidth < 480 ? 14 : 16, // Title font size
          weight: 'bold'
        },
        padding: {
          top: 20,
          bottom: 20
        }
      },
      legend: {
        labels: {
          font: {
            size: window.innerWidth < 480 ? 10 : 12 // Dataset labels font size
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'IC-Linie',
          font: {
            size: window.innerWidth < 480 ? 12 : 14, // X-axis title font size
            weight: 'bold'
          },
          padding: {
            top: 10
          }
        },
        ticks: {
          font: {
            size: window.innerWidth < 480 ? 12 : 14 // X-axis tick labels font size
          }
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 1200,
        title: {
          display: true,
          text: 'Anzahl',
          font: {
            size: window.innerWidth < 480 ? 12 : 14, // Y-axis title font size
            weight: 'bold'
          },
          padding: {
            bottom: 10
          }
        },
        ticks: {
          font: {
            size: window.innerWidth < 480 ? 12 : 14 // Y-axis tick labels font size
          }
        }
      }
    },
    maintainAspectRatio: false,
  }
});
}
}

// Function to process the weekly data for selected IC lines
function processWeeklyData(data, selectedLines) {
  const weekData = {
    Montag: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Dienstag: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Mittwoch: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Donnerstag: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Freitag: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Samstag: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Sonntag: { puenktlich: 0, verspaetet: 0, ausfall: 0 }
  };

  // Process data for each selected IC line
  Object.keys(data).forEach(line => {
    if (selectedLines.includes(line)) {
      data[line].forEach(entry => {
        const entryDate = new Date(entry.zeit);
        entryDate.setDate(entryDate.getDate() - 1); // Adjust to previous day
        const dayOfWeek = entryDate.toLocaleDateString('de-DE', { weekday: 'long' });

        // Calculate punctual, delayed, and cancelled trips for the entry
        const puenktlich = entry.abfahrten - entry.verspaetet - entry.ausfall;

        if (weekData[dayOfWeek]) {
          weekData[dayOfWeek].puenktlich += puenktlich;
          weekData[dayOfWeek].verspaetet += entry.verspaetet;
          weekData[dayOfWeek].ausfall += entry.ausfall;
        }
      });
    }
  });

  return weekData;
}

// Function to create the "Wochenverlauf" chart (weekly chart)
async function createWeeklyChart() {
  const data = await fetchData();
  const last7DaysData = filterLast7Days(data);
  const selectedLines = getSelectedLines(); // Fetch selected lines from dropdown

  if (!data || !selectedLines.length) {
    return; // Exit if there's no data or no selected lines
  }

  // Filter data for selected lines and get the last 7 available entries
  const filteredData = {};
  Object.keys(last7DaysData).forEach(line => {
    if (selectedLines.includes(line)) {
      filteredData[line] = last7DaysData[line].slice(-7); // Get the last 7 entries for each line
    }
  });

  const dateEntries = []; // To collect all dates for determining the date range
  const weekData = {
    Montag: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Dienstag: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Mittwoch: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Donnerstag: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Freitag: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Samstag: { puenktlich: 0, verspaetet: 0, ausfall: 0 },
    Sonntag: { puenktlich: 0, verspaetet: 0, ausfall: 0 }
  };

  // Process data for each selected IC line
  Object.keys(filteredData).forEach(line => {
    filteredData[line].forEach(entry => {
      const entryDate = new Date(entry.zeit);
      entryDate.setDate(entryDate.getDate() - 1); // Adjust to previous day representation
      dateEntries.push(entryDate); // Store the date for range determination

      const dayOfWeek = entryDate.toLocaleDateString('de-DE', { weekday: 'long' });
      const puenktlich = entry.abfahrten - entry.verspaetet - entry.ausfall;

      if (weekData[dayOfWeek]) {
        weekData[dayOfWeek].puenktlich += puenktlich;
        weekData[dayOfWeek].verspaetet += entry.verspaetet;
        weekData[dayOfWeek].ausfall += entry.ausfall;
      }
    });
  });

  // Determine the start and end dates for the title based on dateEntries
  dateEntries.sort((a, b) => a - b); // Sort dates to determine the range
  const startDate = dateEntries[0];
  const endDate = dateEntries[dateEntries.length - 1];

  // Format the start and end dates for the chart title
  const startFormatted = `${startDate.toLocaleDateString('de-DE', { weekday: 'long' })}, ${startDate.getDate()}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}`;
  const endFormatted = `${endDate.toLocaleDateString('de-DE', { weekday: 'long' })}, ${endDate.getDate()}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}`;
  const chartTitle = `Daten vom ${startFormatted} - ${endFormatted}`;

  // Prepare data for the chart
  const days = Object.keys(weekData); // Get the days (Monday to Sunday)
  const punctualData = days.map(day => weekData[day].puenktlich);
  const delayedData = days.map(day => weekData[day].verspaetet);
  const cancelledData = days.map(day => weekData[day].ausfall);

  // Create datasets for "Pünktlich", "Verspätet", and "Ausfall"
  const datasets = [
    {
      label: 'Pünktlich',
      backgroundColor: 'green',
      data: punctualData
    },
    {
      label: 'Verspätet',
      backgroundColor: 'orange',
      data: delayedData
    },
    {
      label: 'Ausgefallen',
      backgroundColor: 'red',
      data: cancelledData
    }
  ];

  // Destroy previous chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  // Responsive chart context
  const ctx = document.getElementById('myChart').getContext('2d');

  // Set chart height dynamically
  const chartHeight = window.innerWidth < 768 ? '70vh' : '400px'; // Use viewport height for small screens
  document.getElementById('myChart').style.height = chartHeight;

  // Create a new stacked bar chart for the weekly data
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days, // Weekdays (Monday to Sunday)
      datasets: datasets
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: chartTitle,
          font: {
            size: window.innerWidth < 480 ? 14 : 16, // Title font size
            weight: 'bold'
          },
          padding: {
            top: 20,
            bottom: 20
          }
        },
        legend: {
          labels: {
            font: {
              size: window.innerWidth < 480 ? 10 : 12 // Dataset labels font size
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Wochentag',
            font: {
              size: window.innerWidth < 480 ? 12 : 14, // X-axis title font size
              weight: 'bold'
            },
            padding: {
              top: 10
            }
          },
          ticks: {
            font: {
              size: window.innerWidth < 480 ? 12 : 14 // X-axis tick labels font size
            }
          }
        },
        y: {
          beginAtZero: true,
          stacked: true,
          max: 1200,
          title: {
            display: true,
            text: 'Anzahl',
            font: {
              size: window.innerWidth < 480 ? 12 : 14, // Y-axis title font size
              weight: 'bold'
            },
            padding: {
              bottom: 10
            }
          },
          ticks: {
            font: {
              size: window.innerWidth < 480 ? 12 : 14 // Y-axis tick labels font size
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Create reliability chart with Chart.js
let reliabilityChart;

// Function to fetch data from the specified URL
async function fetchReliabilityData() {
  try {
    const response = await fetch('https://etl.mmp.li/sbb/etl/unload.php');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Define colors for the IC lines
const icLineColors = {
  'IC1': '#FF0000',    // Rot für IC1
  'IC2': '#800080',    // Lila für IC2
  'IC3': '#006400',    // Dunkelgrün für IC3
  'IC5': '#FFA500',    // Orange für IC5
  'IC6': '#90EE90',    // Hellgrün für IC6
  'IC8': '#0000FF',    // Blau für IC8
  'IC21': '#FFFF00',   // Gelb für IC21
  'IC51': '#8B0000',   // Weinrot für IC51
  'IC61': '#FFC0CB',   // Pink für IC61
  'IC81': '#D3D3D3',   // Hellgrau für IC81
  'IC': '#A9A9A9'      // Dunkelgrau für allgemeine IC
};

// Function to create the "Previous Day" ranking chart
async function createReliabilityChart() {
  const data = await fetchReliabilityData();
  
  if (data) {
    const lines = Object.keys(data); // All line names (IC1, IC2, ...)
    const reliabilityData = [];

 // Calculate reliability data
    lines.forEach(line => {
      const latestEntry = data[line][data[line].length - 1]; // Latest entry (most recent date)
      const entryDate = new Date(latestEntry.zeit);
      entryDate.setDate(entryDate.getDate() - 1); // Adjust to reflect the previous day, as the data represents the previous day

      const abfahrten = latestEntry.abfahrten;
      const verspaetet = latestEntry.verspaetet;
      const ausfall = latestEntry.ausfall;
      const zuverlässigkeit = 100 - (100 / abfahrten * (verspaetet + ausfall));
      
      reliabilityData.push({
        linie: line,
        zuverlässigkeit: zuverlässigkeit.toFixed(2), // Reliability with two decimal places
        datum: entryDate // Store the adjusted date for chart title use
      });
    });

  // Sort reliability data in descending order
    reliabilityData.sort((a, b) => b.zuverlässigkeit - a.zuverlässigkeit);

  // Prepare data for the chart
    const lineLabels = reliabilityData.map(entry => entry.linie);
    const reliabilityValues = reliabilityData.map(entry => entry.zuverlässigkeit);
    const lineColors = reliabilityData.map(entry => icLineColors[entry.linie]); // Füge die Farben hinzu

    // Format the date for the chart title (use the first entry since all data is for the same day)
    const formattedDate = `${reliabilityData[0].datum.toLocaleDateString('de-DE', { weekday: 'long' })}, ${reliabilityData[0].datum.getDate()}.${(reliabilityData[0].datum.getMonth() + 1).toString().padStart(2, '0')}`;

   // Set the dynamic height for the chart
   const chartHeight = window.innerWidth < 430 ? '60vh' : '400px'; // Adjust based on screen size
   document.getElementById('reliabilityChart').style.height = chartHeight;

    // Destroy the existing reliabilityChart if it exists
    if (reliabilityChart) {
      reliabilityChart.destroy();
    }

 // Create the Chart.js 4.4.4 chart
    const ctx = document.getElementById('reliabilityChart').getContext('2d');
    reliabilityChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: lineLabels,
        datasets: [{
          label: 'Zuverlässigkeit (%)',
          data: reliabilityValues,
          backgroundColor: lineColors,  
          borderColor: 'white',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'x', 
        scales: {
          x: {
            title: {
              display: true,
              text: 'IC-Linie',
              font: {
                size: window.innerWidth < 430 ? 14 : 16, // Title font size      
                weight: 'bold'
              },
              padding: {
                top: 10
              }
            },
            ticks: {
              font: {
                size: window.innerWidth < 430 ? 12 : 14 // X-axis tick labels font size
              }
            }
          },
          y: {
            beginAtZero: true,
            max: 100, 
            title: {
              display: true,
              text: 'Zuverlässigkeit (%)',
              font: {
                size: window.innerWidth < 430 ? 12 : 14, // Y-axis title font size
                weight: 'bold'
              },
              padding: {
                bottom: 10
              }
            },
            ticks: {
              font: {
                size: window.innerWidth < 430 ? 12 : 14 // Y-axis tick labels font size
              }
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Daten vom ${formattedDate}`,
            font: {
              size: window.innerWidth < 430 ? 14 : 16, // Title font size
              weight: 'bold'
            },
            padding: {
              top: 20,
              bottom: 20
            }
          },
          legend: {
            labels: {
              generateLabels: function(chart) {
                const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                labels.forEach(function(label) {
                  // Use colored rectangles without stroke
                  label.fillStyle = icLineColors[label.text];
                  label.strokeStyle = 'transparent'; // No stroke
                  label.boxWidth = 20;
                  label.boxHeight = 10;
                });
                return labels;
              },
              font: {
                size: window.innerWidth < 430 ? 10 : 12 // Legend labels font size
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + '%';
              }
            }
          }
        },
        maintainAspectRatio: false,
      }
    });
  }
}

/// Function to create the weekly ranking chart using a line chart
async function createWeekViewLineChart() {
  const data = await fetchReliabilityData();

  if (data) {
    const dateEntries = []; // Store all dates to determine the range later
    const weeklyReliability = {
      Montag: [],
      Dienstag: [],
      Mittwoch: [],
      Donnerstag: [],
      Freitag: [],
      Samstag: [],
      Sonntag: []
    };

    // Process data for each IC line and extract only the last 7 entries
    Object.keys(data).forEach(line => {
      // Get the last 7 entries for each line (sorted in ascending order)
      const last7Entries = data[line].slice(-7);
      last7Entries.forEach(entry => {
        const date = new Date(entry.zeit); // Date of the entry
        date.setDate(date.getDate() - 1); // Adjust for previous day representation
        dateEntries.push(new Date(date)); // Collect adjusted dates for determining the range

        const dayOfWeek = date.toLocaleDateString('de-DE', { weekday: 'long' }); // Get the day of the week in German

        const abfahrten = entry.abfahrten;
        const verspaetet = entry.verspaetet;
        const ausfall = entry.ausfall;
        const zuverlässigkeit = 100 - (100 / abfahrten * (verspaetet + ausfall));

        weeklyReliability[dayOfWeek].push({ linie: line, zuverlässigkeit: zuverlässigkeit });
      });
    });

    // Sort the date entries to determine the start and end of the week range
    dateEntries.sort((a, b) => a - b);
    const startDate = dateEntries[0];
    const endDate = dateEntries[dateEntries.length - 1];

    // Format start and end dates for chart title
    const startFormatted = `${startDate.toLocaleDateString('de-DE', { weekday: 'long' })}, ${startDate.getDate()}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}`;
    const endFormatted = `${endDate.toLocaleDateString('de-DE', { weekday: 'long' })}, ${endDate.getDate()}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}`;

    // Prepare datasets for each IC line for each day
    const datasets = [];
    Object.keys(icLineColors).forEach(line => {
      const data = Object.keys(weeklyReliability).map(day => {
        const lineData = weeklyReliability[day].find(entry => entry.linie === line);
        return lineData ? lineData.zuverlässigkeit : null;
      });

      datasets.push({
        label: line,
        data: data,
        borderColor: icLineColors[line],
        fill: false,
        tension: 0.1
      });
    });

    // Destroy previous reliabilityChart if it exists
    if (reliabilityChart) {
      reliabilityChart.destroy();
    }

    // Create the new line chart
    const ctx = document.getElementById('reliabilityChart').getContext('2d');
    reliabilityChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(weeklyReliability), // X-axis (days of the week)
        datasets: datasets
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Wochentag',
              font: {
                size: window.innerWidth < 480 ? 12 : 14, // X-axis title font size
                weight: 'bold'
              },
              padding: {
                top: 10
              }
            },
            ticks: {
              font: {
                size: window.innerWidth < 480 ? 12 : 14 // X-axis tick labels font size
              }
            }
          },
          y: {
            min: 50, // Start the y-axis at 50%
            max: 100, // Percentage reliability goes up to 100%
            title: {
              display: true,
              text: 'Zuverlässigkeit (%)',
              font: {
                size: window.innerWidth < 480 ? 12 : 14, // Y-axis title font size
                weight: 'bold'
              },
              padding: {
                bottom: 10
              }
            },
            ticks: {
              stepSize: 10, // Increase gaps between values
              font: {
                size: window.innerWidth < 480 ? 12 : 14 // Y-axis tick labels font size
              }
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false, // Maintain a custom height as specified
        plugins: {
          title: {
            display: true,
            text: `Daten vom ${startFormatted} - ${endFormatted}`,
            font: {
              size: window.innerWidth < 480 ? 14 : 16, // Title font size
              weight: 'bold'
            },
            padding: {
              top: 20,
              bottom: 20
            }
          },
          legend: {
            position: 'top',
            labels: {
              generateLabels: function(chart) {
                const labels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                labels.forEach(function(label) {
                  // No stroke, just a colored rectangle
                  label.fillStyle = icLineColors[label.text];
                  label.strokeStyle = 'transparent'; // No stroke
                  label.boxWidth = 20;
                  label.boxHeight = 10;
                });
                return labels;
              },
              font: {
                size: window.innerWidth < 480 ? 10 : 12 // Legend labels font size
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                // Format the tooltip label and add the correct color
                return context.dataset.label + ': ' + Number(context.raw).toFixed(2) + '%'; // Show value with 2 decimal places
              },
              labelColor: function(tooltipItem) {
                // Return the color corresponding to the IC line in the tooltip
                return {
                  borderColor: 'transparent',
                  backgroundColor: icLineColors[tooltipItem.dataset.label]
                };
              }
            }
          }
        }
      }
    });

    // Set the dynamic height for the chart
    document.getElementById('reliabilityChart').style.height = window.innerWidth < 480 ? '600px' : '400px';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Get elements by their IDs
  const previousDayButton = document.getElementById("previous-day-btn");
  const dropdownMenu = document.getElementById("ic-line-dropdown");
  const rankingPreviousDayButton = document.getElementById("ranking-previous-day-btn");
  const rankingWeekViewButton = document.getElementById("ranking-week-view-btn");

  // Set the "Previous Day" button and "Ranking Previous Day" button as active on page load
  if (previousDayButton && rankingPreviousDayButton) {
    setActiveButton(previousDayButton);
    setActiveButton(rankingPreviousDayButton);
    createChart(); // Load previous day chart on page load
    createReliabilityChart(); // Load reliability chart for "Previous Day" by default
  }

  // Event listener for the "Previous Day" button
  if (previousDayButton) {
    previousDayButton.addEventListener("click", async function () {
      setActiveButton(previousDayButton);
      setActiveButton(rankingPreviousDayButton); // Also activate ranking previous day button
      await createChart(); // Load previous day chart
      createReliabilityChart(); // Load reliability chart for "Previous Day"
    });
  }

  // Event listener for dropdown menu change
  if (dropdownMenu) {
    dropdownMenu.addEventListener("change", function () {
      // Deactivate "Previous Day" buttons
      deactivateAllButtons();
      setActiveButton(dropdownMenu); // Set dropdown as active
      setActiveButton(rankingWeekViewButton); // Set the ranking "Week View" button as active
      createWeekViewLineChart(); // Load the weekly chart based on dropdown selection
    });
  }

  // Event listener for the "Ranking Previous Day" button
  if (rankingPreviousDayButton) {
    rankingPreviousDayButton.addEventListener("click", function () {
      setActiveButton(previousDayButton); // Make sure the "Previous Day" button is also active
      setActiveButton(rankingPreviousDayButton);
      createReliabilityChart(); // Load reliability chart for "Previous Day"
    });
  }

  // Event listener for the "Ranking Week View" button
  if (rankingWeekViewButton) {
    rankingWeekViewButton.addEventListener("click", function () {
      deactivateAllButtons();
      setActiveButton(rankingWeekViewButton);
      createWeekViewLineChart(); // Load the week view chart for ranking
    });
  }

  // Function to manage the active state of buttons
  function setActiveButton(activeElement) {
    deactivateAllButtons(); // Deactivate all buttons first
    activeElement.classList.add("active"); // Add active state to the clicked/changed element

    // Reset dropdown to default value if necessary
    if (dropdownMenu && activeElement !== dropdownMenu) {
      dropdownMenu.value = ""; // Reset the dropdown if it's not the one being activated
    }
  }

  // Function to deactivate all buttons and dropdowns
  function deactivateAllButtons() {
    if (previousDayButton) {
      previousDayButton.classList.remove("active");
    }
    if (rankingPreviousDayButton) {
      rankingPreviousDayButton.classList.remove("active");
    }
    if (rankingWeekViewButton) {
      rankingWeekViewButton.classList.remove("active");
    }
    if (dropdownMenu) {
      dropdownMenu.classList.remove("active");
    }
  }
});

