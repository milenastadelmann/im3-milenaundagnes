// Replace with your actual Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoibWlsZW5hc3RhZGVsbWFubiIsImEiOiJjbTFxdHRtY2wwM2VqMmtxem82emUzamtuIn0.P2B20sBbGljY0rGXZwOqeQ';

    const map = new mapboxgl.Map({
      container: 'map', // Container ID
      style: 'mapbox://styles/mapbox/light-v10', // Map style
    });
    
    // Define the bounding box for Switzerland (southwest and northeast corners)
    const switzerlandBounds = [
      [5.9559, 45.8179], // Southwest corner (Genève, southwest)
      [10.4920, 47.8085] // Northeast corner (Bodensee area, northeast)
    ];
    
    // Use fitBounds to adjust the map to Switzerland's bounds with additional padding for zoom effect
    map.fitBounds(switzerlandBounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 }, // Reduced padding for more zoom effect
      maxZoom: 8 // Adjust the zoom level to be closer to Switzerland
    });
    
    // Add zoom and rotation controls to the map
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add a resize event listener to ensure the map resizes properly and keeps Switzerland in view
    window.addEventListener('resize', function () {
      map.fitBounds(switzerlandBounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 }, // Ensure padding matches the original view
        maxZoom: 8 // Maintain the same zoom limit
      });
    });

  // Reset button functionality
document.getElementById('reset-map-btn').addEventListener('click', function () {
  map.fitBounds(switzerlandBounds, {
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
    maxZoom: 8
  });
});

// Scroll to data section when the button is clicked
document.getElementById('scroll-button').addEventListener('click', function() {
  document.getElementById('data-section').scrollIntoView({ behavior: 'smooth' });
});

    // Smooth scroll function to the data section
    function scrollToData() {
      document.getElementById('data-section').scrollIntoView({ behavior: 'smooth' });
    }

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

// Intersection Observer konfigurieren, um die Data Section zu überwachen
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && popup.style.display === 'block') {
      popup.style.display = 'none'; // Popup ausblenden, wenn Data Section sichtbar wird
    }
  });
});

// Überwachung der Data Section starten
observer.observe(dataSection);

// Funktion zum Schließen des Popups, wenn auf die Karte geklickt wird
map.on('click', function (e) {
  const popup = document.getElementById('popup-window');
  popup.style.display = 'none';
});

// Maus Veränderung (hover effect for each line)
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
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
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
      const abfahrten = latestEntry.abfahrten;
      const verspaetet = latestEntry.verspaetet;
      const ausfall = latestEntry.ausfall;
      const pünktlich = abfahrten - verspaetet - ausfall;

      yesterdaysData.push({
        linie: linie,
        pünktlich: pünktlich,
        verspaetet: verspaetet,
        ausfall: ausfall,
        datum: latestEntry.zeit.split(' ')[0] // Only the date
      });
    });

    // Line labels and corresponding data
    const linienLabels = yesterdaysData.map(entry => entry.linie);
    const pünktlichData = yesterdaysData.map(entry => entry.pünktlich);
    const verspätetData = yesterdaysData.map(entry => entry.verspaetet);
    const ausfallData = yesterdaysData.map(entry => entry.ausfall);

    // Destroy the previous chart if it exists
    if (myChart) {
      myChart.destroy();
    }

    // Responsive chart context
    const ctx = document.getElementById('myChart').getContext('2d');

    // Check if the screen width is less than 480px (mobile version)
    const isMobile = window.innerWidth < 480;

    // Set height for mobile and larger screens
    const chartHeight = isMobile ? 600 : 400; // 600px for mobile, 400px for larger screens

    // Create a new chart for the previous day's data
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: linienLabels,
        datasets: [
          {
            label: 'Pünktlich',
            data: pünktlichData,
            backgroundColor: 'green',
          },
          {
            label: 'Verspätet',
            data: verspätetData,
            backgroundColor: 'orange',
          },
          {
            label: 'Ausfälle',
            data: ausfallData,
            backgroundColor: 'red',
          }
        ]
      },
      options: {
        indexAxis: 'y', // Horizontal bar chart
        plugins: {
          title: {
            display: false // Remove title
          }
        },
        scales: {
          x: {
            stacked: true, // Stack on x-axis
            beginAtZero: true,
            max: 1500, // Adjust if needed
          },
          y: {
            stacked: true, // Stack on y-axis
            ticks: {
              font: {
                size: isMobile ? 8 : 12 // Smaller font size for mobile devices
              }
            }
          }
        },
        maintainAspectRatio: false, // Allow custom height
      }
    });

    // Set dynamic canvas height based on the device size
    document.getElementById('myChart').style.height = chartHeight + 'px';
  }
}

