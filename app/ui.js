'use strict'
const store = require('./store.js')

const onSignUpSuccess = function () {
    $('#display').html('<p>User signed up successfully</p>')

}
const onSignUpFailure = function(){
    $('#display').html('<p>User sign up failure</p>')
}

const onSignInSuccess = function (response) {
    $('#display').html('<p>User signed in successfully</p>')
    // store user token
    store.user = response.user
    $('form').trigger('reset')
}
const onSignInFailure = function(){
    $('#display').html('<p>User sign in failure</p>')
    $('form').trigger('reset')
}

const onSignOutSuccess = function () {
    $('#display').html('<p>User signed Out</p>')
}
const onSignOutFailure = function(){
    $('#display').html('<p>User sign out failure</p>')
}
module.exports = {
    onSignUpSuccess,
    onSignUpFailure,
    onSignInFailure,
    onSignInSuccess,
    onSignOutFailure,
    onSignOutSuccess
}