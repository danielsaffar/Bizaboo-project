app.factory('auth', ['$http', '$window', function($http, $window){
   var auth = {
    currentUserdata : {}
    
   };

   auth.logIn = function(user) {
   	return $http.post('/login',user).then(function(data){
   		auth.saveToken(data.data.token);
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
          // currentUser = data.data.user;

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
       return decodedToken.username;
     }
   };

   auth.logOut = function(){
     $window.localStorage.removeItem('rereddit-jwt');
     currentUser = {};
   };



  return auth;
}]);
