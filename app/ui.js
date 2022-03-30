'use strict'
const store = require('./store.js')

const onSignUpSuccess = function () {
    $('#display').html('<p>sign up successful</p>')
    $('form').trigger('reset')

}
const onSignUpFailure = function(){
    $('#display').html('<p>sign up failure</p>')
}

const onSignInSuccess = function (response) {
    $('#display').html('<p>successful sign in <br> click to play</p>')
    // store user token
    store.user = response.user
    $('form').trigger('reset')

    // hide command to sign in
    hideRule()
    hideSignUpIn()
}
const onSignInFailure = function(){
    $('#display').html('<p>User sign in failure</p>') 
}

const onSignOutSuccess = function () {
    $('#display').html('<p>User signed Out</p>')
}
const onSignOutFailure = function(){
    $('#display').html('<p>User sign out failure</p>')
}

const player1Win = function (){
    $('#display').html('<p>player 1 wins</p>')
}
const player2Win = function (){
    $('#display').html('<p>player 2 wins</p>')
}
const playerTie = function (){
    $('#display').html('<p>its a tie</p>')
}

const onRestart = function (){
    $('#display').html('<p>click to play</p>')
}

const hideRule = function (){
    $('#rule').hide()
}

const hideSignUpIn = function (){
    $('#sign-up-form').hide()
    $('#sign-in-form').hide()
}

const showSignUpIn = function (){
    $('#sign-up-form').show()
    $('#sign-in-form').show()
}

module.exports = {
    onSignUpSuccess,
    onSignUpFailure,
    onSignInFailure,
    onSignInSuccess,
    onSignOutFailure,
    onSignOutSuccess,
    player1Win,
    player2Win,
    playerTie,
    hideRule,
    hideSignUpIn,
    showSignUpIn,
    onRestart
}