/**
 * Created by Administrator on 2017/2/17.
 */
var adminApp = angular.module('routerApp', ['ui.router', 'oc.lazyLoad','ngCookies','ngAnimate', 'ngSanitize', 'ui.bootstrap',
    'mainDirectives','mainCtrl','mainConstant','mainServices','mainFil']);

adminApp.config(function ($statepProvider,$urlRouterProvider,$locationProvider) {
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded,{serie:true})
        }
    };
    /*当没有输入跳转页面的时候，自动跳转login页面*/
    $urlRouterProvider.when("","/home");
    $statepProvider
        .state('app',{
            url:'',
            templateUrl: 'tpls/main.html',
            controller: 'mainhtmlCtrl',
            controllerAs: 'vm',
            resolve : {
                home_file:_lazyLoad([
                    'css/home.css','js/mainCtrl.js'
                ])
            }
        })
        .state('app.home',{
            url:'',
            templateUrl: 'tpls/home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
})