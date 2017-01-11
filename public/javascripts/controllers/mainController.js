app.controller('MainCtrl', ['$scope', 'expenses','auth', function($scope, expenses,auth){
  $scope.expenses = expenses.expenses;




  $scope.addExpense = function() {
    if ($scope.category === '') { return; }

    expenses.create({ 
      category:$scope.category,
      amount:$scope.amount,
      author: auth.currentUser()
    });

    $scope.category = '';
    $scope.amount = '';
  }

// var ctx = document.getElementById("myChart").getContext('2d');
// var myChart = new Chart(ctx, {
//   type: 'doughnut',
//   data: {
//     labels: ["M", "T", "W", "T", "F", "S", "S"],
//     datasets: [{
//       backgroundColor: [
//         "#2ecc71",
//         "#3498db",
//         "#95a5a6",
//         "#9b59b6",
//         "#f1c40f",
//         "#e74c3c",
//         "#34495e"
//       ],
//       data: [12, 19, 3, 17, 28, 24, 7]
//     }]
//   }
// });

$scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
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

        $scope.data = [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: .5
            }
        ];

//creates the chart with test data...


  // $scope.incrementUpvotes = function(item) {
  //   posts.upvote(item);
  // }
}]);