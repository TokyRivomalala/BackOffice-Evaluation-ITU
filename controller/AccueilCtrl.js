pageApp.controller("AccueilCtrl", function($scope,$http,$location,$cookies,$rootScope) {
    console.log("accueil controller")
    $scope.vue = "create";

    //recherche formulaire
    $scope.nom = "";
    $scope.email = "";
    $scope.dateDeb = "";
    $scope.dateFin = "";
    $scope.order = "ASC";
    
    //nouveau utilisateur
    $scope.new_nom = "";
    $scope.new_prenom = "";
    $scope.new_datenaiss = "";
    $scope.new_email = "";
    $scope.new_sexe = "";
    $scope.new_mdp = "";

    //modifier utilisateur
    $scope.update_mdp = "";

    //page
    $scope.currentPage = 1;

    //login
    $rootScope.erreurLogin = "";

    var dateDebStr = "";
    var dateFinStr = "";
    var new_datenaiss_str = "";
    var orderBy = "";

    $scope.modifier = function (util){
        console.log('modifier');
        $scope.editUtil = util;
        $scope.vue = "modifier";
    }

    $scope.nouveau = function (){
        console.log('nouveau')
        $scope.vue = "create";
    }

    $scope.rechercher = function(){
        console.log("rechercher");
        
        if($scope.dateDeb != ""){
            var dd = String($scope.dateDeb. getDate()). padStart(2, '0');
            var mm = String($scope.dateDeb. getMonth() + 1). padStart(2, '0'); //January is 0!
            var yyyy = $scope.dateDeb. getFullYear();
            dateDebStr = dd + '-' + mm + '-' + yyyy;
        }
        if($scope.dateFin != ""){
            var dd = String($scope.dateFin. getDate()). padStart(2, '0');
            var mm = String($scope.dateFin. getMonth() + 1). padStart(2, '0'); //January is 0!
            var yyyy = $scope.dateFin. getFullYear();
            dateFinStr = dd + '-' + mm + '-' + yyyy;
        }

        console.log($scope.currentPage);
        var req = {
            method: 'GET',
            url: 'http://localhost/Web-Service-Evaluation/UtilisateurController/recherche/'+$scope.currentPage+'?nom='+$scope.nom+'&email='+$scope.email+'&dateDeb='+dateDebStr+'&dateFin='+dateFinStr,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            }
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                $scope.utilisateurs = response.data.datas.util;
                $scope.pageCount = response.data.datas.nbPage;
                console.log($scope.pageCount);
                console.log($scope.utilisateurs);
                console.log(response.data);
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    console.log($rootScope.erreurLogin);
                    $location.path('/');
                }
            }
        }, function myError(response) {
            console.log(response);
        });

    }

    $scope.rechercher();

    $scope.tri = function(param){
        console.log(param);

        if($scope.dateDeb != ""){
            var dd = String($scope.dateDeb. getDate()). padStart(2, '0');
            var mm = String($scope.dateDeb. getMonth() + 1). padStart(2, '0'); //January is 0!
            var yyyy = $scope.dateDeb. getFullYear();
            dateDebStr = dd + '-' + mm + '-' + yyyy;
        }
        if($scope.dateFin != ""){
            var dd = String($scope.dateFin. getDate()). padStart(2, '0');
            var mm = String($scope.dateFin. getMonth() + 1). padStart(2, '0'); //January is 0!
            var yyyy = $scope.dateFin. getFullYear();
            dateFinStr = dd + '-' + mm + '-' + yyyy;
        }

        if($scope.order == 'ASC') $scope.order = 'DESC';
        else if ($scope.order == 'DESC') $scope.order = 'ASC';

        orderBy = param;
        
        var req = {
            method: 'GET',
            url: 'http://localhost/Web-Service-Evaluation/UtilisateurController/recherche/'+$scope.currentPage+'?nom='+$scope.nom+'&email='+$scope.email+'&dateDeb='+dateDebStr+'&dateFin='+dateFinStr+'&orderBy='+orderBy+'&order='+$scope.order,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            }
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                $scope.utilisateurs = response.data.datas.util;
                console.log($scope.utilisateurs);
                console.log(response.data);
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    $location.path('/');
                }
            }
        }, function myError(response) {
            console.log(response);
        });

    }

    $scope.create = function(){
        console.log('create');

        if($scope.new_datenaiss != ""){
            var dd = String($scope.new_datenaiss.getDate()). padStart(2, '0');
            var mm = String($scope.new_datenaiss.getMonth() + 1). padStart(2, '0'); //January is 0!
            var yyyy = $scope.new_datenaiss.getFullYear();
            new_datenaiss_str = dd + '-' + mm + '-' + yyyy;
        }

        var formdata = new FormData();
        formdata.append('nom', $scope.new_nom);
        formdata.append('prenom', $scope.new_prenom);
        formdata.append('dateNaiss', new_datenaiss_str);
        formdata.append('email', $scope.new_email);
        formdata.append('sexe', $scope.new_sexe);
        formdata.append('mdp', $scope.new_mdp);
        var req = {
            method: 'POST',
            url: 'http://localhost/Web-Service-Evaluation/UtilisateurController/nouveau',
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            },
            data: formdata
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                console.log(response.data);
                $scope.rechercher();
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    $location.path('/');
                }
            }
        }, function myError(response) {
            console.log(response);
        }); 
    }
    
    $scope.update = function(idutil){
        console.log('update');
        console.log(idutil);
        console.log($scope.update_mdp);
        var formdata = new FormData();
        formdata.append('idutil', idutil);
        formdata.append('mdp', $scope.update_mdp);
        var req = {
            method: 'POST',
            url: 'http://localhost/Web-Service-Evaluation/UtilisateurController/modifier',
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            },
            data: formdata
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                console.log(response.data);
                $scope.rechercher();
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    $location.path('/');
                }
            }
        }, function myError(response) {
            console.log(response);
        }); 
    }

    $scope.delete = function(idutil){
        console.log('delete');
        console.log(idutil);

        var req = {
            method: 'DELETE',
            url: 'http://localhost/Web-Service-Evaluation/UtilisateurController/supprimer/'+idutil,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            }
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                console.log(response.data);
                $scope.rechercher();
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    $location.path('/');
                }
            }
        }, function myError(response) {
            console.log(response);
        }); 
    }

    $scope.deconnexion = function (){
        console.log("deconnexion");
        var req = {
            method : 'POST',
            url : 'http://localhost/Web-Service-Evaluation/AdminController/deconnexion', 
            headers: {
            'Content-Type': undefined,
            'Authorization': 'Bearer ' + $cookies.get('adminToken')
            }
        }
        $http(req).then(
          function mySuccess(response) {
            $cookies.remove("adminToken");
            console.log(response.data);   
            $location.path('/');
          },
          function myError(error) {
            console.log("Unable to perform post request");
            console.log(error.data.message);
          }
        );      
      }


    $scope.exportPdf = function(){
        html2canvas(document.getElementById('listeUtil'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("utilisateur.pdf");
            }
        });
    }


});