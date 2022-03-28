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
    
    //print current gameboard
    // .then(() => authApi.getGameStatus())
    //.then((response) => { console.log(response.games[response.games.length-1])})
    
    if (whoClicked === 'o'){
        $(this).css('background', 'lightblue')
        $(this).unbind('click')
        whoClicked= 'x'
    }else{
        $(this).css('background', 'lightgreen')
        $(this).unbind('click')
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
    let gameBoard
    authApi.getGameStatus()
    .then((response) => { 
        gameBoard = (response.games[response.games.length-1]).cells
    })
    console.log(gameBoard)

}



module.exports = {
    onSignUp,
    onSignIn,
    onSignOut,
    boxClicked,
    restart
}