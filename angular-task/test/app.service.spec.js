let angular = require('angular');

require('angular-mocks');
require('../src/app');

describe('AppService', function() {
    let articleService;

    beforeEach(angular.mock.module('app'));

    beforeEach(inject(function(_articleService_) {
        articleService = _articleService_;
    }));

    it('addNewArticle method should add an article to the list', function() {
        var article = {title: 'Some title'},
            articlesList;

        articleService.addNewArticle(article);
        articlesList = articleService.getList();

        expect(articlesList).toBeDefined();
        expect(articlesList.length).toBe(1);
        expect(articlesList[0]).toEqual(article);
    });

    it('getArticleById should return article from list by id', function() {
        articleService.addNewArticle({id: 123});
        expect(articleService.getArticleById(321)).toBeUndefined();
        expect(articleService.getArticleById(123)).toBeDefined();
    });

    it('getList method should return the list of articles', function() {
        expect(articleService.getList()).toEqual([]);
    });

    it('getListPromise method should return the promise object', function() {
        var promise = articleService.getListPromise();

        expect(promise).toEqual(jasmine.any(Object));
    });

    it('updateArticle should update title and content of the article', function() {
        var article = {
                id: 1,
                title: 'Old title',
                content: 'Old content'
            },
            newContent = 'New content',
            newTitle = 'New title';

        articleService.addNewArticle(article);

        articleService.updateArticle(1, newTitle, newContent);
        expect(articleService.getArticleById(1).title).toBe(newTitle);
        expect(articleService.getArticleById(1).content).toBe(newContent);
    });

    describe('isListExists method', function() {
        it('should return false when articles list is empty', function() {
            expect(articleService.isListExists()).toBeFalsy();
        });

        it('should return true when articles list is not empty', function() {
            articleService.addNewArticle({title: 'Some title'});
            expect(articleService.isListExists()).toBeTruthy();
        });
    });
});
