/**
 * Copyright © 2014 by eBusiness Information
 * All rights reserved. This source code or any portion thereof
 * may not be reproduced or used in any manner whatsoever
 * without the express written permission of eBusiness Information.
 *
 * Created by mbibos on 10/03/15.
 */

var mainService = function ($http) {

  //Self reference
  var mainService = this;


  //----------------------------------------------------------------------
  // Service interface variables declaration
  //----------------------------------------------------------------------

  //put here declaration of variable


  //----------------------------------------------------------------------
  // Service interface functions declaration
  //----------------------------------------------------------------------

  //Put here declaration of function (throw Empty)
  this.getCards = function () { throw "Empty!"; };


  //----------------------------------------------------------------------
  // Service private variables
  //----------------------------------------------------------------------

   //Put here private variable


  //----------------------------------------------------------------------
  // Init service functions
  //----------------------------------------------------------------------

  //Put here function core
  this.getCards = function (scope) {
    $http.get('/resources/cardList.json').success(function(response) {
        scope.$emit('cards_loaded', response);
    });
  };
};

angular.module('unitTestingWorkshopApp').service('mainService', ['$http', mainService]);
