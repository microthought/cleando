angular.module('cleanDo', [
  'cleanDo.todos',
  'cleanDo.services',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'todos/todos.html',
    controller: 'TodosController'
  })
})