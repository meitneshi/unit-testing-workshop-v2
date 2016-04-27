describe("MainCtrl", function () {
  var scope, ctrl, configureService, steppingService, mainService, utilsService, pricingService;
  beforeEach(module('dmaWebsiteApp'));
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {$scope: scope} );
  }));
  describe('test init', function () {
    it('should have initialized variables', function () {
      expect(scope.termsAccepted).toBeFalsy();
      expect(scope.appNamePlaceholder).toBe("My First App");
      expect(scope.placeholderLabel.templates).toBe("placeholder.search-style");
      expect(scope.placeholderLabel.options).toBe("placeholder.search-options");
      expect(scope.inputText.searchText).toBe("");
      expect(scope.inputText.appName).toBe("");
      expect(scope.onConfiguration).toBeNull();
      expect(scope.animation).toBeTruthy();
      expect(scope.onMediaShown).toBeNull();
      expect(scope.modalId).toBeNull();
      expect(scope.arrowAnim).toBeFalsy();
      expect(scope.steppingManager).toBeDefined();
      expect(scope.pricingManager).toBeDefined();
    });
  });
  describe('test functions that only call functions', function () {
    beforeEach(inject(function (_configureService_, _steppingService_, _mainService_, _utilsService_, _pricingService_) {
      configureService = _configureService_;
      steppingService = _steppingService_;
      mainService = _mainService_;
      utilsService = _utilsService_;
      pricingService = _pricingService_;
    }));
    it('set step should called stepping service function', function () {
      spyOn(steppingService, 'setStep');
      scope.setStep(2);
      expect(steppingService.setStep).toHaveBeenCalled();
    });
    //.....
  });
  describe('test listeners behaviors', function () {
    it('when listener currentInStep is toggle, if currentInStep is not null set onConfiguration, else set to null', function () {
      scope.onConfiguration = null;
      scope.$emit('configureService.currentInStep', {});
      expect(scope.onConfiguration).toBe({});
      scope.$emit('configureService.currentInStep', null);
      expect(scope.onConfiguration).toBeNull();
    });
    //...
  });
  describe('test functions behaviors', function () {
    it('closeConfig should put null in onConfiguration variable', function () {
      scope.onConfiguration = "something";
      scope.closeConfig();
      expect(scope.onConfiguration).toBe(null);
    });
    it('if in configuration and step set to different of 2, config should be null', function () {
      scope.onConfiguration = "something";
      scope.setStep(1);
      expect(scope.onConfiguration).toBe(null);
    });
    //....
    it('reset app should put null in onConfiguration if confirmation', function () {
      scope.onConfiguration = "something";
      spyOn(window, 'confirm').andCallFake(function () { return true; });
      scope.resetApp();
      expect(scope.onConfiguration).toBeNull();
    });
    //...
  });
});