// Function to fetch weekly data
async function fetchWeeklyData() {
  try {
    const response = await fetch('https://etl.mmp.li/sbb/etl/unload.php');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to process the weekly data by IC line and day
function processWeeklyData(data, selectedLines) {
  const weekData = {
    Montag: [],
    Dienstag: [],
    Mittwoch: [],
    Donnerstag: [],
    Freitag: [],
    Samstag: [],
    Sonntag: []
  };

  // Process data for each selected IC line and day
  Object.keys(data).forEach(line => {
    if (selectedLines.includes(line)) {
      data[line].forEach(entry => {
        const date = new Date(entry.zeit);
        const dayOfWeek = date.toLocaleDateString('de-DE', { weekday: 'long' });

        // Get punctual, delayed, and cancelled data for each line
        const punctual = entry.abfahrten - entry.verspaetet - entry.ausfall;
        const delayed = entry.verspaetet;
        const cancelled = entry.ausfall;

        // Add the data to the correct day for each line
        if (weekData[dayOfWeek]) {
          weekData[dayOfWeek].push({
            line: line,
            punctual: punctual,
            delayed: delayed,
            cancelled: cancelled
          });
        }
      });
    }
  });

  return weekData;
}

// Function to create the "Wochenverlauf" chart (weekly chart)
function createWeeklyChart(weekData) {
  const days = Object.keys(weekData); // Get the days (Monday to Sunday)
  const labels = []; // Labels for X-axis (IC lines per day)
  const punctualData = [];
  const delayedData = [];
  const cancelledData = [];

  // Prepare the data for each day and line
  days.forEach(day => {
    weekData[day].forEach(entry => {
      labels.push(`${day} - ${entry.line}`);
      punctualData.push(entry.punctual);
      delayedData.push(entry.delayed);
      cancelledData.push(entry.cancelled);
    });
  });

  // Create datasets for "Pünktlich", "Verspätet", and "Ausfall" for all IC lines per day
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
      label: 'Ausfall',
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

  // Check if the screen width is less than 480px (mobile version)
  const isMobile = window.innerWidth < 480;

  // Set height for mobile and larger screens
  const chartHeight = isMobile ? 600 : 400; // 600px for mobile, 400px for larger screens

  // Create a new stacked bar chart for the weekly data
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels, // Labels showing each day and IC line
      datasets: datasets // The data for punctual, delayed, and cancelled
    },
    options: {
      indexAxis: 'x', // Vertical bar chart (stacked)
      scales: {
        x: {
          stacked: true, // Stack the bars for punctual, delayed, and cancelled per IC line
          ticks: {
            autoSkip: false, // Ensure every label is shown
            maxRotation: 90, // Rotate the labels for better readability
            minRotation: 90,
            font: {
              size: isMobile ? 8 : 12 // Smaller font size for mobile devices
            }
          }
        },
        y: {
          beginAtZero: true,
          stacked: true, // Stack the bars vertically
          max: 1500 // Set the y-axis max to 1500
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            font: {
              size: isMobile ? 8 : 12 // Smaller font size for mobile devices
            }
          }
        }
      },
      maintainAspectRatio: false, // Allow custom height
      responsive: true // Ensure responsiveness
    }
  });

  // Set dynamic canvas height based on the device size
  document.getElementById('myChart').style.height = chartHeight + 'px';
}

