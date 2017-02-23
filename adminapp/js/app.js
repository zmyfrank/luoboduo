/**
 * Created by Administrator on 2017/2/17.
 */
var adminApp = angular.module('adminApp', ['ui.router', 'oc.lazyLoad', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ui.bootstrap','mainServices','mainConstant','mainFil','angularFileUpload','isteven-multi-select','ngMessages']);

adminApp.run(['$rootScope','$state','$cookies', function($rootScope,$state,$cookies){
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
             if(toState.name=='login')return;
             //获取本地cookies值用作判断是否有登陆
             $rootScope.loginCook =  $cookies.getObject('login');
             if (!$rootScope.loginCook) {
                 $state.go('login');
             }
        });
    }])

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
            .state('login',{
                url:'/login',
                templateUrl:'tpls/login.html',
                controller:'mainCtrl',
                controllerAs:'vm',
                resolve:{
                    login_file:_lazyLoad([
                        'css/main.css',
                        'js/mainCtrl.js'
                    ])
                }
            })
            /* 公司列表 */
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
            /* article新增页面 */
            .state('app.articleadd',{
                url:'/articleadd?id',
                templateUrl: 'tpls/articleadd.html',
                controller: 'articleaddCtrl',
                controllerAs: 'vm',
                resolve : {
                    home_file:_lazyLoad([
                        'css/article.css',
                        'js/articleaddCtrl.js'
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
                url:'/companyEdit?id',
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
            /* 账户管理 */
            .state('app.account',{
                url:'/account',
                templateUrl:'tpls/backmodel/account.html',
                controller:'accountCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'css/backmodel.css',
                        'js/backmodelCtrl.js'
                    ])
                }
            })
            /* 用户新增/编辑页面 */
            .state('app.accountadd',{
                url:'/accountadd',
                templateUrl:'tpls/backmodel/accountadd.html',
                controller:'accountAddCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'css/backmodel.css',
                        'js/backmodelCtrl.js'
                    ])
                }
            })
            /* 角色管理页面 */
            .state('app.role',{
                url:'/role',
                templateUrl:'tpls/backmodel/role.html',
                controller:'roleCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'css/backmodel.css',
                        'js/backmodelCtrl.js'
                    ])
                }
            })
    }
])