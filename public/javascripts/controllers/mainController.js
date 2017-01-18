app.controller('MainCtrl', ['$scope', 'expenses','auth', function($scope, expenses,auth){
  $scope.userinfo= expenses.expenses;
  var userData = [];

  var data= expenses.expenses;

  $scope.exist= function () {
    userData=[];
      for(var i=0 ; i< data.length ; i++){
        if( data[i].category === $scope.category ){
            expenses.modify({ 
            category:$scope.category,
            amount:$scope.amount,
            id: data[i]._id
            
          }).then(function(){
             var dat= expenses.expenses;
        
       
      $scope.query(dat);
              
              $scope.category = '';
              $scope.amount = '';
})
              return true;

};

    

  }
  return false;
}


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
if (!$scope.exist(data))
    {
    expenses.create({ 
      category:$scope.category,
      amount:$scope.amount,
      author: auth.currentUser().current_user,
      author_id: auth.currentUser().current_id,
      group:  auth.currentUserdata.group,
      date: new Date()

      
    }).then(function(){
        //Adding data to graph
        var dat= expenses.expenses;
        
       
      $scope.query(dat);

    $scope.category = '';
    $scope.amount = '';
});
    }

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


    //Secure the Profile User    







//creates the chart with test data...


  // $scope.incrementUpvotes = function(item) {
  //   posts.upvote(item);
  // }
}]);