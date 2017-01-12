app.controller('MainCtrl', ['$scope', 'expenses','auth','$http', function($scope, expenses,auth,$http){
  // $scope.expenses = expenses.expenses;
  $scope.userinfo= expenses.expenses;
  var userData = [];
  // $scope.data = userData;


 $scope.query = function(dat) {
        userData= [];

        for(var i=0 ; i< dat.length ; i++){

          var userdata1= {
            key: dat[i].category,
            y: dat[i].amount
          };
            console.log("1" + userData)
            userData.push(userdata1);
            console.log('2' + userData);
            
        $scope.data = userData;

            
        }

      };

      $scope.query(expenses.expenses);

  
  $scope.addExpense = function() {
    if ($scope.category === '') { return; }

    
    expenses.create({ 
      category:$scope.category,
      amount:$scope.amount,
      author: auth.currentUser()
    }).then(function(){
        //Adding data to graph
        var dat= expenses.expenses;
        
       
      $scope.query(dat);

    $scope.category = '';
    $scope.amount = '';
});


  }

$scope.options = {
            chart: {
                type: 'pieChart',
                height: 650,
                useInteractiveGuideline: true,

                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                donut:true,
                donutRatio:0.3,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };





//creates the chart with test data...


  // $scope.incrementUpvotes = function(item) {
  //   posts.upvote(item);
  // }
}]);