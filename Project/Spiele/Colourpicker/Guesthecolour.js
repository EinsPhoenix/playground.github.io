document.addEventListener("DOMContentLoaded", function () {
    const Buttonhex = document.getElementById("Resethexcodeanzeige");

    const kreisContainer = document.getElementById("kreiseContainer");
    const schwierigkeitsElement = document.getElementById("Schwirig");
    let y = 0;
    let randomNumber = 0;
    let Hexcodelösung;
    var falsch = 0;


    // Array zum Speichern der bereits generierten Hexcodes
    const generierteHexcodes = [];

    const hexDigit = ["a", "b", "c", "d", "e", "f", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    //hexcode
    function zufallsFarbe() {
        let hexCode = "#";
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * hexDigit.length);
            hexCode += hexDigit[randomIndex];
        }
        return hexCode;
    }


    function kreisHinzufuegen() {

        const kreis = document.createElement("div");
        kreis.className = "kreis";
        const farbe = zufallsFarbe();
        kreis.style.backgroundColor = farbe;

        kreis.addEventListener("click", function () {

            if (farbe == Hexcodelösung) {
                setup();
                console.log(farbe);
                alert(`${farbe} War richtig`);
            }
            else {

                falsch++;
                console.log('falsch', falsch)
                console.log(parseInt(schwierigkeitsElement.value) / 2)
                if (falsch >= (2)) {
                    alert(`${farbe} War die falsche Antwort reset`)
                    setup();
                    falsch = 0;
                }
                else { alert(`${farbe} War die falsche Antwort noch ein Versuch`); }
            }
        });

        kreisContainer.appendChild(kreis);
        generierteHexcodes.push(farbe);


        if (y == 0) {
            y++;
            const maxNumber = parseInt(schwierigkeitsElement.value); // Get the maximum value from the input field
            randomNumber = Math.floor(Math.random() * maxNumber) + 1;

            console.log('Number nach random', randomNumber);
            if (y == randomNumber) {
                Hexcodelösung = farbe;
                console.log(`Generierter Hexcode: ${farbe}`);
            };
        }

        else {
            y++;
            if (y == randomNumber) {
                Hexcodelösung = farbe;
                console.log(`Generierter Hexcode: ${farbe}`);
                console.log('Number nach Hex', randomNumber);
                console.log(y);
            }

        }


    }

    function setup() {

        y = 0;
        kreisContainer.innerHTML = "";
        //container leeren
        if (schwierigkeitsElement.value !== 'null' && parseInt(schwierigkeitsElement.value) >= 3) {
            const schwierigkeit = parseInt(schwierigkeitsElement.value);

            generierteHexcodes.length = 0;
            // Zurücksetzen des Arrays
            for (let i = 0; i < schwierigkeit; i++) {
                kreisHinzufuegen();

                console.log(y);
            }
        }
        else {
            schwierigkeitsElement.value = 3;
            console.log(schwierigkeitsElement.value);
            setup();
        }

        Buttonhex.innerHTML = Hexcodelösung;
    }

    Buttonhex.addEventListener("click", setup)

});