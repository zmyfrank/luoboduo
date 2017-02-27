/**
 * Created by ivws on 2017/1/21.
 */

var routerApp = angular.module('routerApp', ['ui.router', 'oc.lazyLoad','ngCookies','ngAnimate', 'ngSanitize', 'ui.bootstrap',
    'mainDirectives','mainCtrl','mainConstant','mainServices','mainFil']);

routerApp.run(['$rootScope','$state','$cookies', function($rootScope,$state,$cookies){
    if ($cookies.get('pages')) {
        return
    }else {
        $cookies.put('pages', 1);
    }
}])

routerApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider',
    function ($stateProvider, $urlRouterProvider,$locationProvider) {

        var _lazyLoad = function (loaded) {
            return function ($ocLazyLoad) {
                return $ocLazyLoad.load(loaded, {serie: true});
            }
        };

        $urlRouterProvider.when("","/home")
        $stateProvider
            .state('app', {
                url: '',
                templateUrl: 'tpls/main.html',
                controller: 'mainHtmlCtrl',
                controllerAs: 'vm',
            })
            /* 首页 */
            .state('app.home', {
                url: '/home',
                templateUrl: 'tpls/home.html',
                controller: 'homeHtmlCtrl',
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
                controller: 'jobHtmlCtrl',
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
                controller: 'eliteHtmlCtrl',
                controllerAs: 'vm',
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
                controller: 'weCtrl',
                controllerAs: 'vm',
                resolve: {
                    home_file: _lazyLoad([
                        'css/we.css'
                    ])
                }
            })
            /* 公司列表 */
            .state('app.companylist', {
                url: '/companylist?name',
                templateUrl: 'tpls/companylist.html',
                controller:'companyListCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file: _lazyLoad([
                        'css/position.css'
                    ])
                }
            })
            /* 最新/推荐职业列表 */
            .state('app.joblist', {
                url: '/joblist?new',
                templateUrl: 'tpls/joblist.html',
                controller:'jobListCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file: _lazyLoad([
                        'css/position.css'
                    ])
                }
            })
            /* 公司详情 */
            .state('app.companyinfo',{
                url: '/companyinfo?id',
                templateUrl: 'tpls/companyinfo.html',
                controller:'companyInfoCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file: _lazyLoad([
                        'css/companyinfo.css'
                    ])
                }
            })
            /*职位详情*/
            .state('app.jobinfo',{
                url: '/jobinfo?id',
                templateUrl: 'tpls/jobinfo.html',
                controller:'jobInfoCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file: _lazyLoad([
                        'css/jobinfo.css'
                    ])
                }
            })
            /*职位搜索页面*/
            .state('app.searchjob',{
                url:'/searchjob?type&subtype',
                templateUrl:'tpls/searchjob.html',
                controller:'searchjobCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'css/position.css'
                    ])
                }
            })
        //$locationProvider.html5Mode(true);
    }
])
