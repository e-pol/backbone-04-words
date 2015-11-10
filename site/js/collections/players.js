// COLLECTION: Players

var app = app || {};

app.PlayersList = Backbone.Collection.extend({
    model: app.Player
});

// debugging message
console.log('/site/js/collections/players.js loaded...');