// Function to get selected IC lines from checkboxes
function getSelectedLines() {
  const checkboxes = document.querySelectorAll('#ic-line-filter input[type="checkbox"]:checked');
  return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Event listener for "Wochenverlauf" button
document.getElementById('week-view-btn').addEventListener('click', async () => {
  document.getElementById('week-view-btn').classList.add('active');
  document.getElementById('previous-day-btn').classList.remove('active');
  
  // Fetch and process the weekly data based on selected IC lines
  const selectedLines = getSelectedLines();
  const data = await fetchWeeklyData();
  const weekData = processWeeklyData(data, selectedLines);
  createWeeklyChart(weekData);
});

// Event listener for checkboxes to update the chart when selections change
document.querySelectorAll('#ic-line-filter input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', async () => {
    const selectedLines = getSelectedLines();
    const data = await fetchWeeklyData();
    const weekData = processWeeklyData(data, selectedLines);
    createWeeklyChart(weekData);
  });
});

// Initialize with the "Vortag" chart on page load
document.addEventListener('DOMContentLoaded', async () => {
  await createChart(); // Load "Vortag" chart by default
});





// Define a chart variable specific to the Reliability charts
let reliabilityChart;

// Funktion, um Daten von der angegebenen URL zu holen
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

// Farben für die IC-Linien definieren
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

// Funktion zum Erstellen des Vortags-Ranking-Charts
async function createReliabilityChart() {
  const data = await fetchReliabilityData();
  
  if (data) {
    const lines = Object.keys(data); // Alle Liniennamen (IC1, IC2, ...)
    const reliabilityData = [];

    // Daten für Zuverlässigkeit berechnen
    lines.forEach(line => {
      const latestEntry = data[line][data[line].length - 1]; // Letzter Eintrag (neuestes Datum)
      const abfahrten = latestEntry.abfahrten;
      const verspaetet = latestEntry.verspaetet;
      const ausfall = latestEntry.ausfall;
      const zuverlässigkeit = 100 - (100 / abfahrten * (verspaetet + ausfall));
      
      reliabilityData.push({
        linie: line,
        zuverlässigkeit: zuverlässigkeit.toFixed(2) // Zuverlässigkeit mit zwei Dezimalstellen
      });
    });

    // Sortiere die Zuverlässigkeit in absteigender Reihenfolge
    reliabilityData.sort((a, b) => b.zuverlässigkeit - a.zuverlässigkeit);

    // Daten für das Chart vorbereiten
    const lineLabels = reliabilityData.map(entry => entry.linie);
    const reliabilityValues = reliabilityData.map(entry => entry.zuverlässigkeit);
    const lineColors = reliabilityData.map(entry => icLineColors[entry.linie]); // Füge die Farben hinzu

    // Prüfe, ob die Bildschirmbreite kleiner als 480px ist (mobile Version)
    const isMobile = window.innerWidth < 480;

    // Lege die gewünschte Höhe für mobile und größere Bildschirme fest
    const chartHeight = isMobile ? 600 : 400; // Z.B. 600px für mobile Geräte, 400px für größere Bildschirme

    // Destroy the existing reliabilityChart if it exists
    if (reliabilityChart) {
      reliabilityChart.destroy();
    }

    // Chart.js 4.4.4 Grafik erstellen
    const ctx = document.getElementById('reliabilityChart').getContext('2d');
    reliabilityChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: lineLabels,
        datasets: [{
          label: 'Zuverlässigkeit (%)',
          data: reliabilityValues,
          backgroundColor: lineColors,  // Füge die Farben der IC-Linien hinzu
          borderColor: 'white',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'x', // Vertikale Balken (x und y Achse vertauscht)
        scales: {
          y: {
            beginAtZero: true,
            max: 100 // Prozentuale Zuverlässigkeit geht bis 100%
          },
          x: {
            beginAtZero: true,
            ticks: {
              font: {
                size: isMobile ? 8 : 12 // Kleinere Schriftgröße für mobile Geräte
              }
            }
          }
        },
        plugins: {
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
        maintainAspectRatio: false, // Damit die manuelle Höhe verwendet wird
      }
    });

    // Setze die Höhe des Canvas-Elements dynamisch
    document.getElementById('reliabilityChart').style.height = chartHeight + 'px';
  }
}

