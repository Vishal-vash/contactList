var app = angular.module('contactListApp', []);

app.controller('contactListCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.
        get('/contactList').then(function (res) {
            $scope.contactList = res.data;
        },
        function (err) {
            console.log(err);
        }
        );


    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post('/contactList', $scope.contact).then(function (res) {
            $scope.contactList.push(res.data);
        })
    }

    $scope.remove = function(id){
        $http.delete('/contactList/'+id).then(function(res){
            var index = ($scope.contactList).findIndex(item => item._id === id);
            ($scope.contactList).splice(index, 1);
            console.log(index)
        })
    }
}])
