/**
 * Created by Administrator on 2017/2/17.
 */
var adminApp = angular.module('adminApp', ['ui.router', 'oc.lazyLoad', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ui.bootstrap','mainServices','mainConstant','mainFil','angularFileUpload','isteven-multi-select','ngMessages']);

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
            /* 主页面 */
            .state('app',{
                url:'/app',
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
            /* article管理页面 */
            .state('app.article',{
                url:'/article',
                templateUrl: 'tpls/article.html',
                controller: 'articleCtrl',
                controllerAs: 'vm',
                resolve : {
                    home_file:_lazyLoad([
                        'css/article.css',
                        'js/articleCtrl.js'
                    ])
                }
            })
            /*职位详情页面*/
            .state('app.jobList',{
                url:'/jobList',
                templateUrl: 'tpls/jobList.html',
                controller:'jobListCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'css/companyList.css',
                        'js/jobListCtrl.js'
                    ])
                }
            })
        /*添加公司*/
            .state('app.companyEdit',{
                url:'/companyEdit',
                templateUrl:'tpls/companyEdit.html',
                controller:'companyEditCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'css/companyList.css',
                        'js/companyEditCtrl.js'
                    ])
                }
            })

    }
])