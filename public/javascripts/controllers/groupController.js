app.controller('GroupCtrl', ['$scope', 'expenses','auth', function($scope, expenses,auth){
  $scope.userinfo= expenses.expenses;
  var userData = [];
  var data= expenses.expenses;
    $scope.currentGroup = data[0].group;



//   $scope.exist= function () {
//     userData=[];
//       for(var i=0 ; i< data.length ; i++){
//         if( data[i].category === $scope.category && data[i].group === auth.currentUserdata.group ){
//             expenses.modifyGroup({ 
//             category:$scope.category,
//             amount:$scope.amount,
//             group: auth.currentUserdata.group,
            
//           }).then(function(){
//              var dat= expenses.expenses;
        
       
//       $scope.query(dat);
              
//               $scope.category = '';
//               $scope.amount = '';
// })
//               return true;
// };
//      }
//   return false;
// }

// Allow to regroup the expenses of the same category

 $scope.query = function(data) {

    grouped = [];

        data.forEach(function (o) {
            if (!this[o.category]) {
            this[o.category] = { category: o.category, amount: 0 };
            grouped.push(this[o.category]);
      }
    this[o.category].amount += o.amount;
}, Object.create(null));

  console.log(grouped);

      };

      $scope.query(data);
      console.log(grouped)

      var databeforeFormat = grouped

          // Launching the chart with formatted value

     chartLauncher = function (databeforeFormat)  {

      var formatData= [];

        for(var i=0 ; i< databeforeFormat.length ; i++){

          var userdata1= {
            key: databeforeFormat[i].category,
            y: databeforeFormat[i].amount          
          };
            formatData.push(userdata1);
        console.log(formatData);

        $scope.data = formatData;

        }
        console.log(formatData)
        // var datatotheSum= formatData;
     } 
     chartLauncher(grouped);


     Sum=function(data)
{
    var a = data[0].amount;
    for (var i = 1; i < data.length; i++) {
        a = a + data[i].amount;
    }
    console.log(a);
    $scope.sum = a;
    return a;
};   
Sum(data);









  
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

}]);