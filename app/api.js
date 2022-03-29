'use strict'

const config = require('./config.js')
const store = require('./store.js')


const signUp = function(data){
    console.log('signUp')
    return $.ajax({
        method: 'POST',
        url: config.apiUrl + '/sign-up',
        data
    })
}

const signIn = function(data){
    console.log('signIn')
    return $.ajax({
        method: 'POST',
        url: config.apiUrl + '/sign-in',
        data
    })
}

const signOut = function(){
    console.log('signOut')
    return $.ajax({
        method: 'DELETE',
        url: config.apiUrl + '/sign-out',
        headers: {
            Authorization: 'Bearer ' + store.user.token
        }
    })
}

const createGame = function () {
    console.log('createGame')
    return $.ajax({
        method: 'POST',
        url: config.apiUrl + '/games',
        headers: {
            Authorization: 'Bearer ' + store.user.token
        },
        data:'{}'
    })
}

const getGameStatus=function(){
    console.log('getGameStatus')
    return $.ajax({
        method: 'GET',
        url: config.apiUrl + '/games/' +store.game._id,
        headers: {
            Authorization: 'Bearer ' + store.user.token
        }
    })
}

const playerMove=function(index, whoClicked, gameStatus){
    console.log('playerMove')
    return $.ajax({
        method: 'PATCH',
        url: config.apiUrl + '/games/'+store.game._id,
        headers: {
            Authorization: 'Bearer ' + store.user.token
        },
    data:{
        "game":{
            "cell": {
                "index": index,
                "value": whoClicked
            },
            "over": gameStatus
        }
        }
    })
}

module.exports = {
    signUp,
    signIn,
    signOut,
    getGameStatus,
    playerMove,
    createGame
}