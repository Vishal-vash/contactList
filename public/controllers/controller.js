var app = angular.module('contactListApp', []);

app.controller('contactListCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.showAddDevice = true;
    $scope.showSave = false;

    var refresh = function(){
        $http.
            get('/contactList').then(function (res) {
                $scope.contactList = res.data;
            },
            function (err) {
                console.log(err);
            }
        );
        $scope.contact=null;
    }
    refresh();    

// Add Contact
    $scope.addContact = function () {
        $http.post('/contactList', $scope.contact).then(function (res) {
           refresh();            
        })
    }

//Remove Contact
    $scope.remove = function(id){
        $http.delete('/contactList/'+id).then(function(res){
            refresh();  
        })
    }

//Edit Contact
    $scope.edit = function(id){
        $http.get('/contactList/'+id).then(function(res){
            $scope.contact = res.data;
            $scope.showSave = true;
            $scope.showAddDevice = false;
        })
    }

    $scope.update = function(id){
        $http.put('/contactList/'+$scope.contact._id, $scope.contact).then(function(res){
            $scope.showSave = false;
            $scope.showAddDevice = true;
            refresh();
        })
    }

    $scope.cancel = function(id){
        $scope.showSave = false;
        $scope.showAddDevice = true;
        refresh();  
    }
    
}])
