var app = angular.module('bizaboo', ['ui.router','nvd3']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['expenses', function(expenses){
          return expenses.getAll();
        }]
       }
    })
    .state('group', {
      url: '/group',
      templateUrl: '/templates/group.html',
      controller: 'GroupCtrl',
      resolve: {
        postPromise: ['expenses', function(expenses){
          return expenses.getAllGroup();
        }]
       }
    })
    // .state('expense', {
    //   url: '/expenses/:id',
    //   templateUrl: '/templates/posts.html',
    //   controller: 'PostsCtrl',
    //   resolve: {
    //     post: ['$stateParams', 'expenses', function($stateParams, expenses) {
    //       return expenses.get($stateParams.id);
    //     }]
    //   }
    // })
    .state('register', {
      url: '/register',
      controller: 'AuthCtrl',
      templateUrl: '/templates/register.html'
    })
    .state('page', {
      url: '/page',
      controller: 'MainCtrl',
      templateUrl: '/templates/page.html'
    })
    .state('login', {
      url: '/login',
      controller: 'AuthCtrl',
      templateUrl: '/templates/login.html'
    })
    // .state('users', {
    //   url: '/users/friends',
    //   templateUrl: '/templates/users.html',
    //   controller: 'UserCtrl',
    //   resolve: {
    //     getUser: ['users', function(users){
    //       return users.getUsers();
    //     }]
    //    }
    // })



  $urlRouterProvider.otherwise('register');
}]);
