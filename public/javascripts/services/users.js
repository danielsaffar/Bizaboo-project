app.factory('users', ['$http','auth', function($http,auth) {
  var userService = {
    users: [],

getUsers: function() {
  return $http.get('/users/friends',{
      headers: {
      "Authorization": 'Bearer ' + auth.getToken()}
  }).then(function(data) {

    angular.copy(data.data, userService.users);
  });
}}

return userService;
}]);
