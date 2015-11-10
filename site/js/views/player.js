// VIEW: Player

var app = app || {};

app.PlayerView = Backbone.View.extend({
    tagName: 'div',
    className: 'playerView',
    template: _.template($('#playerTemplate').html()),

    events: {
        'click .delete': 'deletePlayer'
    },

    render: function () {
        this.$el.html( this.template( this.model.toJSON()));
        return this;
    },

    deletePlayer: function () {
        this.model.destroy();
        this.remove();
    }
});

// debugging message
console.log('/site/js/views/player.js loaded...');