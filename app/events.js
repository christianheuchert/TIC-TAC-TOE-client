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
    //this is how to access current game ID
    // console.log(store.game._id)
    .catch(() => authUi.onSignInFailure(data))

    //after sign in make GAME PLAYABLE
    $('.box').bind('click', boxClicked)

}

const onSignOut=function(){
    console.log('onSignOut')
    authApi.signOut()
    .then(() => authUi.onSignOutSuccess())
    .catch(() => authUi.onSignOutFailure())
}
// see which player is going
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

    //print current gameboard
    // .then(() => authApi.getGameStatus())
    //.then((response) => { console.log(response.games[response.games.length-1])})

    //disable 'click' fxn on selected square
    $(this).unbind('click')
    if (whoClicked === 'o'){
        $(this).css('background', 'lightblue')
        whoClicked= 'x'
    }else{
        $(this).css('background', 'lightgreen')
        whoClicked='o'
    }
}

const restart=function(event){
    whoClicked='x'
    $('.box').css('background', 'lightcoral')
    $('.box').bind('click', boxClicked)

    authApi.createGame()
    //create a new game object in store.js
    .then((response) => {store.game = response.game})
}

const isOver=function(){
    console.log("isOver")
    console.log(store.gameState)

    // top row x
    if(store.gameState[0] === 'x' && store.gameState[1] === 'x' && store.gameState[2] ==='x'){
        console.log("x wins")
    }//middle row x
    else if(store.gameState[3] === 'x' && store.gameState[4] === 'x' && store.gameState[5] ==='x') {
        console.log("x wins")
    }//bottom row 3 x
    else if(store.gameState[6] === 'x' && store.gameState[7] === 'x' && store.gameState[8] ==='x') {
        console.log("x wins")
    } // left column x
    else if(store.gameState[0] === 'x' && store.gameState[3] === 'x' && store.gameState[6] ==='x') {
        console.log("x wins")
    } // middle column x
    else if(store.gameState[1] === 'x' && store.gameState[4] === 'x' && store.gameState[7] ==='x') {
        console.log("x wins")
    }// right column x
    else if(store.gameState[2] === 'x' && store.gameState[5] === 'x' && store.gameState[8] ==='x') {
        console.log("x wins")
    }// top left diagnal x
    else if(store.gameState[0] === 'x' && store.gameState[4] === 'x' && store.gameState[8] ==='x') {
        console.log("x wins")
    }// top right diagnal x
    else if(store.gameState[2] === 'x' && store.gameState[4] === 'x' && store.gameState[6] ==='x') {
        console.log("x wins")
    } 

    // CHANGE to top row o
    else if(store.gameState[0] === 'o' && store.gameState[1] === 'o' && store.gameState[2] ==='o'){
        console.log("o wins")
    }//middle row o
    else if(store.gameState[3] === 'o' && store.gameState[4] === 'o' && store.gameState[5] ==='o') {
        console.log("o wins")
    }//bottom row 3 o
    else if(store.gameState[6] === 'o' && store.gameState[7] === 'o' && store.gameState[8] ==='o') {
        console.log("o wins")
    } // left column o
    else if(store.gameState[0] === 'o' && store.gameState[3] === 'o' && store.gameState[6] ==='o') {
        console.log("o wins")
    } // middle column o
    else if(store.gameState[1] === 'o' && store.gameState[4] === 'o' && store.gameState[7] ==='o') {
        console.log("o wins")
    }// right column o
    else if(store.gameState[2] === 'o' && store.gameState[5] === 'o' && store.gameState[8] ==='o') {
        console.log("o wins")
    }// top left diagnal o
    else if(store.gameState[0] === 'o' && store.gameState[4] === 'o' && store.gameState[8] ==='o') {
        console.log("o wins")
    }// top right diagnal o
    else if(store.gameState[2] === 'o' && store.gameState[4] === 'o' && store.gameState[6] ==='o') {
        console.log("o wins")
    }

    //DRAW
    else if (store.gameState[0] && store.gameState[1] && store.gameState[2] && store.gameState[3] && store.gameState[4] && store.gameState[5] && store.gameState[6] && store.gameState[7] && store.gameState[8]) {
        console.log("Its a tie")
    }
    
}



module.exports = {
    onSignUp,
    onSignIn,
    onSignOut,
    boxClicked,
    restart
}