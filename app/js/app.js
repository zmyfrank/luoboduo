/**
 * Created by ivws on 2017/1/21.
 */

var routerApp = angular.module('routerApp', ['ui.router', 'oc.lazyLoad','ngCookies','ngAnimate', 'ngSanitize', 'ui.bootstrap',
    'mainDirectives','mainCtrl','mainConstant','mainServices']);

routerApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider',
    function ($stateProvider, $urlRouterProvider,$locationProvider) {

        var _lazyLoad = function (loaded) {
            return function ($ocLazyLoad) {
                return $ocLazyLoad.load(loaded, {serie: true});
            }
        };

        $urlRouterProvider.when("","/home")
        $stateProvider
            .state('app',{
                url:'',
                templateUrl:'tpls/main.html',
                controller:'mainHtmlCtrl',
                controllerAs:'vm',
            })
            /* 首页 */
            .state('app.home', {
                url: '/home',
                templateUrl: 'tpls/home.html',
                controller:'homeHtmlCtrl',
                controllerAs: 'vm',
                resolve: {
                    home_file: _lazyLoad([
                        'css/home.css'
                    ])
                }
            })
            /* 找职位 */
            .state('app.position', {
                url: '/position',
                templateUrl: 'tpls/position.html',
                controller:'jobHtmlCtrl',
                controllerAs: 'vm',
                resolve: {
                    home_file: _lazyLoad([
                        'css/position.css'
                    ])
                }
            })
            /* 找精英 */
            .state('app.elite', {
                url: '/elite',
                templateUrl: 'tpls/elite.html',
                resolve: {
                    home_file: _lazyLoad([
                        'css/elite.css'
                    ])
                }
            })
            /* 关于我们 */
            .state('app.we', {
                url: '/we',
                templateUrl: 'tpls/we.html',
                controller:'weCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file: _lazyLoad([
                        'css/we.css'
                    ])
                }
            })
        //$locationProvider.html5Mode(true);
    }
])
