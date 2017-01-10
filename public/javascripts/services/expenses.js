app.factory('expenses', ['$http','auth', function($http, auth) {
  var expenseService = {
    expenses: [],

    getAll: function() {
      return $http.get('/expenses',{
         headers: {
          "Authorization": 'Bearer ' + auth.getToken()}
      }).then(function(data) {
  
        angular.copy(data.data, expenseService.expenses);
      });
    },

    get: function(id) {
      return $http.get('/expenses/' + id).then(function(res){
        return res.data;
      });
    },

    create: function(expense) {
      return $http.post('/expenses', expense).then(function(data){
        expenseService.expenses.push(data.data);
        
      });
    },

    upvote: function(post) {
      // TODO: Finish
    },

    addComment: function(id, comment) {
      return $http.post('/expenses/' + id + '/comments', comment);
    },

    upvoteComment: function(post, comment) {
      // TODO: Finish
    }
  };
  

  return expenseService;
}]);