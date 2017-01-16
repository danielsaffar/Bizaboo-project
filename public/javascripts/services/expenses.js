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


        getAllGroup: function() {
      return $http.get('/group' ,{
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

    // getSum: function() {
    //   return $http.get('/expenses',{
    //     headers: {
    //       "Authorization":'Bearer' + auth.getToken()}
    //   }).then(function(data) {
    //     return data
    //   })
    // }

    modify: function(expense) {
      return $http.put('/expenses', expense).then(function(data){
        // return data.data;
        return $http.get('/expenses',{
         headers: {
          "Authorization": 'Bearer ' + auth.getToken()}
      }).then(function(data) {
  
        angular.copy(data.data, expenseService.expenses);
      });
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