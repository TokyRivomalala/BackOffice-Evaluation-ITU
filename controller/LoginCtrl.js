pageApp.controller("LoginCtrl", function($scope,$location,$cookies,$http,$rootScope) {

    //erreur
    //$rootScope.erreurLogin = "";

    $scope.login = function () {
        var formdata = new FormData();
        formdata.append('email', $scope.email);
        formdata.append('mdp', $scope.mdp);
        var req = {
            method: 'POST',
            url: 'http://localhost/Web-Service-Evaluation/AdminController/checkLogin',
            headers: {
                'Content-Type': undefined
            },
            data: formdata
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                console.log(response.data);
                $cookies.put("adminToken", response.data.datas.token);
                $location.path('accueil');
            }
            else {
                $rootScope.erreurLogin = response.data.datas.exception;
                console.log(response.data);    
            }
        }, function myError(response) {
            console.log(response);
        }); 
    }
});