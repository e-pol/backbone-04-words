// MAIN APP SCRIPT

var app = app || {};
var ENTER_KEY = 13;

$(function () {

    var players = [
        {name: 'Иван Фёдорович Крузенштерн', number: 1},
        {name: 'Кот Матроскин', number: 2},
        {name: 'Дядя Фёдор', number: 3}
    ];

    new app.PlayersListView(players);

});

// debugging message
console.log('/site/js/app.js loaded...');