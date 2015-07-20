$(document).ready(function () {

    var currentGame;
    newGame();

    $('#guessButton').click(function () {
        var userGuess = $('#userGuess').val();
        if (userGuess != '') {
            if (userGuess >= 1 && userGuess <= 100) {
                currentGame.guessNum(userGuess);
                updateForm(currentGame);
                if (currentGame.gameOver) {
                    GameOver();
                }
            } else {
                alert('Enter a number between 1 and 100');
            }
        }
    })

    $('.new').click(function () {
        var r = confirm('Do you want to start a new game?')
        if (r) {
            newGame();
        }
    })

    $("form").on("submit", function (e) {
        e.preventDefault();
        $('#userGuess').val('');
    })

    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });

    function newGame() {
        currentGame = new Game();
        $('#userGuess').prop('disabled', false);
        $('#guessButton').prop('disabled', false);
        $('#guess-count-text').css("visibility", "visible");
        $('#userGuess').val('');
        updateForm(currentGame);
    }
    
    function GameOver() {
        $('#userGuess').prop('disabled', true);
        $('#guessButton').prop('disabled', true);
        $('#guess-count-text').css("visibility", "hidden");
    }
});

function Game() {
    this.gameOver = false;
    var myNum = 1 + Math.floor(Math.random() * 100);
    var userGuesses = [];
    this.feedback = "Make your Guess!";
    this.guessNum = function (userGuess) {
        var newNumDif = Math.abs(myNum - userGuess);
        if (newNumDif === 0) { //Game Over
            this.feedback = 'You guessed my number in ' + (userGuesses.length+1) + ' guesses!';
            this.gameOver = true;
        } else {
            if (userGuesses.length === 0) {
                if (newNumDif > 50) {
                    this.feedback = 'Ice Cold!';
                } else if (newNumDif > 30) {
                    this.feedback = 'Cold!';
                } else if (newNumDif > 20) {
                    this.feedback = 'Warm!';
                } else if (newNumDif > 10) {
                    this.feedback = 'Hot!';
                } else if (newNumDif > 0) {
                    this.feedback = 'SO HOT!';
                }
            } else {
                var lastNumDif = Math.abs(myNum - userGuesses[0]);
                if (newNumDif > lastNumDif) {
                    this.feedback = 'Colder!';
                } else if (newNumDif < lastNumDif) {
                    this.feedback = 'Warmer!';
                } else {
                    this.feedback = 'No Change!';
                }
            }
        }
        userGuesses.unshift(userGuess);
    }
    this.getMyNum = function () {
        return myNum;
    }
    this.getUserGuesses = function () {
        return userGuesses;
    }

    DEBUG(this.getMyNum());
}

function updateForm(game) {
    var guesses = game.getUserGuesses();
    $('span#count').text(guesses.length + 1);
    if (guesses.length === 0) {
        $('#guessList').empty();
    } else {
        $('#guessList').prepend('<li><span>' + guesses[0] + '<span></li>');
    }
    $('#guessList li').first().css('background-color', colorArray[game.feedback]);
    
//    if (game.feedback === 'Warmer!') {
//        $('#guessList li').first().addClass('warmer');
//    } else if (game.feedback === 'Colder!') {
//        $('#guessList li').first().addClass('colder');
//    }
    $('#feedback').text(game.feedback);        
}

var colorArray = new Array();
colorArray["Ice Cold!"] = "#53b6ff";
colorArray["Cold!"] = "#2c77de";
colorArray["Colder!"] = "#2c77de";
colorArray["Warm!"] = "#f8722b";
colorArray["Warmer!"] = "#f8722b";
colorArray["Hot!"] = "#ff4c2c";
colorArray["SO HOT!"] = "#fa0000";

function DEBUG(value) {
    console.log(value);
}