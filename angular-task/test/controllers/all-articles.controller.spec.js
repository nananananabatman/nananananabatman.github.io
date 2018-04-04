let angular = require('angular');

require('../../src/app');

describe('AllArticlesController', function() {
    let $controller, $ctrl, $location, $q, $rootScope, articleService;

    $location = jasmine.createSpyObj('$location', ['path']);
    articleService = {
        isListExists: jasmine.createSpy('isListExists'),
        getList: jasmine.createSpy('getList').and.callFake(angular.noop),
        getListPromise: jasmine.createSpy('getListPromise')
    };

    beforeEach(angular.mock.module('app', function($provide) {
        $provide.value('$location', $location);
        $provide.value('articleService', articleService);
    }));

    beforeEach(inject(function(_$controller_, _$q_, _$rootScope_) {
        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
        articleService.getListPromise.and.returnValue($q.when(true));
    });

    it('should define articleList on init', function() {
        articleService.isListExists.and.returnValue(false);
        $ctrl = $controller('AllArticlesController', {$scope: $rootScope.$new()});
        expect(articleService.getListPromise).toHaveBeenCalled();

        articleService.isListExists.and.returnValue(true);
        $ctrl = $controller('AllArticlesController', {$scope: $rootScope.$new()});
        expect(articleService.getList).toHaveBeenCalled();
    });

    it('addArticle should change url to navigate to add page', function() {
        $ctrl = $controller('AllArticlesController', {$scope: $rootScope.$new()});
        $ctrl.addArticle();
        expect($location.path).toHaveBeenCalledWith('/add');
    });
});
