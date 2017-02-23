/**
 * Created by Administrator on 2017/2/17.
 */
angular.module('adminApp')
    .controller('companyListCtrl', function ($scope, getAdminSercive, joblisttype, $uibModal) {
        var vm = this;
        vm.joblisttype = joblisttype;
        vm.companyData = {
            page:""
        };
        /*获取数据*/
        vm.pagingdata = function (page) {
            /*搜索的参数*/
            vm.companyData.page = page?page:1;
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
            /*重新给对象赋个值*/
            vm.companyData = {
                page: ""
            };
            vm.pagingdata();
        };
        /*改变认证、冻结状态，传入三个参数，对应的是，type:认证或者冻结，title:第一个模态框的标题，content:第一个模态框的显示内容*/
        vm.getType = function (ele,type,title,content) {
            vm.modleData = {
                title: title,
                content: content,
            };
            /*判断改变谁的值*/
            if (type===1) {
                vm.statu = ele.items.approved;
                vm.modleData.success = '修改认证状态成功'
            }else {
                vm.statu = ele.items.freezed;
                vm.modleData.success = '修改冻结状态成功'
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
            //vm.open()
            return vm.modleData;
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
            vm.modleData.success = '成功删除此公司！';
            //vm.open()
            return vm.modleData
        };
        /*模态框所有回调数据里面的数据*/
        vm.modalRestult = function () {
            if (typeof vm.changeData== "object") {
                if (vm.changeData.status == 1) {
                    vm.changeData.status = 0;
                } else {
                    vm.changeData.status = 1
                }
                /*改变各种状态*/
                getAdminSercive.changeStatus(vm.changeData).then(function () {
                    vm.pagingdata(1);
                });
                /*删除操作*/
            }else {
                getAdminSercive.deleteCompany(vm.changeData).then(function () {
                    vm.pagingdata(1);
                });
            }
        };
    })