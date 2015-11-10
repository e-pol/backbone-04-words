// VIEW: Players` List View

var app = app || {};

/**
 * Constructs PlayersListView object
 * @class PlayersListView
 * @constructor
 * @namespace app
 * @param {Array} initialPlayers Array of objects with players` data (names etc.)
 */
app.PlayersListView = Backbone.View.extend({
    el: '#app-setup-players',

   /**
    * Creates new players` collection, renders the view, listens
    * for changes to its collection. Caches name input and error message container
    *
    * @param {Array} initialPlayers Array of objects with players` data (names etc.)
    * @return {Void}
    */
    initialize: function (initialPlayers) {
        this.collection = new app.PlayersList(initialPlayers);
        this.render();
        this.listenTo(this.collection, 'add', this.renderPlayer);
        this.listenTo(this.collection, 'remove', this.updateNumbers);
        this.$msgContainer = $('#app-setup-players-msg');
        this.$input = $('#app-setup-players-new-name');
    },

   /**
    * The dom events listeners:
    * - add new player when 'add' button clicked
    * - clear input when 'clear' button clicked
    * - check if pressed ENTER to add new player 
    * - remove error message if input loses focus
    */

    events: {
        'click #app-setup-players-add': 'addPlayer',
        'click #app-setup-players-clear': 'clearInput',
        'keypress #app-setup-players-new-name': 'addOnEnter',
        'focusout #app-setup-players-new-name': 'clearMsg'
    },

   /**
    * Renders the players` list using single player renderer
    * Gets player`s data frome collection models
    */
    render: function () {
        $('#app-setup-players-list').html('');

        this.collection.each(function (player) {
            this.renderPlayer(player);
        }, this);
    },

   /**
    * Creates new views for every playe
    * @param {Object} player Player`s model from collection
    */
    renderPlayer: function (player) {
        var playerView = new app.PlayerView({
            model: player
        });
        $('#app-setup-players-list').append(playerView.render().el);
    },

   /**
    * Adds new player to the list.
    * Checks if player`s name is entered and shows error message if input is empty
    * @param {Object} e Event object
    */
    addPlayer: function (e) {
        e.preventDefault();

        var playerData = {},
            collection = this.collection,
            $msgContainer = this.$msgContainer;

        $('#app-setup-players-new').children('input').each(function (i, el) {
            if ($(el).val() != '') {
                playerData[$(el).attr('data-player-attr')] = $(el).val();
                playerData['number'] = collection.length + 1;
                collection.add(new app.Player(playerData));
            } else {
                $msgContainer.html('Необходимо ввести имя игрока!');
            }
        });

        this.clearInput();
    },

   /**
    * Checks if pressed ENTER during name input
    * if true calls 'addPlayer' method
    * @param {Object} e Evenet object
    */
    addOnEnter: function (e) {
        if (e.which === ENTER_KEY) {
            this.addPlayer(e);
        }
    },

   /**
    * Clears input and makes it focused
    */
    clearInput: function () {
        this.$input.val('').focus();
    },

   /**
    * Updates ordering numbers of players
    */
    updateNumbers: function () {
        var count = 0;

        this.collection.forEach(function (player) {
            player.set('number', ++count);
        });

        this.render();
        this.clearInput();
    },

    clearMsg: function () {
        this.$msgContainer.html('');
    }
});

// debugging message
console.log('/site/js/views/players.js loaded...');