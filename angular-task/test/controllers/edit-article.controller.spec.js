let angular = require('angular');

require('../../src/app');

describe('EditArticleController', function() {
    let $controller, $ctrl, $location, $rootScope, article = {id: 123, title: 'Article title'}, articleService;

    $location = jasmine.createSpyObj('$location', ['path']);
    articleService = {
        getArticleById: jasmine.createSpy('getArticleById').and.returnValue(article),
        updateArticle: jasmine.createSpy('updateArticle').and.callFake(angular.noop)
    };

    beforeEach(angular.mock.module('app', function($provide) {
        $provide.value('$location', $location);
        $provide.value('$routeParams', {id: article.id})
        $provide.value('articleService', articleService);
    }));

    beforeEach(inject(function(_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
        $ctrl = $controller('EditArticleController', {$scope: $rootScope.$new()});
    });

    it('should define all neccesary data on init', function() {
        expect($ctrl.heading).toBe('Edit an article');
        expect($ctrl.onArticleChange).toBeDefined();
        expect($ctrl.article).toEqual(article);
        expect($ctrl.content).toBe(article.content);
        expect($ctrl.title).toBe(article.title);
    });

    it('onArticleChange should call update method for article and return to the main page', function() {
        $ctrl.onArticleChange();
        expect(articleService.updateArticle).toHaveBeenCalledWith($ctrl.article.id, $ctrl.title, $ctrl.content);
        expect($location.path).toHaveBeenCalledWith('/');
    });
});
