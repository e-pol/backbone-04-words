// MODEL: Player

var app = app || {};

app.Player = Backbone.Model.extend({
    defaults: {
        name: 'Игрок',
        number: 0
    }
});


// debugging message
console.log('/site/js/models/player.js loaded...');