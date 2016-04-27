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
  it('should be true', function () {
    expect(true).toBeTruthy();
  });

  /**
   * Testing the Game Initialisation
   */
   xdescribe('Game Initialization', function () {

    xit('should have existing variables', function () {

    });

    xit('should have initialized variables', function () {

    });

    xit('should initialize the array of players with the right number of players', function () {

    });

    xit('should initialize the score of each player to 0', function () {

    });

    xit('should initialize the pile of cards', function () {

    });

    xit('should set the first player to play to be the player 1 aka first player in array', function () {

    })
  });

  /**
   * Testing the Service Call
   */
  xdescribe('Service Call', function () {

    xit('should initialize the pile of card by calling the service', function (){

    });

  });

  /**
   * Testing the Game Logic
   */
  xdescribe('Game Logic', function () {

    xit('should return a correct value when the dice is thrown', function () {

    });

    xit('should throw if the thrown dice is invalid', function () {

    });

    xit('should get a card in a pile of card', function () {

    });

    xit('should add the score of the dice to the player score', function () {

    });

    xit('should add the score of the cards to the player score', function () {

    });

    xit('should pass to next player when the turn is ended', function () {

    });

    xit('should go back to the first player when the last player end his turn', function () {

    });
  });

  /**
   * Testing the Victory Behavior
   */
  xdescribe('Victory behavior', function () {

    xit('should show the pop up of victory when the target score is reached', function () {

    });

    xit('should display the right message in the pop up according to the winner', function () {

    });

    xit('should increase by one the level of the winner', function () {

    });

    xit('should reset the score of each player to 0 in case of victory', function () {

    });
  });

  /**
   * Testing the Game Reset
   */
  xdescribe('Reset Game', function () {


    xit('should reset the array of player', function () {

    });

    xit('should reset the scoreboard', function () {

    });
  });

});