// Funktion zum Erstellen des Vorwochen-Ranking-Charts mit Linien-Diagramm
async function createWeekViewLineChart() {
  const data = await fetchReliabilityData();

  if (data) {
    // Initialize structure to hold reliability data for each IC line by day in German
    const weeklyReliability = {
      Montag: {},
      Dienstag: {},
      Mittwoch: {},
      Donnerstag: {},
      Freitag: {},
      Samstag: {},
      Sonntag: {}
    };

    // Process data for each IC line and day
    Object.keys(data).forEach(line => {
      data[line].forEach(entry => {
        const date = new Date(entry.zeit); // Date of the entry
        const dayOfWeek = date.toLocaleDateString('de-DE', { weekday: 'long' }); // Get the day of the week in German

        const abfahrten = entry.abfahrten;
        const verspaetet = entry.verspaetet;
        const ausfall = entry.ausfall;
        const zuverlässigkeit = 100 - (100 / abfahrten * (verspaetet + ausfall));

        if (!weeklyReliability[dayOfWeek][line]) {
          weeklyReliability[dayOfWeek][line] = [];
        }
        weeklyReliability[dayOfWeek][line].push(zuverlässigkeit);
      });
    });

    // Prepare datasets for each IC line
    const datasets = [];
    Object.keys(icLineColors).forEach(line => {
      const data = Object.keys(weeklyReliability).map(day => {
        if (weeklyReliability[day][line] && weeklyReliability[day][line].length > 0) {
          return weeklyReliability[day][line][0]; // Return the reliability for the line on this day
        }
        return null; // Return null if no data available for this line on this day
      });

      datasets.push({
        label: line,
        data: data,
        borderColor: icLineColors[line],
        fill: false,
        tension: 0.1
      });
    });

    // Get today's day index (0 = Sunday, 1 = Monday, etc.)
    const daysOfWeek = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
    const todayIndex = (new Date().getDay() + 6) % 7; // Adjust to align with Montag = 0, Sonntag = 6

    // Shift the days according to the current day and ensure that the most recent day is last
    const rotatedDaysOfWeek = daysOfWeek.slice(todayIndex + 1).concat(daysOfWeek.slice(0, todayIndex + 1));

    // The newest data represents the previous day, so shift the days one more time for this
    const shiftedDaysOfWeek = rotatedDaysOfWeek.map((day, index, arr) => arr[(index + 1) % arr.length]);

    // Destroy previous reliabilityChart if it exists
    if (reliabilityChart) {
      reliabilityChart.destroy();
    }

    // Create the new line chart
    const ctx = document.getElementById('reliabilityChart').getContext('2d');
    reliabilityChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: shiftedDaysOfWeek, // X-axis (shifted days of the week, with the most recent data on the right)
        datasets: datasets
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            min: 50, // Start the y-axis at 50%
            max: 100, // Percentage reliability goes up to 100%
            ticks: {
              stepSize: 10 // Increase gaps between values
            }
          }
        },
        responsive: true,
        plugins: {
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
  }
}

// Event-Listener für den Vortag-Button (Ranking Section)
document.getElementById('ranking-previous-day-btn').addEventListener('click', function () {
  setActiveRankingButton('ranking-previous-day-btn');
  createReliabilityChart(); // Funktion zum Erstellen des Charts für den Vortag (Ranking)
});

// Event-Listener für den Vorwochen-Button (Ranking Section)
document.getElementById('ranking-week-view-btn').addEventListener('click', function () {
  setActiveRankingButton('ranking-week-view-btn');
  createWeekViewLineChart(); // Funktion zum Erstellen des Charts für die Vorwoche (Ranking)
});

// Funktion, um den aktiven Button in der Ranking-Sektion zu markieren
function setActiveRankingButton(buttonId) {
  document.getElementById('ranking-previous-day-btn').classList.remove('active');
  document.getElementById('ranking-week-view-btn').classList.remove('active');
  document.getElementById(buttonId).classList.add('active');
}

// Load the "Vortag" chart by default on page load
document.addEventListener('DOMContentLoaded', function () {
  createReliabilityChart();
  document.getElementById('ranking-previous-day-btn').classList.add('active'); // Set Vortag as active by default
});
