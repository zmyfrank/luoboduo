/**
 * Created by Administrator on 2017/2/17.
 */
var adminApp = angular.module('adminApp', ['ui.router', 'oc.lazyLoad', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ui.bootstrap','mainServices']);

adminApp.config(['$stateProvider', '$urlRouterProvider',
    function ($statepProvider, $urlRouterProvider) {
        var _lazyLoad = function (loaded) {
            return function ($ocLazyLoad) {
                return $ocLazyLoad.load(loaded, {serie: true})
            }
        };
        /*当没有输入跳转页面的时候，自动跳转main页面*/
        $urlRouterProvider.when("", "/app");
        $statepProvider
            .state('app', {
                url: '/app',
                templateUrl: 'tpls/main.html',
                controller: 'mainCtrl',
                controllerAs: 'vm',
                resolve: {
                    home_file: _lazyLoad([
                        'css/main.css',
                        'js/mainCtrl.js'
                    ])
                }
            })
            .state('app.companyList',{
                url: '/companyList',
                templateUrl: 'tpls/companyList.html',
                controller: 'companyListCtrl',
                controllerAs: 'vm',
                resolve: {
                    home_file: _lazyLoad([
                        'css/companyList.css',
                        'js/companyListCtrl.js'
                    ])
                }
            })

    }
])
    .controller('AccordionDemoCtrl', function ($scope) {
        $scope.oneAtATime = true;
        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
        };
    });
