/**
 * Created by Administrator on 2017/2/17.
 */
var routerApp = angular.module('routerApp', ['ui.router', 'oc.lazyLoad','ngCookies','ngAnimate', 'ngSanitize', 'ui.bootstrap',
    'mainDirectives','mainCtrl','mainConstant','mainServices','mainFil']);

routerApp.config(function ($statepProvider,$urlRouterProvider,$locationProvider) {
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded,{serie:true})
        }
    };
    /*当没有输入跳转页面的时候，自动跳转login页面*/
    $urlRouterProvider.when("","/login");
    $statepProvider
        .state('app',{
            url:'',
            templateUrl: ''
        })
})