let angular = require('angular');

require('../../../src/components/paginator/paginator.module');

describe('PaginatorController', function() {
    let $componentController, $ctrl, $rootScope, $timeout, context;

    $location = jasmine.createSpyObj('$location', ['path']);

    beforeAll(function() {
        angular.bootstrap = angular.noop;
    });

    beforeEach(angular.mock.module('paginatorModule', function($provide) {
        $provide.value('$location', $location);
    }));

    beforeEach(inject(function(_$componentController_, _$rootScope_, _$timeout_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    beforeEach(function() {
        context = {articlesCount: 10, updatePage: jasmine.createSpy('updatePage').and.callFake(angular.noop)};
        $ctrl = $componentController('paginator', {$scope: $rootScope.$new()}, context);
        $ctrl.$onInit();
        $timeout.flush();
    });

    it('should init pages', function() {
        expect($ctrl.pages).toEqual([
            {startIndex: 0, endIndex: 5},
            {startIndex: 5, endIndex: 10}
        ]);
    });

    it('should update page with correct indicies', function() {
        $ctrl.setPage(1);
        expect(context.updatePage).toHaveBeenCalledWith({indices: {startIndex: 5, endIndex: 10}});
        $ctrl.setPage(0);
        expect(context.updatePage).toHaveBeenCalledWith({indices: {startIndex: 0, endIndex: 5}});
    });
});
