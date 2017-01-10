app.controller('UserCtrl', ['$scope', 'users', function($scope, users){
  $scope.users = users.users;


}]);
