let angular = require('angular'),
    AddTaskController = require('./controllers/add-task.controller'),
    AllTasksController = require('./controllers/all-tasks.controller'),
    AppService = require('./app.service'),
    EditTaskController = require('./controllers/edit-task.controller'),
    MinLengthDirective = require('./directives/min-length.directive');

require('angular-resource');
require('angular-route');
require('./components/tasks-list/tasks-list.module');

angular
    .module('app', ['ngResource', 'ngRoute', 'tasksListModule'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                template: require('./templates/all-tasks.html'),
                controller: 'AllTasksController',
                controllerAs: 'allTasksCtrl'
            })
            .when('/add', {
                template: require('./templates/add-edit-task.html'),
                controller: 'AddTaskController',
                controllerAs: '$ctrl'
            })
            .when('/:id/edit', {
                template: require('./templates/add-edit-task.html'),
                controller: 'EditTaskController',
                controllerAs: '$ctrl'
            });
    })
    .controller('AddTaskController', AddTaskController)
    .controller('AllTasksController', AllTasksController)
    .controller('EditTaskController', EditTaskController)
    .directive('minLength', MinLengthDirective)
    .factory('todoService', AppService);

angular.element(document).ready(function bootstrap() {
    angular.bootstrap(document, ['app']);
});
