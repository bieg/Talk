let bot = new RiveScript({
    utf8: true,
    replyNotMatched : "Sorry - daar kan ik helaas niks mee.",
    replyNotFound: "I don't know how to reply to that."
});

bot.unicodePunctuation = new RegExp(/[.,!?;:]/g);

bot.errors.objectNotFound = "Something went terribly wrong.";

let d = new Date();

let time = d.getHours();

//
function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

let h = addZero(d.getHours());

//console.log('uur: '+ h);

let groet = '';

if (h => 00 ) {
    groet = "Hey, nachtbraker!";
}
if (h > 06) {
    groet = "Hey, rise and shine!";
}
if (h > 08) {
    groet = "Ola, goeiemorgen!";
}
if (h > 12) {
    groet = "Hi, goeiemiddag.";
}
if ((h > 18) && (h < 24)) {
    groet = "Hoi, goeienavond!";
}

const message_container = document.querySelector('.messages');
const form = document.querySelector('form');
const input_box = document.querySelector('input');

const brains = [
    './../rive/brain.rive',  
    './../rive/taalGebruik.rive',
    './../rive/conversation.rive',
    './../rive/google.rive',
    './../rive/goodBye.rive'
];

bot.loadFile(brains).then(botReady).catch(botNotReady);

function botReady() {
    bot.sortReplies();
    botReply(`<p class="intro">` + groet + ` <br>Jeremy van BackInBusiness hier.</p>`);
    botReply(`<p>Need a <span class='icoon'>🖖</span>? </p>
    <button onClick="botPrive('Vertel?')"><span class="icoon">🚄</span> Ja man - snel ook...</button><br>
    <button onClick="botHelp('Hoe kan ik je helpen?')"><span class='icoon'>👍</span> Graag!</button><br>
    <button onClick=botTips()><span class='icoon'>💡</span> Heb je tips voor me?</button>
    `);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    selfReply(input_box.value);
    input_box.value = '';
});

function botHaast(message) {
    botReply(
        '<p>Ok - dan een paar snelle vragen. Wat voor soort hulp zoek je?</p>' +
        '<button onClick=botPrive()><span class="icoon">👕</span> zelf</button>' +
        '<button onClick=botZakelijk()><span class="icoon">👔</span> business</button>'
    )
}

function botPrive(message) {
    botReply('<p>Waarom dan?</p>' +
        '<button onClick=botRelatie("slecht")><span class="icoon">😥</span> Mijn relatie is slecht.</button><br>' +
        '<button onClick=botReflectie("ongelukkig")><span class="icoon">😥</span> Ik voel me ongelukkig.</button><br>' +
        '<button onClick=botRichting("baan")><span class="icoon">😥</span> Heb ik wel de juiste baan?</button>'
    )
}

function botRelatie(message) {
    if (message === 'slecht') {
        selfReply('Mijn relatie is slecht.');
    }
}

function botReflectie(message) {
    if (message === 'ongelukkig') {
        selfReply('Ik voel me ongelukkig.');
    }
}

function botRichting(message) {
    if (message === 'baan') {
        selfReply('Heb ik wel de juiste baan?');
    }
}

function botRelatieVervolg(message) {
    botReply('<p>Als bot is bij mij alles gelukkig digitaal. ' +
        'Maar goed - dat is niet hetzelfde. <br>' +
        'Vertel me eens wat meer? Ik luister graag naar je verhaal.</p>')
}

function botTips(message) {
    botReply('<p>Aber sicher</p><p>Ik heb wel een paar bruikbare tips waar je direct wat aan hebt.' +
        '<img src="https://media.giphy.com/media/3oGNSjvT5LBekJEQWk/source.gif" width="75%"></p>')
    botReply(
        '<p>Uiteraard afhankelijk van wat je zoekt natuurlijk</p>' +
        '<button onClick=botPersoonlijk()>Persoonlijk</button><br>' +
        '<button onClick=botFinancieel()>Financieel</button><br>' +
        '<button>Personeel</button><br>' +
        '<button>Creatief</button>'
    )
}

function botPersoonlijk(message) {
    botReply('<p>Ik heb een paar mooie dingen voor je</p>' +
        '<button onClick=botRelaties()>Relaties</button><br>' +
        '<button onClick=botRust()>Rust</button><br>' +
        '<button onClick=botMotivatie()>Motivatie</button>')
}

function botFinancieel(message) {
    botReply('<p>Ik ben geen financieel expert maar dit is wel een goeie ingang.</p>' +
        '<p><a target="_blank" href="https://www.vofp.nl/zoek-onafhankelijk-financieel-adviseur/">Vereniging van Onafhankelijke Financiele Adviseurs</a></p>')
}

function botReply(message) {
    message_container.innerHTML += `<div class="bot">${message}</div>`;
    location.href = '#edge';
}

function selfReply(message) {
    message_container.innerHTML += `<div class="self">${message}</div>`;
    location.href = '#edge';

    bot.reply("local-user", message).then(function(reply) {
        botReply(reply);
        console.log("geklikt");
    });
}

function botNotReady(err) {
    console.log("WOW!", err);

    err = "Sorry - dat ging even mis. Probeer het nog eens?"
}