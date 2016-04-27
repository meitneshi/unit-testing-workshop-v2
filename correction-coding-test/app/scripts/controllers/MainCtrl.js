/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var MainCtrl = function ($scope, mainService, $window) {

  /*===============================*/
  /*======scope variables==========*/
  /*===============================*/

  //scope variable declared here
  $scope.players;
  $scope.cards;
  $scope.scoreBoard;
  $scope.nbPlayer;
  $scope.cardDrawn;
  $scope.face;
  $scope.diceScore;
  $scope.currentPlayerIndex;
  $scope.currentPlayer;
  $scope.targetScore;

  /*========================================*/
  /*======== init scope variables ==========*/
  /*========================================*/

  //scope variables init here;
  $scope.players = [];
  $scope.cards = [];
  $scope.scoreBoard = null;
  $scope.nbPlayer = 2; //default 2 players
  $scope.cardDrawn = null;
  $scope.face = 6; //default 6 faces dice
  $scope.diceScore = 0;
  $scope.currentPlayerIndex = 0; //default player 1
  $scope.currentPlayer = null;
  $scope.targetScore = 25; //default 25


  /*========================================*/
  /*======== init scope functions ==========*/
  /*========================================*/

  //initialization of scope function (throw "empty")
  $scope.initPlayers = function () { throw "Empty!"; };
  $scope.initScoreBoard = function () { throw "Empty!"; };
  $scope.initCards = function () { throw "Empty!"; };
  $scope.rollDice = function () { throw "Empty!"; };
  $scope.drawCard = function () { throw "Empty!"; };
  $scope.updateScore = function () { throw "Empty!"; };
  $scope.showVictory = function () { throw "Empty!"; };
  $scope.initGame = function () { throw "Empty!"; };
  $scope.endTurn = function () { throw "Empty!"; };
  $scope.updateCurrentUser = function () { throw "Empty!"; };
  $scope.resetGame = function () { throw "Empty!" };


  /*===============================*/
  /*======private variables========*/
  /*===============================*/

  //Put here private variable
  var possibleFaces = [2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 24, 26, 28, 30, 32, 34, 36, 50, 60, 100, 120];


  /*===============================*/
  /*======scope functions==========*/
  /*===============================*/

  /**
    * Init the array of players according to the number of players specified
    *
    * params : {nbPlayer} an integer representation of the number of player
    */
  $scope.initPlayers = function (nbPlayer) {
    $scope.players = [];
    for(var i = 1 ; i <= nbPlayer ; i++) {
      var player = {
        "name": "player_" + i,
        "level": 1
      }
      $scope.players.push(player);
    }
  };

  /**
    * Init the scoreBoard for all the players
    *
    * params : {players} an Array representing the list of players
    */
  $scope.initScoreBoard = function (players) {
    $scope.scoreBoard = {};
    angular.forEach(players, function (player) {
      $scope.scoreBoard[player.name] = 0
    });
  };

  /**
    * Init the pile of Cards by calling the service
    *
    * params : {scope} the representation of the scope of the controller
    */
  $scope.initCards = function (scope) {
    $scope.cards = mainService.getCards(scope);
  };

  /**
    * Evaluate the rolling of the dice by getting a random integer in the interval of the dice
    *
    * params : {faces} the number of faces in the dice (can be anything in the array specified in controller)
    *
    * throw : String "Invalid Dice" if the number of faces is not allowed
    */
  $scope.rollDice = function() {
    if (possibleFaces.indexOf($scope.face) != -1) {
        $scope.diceScore = Math.floor((Math.random() * $scope.face) + 1);
        $scope.updateScore($scope.currentPlayer, $scope.diceScore);
    } else {
      throw ("Invalid Dice");
    }
  };

  /**
    * Draw a card in the pile by returning the card at the random generated index
    */
  $scope.drawCard = function() {
    var cardNumber = $scope.cards.length;
    var index = Math.floor((Math.random() * cardNumber) + 1);
    $scope.cardDrawn = $scope.cards[index-1];
    $scope.updateScore($scope.currentPlayer, $scope.cardDrawn.value);
  };

  /**
    * Update the score of a player
    *
    * params : {aPlayer} the player to update
    *          {value} the value to add to player score
    */
  $scope.updateScore = function (aPlayer, value) {
    angular.forEach($scope.players, function (player){
      if (player.name === aPlayer.name) {
        $scope.scoreBoard[player.name] += value;

        if ($scope.scoreBoard[player.name] >= $scope.targetScore ) {
          $scope.showVictory(aPlayer);
          $scope.initScoreBoard($scope.players);
        }
      }
    });
  };

  /**
    * Show a victory message when the victory condition is met and increase level of player
    *
    * params : {player} the representation of the winner
    */
  $scope.showVictory = function (player) {
    player.level++;
    var message = "Congratulations " + player.name + ". You Win this round !!";
    $window.alert(message);
  }

  /**
    * Init all Game
    *
    * params : {numberOfPlayers} the number of player for the game
    */
  $scope.initGame = function (numberOfPlayers) {
    $scope.initPlayers(numberOfPlayers);
    $scope.initCards($scope);
    $scope.initScoreBoard($scope.players);
    $scope.updateCurrentUser(0);
  };

  /**
    * End the turn of a player. Pass to the next player.
    */
  $scope.endTurn = function () {
    ($scope.currentPlayerIndex === $scope.players.length - 1) ? $scope.updateCurrentUser(0) : $scope.updateCurrentUser(++ $scope.currentPlayerIndex);
  };

  /**
    * Update the playing user
    *
    * params : {index} the inde of the new current player in the array of players
    */
  $scope.updateCurrentUser = function (index) {
    $scope.currentPlayerIndex = index;
    $scope.currentPlayer = $scope.players[$scope.currentPlayerIndex];
  };

  /**
    * Reset the Game
    */
  $scope.resetGame = function () {
    $scope.players = [];
    $scope.scoreBoard = null;
  };

  /* ------- Listeners ------- */
  $scope.$on('cards_loaded', function (e, response) {
    $scope.cards = response;
  });

};

angular.module('unitTestingWorkshopApp').controller('MainCtrl', ['$scope', 'mainService', '$window', MainCtrl]);
