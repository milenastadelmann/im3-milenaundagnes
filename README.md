# Projekt: Datenvisualisierung der IC-Linien der SBB

## Kurzbeschreibung des Projekts
Unsere Website visualisiert die Verlässlichkeit der IC-Züge der SBB mithilfe von drei gefilterten API-Calls einer API der SBB, die die Abfahrts- und Ankunftszeiten des Vortags abruft. Mit einer interaktiven Mapbox-Karte und Chart.js-Diagrammen werden Ausfälle und Verspätungen der Züge datenjournalistisch transparent dargestellt. Nutzer können auf IC-Linien klicken, um detaillierte Informationen darüber zu erhalten, wie viele Verspätungen und Ausfälle es am Vortag auf den spezifischen IC-Linien gab. Zudem können sie zwischen täglichen und wöchentlichen Statistiken wählen, um mehr Informationen zu erhalten. Die Seite bietet Pendlern und Reisenden eine übersichtliche Darstellung der Zuverlässigkeit der IC-Linien.

## Schwierigkeiten

- **Projektfindung:**
  - Die erste Herausforderung bestand in der Wahl einer geeigneten API. Unsere erste Idee, den UV-Schutz im Zusammenhang mit der Meereshöhe zu analysieren, erwies sich als ungeeignet, da die Unterschiede zu gering waren, um eine interessante Datengeschichte zu erzählen. Zudem fanden wir die aktuellen Daten zu diesem Thema spannender, als die vergangenen Daten, was nicht den Anforderungen dieses Projekts entsprach. Der Wechsel zu einer neuen API kostete uns wertvolle Zeit und führte dazu, dass wir die verbleibende Zeit intensiver nutzen mussten.

- **SBB-API:**
  - Während des Projektverlaufs mussten wir feststellen, dass die SBB die Daten von unseren genutzten API-Calls nicht täglich aktualisiert, obwohl sie das auf ihrer Webseite so suggeriert. Dieser Umstand führt dazu, dass unsere Darstellung teilweise veraltete Daten nutzt. In Absprache mit unseren Dozierenden haben wir den Entscheid getroffen, die Website so zu handhaben, als ob die Daten korrekt aktualisiert werden, da alle technischen Anforderungen des Projekts erfüllt sind. Die Daten werden von den API's abgerufen, anschließend transformiert und in unsere Datenbank übertragen. Sowohl das Auslesen der Daten als auch das Laden auf unsere Website funktioniert. Um Transparenz zu schaffen, haben wir im Footer mit einem Satz darauf hingewiesen, dass die Daten möglicherweise nicht immer aktuell oder vollständig sind: „Kein Gewähr auf Korrektheit oder Vollständigkeit der Daten.“

## Learnings

- **Projektfindung:**
  - Der notwendige Wechsel unserer API zu Beginn des Projekts zeigte uns, wie wichtig es ist, die Datenbasis einer API frühzeitig zu prüfen, um zu gewährleisten, dass die Daten eine ausreichend spannende Story liefern. Dies sollte erfolgen, bevor man mit der Gestaltung im Figma beginnt, da dadurch Zeit verloren geht.

- **Figma:**
  - Beim Erstellen des Designs in Figma lernten wir, wie wichtig es ist, mit **Komponenten** zu arbeiten, um Änderungen effizienter durchzuführen und das Design einheitlich zu halten.
  - Wir stellten fest, dass es hilfreich ist, von Anfang an die richtigen **Bildschirmformate** für Desktop- und Mobilgeräte zu wählen, um responsive Designs leichter umsetzen zu können.

- **Programmierung:**
  - **Responsive Design**: Wir haben gelernt, wie entscheidend es ist, von Beginn an das Layout für mobile Geräte mitzuplanen. Eine der grössten Herausforderungen bestand darin, die **Chart.js-Diagramme** auf kleinen Bildschirmen ansprechend darzustellen. Schliesslich konnten wir dies durch eine Kombination von **CSS-Anpassungen** und spezifischen **JavaScript-Lösungen** erreichen.
  - **JavaScript**: Wir vertieften unser Wissen über **interaktive Karten** und **Pop-ups**, insbesondere beim Entwickeln der anklickbaren IC-Linien auf der Mapbox-Karte und dem dynamischen Laden von Informationen über Verspätungen und Ausfälle.
  - **API-Datenmanagement**: Wir haben mit Hilfe von unseren Dozierenden gelernt, API-Daten zu transformieren, in einer Datenbank zu speichern und auf der Website darzustellen. Diese Fähigkeit war zentral für unser Projekt. Ein klarer Vorteil war der überschaubare Datensatz von 11 IC-Linien, der täglich in unsere Datenbank geladen wird. Die ungefilterte API (/api/explore/v2.1/catalog/datasets/ist-daten-sbb/records?limit=20) unseres gewählten SBB Datensatzes Soll/Ist Vergleich Abfahrts-/Ankunftszeiten SBB (Vortag) würde täglich über 50'000 Einträge enthalten. Deshalb haben wir uns zu Beginn des Projekts entschieden, drei verschiedene API-Calls vom Datensatz zu verwenden, und diese so zu filtern, dass nur die notwendigen Daten auf unsere Datenbank geladen werden. Das half uns dabei, den Überblick zu behalten und die Daten sinnvoll und leicht verständlich auf unserer Website zu visualisieren. 

## Benutzte Ressourcen

- **Daten-Website SBB:** [SBB Ist-Daten](https://data.sbb.ch/explore/dataset/ist-daten-sbb/information/)
- **API-Abfahrten-IC-Linien:** 
/api/explore/v2.1/catalog/datasets/ist-daten-sbb/records?limit=20&refine=verkehrsmittel_text%3A%22IC%22
- **API-Verspätungen-IC-Linien:** /api/explore/v2.1/catalog/datasets/ist-daten-sbb/records?limit=20&refine=verkehrsmittel_text%3A%22IC%22&refine=ankunftsverspatung%3A%22true%22
- **API-Aufälle-IC-Linien:** /api/explore/v2.1/catalog/datasets/ist-daten-sbb/records?limit=20&refine=verkehrsmittel_text%3A%22IC%22&refine=faellt_aus_tf%3A%22true%22
- **Mapbox:** Für die interaktive Kartenvisualisierung.
- **Chart.js:** Für die Darstellung der Balken- und Liniendiagramme zur Visualisierung von Ausfällen und Verspätungen.
- **Figma:** Zum Planen des responsiven Designs und der Layouts.
- **ChatGPT:** Als Unterstützung beim Programmieren während des gesamten Projektverlaufs.
- **Visual Studio Code**: Für die Programmierung und Entwicklung.
- **GitHub**: Zum Teilen des Codes.
