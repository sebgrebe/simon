$(document).ready(function() {
var rounds = 0; //rounds played 
var n = 1; //Times fields should flash per round
var button_clicks = 0; //buttons clicked per round
var memory = []; //array that stores the fields that have been flashed in each round
var played = []; //array that stores the fields the player has pressed in a round so far
var field; //field that has been clicked by player
var field_no; //Number of field that has been clicked by player   
var strict = false; //tracks whether strict mode is on
var rounds_id = document.getElementById("rounds");
rounds_id.innerHTML = rounds; //updates rounds display

//creates random number between 1 and 4
function random() {
	var random = Math.random();
	return Math.floor(random*4) + 1;
}

//flashes buttons in a round
function flash() {
  $('button').prop('disabled', true); //disables button during flashes
  played = []; //clears the memory of what was played from the previous round
  rounds_id.innerHTML = rounds; //updates rounds display
  //controls the order and length of the flashes
  function delay_flash(elem) {
    var button_numb = random(); //number of the button that should be flashed
    memory.push(button_numb);
    var field_id = document.getElementById("button"+memory[elem]);
    setTimeout(function() {
      $(field_id).attr('class', 'button button'+memory[elem]+'_flash');
      var audio = new Audio('simonSound'+memory[elem]+'.mp3');
      audio.play(); 
    },800*elem);
    setTimeout(function() {
      $(field_id).attr('class', 'button button'+memory[elem]);
    },800*elem+400);
  }
  for (k = 0; k<n; k++) {
    delay_flash(k);
  }
  //enables buttons again after flashes
  setTimeout(function() {
    $('button').prop('disabled', false)  
  },800*n-400);
}

//controls what happens when player presses correct and false button
function player(button) {
  played.push(button);
  if (played[button_clicks] == memory[button_clicks]) {
    var button_sound = new Audio('simonSound'+field_no+'.mp3')
    button_sound.play();
    button_clicks++;
    if (button_clicks === n) {
      rounds++;
      n++;
      button_clicks = 0;
      setTimeout(function() {
        flash();
      },800)
    }
  }
  else {
    var fail = new Audio('fail-buzzer-04.mp3');
    fail.volume = 0.35;
    fail.play(); 
    rounds_id.innerHTML = "!!";
    button_clicks = 0;
    if (strict === true) {
      memory = [];
      rounds = 0;
      n = 1;
    }
    setTimeout(function() {
      flash();
    },1600)
  }
}

//start button
$('#start').click(function() {
  flash();
})

//strict mode button
$('#strict').click(function() {
  if (strict === false) {
    strict = true;
    $(this).attr('class','strict off');
  }
  else {
    strict = false;
    $(this).attr('class','strict');
  }
})

//restart button
$('#restart').click(function() {
  document.location.href = document.location.href
})

//coloured buttons
$('button').click(function() {
  field_no = $(this).attr('value');
  var field_id = document.getElementById("button"+field_no);
  $(field_id).attr('class', 'button button'+field_no+'_flash');
  setTimeout(function() {
    $(field_id).attr('class', 'button button'+field_no);
  },400);
  player(field_no);
})

})