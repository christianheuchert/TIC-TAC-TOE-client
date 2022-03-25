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
    //.then((response)=> console.log(response.game.cells))
    .then((response) => {store.game = response.game.cells})
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
    //set store to player click index
    let index = event.target.getAttribute('data-cell-index')
    
    if (whoClicked){
        $(this).css('background', 'lightblue')
        $(this).unbind('click')
        whoClicked=false
        store.game[index]="B"
    }else{
        $(this).css('background', 'lightgreen')
        $(this).unbind('click')
        whoClicked=true
        store.game[index]="G"
    }
    console.log(store.game)
}

const restart=function(event){
    whoClicked=false
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