'use strict'

const store = require('./store.js')

const signUp = function(data){
    console.log('signUp')
    return $.ajax({
        method: 'POST',
        url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-up',
        data
    })
}

const signIn = function(data){
    console.log('signIn')
    return $.ajax({
        method: 'POST',
        url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-in',
        data
    })
}

const signOut = function(){
    console.log('signOut')
    return $.ajax({
        method: 'DELETE',
        url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-out',
        headers: {
            Authorization: 'Bearer ' + store.user.token
        }
    })
}

module.exports = {
    signUp,
    signIn,
    signOut
}