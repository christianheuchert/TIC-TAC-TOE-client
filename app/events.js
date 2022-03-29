'use strict'

const store = require('./store.js')
const getFormFields = require('../lib/get-form-fields.js')
const authUi = require('./ui.js')
const authApi = require('./api.js')

const onSignUp = function (event){
    event.preventDefault()
    const data = getFormFields(event.target)
    console.log(data)
    // call API signup
    authApi.signUp(data)
    .then(() => authUi.onSignUpSuccess())
    .catch(() => authUi.onSignUpFailure())
}

const onSignIn = function(event){
    event.preventDefault()
    const data = getFormFields(event.target)
    // call API signIn
    authApi.signIn(data)
    .then((response) => authUi.onSignInSuccess(response))
    
    // createGame API
    .then(() => authApi.createGame())
    //create a game object in store.js
    .then((response) => {store.game = response.game})
    .catch(() => authUi.onSignInFailure(data))

    //after sign in make GAME PLAYABLE
    $('.box').bind('click', boxClicked)
    // hide command to sign in
    authUi.hideRule()

    //preset colors for players
    store.player1Color = '#1ABC9C'
    store.player2Color = '#3498DB'
    $('#player1').css('background', ''+ store.player1Color + '')
    $('#player2').css('background', ''+ store.player2Color + '')
}

const onSignOut=function(){
    console.log('onSignOut')
    authApi.signOut()
    .then(() => authUi.onSignOutSuccess())
    .catch(() => authUi.onSignOutFailure())
    $('.box').unbind('click', boxClicked)
}

// see which player is going global variable
let whoClicked = 'x'

const boxClicked=function(event){
    //set store to player click index
    let index = event.target.getAttribute('data-cell-index')

    //update API with playerMove
    authApi.playerMove(index, whoClicked, false)

    // get current game state, store it, then check if won
    .then(() => authApi.getGameStatus())
    .then((response) => {store.gameState = response.game.cells})
    .then(()=>isOver())

    //disable 'click' fxn on selected square
    $(this).unbind('click')
    if (whoClicked === 'o'){
        $(this).css('background', ''+ store.player2Color + '')
        whoClicked= 'x'
    }else{
        $(this).css('background', ''+store.player1Color+'')
        whoClicked='o'
    }
}

const restart=function(event){
    whoClicked='x'
    $('.box').css('background', 'lightcoral')
    $('.box').bind('click', boxClicked)
    //reset color of player1/2
    $('#player1').css('background', ''+ store.player1Color + '')
    $('#player2').css('background', ''+ store.player2Color + '')
    authUi.onRestart()

    authApi.createGame()
    //create a new game object in store.js
    .then((response) => {store.game = response.game})
}

const isOver=function(){
    console.log("isOver")
    console.log(store.gameState)

    //Checks x for win conditions then o
    // top row x
    if(store.gameState[0] === 'x' && store.gameState[1] === 'x' && store.gameState[2] === 'x' ){
        authUi.player1Win()
        $('.box').unbind('click', boxClicked)
    }//middle row x
    else if(store.gameState[3] === 'x' && store.gameState[4] === 'x' && store.gameState[5] ==='x') {
        authUi.player1Win()
        $('.box').unbind('click', boxClicked)
    }//bottom row 3 x
    else if(store.gameState[6] === 'x' && store.gameState[7] === 'x' && store.gameState[8] ==='x') {
        authUi.player1Win()
        $('.box').unbind('click', boxClicked)
    } // left column x
    else if(store.gameState[0] === 'x' && store.gameState[3] === 'x' && store.gameState[6] ==='x') {
        authUi.player1Win()
        $('.box').unbind('click', boxClicked)
    } // middle column x
    else if(store.gameState[1] === 'x' && store.gameState[4] === 'x' && store.gameState[7] ==='x') {
        authUi.player1Win()
        $('.box').unbind('click', boxClicked)
    }// right column x
    else if(store.gameState[2] === 'x' && store.gameState[5] === 'x' && store.gameState[8] ==='x') {
        authUi.player1Win()
        $('.box').unbind('click', boxClicked)
    }// top left diagnal x
    else if(store.gameState[0] === 'x' && store.gameState[4] === 'x' && store.gameState[8] ==='x') {
        authUi.player1Win()
        $('.box').unbind('click', boxClicked)
    }// top right diagnal x
    else if(store.gameState[2] === 'x' && store.gameState[4] === 'x' && store.gameState[6] ==='x') {
        authUi.player1Win()
        $('.box').unbind('click', boxClicked)
    } 

    // CHANGE to top row o
    else if(store.gameState[0] === 'o' && store.gameState[1] === 'o' && store.gameState[2] ==='o'){
        authUi.player2Win()
        $('.box').unbind('click', boxClicked)
    }//middle row o
    else if(store.gameState[3] === 'o' && store.gameState[4] === 'o' && store.gameState[5] ==='o') {
        authUi.player2Win()
        $('.box').unbind('click', boxClicked)
    }//bottom row 3 o
    else if(store.gameState[6] === 'o' && store.gameState[7] === 'o' && store.gameState[8] ==='o') {
        authUi.player2Win()
        $('.box').unbind('click', boxClicked)
    } // left column o
    else if(store.gameState[0] === 'o' && store.gameState[3] === 'o' && store.gameState[6] ==='o') {
        authUi.player2Win()
        $('.box').unbind('click', boxClicked)
    } // middle column o
    else if(store.gameState[1] === 'o' && store.gameState[4] === 'o' && store.gameState[7] ==='o') {
        authUi.player2Win()
        $('.box').unbind('click', boxClicked)
    }// right column o
    else if(store.gameState[2] === 'o' && store.gameState[5] === 'o' && store.gameState[8] ==='o') {
        authUi.player2Win()
        $('.box').unbind('click', boxClicked)
    }// top left diagnal o
    else if(store.gameState[0] === 'o' && store.gameState[4] === 'o' && store.gameState[8] ==='o') {
        authUi.player2Win()
        $('.box').unbind('click', boxClicked)
    }// top right diagnal o
    else if(store.gameState[2] === 'o' && store.gameState[4] === 'o' && store.gameState[6] ==='o') {
        authUi.player2Win()
        $('.box').unbind('click', boxClicked)
    }

    //DRAW
    else if (store.gameState[0] && store.gameState[1] && store.gameState[2] && store.gameState[3] && store.gameState[4] && store.gameState[5] && store.gameState[6] && store.gameState[7] && store.gameState[8]) {
        authUi.playerTie()
    }
}

const colorSelect=function(event){
    event.preventDefault()
    const player1Color = document.getElementById("player1Color").value;
    const player2Color = document.getElementById("player2Color").value;
    store.player1Color = player1Color
    store.player2Color = player2Color
    $('#player1').css('background', ''+ store.player1Color + '')
    $('#player2').css('background', ''+ store.player2Color + '')
    console.log(store.player1Color)
    console.log(store.player2Color)
}

module.exports = {
    onSignUp,
    onSignIn,
    onSignOut,
    boxClicked,
    restart,
    colorSelect
}