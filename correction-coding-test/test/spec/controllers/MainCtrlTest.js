/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

/**
 * Testing the Main controller
 */
describe('MainCtrl', function() {

  // load the controller's module
  beforeEach(module('unitTestingWorkshopApp'));

  var controller, scope, mainService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  //blank test to be commented
  //here to avoid ERROR in karma console when launching with no test
  /*it('should be true', function () {
    expect(true).toBeTruthy();
  });*/

  /**
   * Testing the Game Initialisation
   */
  describe('Game Initialization', function () {

    console.log("Testing Game Initialization - BEGIN");

    it('should have existing variables', function () {
      expect(scope.players).toBeDefined();
      expect(scope.cards).toBeDefined();
      expect(scope.scoreBoard).toBeDefined();
      expect(scope.nbPlayer).toBeDefined();
      expect(scope.cardDrawn).toBeDefined();
      expect(scope.face).toBeDefined();
      expect(scope.diceScore).toBeDefined();
      expect(scope.currentPlayerIndex).toBeDefined();
      expect(scope.currentPlayer).toBeDefined();
      expect(scope.targetScore).toBeDefined();
    });

    it('should have initialized variables', function () {
      //fail because of strict comparaison
      //expect(scope.players).toBe([]);
      //expect(scope.cards).toBe([]);

      //success because of simple comparaison
      expect(scope.players).toEqual([]);
      expect(scope.cards).toEqual([]);

      expect(scope.scoreBoard).toBeNull();
      expect(scope.nbPlayer).toEqual(2);
      expect(scope.cardDrawn).toBeNull();
      expect(scope.face).toEqual(6);
      expect(scope.diceScore).toEqual(0);
      expect(scope.currentPlayerIndex).toEqual(0);
      expect(scope.currentPlayer).toBeNull();
      expect(scope.targetScore).toEqual(25);
    });

    it('should initialize the array of players with the right number of players', function () {
      scope.initPlayers(2);
      expect(scope.players.length).toEqual(2);
    });

    it('should initialize the score of each player to 0', function () {
      var mockPlayers = [
        {
          "name": "aaa",
          "level": 1
        },{
          "name": "bbb",
          "level": 1
        }
      ];
      scope.initScoreBoard(mockPlayers)
      expect(scope.scoreBoard.aaa).toEqual(0);
      expect(scope.scoreBoard.bbb).toEqual(0);
    });

    it('should initialize the pile of cards', function () {
      scope.cards = [];
      scope.initCards(scope);
      expect(scope.cards).not.toEqual([]);
    });

    it('should set the first player to play to be the player 1 aka first player in array', function () {
      spyOn(scope, 'updateCurrentUser');
      scope.initGame(2);
      expect(scope.updateCurrentUser).toHaveBeenCalledWith(0);
      expect(scope.currentPlayerIndex).toEqual(0);
    });

    console.log("Testing Game Initialization - END");

  });

  /**
   * Testing the Service Call
   */
  describe('Service Call', function () {

    console.log("Testing Service Call - BEGIN");

    beforeEach(inject(function (_mainService_) {
      mainService = _mainService_;
    }));

    it('should initialize the pile of card by calling the service', function (){
      spyOn(mainService, 'getCards');
      scope.initCards(scope);
      expect(mainService.getCards).toHaveBeenCalled();
      expect(mainService.getCards).toHaveBeenCalledWith(scope);
    });

      console.log("Testing Service Call - END");

  });

  /**
   * Testing the Game Logic
   */
  describe('Game Logic', function () {

     console.log("Testing Game Logic - BEGIN");

     beforeEach(function() {
       var mockPlayers = [
         {
           "name": "aaa",
           "level": 1
         },
         {
           "name": "bbb",
           "level": 1
         }
       ];
       scope.players = mockPlayers
       scope.initScoreBoard(mockPlayers);
       scope.currentPlayer = mockPlayers[0];
       scope.scoreBoard.aaa = 0;
       scope.targetScore = 10000; //to avoid toggle victory
    });

    it('should return a correct value when the dice is thrown', function () {
      scope.face = 3;
      var targetScore = [1,2,3];
      for(var i = 0 ; i < 50 ; i++) {
        scope.rollDice(scope.face);
        expect(targetScore).toContain(scope.diceScore);
      }
    });

    it('should throw if the thrown dice is invalid', function () {
      scope.face = 9;
      expect(scope.rollDice).toThrow();
    });

    it('should get a card in a pile of card', function () {
      scope.cards = [
        {
          "value": 1,
          "label": "Ace",
          "symbol":"spades"
        }
      ];
      scope.drawCard();
      expect(scope.cardDrawn).not.toBeNull();
      expect(scope.cardDrawn.value).toEqual(1);
      expect(scope.cardDrawn.label).toBe("Ace");
      expect(scope.cardDrawn.symbol).toBe("spades");

    });

    it('should add the score of the dice to the player score', function () {
      scope.face = 6;
      for(var i = 0 ; i < 10 ; i ++) {
        scope.rollDice();
      }
      expect(scope.scoreBoard.aaa).toBeGreaterThan((0 + 10 * 1) - 1); //workaround for random. 10 throws minimum 10 points -> -1 because matcher is strict
      expect(scope.scoreBoard.aaa).toBeLessThan((0 + 10 * 6) + 1);  //workaround for random. 10 throws maxmum 60 points -> +1 because matcher is strict
    });

    it('should add the score of the cards to the player score', function () {
      scope.cards = [
        {
          "value": 1,
          "label": "Ace",
          "symbol":"spades"
        }
      ];
      scope.drawCard();
      expect(scope.scoreBoard.aaa).toEqual(0 + 1);
    });

    it('should pass to next player when the turn is ended', function () {
      var initialIndex = scope.currentPlayerIndex;
      var initialPlayer = scope.currentPlayer;
      scope.endTurn();

      expect(scope.currentPlayerIndex).toEqual(initialIndex + 1);
      expect(scope.currentPlayer).not.toEqual(initialPlayer);
    });

    it('should go back to the first player when the last player end his turn', function () {
      var firstPlayer = scope.players[0];
      scope.currentPlayer = scope.players[scope.players.length - 1];
      scope.currentPlayerIndex = scope.players.length - 1;

      scope.endTurn();

      expect(scope.currentPlayerIndex).toEqual(0);
      expect(scope.currentPlayer).toBe(firstPlayer);
    });

    console.log("Testing Game Logic - END");

  });

  /**
   * Testing the Victory Behavior
   */
  describe('Victory behavior', function () {

    console.log("Testing Victory Behavior - BEGIN");

    beforeEach(function() {
      var mockPlayers = [
        {
          "name": "aaa",
          "level": 1
        }
      ];
      scope.players = mockPlayers
      scope.initScoreBoard(mockPlayers);
      scope.currentPlayer = mockPlayers[0];
      scope.scoreBoard.aaa = 0;
      scope.targetScore = 10;
   });

    it('should show the pop up of victory when the target score is reached', function () {
      spyOn(scope, 'showVictory');
      scope.updateScore(scope.currentPlayer, 11);
      expect(scope.showVictory).toHaveBeenCalled();
    });

    it('should display the right message in the pop up according to the winner', function () {
      spyOn(scope, 'showVictory');
      scope.updateScore(scope.currentPlayer, 11);
      expect(scope.showVictory).toHaveBeenCalledWith(scope.currentPlayer);
    });

    it('should increase by one the level of the winner', function () {
      var oldPlayerLevel = scope.currentPlayer.level;
      scope.showVictory(scope.currentPlayer);
      expect(scope.currentPlayer.level).toEqual(++ oldPlayerLevel);
    });

    it('should reset the score of each player to 0 in case of victory', function () {
      spyOn(scope, 'initScoreBoard');
      scope.updateScore(scope.currentPlayer, 11);
      expect(scope.initScoreBoard).toHaveBeenCalledWith(scope.players);
    });

    console.log("Testing Victory Behavior - END");

  });

  /**
   * Testing the Game Reset
   */
  describe('Reset Game', function () {

    console.log("Testing Reset Game - BEGIN");

    beforeEach(function() {
      var mockPlayers = [
        {
          "name": "aaa",
          "level": 1
        },
        {
          "name": "bbb",
          "level": 1
        }
      ];
      scope.players = mockPlayers
      scope.initScoreBoard(mockPlayers);
      scope.currentPlayer = mockPlayers[0];
      scope.scoreBoard.aaa = 25;
      scope.scoreBoard.aaa = 30;
   });

    it('should reset the array of player', function () {
      scope.resetGame();
      expect(scope.players).toEqual([]);
    });

    it('should reset the scoreboard', function () {
      scope.resetGame();
      expect(scope.scoreBoard).toBeNull();
    });

    console.log("Testing Reset Game - END");

  });

});
