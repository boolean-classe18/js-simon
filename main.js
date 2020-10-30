// Visualizzare in pagina 5 numeri casuali.
// Da lì parte un timer di 30 secondi.
// Dopo 30 secondi, vengono rimossi i numeri dalla pagina e l'utente deve inserire (tramite prompt) i numeri che ha visto precedentemente, uno alla volta.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
//
// BONUS: visualizzare in pagina anche un timer con il countdown dei 30 secondi

$(document).ready(function() {

    var tempo = 30;

    // genero 5 numeri casuali tutti diversi
    var numeri = [];
    while(numeri.length < 5) {
        // genero un numero casuale
        var numero = getRndInteger(1, 100);
        // verifico se il numero è già stato inserito nell'array
        if(!numeri.includes(numero)) {
            numeri.push(numero);
        }
    }
    console.log('Numeri da indovinare:');
    console.log(numeri);

    // unisco tutti gli elementi dell'array in una stringa
    var stringa_numeri = numeri.join(' - ');

    // inserisco in pagina i numeri estratti a caso
    $('#numeri-random').text(stringa_numeri);

    // faccio partire il countdown
    var clock = setInterval(function() {
        // decremento il tempo
        tempo--;

        // inserisco in pagina i secondi rimanenti
        $('#secondi-rimanenti').text(tempo);

        // se sono arrivato a 0
        if(tempo <= 0) {
            // interrompo l'interval
            clearInterval(clock);
        }
    }, 1000); // invoco la funzione di callback ogni secondo

    // faccio partire un timer di 30 secondi
    setTimeout(function() {
        // rimuovo i numeri dallo schermo
        // $('#numeri-random').addClass('hidden'); // nascondo con il css
        $('#numeri-random').empty(); // tolgo il contenuto del div
        // $('#numeri-random').remove(); // tolgo il div dalla pagina

    }, tempo * 1000); // 30000 ms

    // faccio partire un timer di 30,3 secondi
    setTimeout(function() {

        // chiedo all'utente i 5 numeri
        var numeri_utente = [];
        for (var i = 0; i < 5; i++) {
            var numero_utente = parseInt(prompt('Inserisci un numero di quelli che ti ricordi'));
            numeri_utente.push(numero_utente);
        }
        console.log("numeri inseriti dall'utente:");
        console.log(numeri_utente);

        // verifico quanti numeri ha indovinato l'utente
        var numeri_indovinati = [];
        // scorro l'array dei numeri da indovinare
        for (var i = 0; i < numeri.length; i++) {
            var numero_corrente = numeri[i];
            // verifico un elemento alla volta, se è presente tra le scelte dell'utente
            if(numeri_utente.includes(numero_corrente)) {
                // se l'utente ha inserito il numero in questione, me lo segno
                numeri_indovinati.push(numero_corrente);
            }
            // altrimenti, l'utente non l'ha indovinato e procedo con il successivo
        }
        console.log('numeri indovinati:');
        console.log(numeri_indovinati);

        // inserisco in pagina i numeri estratti a caso
        $('#numeri-random').text(stringa_numeri);

        // inserisco in pagina i numeri inseriti dall'utente
        // unisco tutti gli elementi dell'array in una stringa
        var stringa_numeri_utente = numeri_utente.join(' - ');

        $('#numeri-inseriti').text(stringa_numeri_utente);
        $('#numeri-inseriti').removeClass('hidden');
        $('#titolo-numeri-inseriti').removeClass('hidden');

        // inserisco in pagina i numeri indovinati
        // unisco tutti gli elementi dell'array in una stringa
        var stringa_numeri_indovinati = numeri_indovinati.join(' - ');

        $('#numeri-indovinati').text(stringa_numeri_indovinati);
        $('#numeri-indovinati').removeClass('hidden');
        $('#titolo-numeri-indovinati').removeClass('hidden');

        $('.container').append('<h1>Hai indovinato ' + numeri_indovinati.length + ' numeri!</h1>');

    }, tempo * 1100); // 30300 ms

});


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
