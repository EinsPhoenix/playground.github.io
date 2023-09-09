"use strict";

 

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("Submitknopf").addEventListener("click", function () {

        var eingetragenesDatum = document.getElementById("auswählbardatum").value;

            // Überprüfen, ob das Datum bereits im lokalen Speicher vorhanden ist
            if (localStorage.getItem(eingetragenesDatum)) {
                alert("Dieses Datum ist bereits im lokalen Speicher gespeichert.");
                document.getElementById("auswählbardatum").value = ""; // Das Eingabefeld leeren
                return;
            }

        berechneDifferenz();

        berechneDifferenzMittag();

 

    });

    const arbeitszeit = document.getElementById("numberfieldst");

    let ueberstunden;

    let vertretung = false;

    const Datumheute = new Date();

    var element = document.getElementById("checkboxvertretung");

    let Datumausgewaelt;

 

    let Stundenopause;

    let Stundenmpause;

    let stundenberechnet;

   

    //Rechenfunktion wie viele überstunden und arbeitsstunden erfassung ob Vertretung oder nicht

    function Rechnen() {

        Datumausgewaelt = localStorage.getItem('Monat');

        let ueberstundenv = stundenberechnet;
        ueberstunden = stundenberechnet;

        let arbeitszeitv = parseFloat(arbeitszeit.value);

        if (!isNaN(ueberstundenv) && !isNaN(arbeitszeitv) && !vertretung) {

            if (ueberstundenv >= arbeitszeitv) {

                ueberstundenv = ueberstunden - arbeitszeitv;

                arbeitszeitv = arbeitszeitv;

                console.log('arbeitszeitv: ', arbeitszeitv);

                console.log('Überstunden:', ueberstundenv);

                Speichern(Datumausgewaelt, arbeitszeitv, ueberstundenv, false);

                updateLocalStorage('Ueberstundengespeichert', ueberstundenv);

                updateLocalStorage('Arbeitszeitgespeichert', arbeitszeitv);

            }

            else if (arbeitszeitv >= ueberstundenv) {

                ueberstundenv = ueberstunden - arbeitszeitv;

                arbeitszeitv = arbeitszeitv + ueberstundenv;

                console.log('arbeitszeitv: ', arbeitszeitv);

                console.log('Überstunden:', ueberstundenv);

                Speichern(Datumausgewaelt, arbeitszeitv, ueberstundenv, false);

                updateLocalStorage('Ueberstundengespeichert', ueberstundenv);

                updateLocalStorage('Arbeitszeitgespeichert', arbeitszeitv);

            }

            else {

                console.log('arbeitszeitv fehler:', arbeitszeitv);

                console.log('Überstunden fehler:', ueberstundenv);

            }

        }

        if (!isNaN(ueberstundenv) && !isNaN(arbeitszeitv) && vertretung) {

            if (vertretung) {

                ueberstundenv = ueberstundenv;

                arbeitszeitv = 0;

                console.log('arbeitszeitv:', arbeitszeitv);

                console.log('Überstunden:', ueberstundenv);

                Speichern(Datumausgewaelt, arbeitszeitv, ueberstundenv, true);

                updateLocalStorage('Ueberstundengespeichert', ueberstundenv);

   

            }

        }

    }

    //Speichern von den Variabeln

    function Speichern(key, Stundensoll, Stundenhat, vertretungjanein) {

        let daten = {

            'Arbeitszeit': Stundensoll,

            'Überstunden': Stundenhat,

            'Vertretung': vertretungjanein

        };

        localStorage.setItem(key, JSON.stringify(daten));

        console.log(`Es geht ${daten}`);

       

       

    }

    const popup = document.getElementById('popupbest');

    const yesButton = document.getElementById('Speichern');

    const noButton = document.getElementById('verwerfen');

    const Submitknopf = document.getElementById('Submitknopf');

    if (Submitknopf) {

        Submitknopf.addEventListener("click", showPopup1);

    }

    // Funktion zum Anzeigen des Popups

    function showPopup1() {

        var isChecked = element.checked;

        if (isChecked) {

            vertretung = true;

        }

        else {

            vertretung = false;

        }

        popup.style.display = 'block';

        const anzeigeElement = document.getElementById("Anzeigedatenspeichern");
        Datumausgewaelt = localStorage.getItem('Monat');

        anzeigeElement.textContent = `Du hast am ${Datumausgewaelt}: ${ueberstunden} gearbeitet, Du solltest: ${arbeitszeit.value} arbeiten, Vertretung: ${vertretung}`;

    }

    // Event Listener hinzufügen, um das Popup zu schließen, wenn Ja oder Nein geklickt wird

    yesButton.addEventListener('click', function () {

        Rechnen();
        document.getElementById("auswählbardatum").value = "";

        popup.style.display = 'none';

    });

    noButton.addEventListener('click', function () {

        popup.style.display = 'none';

    });

    

 

   

 

    // berechneDifferenz.js

 

    function berechneDifferenz() {

        const anfangszeitInput = document.getElementById("anfangszeit");

        const endzeitInput = document.getElementById("endzeit");

   

        if (anfangszeitInput && endzeitInput) {

            const anfangszeitValue = anfangszeitInput.value;

            const endzeitValue = endzeitInput.value;

   

            const anfangszeit = new Date(`1970-01-01T${anfangszeitValue}`);

            const endzeit = new Date(`1970-01-01T${endzeitValue}`);

   

            const differenzInSekunden = (endzeit - anfangszeit) / 1000;

            const differenzInMinuten = differenzInSekunden / 60;

   

            // Umrechnung der Differenz in Dezimalstunden

           const dezimalStunden = differenzInMinuten / 60;

   

            console.log(`Differenz: ${dezimalStunden.toFixed(2)} Dezimalstunden`);

 

            Stundenopause = dezimalStunden.toFixed(2);

        } else {

            console.error("Fehler: Ein oder mehrere Eingabefelder nicht gefunden.");

        }

    }

 

