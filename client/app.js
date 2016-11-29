angular.module('cleanDo', [
  'cleanDo.todos',
  'cleanDo.services'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/,', {
    templateUrl: 'todos/todos.html',
    controller: 'todos/todos.js'
  })
})