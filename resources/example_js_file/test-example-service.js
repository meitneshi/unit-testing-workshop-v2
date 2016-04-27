describe("mainService", function () {

  beforeEach(module('dmaWebsiteApp'));

  var scope, shared, service, configureService, steppingService, httpBackend, rootScope;

  beforeEach(inject(function (_mainService_) {
    service = _mainService_;
  }));

  describe('test function behavior', function () {
    beforeEach(inject(function ($rootScope, _shared_, _configureService_, _steppingService_) {
      shared = _shared_;
      configureService = _configureService_;
      scope = $rootScope.$new();
      steppingService = _steppingService_
    }));

    it('reset app should reset the generation', function () {
      steppingService.steppingManager.init(scope);
      shared.generation = { "field": 1, "source": [sourceMock] };
      service.resetApp(scope);
      expect(shared.generation).toEqual({})
    });

    //.....
  });

  describe('test http request sending', function () {
    beforeEach(inject(function ($injector, $rootScope) {
      httpBackend = $injector.get("$httpBackend");
      rootScope = $injector.get("$rootScope");
      httpBackend.when("GET", "configuration/conf.json").respond(200, {serverUrl: 'http://serverDataUrl/'});
      httpBackend.when("GET", "http://serverDataUrl/utils/version").respond(200, {});
      httpBackend.when("GET", "../../i18n/resources-locale_fr.json").respond(200, {});
      httpBackend.when("GET", "../../i18n/resources-locale_en.json").respond(200, {});
      httpBackend.when("GET", "../views/downloading.html").respond(200, {});
    }));

    afterEach(function () {
      httpBackend.flush();
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(function () {
      rootScope.serverUrl = "http://serverUrl/";
      rootScope.currentPortal = "dma";
    });

    it('submit should should call API build in POST', function () {
      httpBackend.expectPOST('http://serverUrl/build').respond(200, {});
      service.submit(scope);
    });
  });
});