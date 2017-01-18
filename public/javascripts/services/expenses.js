app.factory('expenses', ['$http','auth', function($http, auth) {
    dat = auth.currentUserdata.group;
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

    getAllGroup: function(dat) {
      return $http.get('/group'  , {
         headers: {
          "Authorization": 'Bearer ' + auth.getToken()}
      }).then(function(data) {
  
        angular.copy(data.data, expenseService.expenses);
      });
    },

    create: function(expense) {
      return $http.post('/expenses', expense).then(function(data){
        expenseService.expenses.push(data.data);
        
      });
    },

    get: function(id) {
      return $http.get('/expenses/' + id).then(function(res){
        return res.data;
      });
    },


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


    modifyGroup: function(expense) {
      return $http.put('/group', expense).then(function(data){
        // return data.data;
        return $http.get('/group',{
         headers: {
          "Authorization": 'Bearer ' + auth.getToken()}
      }).then(function(data) {
  
        angular.copy(data.data, expenseService.expenses);
      });
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