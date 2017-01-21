app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {
    currentUserdata : {}
    
   };

   auth.logIn = function(user) {
   	return $http.post('/login',user).then(function(data){
   		auth.saveToken(data.data.token);
      auth.currentUserdata.group = data.data.user.group;

   	})
   		//if success state.go

   }

   auth.saveToken = function (token) {
     $window.localStorage['rereddit-jwt'] = token;
   };

   auth.getToken = function (){
     return $window.localStorage['rereddit-jwt'];
   }

   auth.register = function (user) {
     return $http.post('/register', user).then(function(data){
          auth.saveToken(data.data.token);
           auth.currentUserdata.group = data.data.user.group;

          console.log(data.data)
          // console.log(data.data.user.group);
              // var group=data.data.user.group
          // var currentUserdata = group;

     })
   };

   auth.isLoggedIn = function(){
     var token = auth.getToken();

     if(token){
       return true;
     } else {
       return false;
     }
   };

   auth.currentUser = function(){
     if(auth.isLoggedIn()){

       var token = auth.getToken();
       var decodedToken = JSON.parse($window.atob(token.split('.')[1]));


       //It's returning DATA from the User
       return {current_user:decodedToken.username, 
               current_id:decodedToken._id,
               current_group: auth.currentUserdata.group 
              }
     }
   };

   auth.logOut = function(){
     $window.localStorage.removeItem('rereddit-jwt');
     auth.currentUserdata = {};
     currentUser = {};
   };



  return auth;
}]);
