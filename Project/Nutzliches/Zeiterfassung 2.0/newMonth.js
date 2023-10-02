function speichereAktuellenMonat() {
    const aktuellesDatum = new Date();
    const aktuellerMonat = aktuellesDatum.getMonth();
    const aktuellesJahr = aktuellesDatum.getFullYear();

   const gespeicherterMonatSchlüssel = `${aktuellerMonat}_${aktuellesJahr}`;

    const Monatn = JSON.parse(localStorage.getItem('Monatn')) || { Monatn: gespeicherterMonatSchlüssel };
        if(Monatn != gespeicherterMonatSchlüssel){
            const ueberstundenmonat = localStorage.getItem('Ueberstundengespeichert');
           const arbeitszeitmonat = localStorage.getItem('Arbeitszeitgespeichert');
           // Führen Sie hier Ihre Funktion aus, die bei Monatswechsel ausgeführt werden soll
           if (localStorage.getItem('ueberstundenspeicherletztermonat') === null) {
            // Wenn nicht vorhanden, setzen Sie ihn auf den Wert 0
            localStorage.setItem('ueberstundenspeicherletztermonat', 0);
        }
        
            
            const ueberstundenmonatletzter = localStorage.getItem('ueberstundenspeicherletztermonat');


            const ueberstundenletzten = ueberstundenmonat - ueberstundenmonatletzter;
           
           
            localStorage.setItem('ueberstundenspeicherletztermonat', ueberstundenletzten);

            document.getElementById("Ueberstundendazu").innerHTML = "Überstunden letzten monat dazugekommen: " + ueberstundenletzten;



           
           
           if(Monatn !== 'null' && ueberstundenletzten !== 'null' && arbeitszeitmonat !== 'null'){
            const monatsspeicherue = 'Überstunden im ' + Monatn;
            const monatsspeicheraz = 'Arbeitszeit im ' + Monatn; 

           const daten = {
            [monatsspeicherue] :ueberstundenletzten,
            [monatsspeicheraz] :arbeitszeitmonat
           }

           localStorage.setItem(gespeicherterMonatSchlüssel, JSON.stringify(daten));

           
        
        
        
           
           localStorage.removeItem('arbeitszeitspeicher');

           }

           
           
           
            console.log("Der Monat hat sich geändert.");
            localStorage.setItem('Monatn', JSON.stringify(gespeicherterMonatSchlüssel));


        }

        else {

            console.log("Seite geladen");
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
    var korrektesPasswort = "Dasmeinz"; // Hier das richtige Passwort eintragen

    function zeigeKnopf() {
        var passwortFeld = document.getElementById('passwort');
        var zeigeKnopfBtn = document.getElementById('clearbutton');
    
        // Überprüfen Sie, ob das eingegebene Passwort korrekt ist
        if (passwortFeld.value === korrektesPasswort) {
            zeigeKnopfBtn.style.display = "inline"; // Zeigen Sie den Knopf an
        } else {
            alert('Falsches Passwort. Bitte versuchen Sie es erneut.');
        }
    }
    
    // Event Listener hinzufügen, um die Funktion zeigeKnopf aufzurufen, wenn das Passwortfeld geändert wird
    document.getElementById('Eingabeps').addEventListener("click", zeigeKnopf);
});