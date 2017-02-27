/**
 * Created by Administrator on 2017/2/18.
 */
angular.module('adminApp')
    .controller('jobListCtrl', function ($scope, joblisttype, getAdminSercive,$location) {
        var vm = this;
        vm.searchId = $location.search().id?$location.search().id:'';
        vm.companyName = $location.search().companyName?$location.search().companyName:'';
        vm.joblisttype = joblisttype;
        /*外面值定义一下这个对象的page属性*/
        vm.jobListData = {
            page: "",
            companyId:vm.searchId
        };
        /*翻页*/
        vm.pagingdata = function (page) {
            /*搜索的参数*/

            vm.jobListData.page = page ? page : 1;
            vm.totalItems = {};
            getAdminSercive.findJobList(vm.jobListData).then(function (res) {
                if (res.data.code == 0) {
                    vm.jobListContent = res.data.data;
                    vm.totalItems.totals = res.data.total;
                    vm.totalItems.page = page
                } else {
                    alert('获取数据失败，请联系管理员')
                }
            });
        };
        /*清除，所有数据设为空，值留一个page*/
        vm.clear = function () {
            vm.jobListData = {
                page: ""
            };
            vm.pagingdata()
        };
        /*上下架操作*/
        vm.getData = function (data) {
            vm.changeData = {};
            vm.changeData.id = data.$parent.items.id;
            vm.changeData.status = data.$parent.items.status
            if (data.$parent.items.status == 1) {
                vm.textData = {
                    title: '下架后该职位将不在前台展示',
                    content: '是否执行下架操作？',
                    success: '已成功下架'
                }
            } else {
                vm.textData = {
                    title: '上架后该职位将在前台展示',
                    content: '是否执行上架操作？',
                    success: '已成功上架'
                }
            }
            return vm.textData;
        };
        /*删除操作*/
        vm.getDeleteData = function (data) {
            vm.changeData={};
            vm.textData = {
                title: '您确定删除这条数据?',
                content: '你确定要执行删除操作吗？',
                success: '删除成功'
            };
            vm.changeData.id = data.items.id;
            return vm.textData;
        };
        /*服务器请求*/
        vm.changeDataFn = function () {
            if (vm.changeData.status==0||vm.changeData.status) {
                vm.changeData.status = vm.changeData.status == 1 ? 0 : 1;
                getAdminSercive.changeProStatu(vm.changeData).then(function () {
                    vm.pagingdata();
                })
            }else {
                getAdminSercive.deletejob(vm.changeData.id).then(function () {
                    vm.pagingdata();
                })
            }

        }
    });