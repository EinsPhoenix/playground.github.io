// Funktion zur Durchsuchung des lokalen Speichers
function durchsucheLocalStorage() {
    const suchbegriff = document.getElementById("suchfeld").value.toLowerCase();
    const ergebnisDiv = document.getElementById("ergebnis");
    
    ergebnisDiv.innerHTML = ""; // Leeren Sie das Ergebnisfeld

    for (let i = 0; i < localStorage.length; i++) {
        const schluessel = localStorage.key(i);
        const wert = localStorage.getItem(schluessel).toLowerCase();

        // Überprüfen, ob der Suchbegriff im Schlüssel oder im Wert vorhanden ist
        if (schluessel.includes(suchbegriff) || wert.includes(suchbegriff)) {
            const eintrag = `<p><strong>Schlüssel:</strong> ${schluessel}, <strong>Wert:</strong> ${wert}</p>`;
            ergebnisDiv.innerHTML += eintrag;
        }
    }

    if (ergebnisDiv.innerHTML === "") {
        ergebnisDiv.innerHTML = "<p>Keine passenden Einträge gefunden.</p>";
    }
}

// Eventlistener hinzufügen, um die Suche bei Enter-Taste auszuführen
document.getElementById("suchfeld").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        durchsucheLocalStorage();
    }
});