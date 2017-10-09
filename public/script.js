var name = 'desconocido que aun no me ha dicho su nombre';
var dialogHistory = [];
var inputHistory = [];
var dialogLines = [
  {
    pattern: '(mi nombre)|(me llamo)', 
    line: 'Encantado de conocerte %name%! Cuentame mas de ti.',
    action: function(text) {
      name = text.replace(/(.*mi nombre es)|(.*me llamo)|(.*me llaman)/i, ' ');
    }
  },
  {
    pattern: 'canta|cantame|cancion|musica|melodia|bailar', 
    line: 'Pegate al ritmo! Si buscas lo mas esencial sin nada mas ambicionar, mama naturaleza te lo da! Busca lo mas vital nomas, lo que es necesidad nomas, y olvidate de la preocupacion ' + String.fromCharCode('9835')
  },
  {
    pattern: 'trabajo|casa|hijos|matrimonio|hipoteca|estudio|universidad|startup|(start up)|empresa|estudiar|consejo', 
    line: 'Mira, %name%, te dare un consejo amiguito. Si como esa abeja fanas, nah nah, trabajas demasiado. Y el tiempo no pierdas nunca en buscar cosas que jamas encontraras. Pues ya veras que no te hace falta y aun sin el tu sigues viviendo. Pues esta es la verdad. Lo mas vital para existir te llegara.'
  },
  {
    pattern: 'pene|banana|platano|mano|picha|polla|(me toco)|pito|pipi|mear', 
    line: 'Antes de usar la mano, usa siempre un palo. Usaras la mano cuando tomes la fruta del banano'
  },
  {
    pattern: 'pica|rasca|pulga|piojo|escuece', 
    line: 'Uy %name%! Tenemo que buscar un arbol. Ahh rico! ahhhhh ooooooh, esto es delicioso. Ahi ahi ahi! oooooh que sabrosura, me gusta. ahhhh uuuuuhhh un poquito mas. Vamos a rascarnos en ese arbol. Oooooh siiii, aqui es donde! uuuuuuuuh ah! compadre esto si que es vida.'
  }, 
  {
    pattern: '(quien eres)|(que eres)|(como te llamas)|(tu nombre)',
    line: 'Soy oso dich Oso, oso feliz. Mi nombre es Balu!'
  },
  {
    pattern: 'hambre|hormigas|comida|comer|cena|desayuno|merienda|comes', 
    line: 'Las hormigas encuentro bien, y saboreo por lo menos 100, del primer lenguetazo. Jajajaja hasta sin sal me gustan, pican mas sabroso que la pimienta.'
  },
  {
    pattern: '(loui)|mono|orangutan',
    line: ' ¡Lo voy a hacer pedazos! ¡Lo patearé! Lo... '
  },
  {
    pattern: '(entendido).*?|(entiendes).*?',
    line: 'Y en que forma compadre, aqui voy!'
  },
  {
    pattern: '(tengo).*años',
    line: 'Suficiente edad para mi gusto.'
  },
  {
    pattern: 'gracias|(agradezo)|agradecido', 
    line: 'De nada %name%!'
  },
  {
    pattern: '.', 
    line: 'Aham! Cuentame alguna otra cosa %name%'
  }
]

// Inicializa el input donde el jugador escribe
loadDialogInput();

// Muestra el primer dialogo
showDialog('Hola! Bievenido a la jungla, soy Balu, sere tu guia por aqui. Preguntame o cuentame lo que quieras. Soy todo oidos.');


function showDialog(text) {
  var target = document.getElementById('dialog-text');
  if (!dialogHistory) { dialogHistory = [];}
  var parsedText = text.replace(/%name%/, name);
  dialogHistory.push(parsedText);
  printTextWithAnimation(target, parsedText, 20);
}

function loadDialogInput() {
  var target = document.getElementById('pc-input'); 
  target.addEventListener('keypress', function(event) {
    if (isEnterKeyPressed(event)) { 
      inputHistory.push(target.value);
      runMatchingDialogLine(target.value);
      target.value = '';
    }
  })
}

function runMatchingDialogLine(text) {
  for(var i = 0; i < dialogLines.length; i++) {
    var match = dialogLines[i];
    var pattern = new RegExp(match.pattern, 'i');
    if (pattern.test(text)) {
      if (match.action) { match.action(text);}
      showDialog(match.line);
      break;
    }
  }
}

function isEnterKeyPressed(event) {
  if (event.code === 'Enter' || 
    event.charCode === 13 || 
    event.key === 'Enter' || 
    event.char === 13) {
      return true;
    } 
    return false;
}

function printTextWithAnimation(targetElem, text, pace) {
  targetElem.innerHTML = '';
  var characters = text.split('');
  var i = 0;
  var interval = setInterval(function() {
    if (i >= characters.length) {
      clearInterval(interval);
    } else {
      targetElem.innerHTML += characters[i];
      i++;
    }
  }, pace);
}