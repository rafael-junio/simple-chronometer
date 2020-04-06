
var isTiming = false;
var isPaused = false;
var initTime = 0;
var pauseTime = 0;

// Funcao para atualizar o display do cronometro no html.
function updateVisualization(hour, minute, second, milesecond) {
  document.getElementsByClassName('hora')[0].innerHTML = hour;
  document.getElementsByClassName('minuto')[0].innerHTML = minute;
  document.getElementsByClassName('segundo')[0].innerHTML = second;
  document.getElementsByClassName('milissegundo')[0].innerHTML = milesecond;
}

// Funcao executada quando o botão 'Inicar' é clicado
// - se o cronometro estiver parado, iniciar contagem.
// - se estiver ativo, reiniciar a contagem
function start() {

  if(!isTiming){
    if(isPaused){
      initTime = Date.now() - (pauseTime - initTime);
      isPaused = false;
      isTiming = true;
    }
  
    else{
      initTime = Date.now();
      isTiming = true;
      isPaused = false;
    }
    cronoInterval = setInterval(updatetime, 25);
  }
  else{
    reiniciar();
  }
}

// Funcao executada quando o botão 'Parar' é clicado
// - se o cronometro estiver ativo, parar na contagem atual
function stop() {
  if(!isPaused && isTiming){
    clearInterval(cronoInterval);
    pauseTime = Date.now()
    isPaused = true;
    isTiming = false;
  }
}

// Funcao executada quando o botão 'Reiniciar' é clicado
// - se o cronometro estiver ativo, reiniciar contagem
// - se estiver parado, zerar e permanecer zerado
function reiniciar() {
  if(isTiming){
    initTime = Date.now();
    isTiming = true;
    isPaused = false;
  }
  else{
    initTime = Date.now();
    isTiming = false;
    isPaused = false;
    updatetime();
  }
}

function updatetime() {
  var deltaTime = Date.now();
  var difTime = (deltaTime - initTime);
  convertTime(difTime);
  
}

function convertTime(time) {
  var milesecond = (Math.round(time % 1000)).toString().padStart(3, 0);
  var second = (Math.floor((time / (1000)) % 60)).toString().padStart(2, 0);
  var minute = (Math.floor(time / (1000 * 60) % 60)).toString().padStart(2, 0);
  var hour =  (Math.floor(time / (1000 * 60 * 60) % 24)).toString().padStart(2, 0);
  updateVisualization(hour, minute, second, milesecond);
}
