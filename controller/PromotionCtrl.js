
pageApp.controller("PromotionCtrl", function(ExcelFactory,$scope,$http,$location,$cookies,$rootScope,$timeout) {
    console.log("utilisateur controller")
    $scope.vue = "createe";

    $scope.getPourcentage = function(){
        console.log("rechercher");
        $scope.prc = "";
        console.log($scope.currentPage);
        var req = {
            method: 'GET',
            url: 'http://localhost/Web-Service-Evaluation/PromotionController/selectPourcentage',
            //url: 'https://ws-evaluation-itu.herokuapp.com/UtilisateurController/recherche/'+$scope.currentPage+'?nom='+$scope.nom+'&email='+$scope.email+'&dateDeb='+dateDebStr+'&dateFin='+dateFinStr,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            }
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                $scope.pageIsVisible = "oui";
                $scope.aucunUtilisateur = "";
                $scope.prc = response.data.datas;
                console.log($scope.prc);
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    console.log($rootScope.erreurLogin);
                    $location.path('/');
                }
                if(response.data.message == "Aucun Article"){
                    $scope.utilisateurs = "";
                    $scope.aucunUtilisateur = "Aucun resultat trouve";
                    $scope.pageIsVisible = "non";
                }
            }
        }, function myError(response) {
            console.log(response);
        });

    }

    //sexe
    $scope.getPourcentage();
    console.log($scope.prc);
    $scope.sexeSelect = $scope.prc;
    console.log($scope.sexeSelect);

    console.log($scope.sexeSelect);

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
    $scope.pageIsVisible = "oui";

    //erreur
    $scope.aucunUtilisateur = "";
    $scope.erreurInsert = "";
    $scope.erreurUpdate = "";

    //login
    $rootScope.erreurLogin = "";


    //test date
    $scope.test_date = "";
    $scope.test_time = "";
    var dateStr = "";

    var dateDebStr = "";
    var dateFinStr = "";
    var new_datenaiss_str = "";
    var orderBy = "";

    var dateAndTimeToStr = function(inputDate,inputTime){
        var res = "";
        if(inputDate != "" && inputTime != ""){
            var dd = String(inputDate.getDate()). padStart(2, '0');
            var mm = String(inputDate.getMonth() + 1). padStart(2, '0'); //January is 0!
            var yyyy = inputDate.getFullYear();
            res = dd + '-' + mm + '-' + yyyy;

            var hh = inputTime.getHours();
            var min = inputTime.getMinutes();
            var sec = inputTime.getSeconds();
            res = res + " " + hh + ":" + min + ":" + sec ;
        }
        return res;
    }

    var dateToStr = function(inputDate){
        var res = "";
        if(inputDate != ""){
            var dd = String(inputDate.getDate()). padStart(2, '0');
            var mm = String(inputDate.getMonth() + 1). padStart(2, '0'); //January is 0!
            var yyyy = inputDate.getFullYear();
            res = dd + '-' + mm + '-' + yyyy;
        }
        return res;
    }

    $scope.getArticle = function(){
        console.log("rechercher");

        console.log($scope.currentPage);
        var req = {
            method: 'GET',
            url: 'http://localhost/Web-Service-Evaluation/ArticleController/selectComplet/'+$scope.currentPage,
            //url: 'https://ws-evaluation-itu.herokuapp.com/UtilisateurController/recherche/'+$scope.currentPage+'?nom='+$scope.nom+'&email='+$scope.email+'&dateDeb='+dateDebStr+'&dateFin='+dateFinStr,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            }
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                $scope.pageIsVisible = "oui";
                $scope.aucunUtilisateur = "";
                $scope.article = response.data.datas.article;
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
                if(response.data.message == "Aucun Article"){
                    $scope.utilisateurs = "";
                    $scope.aucunUtilisateur = "Aucun resultat trouve";
                    $scope.pageIsVisible = "non";
                }
            }
        }, function myError(response) {
            console.log(response);
        });

    }

    $scope.getPourcentage = function(){
        console.log("rechercher");

        console.log($scope.currentPage);
        var req = {
            method: 'GET',
            url: 'http://localhost/Web-Service-Evaluation/PromotionController/selectPourcentage',
            //url: 'https://ws-evaluation-itu.herokuapp.com/UtilisateurController/recherche/'+$scope.currentPage+'?nom='+$scope.nom+'&email='+$scope.email+'&dateDeb='+dateDebStr+'&dateFin='+dateFinStr,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            }
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                $scope.pageIsVisible = "oui";
                $scope.aucunUtilisateur = "";
                $scope.prc = response.data.datas;
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    console.log($rootScope.erreurLogin);
                    $location.path('/');
                }
                if(response.data.message == "Aucun Article"){
                    $scope.utilisateurs = "";
                    $scope.aucunUtilisateur = "Aucun resultat trouve";
                    $scope.pageIsVisible = "non";
                }
            }
        }, function myError(response) {
            console.log(response);
        });

    }

    $scope.getArticle();

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
            //url: 'https://ws-evaluation-itu.herokuapp.com/UtilisateurController/recherche/'+$scope.currentPage+'?nom='+$scope.nom+'&email='+$scope.email+'&dateDeb='+dateDebStr+'&dateFin='+dateFinStr,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            }
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                $scope.pageIsVisible = "oui";
                $scope.aucunUtilisateur = "";
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
                if(response.data.message == "Aucun Utilisateur"){
                    $scope.utilisateurs = "";
                    $scope.aucunUtilisateur = "Aucun resultat trouve";
                    $scope.pageIsVisible = "non";
                }
            }
        }, function myError(response) {
            console.log(response);
        });

    }

    //$scope.rechercher();

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
            //url: 'https://ws-evaluation-itu.herokuapp.com/UtilisateurController/recherche/'+$scope.currentPage+'?nom='+$scope.nom+'&email='+$scope.email+'&dateDeb='+dateDebStr+'&dateFin='+dateFinStr+'&orderBy='+orderBy+'&order='+$scope.order,
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            }
        }

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                $scope.pageIsVisible = "oui";
                $scope.aucunUtilisateur = "";
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
                if(response.data.message == "Aucun Utilisateur"){
                    $scope.utilisateurs = "";
                    $scope.aucunUtilisateur = "Aucun resultat trouve";
                    $scope.pageIsVisible = "non";
                }
            }
        }, function myError(response) {
            console.log(response);
        });

    }

    $scope.create = function(){
        console.log('create');

        new_datenaiss_str = dateToStr($scope.new_datenaiss);
        console.log($scope.new_sexe);

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
            //url: 'https://ws-evaluation-itu.herokuapp.com/UtilisateurController/nouveau',
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            },
            data: formdata
        }

        $scope.new_nom = "";
        $scope.new_prenom = "";
        $scope.new_datenaiss = "";
        $scope.new_email = "";
        $scope.new_sexe = "";
        $scope.new_mdp = "";

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                console.log(response.data);
                $scope.erreurInsert = "";
                $scope.rechercher();
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    $location.path('/');
                }
                if(response.data.message == "Erreur d'insertion"){
                    $scope.erreurInsert = response.data.datas.exception;
                }
            }
        }, function myError(response) {
            console.log(response);
        }); 
    }

    $scope.newPourcentage = function(){
        console.log('create prc');

        var formdata = new FormData();
        formdata.append('pourcentage', $scope.new_pourcentage);
        var req = {
            method: 'POST',
            url: 'http://localhost/Web-Service-Evaluation/PromotionController/nouveauPourcentage',
            //url: 'https://ws-evaluation-itu.herokuapp.com/UtilisateurController/nouveau',
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            },
            data: formdata
        }

        $scope.new_pourcentage = "";

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                console.log(response.data);
                $scope.erreurPourcentage = "";
                $scope.getArticle();
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    $location.path('/');
                }
                if(response.data.message == "Erreur d'insertion"){
                    $scope.erreurPourcentage = response.data.datas.exception;
                }
            }
        }, function myError(response) {
            console.log(response);
        }); 
    }

    $scope.newGratuit = function(){
        console.log('create gratuit');

        var formdata = new FormData();
        formdata.append('nbmin', $scope.new_min);
        formdata.append('nbgratuit', $scope.new_gratuit);
        var req = {
            method: 'POST',
            url: 'http://localhost/Web-Service-Evaluation/PromotionController/nouveauGratuit',
            //url: 'https://ws-evaluation-itu.herokuapp.com/UtilisateurController/nouveau',
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            },
            data: formdata
        }

        $scope.new_min = "";
        $scope.new_gratuit = "";

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                console.log(response.data);
                $scope.erreurGratuit = "";
                $scope.getArticle();
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    $location.path('/');
                }
                if(response.data.message == "Erreur d'insertion"){
                    $scope.erreurGratuit= response.data.datas.exception;
                }
            }
        }, function myError(response) {
            console.log(response);
        }); 
    }
    
    $scope.update = function(idarticle){
        console.log('update');
        console.log(idarticle);
        console.log($scope.update_pourcentage);
        console.log($scope.update_gratuit);

        var formdata = new FormData();
        formdata.append('idarticle', idarticle);
        formdata.append('idpourcentage', $scope.update_pourcentage);
        formdata.append('idgratuit', $scope.update_gratuit);
        var req = {
            method: 'POST',
            url: 'http://localhost/Web-Service-Evaluation/PromotionController/modifier',
            //url: 'https://ws-evaluation-itu.herokuapp.com/UtilisateurController/modifier',
            headers: {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + $cookies.get('adminToken')
            },
            data: formdata
        }

        $scope.update_pourcentage = "";
        $scope.update_gratuit = "";

        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                console.log(response.data);
                $scope.erreurUpdate = "";
                $scope.getArticle();
            }
            else {
                console.log(response.data);    
                if(response.data.datas.exception == "Veuiller d'abord vous connecter"){
                    $rootScope.erreurLogin = response.data.datas.exception;
                    $location.path('/');
                }
                if(response.data.message == "Erreur de modification"){
                    $scope.erreurUpdate = response.data.datas.exception;
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
            //url: 'https://ws-evaluation-itu.herokuapp.com/UtilisateurController/supprimer/'+idutil,
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
            //url : 'https://ws-evaluation-itu.herokuapp.com/AdminController/deconnexion', 
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

    $scope.testDate = function(){
        console.log("test date");

        console.log($scope.test_date);
        console.log($scope.test_time);

        var dateStr = dateAndTimeToStr ($scope.test_date , $scope.test_time);
        console.log(dateStr);

        var formdata = new FormData();
        formdata.append('date', dateStr);

        var req = {
            method : 'POST',
            url : 'http://localhost/Web-Service-Evaluation/AdminController/nouveauDate', 
            //url : 'https://ws-evaluation-itu.herokuapp.com/AdminController/deconnexion', 
            headers: {
            'Content-Type': undefined,
            },
            data : formdata

        }
        $http(req).then(function mySuccess(response) {
            if (response.data.status == "success") {
                console.log(response.data);
                $scope.rechercher();
            }
            else {
                console.log(response.data);    
                if(response.data.message == "Erreur d'insertion"){
                    $scope.erreurInsert = response.data.datas.exception;
                }
            }
        }, function myError(response) {
            console.log(response);
        }); 
    }

    $scope.exportExcel = function(tableId){ // ex: '#my-table'
        console.log("export Excel");
        $scope.exportHref = ExcelFactory.tableToExcel(tableId,'resultat');
        $timeout(function(){location.href=$scope.exportHref;},100); // trigger download
    }
});