'use strict'

const getFormFields = require('../lib/get-form-fields.js')
const authUi = require('./ui.js')
const authApi = require('./api.js')

const onSignUp = function (event){
    event.preventDefault()
    console.log('onSignUp')
    const data = getFormFields(event.target)
    console.log(data)
    // call API signup
    authApi.signUp(data)
    .then(() => authUi.onSignUpSuccess())
    .catch(() => authUi.onSignUpFailure())
}

const onSignIn = function(event){
    event.preventDefault()
    console.log('onSignIn')
    const data = getFormFields(event.target)
   // call API signIn
    authApi.signIn(data)
    .then((response) => authUi.onSignInSuccess(response))
    .catch(() => authUi.onSignInFailure(data))
}

const onSignOut=function(){
    console.log('onSignOut')
    authApi.signOut()
    .then(() => authUi.onSignOutSuccess())
    .catch(() => authUi.onSignOutFailure())
}
// see which player is going
let whoClicked = false

const boxClicked=function(event){
    if (whoClicked){
        $(this).css('background', 'lightblue')
        $(this).unbind('click')
        whoClicked=false
    }else{
        $(this).css('background', 'lightgreen')
        $(this).unbind('click')
        whoClicked=true
    }
}

const restart=function(event){
    $('.box').css('background', 'lightcoral')
    $('.box').bind('click', boxClicked)
}



module.exports = {
    onSignUp,
    onSignIn,
    onSignOut,
    boxClicked,
    restart
}