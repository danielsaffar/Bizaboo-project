// app.controller('PostsCtrl', ['$scope', 'expenses', 'expense','auth', function($scope, posts, expense,auth) {
//   $scope.expense = expense;

//   $scope.addComment = function(){
//     if($scope.body === '') { return; }

//     posts.addComment(post._id, {
//       body: $scope.body,
//       author: auth.currentUser(),
//     }).success(function(comment) {
//       $scope.post.comments.push(comment);
//     });

//     $scope.body = '';
//   };

//   $scope.incrementUpvotes = function(comment){
//     posts.upvoteComment(post, comment);
//   };
// }]);
