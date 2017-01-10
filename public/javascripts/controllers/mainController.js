app.controller('MainCtrl', ['$scope', 'expenses','auth', function($scope, expenses,auth){
  $scope.expenses = expenses.expenses;

  $scope.addExpense = function() {
    if ($scope.category === '') { return; }

    expenses.create({ 
      category:$scope.category,
      amount:$scope.amount,
      author: auth.currentUser(),
    });

    $scope.category = '';
    $scope.amount = '';
  }


  // $scope.incrementUpvotes = function(item) {
  //   posts.upvote(item);
  // }
}]);