/**
 * Created by Administrator on 2017/2/17.
 */
angular.module('adminApp')
    .controller('companyListCtrl', function ($scope, getAdminSercive, joblisttype, $uibModal) {
        var vm = this;
        vm.joblisttype = joblisttype;

        /*获取数据*/
        vm.pagingdata = function (page) {
            /*搜索的参数*/
            page?page:1;
            vm.companyData = {
                page:page
            };
            vm.totalItems = {};
            getAdminSercive.searchCompany(vm.companyData).then(function (res) {
                if (res.data.code == 0) {
                    vm.companyListData = res.data.data;
                    vm.totalItems.totals = res.data.total;
                    vm.totalItems.page = page
                } else {
                    alert('获取数据失败，请联系管理员')
                }
            });
        };
        /*清空数据并搜索*/
        vm.clear = function () {
            vm.companyData = {
                page: 1
            };
            vm.pagingdata();
        };
        /*改变认证、冻结状态，传入三个参数，对应的是，type:认证或者冻结，title:第一个模态框的标题，content:第一个模态框的显示内容*/
        vm.getType = function (ele,type,title,content) {
            vm.modleData = {
                title: title,
                content: content
            };
            /*判断改变谁的值*/
            if (type===1) {
                vm.statu = ele.items.approved;
                vm.successName = '修改认证状态成功'
            }else {
                vm.statu = ele.items.freezed;
                vm.successName = '修改冻结状态成功'
            }
            /*用于传入改变数据*/
            vm.changeData = {
                /*公司ID*/
                id: ele.items.id,
                /*公司认证、冻结状态*/
                status: vm.statu,
                /*公司认证、冻结状态 0代表冻结，1代表认证*/
                type: type
            };
            vm.open()
        };
        /*删除操作*/
        vm.deleteCompany = function (ele) {
            /*第一个模态框显示的东西*/
            vm.modleData = {
                title: '确定要删除该公司吗？',
                content: ""
            };
            vm.changeData = ele.items.id;
            /*第二个模态框显示信息*/
            vm.successName = '成功删除此公司！';
            vm.open()
        };

        /*模态2,在模态1中触发*/
        vm.openSub = function (size) {
            //这里很关键,是打开模态框的过程
            $uibModal.open({
                animation: true,//可以写开关来控制
                templateUrl: 'tpls/modaltpls/success.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                controller: 'ModalInstanceCtrl2',//这是模态框的控制器,是用来控制模态框的
                size: size,//模态框的大小尺寸
                resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                    success: function () {//items是一个回调函数
                        return vm.successName;//这个值会被模态框的控制器获取到
                    }
                }
            });
        };
        /*模态1参数是它自己的大小*/
        vm.open = function (size) {
            //这里很关键,是打开模态框的过程
            var modalInstance = $uibModal.open({
                animation: true,//可以写开关来控制
                templateUrl: 'tpls/modaltpls/test.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
                size: size,//模态框的大小尺寸
                resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                    items: function () {//items是一个回调函数
                        return vm.modleData;//这个值会被模态框的控制器获取到
                    }
                }
            });
            /*点击确定之后从执行这里的函数*/
            modalInstance.result.then(function () {//这是一个接收模态框返回值的函数,这个改变的状态可以复用，每个都是如此
                /*改变状态*/
                if (typeof vm.changeData== "object") {
                    if (vm.changeData.status == 1) {
                        vm.changeData.status = 0;
                    } else {
                        vm.changeData.status = 1
                    }
                    /*改变各种状态*/
                    getAdminSercive.changeStatus(vm.changeData).then(function () {
                        vm.openSub();
                        vm.pagingdata(1);
                    });
                    /*删除操作*/
                }else {
                    getAdminSercive.deleteCompany(vm.changeData).then(function () {
                        vm.openSub();
                        vm.pagingdata(1);
                    });
                }
            })
        };

    })
    /*模态框控制器*/
    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
        //这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
        $scope.items = items;//这里就可以去外层主控制器的数据了

        $scope.ok = function () {
            //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
            $uibModalInstance.close('OK');
        };

        $scope.cancel = function () {
            //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
            $uibModalInstance.dismiss('cancel');
        };
    })
    /*模态控制器2*/
    .controller('ModalInstanceCtrl2', function ($scope, $uibModalInstance, success) {
        $scope.success = success;
        $scope.ok = function () {
            $uibModalInstance.close('OK');
        }
    });