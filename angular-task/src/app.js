let angular = require('angular'),
    AddArticleController = require('./controllers/add-article.controller'),
    AllArticlesController = require('./controllers/all-articles.controller'),
    AppService = require('./app.service'),
    EditArticleController = require('./controllers/edit-article.controller'),
    MinLengthDirective = require('./directives/min-length.directive');

require('angular-resource');
require('angular-route');
require('./components/articles-list/articles-list.module');

angular
    .module('app', ['ngResource', 'ngRoute', 'articlesListModule'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                template: require('./templates/all-articles.html'),
                controller: 'AllArticlesController',
                controllerAs: 'allArticlesCtrl'
            })
            .when('/add', {
                template: require('./templates/add-edit-article.html'),
                controller: 'AddArticleController',
                controllerAs: '$ctrl'
            })
            .when('/:id/edit', {
                template: require('./templates/add-edit-article.html'),
                controller: 'EditArticleController',
                controllerAs: '$ctrl'
            });
    })
    .controller('AddArticleController', AddArticleController)
    .controller('AllArticlesController', AllArticlesController)
    .controller('EditArticleController', EditArticleController)
    .directive('minLength', MinLengthDirective)
    .factory('articleService', AppService);

angular.element(document).ready(function bootstrap() {
    angular.bootstrap(document, ['app']);
});
