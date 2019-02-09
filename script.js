var app=angular.module('myApp',['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'login.html',
            controller:'loginCtrl'
        })
        .when('/dashboard',{
            templateUrl:'dashboard.html',
            controller:'dashboardCtrl'
        })
        .otherwise({
            redirectTo:'/'
        })
});

app.controller('loginCtrl',function($scope,$location){

    $scope.signup=function(){
        auth.createUserWithEmailAndPassword($scope.mail,$scope.parola).then(sonuc=>{
            console.log(sonuc.user);
            
        })
    }

    $scope.login=function(){
        auth.signInWithEmailAndPassword($scope.mail,$scope.parola).then(sonuc=>{
            $location.path('/dashboard')
        })
    }
});

app.controller('dashboardCtrl',function($scope){

    $scope.add=function(){

        db.collection('makaleler').add({
            baslik:$scope.baslik,
            icerik:$scope.icerik
        }).then(()=>{
            console.log("ekleme işlemi başarılı");   
        }).catch(err=>{
            console.log(err.message);
        })
    }

    var ul=document.getElementById('ul');

    db.collection('makaleler').onSnapshot(snap=>{
        //console.log(snap.docs);
        var belgeler=snap.docs;
        if(belgeler.length){
            let html=''
            belgeler.forEach(belge=>{
               // console.log(belge);
                var data=belge.data();
                var li=`<li class="list-group-item">${data.baslik}---${data.icerik}</li>`;
                html +=li;
            })
            ul.innerHTML=html;
        }
    })
}) 