function berechneDifferenzMittag() {

 

   

       

    const anfangszeitMittagInput = document.getElementById("startzeitmittag");

    const endzeitMittagInput = document.getElementById("endzeitmittag");

 

    if (anfangszeitMittagInput && endzeitMittagInput) {

        const anfangszeitMittagValue = anfangszeitMittagInput.value;

        const endzeitMittagValue = endzeitMittagInput.value;

 

        const anfangszeitMittag = new Date(`1970-01-01T${anfangszeitMittagValue}`);

        const endzeitMittag = new Date(`1970-01-01T${endzeitMittagValue}`);

 

        const differenzInSekunden = (endzeitMittag - anfangszeitMittag) / 1000;

       

        // Umrechnung der Differenz in Dezimalstunden

       const dezimalStunden = differenzInSekunden / 3600;

       if(document.getElementById("checkboxpause").checked && dezimalStunden <= 0.49 && parseFloat(arbeitszeit.value) >= 6){
        Stundenmpause = 0.5;

        stundenberechnet = Stundenopause - Stundenmpause;

        ueberstunden = stundenberechnet;

    }

       else if (document.getElementById("checkboxpause").checked) {

        console.log(`Differenz: ${dezimalStunden.toFixed(2)} Dezimalstunden`);

        Stundenmpause = dezimalStunden.toFixed(2);

        stundenberechnet = Stundenopause - Stundenmpause;

        ueberstunden = stundenberechnet;

        }

        

       

        else{

            Stundenmpause = 0;

            stundenberechnet = Stundenopause - Stundenmpause;

            ueberstunden = stundenberechnet;

        }

 

       

    } else {

        console.error("Fehler: Ein oder mehrere Eingabefelder nicht gefunden.");

    }

}

 

//Zeitspeicherung




   

 

    // Füge einen Event-Listener zum Klicken des Buttons hinzu

   

 

    "use strict";

//aktualisierung von den Weten

function updateLocalStorage(key, value) {

    const storedValue = localStorage.getItem(key);

    let newValue = value;

    if (storedValue) {

        const parsedValue = parseFloat(storedValue);

        if (typeof parsedValue === 'number' && value >= 0) {

            newValue = parsedValue + value;

        }

        else {

            console.log(`Etwas ist schiefgelaufen bei der Änderung von ${key}`);

            return;

        }

    }

    localStorage.setItem(key, JSON.stringify(newValue));

    console.log(`Es geht ${newValue}`);

    
}









    const popup2 = document.getElementById('popup');

    const yesButton2 = document.getElementById('yesButton');

    const noButton2 = document.getElementById('noButton');

    const clearbutton = document.getElementById("clearbutton");

 

    if (clearbutton) {

        clearbutton.addEventListener("click", showPopup);

    }

 

    // Funktion zum Anzeigen des Popups

    function showPopup() {

        popup2.style.display = 'block';

    }

 

    // Event Listener hinzufügen, um das Popup zu schließen, wenn Ja oder Nein geklickt wird

    yesButton2.addEventListener('click', function() {

        popup2.style.display = 'none';

        localStorage.clear();

        location.reload();

    });

 

    noButton2.addEventListener('click', function() {

        popup2.style.display = 'none';

    });

});