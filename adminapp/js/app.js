/**
 * Created by Administrator on 2017/2/17.
 */
var adminApp = angular.module('adminApp', ['ui.router', 'oc.lazyLoad', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ui.bootstrap','mainServices','mainConstant','mainFil','angularFileUpload','isteven-multi-select','ngMessages']);

adminApp.run(['$rootScope','$state','$cookies','roleModularAdmin','getAdminSercive','$stateParams',
    function($rootScope,$state,$cookies,roleModularAdmin,getAdminSercive,$stateParams){
        //$rootScope.modelright = $cookies.getObject('modelright');
        //加载所有权限
        roleModularAdmin.allRight();
        /* 登陆判断 */
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            if(toState.name == 'login')return;
            //获取本地cookies值用作判断是否有登陆
            $rootScope.loginCook =  $cookies.getObject('login');
            if (!$rootScope.loginCook) $state.go('login');

            /* 当前模块权限判断获取角色的权限 */
            if (!$rootScope.roleRightdata) {
                getAdminSercive.roleIdsRight($rootScope.loginCook.id).then(function (res) {
                    if (res.data.code == 0) {
                        //单个角色权限
                        $rootScope.roleRightdata = res.data.data.role.permissionsSet;
                        roterRight(toState.name);
                    }
                })
            }else {
                roterRight(toState.name);
            }
        });
        /* 角色模块管理 */
        function roterRight(url) {
            angular.forEach( $rootScope.roleAllRight,function (data) {
                if ( url == data.url) {
                    $rootScope.Idright = $rootScope.roleRightdata[data.id];
                    if ($rootScope.Idright) {
                        $rootScope.modelright = {};
                        $rootScope.modelright.delete = roleModularAdmin.urlRight('delete',$rootScope.Idright);
                        $rootScope.modelright.update = roleModularAdmin.urlRight('update',$rootScope.Idright);
                        $rootScope.modelright.create = roleModularAdmin.urlRight('create',$rootScope.Idright);
                        $rootScope.modelright.url = url;
                        $cookies.putObject('modelright', $rootScope.modelright);
                    }
                }
            })
        }
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
            .state('field',{
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
            .state('field.companyList',{
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
            .state('field.articleList',{
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
            .state('field.articleadd',{
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
            /*职位列表*/
            .state('field.positionList',{
                url:'/jobList?id$companyName',
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
            .state('field.companyEdit',{
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
            .state('field.manager',{
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
            .state('field.accountadd',{
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
            .state('field.role',{
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
            /* 新增编辑角色 */
            .state('field.addrole',{
                url:'/addrole',
                templateUrl:'tpls/backmodel/addrole.html',
                controller:'addRoleCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'css/backmodel.css',
                        'js/backmodelCtrl.js'
                    ])
                }
            })
            /* 模块管理页面 */
            .state('field.module',{
                url:'/modular',
                templateUrl:'tpls/backmodel/modular.html',
                controller:'modularCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'css/backmodel.css',
                        'js/backmodelCtrl.js'
                    ])
                }
            })
            /* 编辑/新增模块页面 */
            .state('field.addmodular',{
                url:'/addmodular',
                templateUrl:'tpls/backmodel/addmodular.html',
                controller:'addModularCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'css/backmodel.css',
                        'js/backmodelCtrl.js'
                    ])
                }
            })
            /*添加职位*/
            .state('field.jobEdit',{
                url:'/jobEdit?id&companyId&companyName',
                templateUrl:'tpls/jobEdit.html',
                controller:'jobEditCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'css/companyList.css',
                        'js/jobEditCtrl.js'
                    ])
                }
            })
            /*密码修改*/
            .state('field.pwd',{
                url:'/pwd',
                templateUrl:'tpls/backmodel/pwd.html',
                controller:'pwdCtrl',
                controllerAs:'vm',
                resolve: {
                    home_file:_lazyLoad([
                        'js/pwdCtrl.js'
                    ])
                }
            })
    }
])