let angular = require('angular');

require('../../src/app');

describe('AddArticleController', function() {
    let $controller, $ctrl, $rootScope, articleService;

    articleService = jasmine.createSpyObj('articleService', ['addNewArticle']);

    beforeEach(angular.mock.module('app', function($provide) {
        $provide.value('articleService', articleService);
    }));

    beforeEach(inject(function(_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function() {
        $ctrl = $controller('AddArticleController', {$scope: $rootScope.$new()});
    });

    it('should be defined', function() {
        expect($ctrl.heading).toBe('Add a new article');
        expect($ctrl.onArticleChange).toBeDefined();
    });

    it('onArticleChange add new article using articleService', function() {
        $ctrl.title = 'New title';
        $ctrl.content = 'New content';
        $ctrl.onArticleChange();
        expect(articleService.addNewArticle).toHaveBeenCalledWith({
            title: $ctrl.title,
            content: $ctrl.content,
            id: jasmine.any(String)
        });
    });
});
