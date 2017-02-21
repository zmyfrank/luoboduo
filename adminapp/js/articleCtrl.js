/**
 * Created by ivws on 2017/2/17.
 */
/* article列表页面 */

angular.module('adminApp')
    .controller('articleCtrl',
        function ($scope,getAdminSercive,$http,articlemodealinfo) {
            var vm = this;

            /* 搜索值 */
            vm.arcitle = {
                //创建者
                author:'',
                //标题
                title:'',
                //状态
                status:'',
                //类型
                type:'',
                //终止更新时间
                endAt: '',
                //起始更新时间
                startAt: '',
            }

            /* 搜索事件 */
            vm.search = function (page) {
                vm.arcitle.page = page ? page : 1 ;
                vm.arcitle.endAt = vm.enddata ? vm.enddata : '';
                vm.arcitle.startAt = vm.startdata? vm.startdata : '';
                vm.arcitleHttp(vm.arcitle);
            }
            /* 清除事件 */
            vm.clean = function () {
                for(k in vm.arcitle) {
                    vm.arcitle[''+k] = '';
                }
                vm.enddata = '';
                vm.startdata ='';
                vm.arcitleHttp(vm.arcitle);
            }

            //arcitle请求
            vm.arcitleHttp = function (params){
                getAdminSercive.searchArcitle(params).then(function (res) {
                    if (res.data.code == 0) {
                        //console.log(res.data.data)
                        vm.arcitledata = res.data.data.articleList;
                        vm.totalItems = res.data.data.total;
                    }
                })
            }
            /* 进入初始调用 */
            vm.search()
            /* 分页 */
            vm.pagingdata = vm.search;
            /* 上 下 线 */
            /* 提示信息 */
            vm.stastusinfo = function (ele) {
                ele.data.status == 2 ? info = '下线':info = '上线';
                vm.statusnumber = ele.data.status == 2 ? 1: 2;
                vm.id =  ele.data.id;
                articlemodealinfo.status = [info+'后该图片将不展示站轮播banner中。','是否执行'+info+'操作？',info+'成功'];
            }

            /* 确认后处理函数 */
            vm.stastus = function () {
                $http({
                    method:'POST',
                    url:'/carrots-admin-ajax/a/login?name=admin&pwd=123456',
                }).then(function (res) {
                    if (res.data.code == 0) {
                        $http({
                            method:'PUT',
                            url:'/carrots-admin-ajax/a/u/article/status',
                            params:{
                                id:vm.id,
                                status:vm.statusnumber
                            }
                        }).then(function (res) {
                            if (res.data.code == 0) {
                                vm.arcitleHttp(1);
                            }
                        })
                    }
                })
            }
            /* 删除 */
            //提示信息
            vm.deleteinfo =function () {
                articlemodealinfo.delete = ['从数据库中删除将无法回复','是否执行删除操作？','删除成功'];
            }
            /* 确认后处理函数 */
            vm.delete =function (ele) {
                console.log(ele,this,$scope);
            }
        }
    )
    //article模态框的提示信息
    .value('articlemodealinfo',{
        status: '',
        delete:'',
    })
    // Please note that $uibModalInstance represents a modal window (instance) dependency.
    // It is not the same as the $uibModal service used above.
    .controller('articleModalInstanceCtrl', function ($scope,$uibModalInstance,items) {
    //这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
        $scope.items = items;//这里就可以去外层主控制器的数据了

        $scope.ok = function () {
            //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
            $uibModalInstance.close('ok');
        };

        $scope.cancel = function () {
            //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
            $uibModalInstance.dismiss('cancel');
        };
    })
    //必须要引入的模块有两个ngAnimate\ui.bootstrap,一个都不能少,必须在这个模板加载的时候引入
    .directive('myModeal',function ($uibModal,articlemodealinfo) {
        return {
            restrict: 'AE',
            replace: false,
            //templateUrl: 'tpls/dirtpls/mymodeal.html',
            scope: {
                ngModel : '@', //模态1
                ngModel2:'@',  //模态2
                tipstext:'@',  //value中的值
                operation: '=', //点击确定都的函数
                tipsinfo:'&', //调用控制器中的函数，获取提示信息
            },
            link: function (scope, ele, attrs, supermanCtrl) {
                scope.html = scope.ngModel; //模态html初始赋值
                scope.$parent.open = function (size) {
                    scope.tipsinfo();
                    scope.items = articlemodealinfo[''+scope.tipstext]; //赋值给模态控制器的值

                    //这里很关键,是打开模态框的过程
                    var modalInstance = $uibModal.open({
                        animation: scope.animationsEnabled,//打开时的动画开关
                        templateUrl: 'tpls/dirtpls/'+scope.html,//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                        controller:'articleModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
                        size: size,//模态框的大小尺寸
                        resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                            items: function () {//items是一个回调函数
                                return scope.items;//这个值会被模态框的控制器获取到
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
                        scope.selected = selectedItem;//模态框的返回值
                        if (scope.selected == 'ok') {
                            scope.operation();           //点击确定的处理函数
                            scope.html = scope.ngModel2; //更换模内容
                            scope.$parent.open();
                            scope.html = scope.ngModel;  //还原模态内容
                        }
                    }, function () {
                        //console.log('模态已关闭: ' + new Date());
                    });
                }
                scope.animationsEnabled = true;
                scope.toggleAnimation = function () {
                    scope.animationsEnabled = !scope.animationsEnabled;//动画效果
                };
            }
        }
    })
    .directive('myModealBox',function () {
        return {
            restrict:'AE',
            repace:false,
            scope:true,
        }
    })