let angular = require('angular');

require('../../../src/components/articles-list/articles-list.module');

describe('ArticlesListController', function() {
    let $componentController, $ctrl, $location, $rootScope, list = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    $location = jasmine.createSpyObj('$location', ['path']);

    beforeAll(function() {
        angular.bootstrap = angular.noop;
    });

    beforeEach(angular.mock.module('articlesListModule', function($provide) {
        $provide.value('$location', $location);
    }));

    beforeEach(inject(function(_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
        $ctrl = $componentController('articlesList', {$scope: $rootScope.$new()}, {list: list});
    });

    it('onArticleClick should change url to edit selected article by id', function() {
        $ctrl.onArticleClick(1);
        expect($location.path).toHaveBeenCalledWith('/1/edit');
    });

    it('onPageUpdate should set correct array to page', function() {
        $ctrl.onPageUpdate({startIndex: 2, endIndex: 7});
        expect($ctrl.page).toEqual(list.slice(2, 7));
    });
});
