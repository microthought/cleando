angular.module('cleanDo.services', [])

.factory('Serve', function($http){

  var getAll = function(){

    return $http({
      method: 'GET',
      url: '/api/tasks'
    })
    .then(function(results){
      return results.data;
    });


  };





  return {
    getAll: getAll
  }

})