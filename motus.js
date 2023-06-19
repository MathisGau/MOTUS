let dailyWord = this.getDailyWord();
let attempts = 0;
console.log(dailyWord);

//constante pour les notifications
var opacity = 0;
var increment = 0.06;
var maNotif = document.getElementById("Notification");

init();

const answerSplit = [];
var answer = '';

const boutons = document.querySelectorAll('.button');
boutons.forEach(bouton => {
    bouton.addEventListener('click', () =>{
        if (answer.length < dailyWord.length) {
            answerSplit.push(bouton.value);
        }
        answer = answerSplit.join("");
        generateText();
    })
})


document.addEventListener('keydown', function(event){
    if (event.key == 'Backspace') {
        supprKey();
    }
})

document.addEventListener('keypress', function(event){
    let letter = event.key;
    if (letter == 'Enter') {
        jeu();
    }else{
        if (answer.length < dailyWord.length) {
            answerSplit.push(letter);
        }
        answer = answerSplit.join("");
        generateText();
    }
});

function supprKey(){
    answerSplit.pop();
    answer = answerSplit.join("");
    generateNombreLettre();
    generateText();
}


function generateNombreLettre(){
    let DailyWordList = dailyWord.split('');
    for (var i = 0; i < DailyWordList.length; i++) {
        document.getElementById('cell' + (i+attempts*10)).innerHTML = ".";
    }
    document.getElementById('cell' + attempts*10).innerHTML = DailyWordList[0];
}


function init(){
    for(let i=0;i<6;i++){
        for(let j=0;j<dailyWord.length;j++){
            cases = document.createElement("div");
            if (i<1) {
                cases.classList.add("cell");
                cases.id = "cell"+j;
                ligne = document.querySelector("#ligne"+i);
                ligne.append(cases)
            }else{
                cases.classList.add("cell");
                cases.id = "cell"+i+j;
                ligne = document.querySelector("#ligne"+i);
                ligne.append(cases)
            }    
        }
    }
    generateNombreLettre();
}


function deleteNotif(){
    var increment = -0.06;
    opacity += increment;
    maNotif.style.opacity = opacity;
    if (opacity > 0) {
        setTimeout(deleteNotif, 50);
    }
}

function Notification(){
    opacity += increment;
    maNotif.style.opacity = opacity;
    if (opacity < 1) {
        setTimeout(Notification, 50);
    }
}


function generateText(){
    for (var i = 0; i < answer.length; i++) {
        document.getElementById('cell' + (i+attempts*10)).innerHTML = answerSplit[i];
    }
}


function testLettres(){
    let DailyWordList = dailyWord.split('');
    //Split un tableau avec chaque lettre du mot
    var bienPlace = 0;
    var invalide = 0;
    var malPlace = 0;
    for (let i = 0; i < answer.length; i++) {
        if (answerSplit[i] === DailyWordList[i]) {
            document.getElementById('cell'+(i+attempts*10)).style.backgroundColor = "#e7002a";
            document.getElementById(answerSplit[i]).style.background = "#e7002a";
            bienPlace++
        }else if(DailyWordList.includes(answerSplit[i])){
            document.getElementById('cell'+(i+attempts*10)).style.backgroundColor = "#ffbd00";
            document.getElementById(answerSplit[i]).style.background = "#ffbd00";
            malPlace++
        }else{
            document.getElementById(answerSplit[i]).style.opacity = 0.35;
            invalide++
        }
    }
    console.log("invalide :", invalide);
    console.log("malPlacé :", malPlace);
    console.log("bienPlacé :", bienPlace);
}


function jeu(){
    //Verifier si le mot proposé se trouve dans le dictionnaire
    var existWord = this.checkIfWordExist(answer);
    if (existWord == false) {
        Notification();
        setTimeout(deleteNotif, 5000);
    }else{
        generateText();
        testLettres();
        //Verifier la réponse
        if (dailyWord == answer) {
            document.getElementById('enter').disabled = true;
            alert("Bravo, tu à trouver la bonne réponse");
            answerSplit.splice(0, answerSplit.length);
        }else{
            alert("Faux, ce n'est pas le bon mot");
            answerSplit.splice(0, answerSplit.length);
        }
        attempts++
        if (attempts != 6) {
            generateNombreLettre();
        }
    }
    if (attempts == 6) {
        alert('Tu as perdu, revient demain pur tenter ta chance avec un nouveau mot !');
    }
}