/**
 * Created by Administrator on 2017/2/18.
 */
angular.module('adminApp')
    .controller('jobListCtrl',function ($scope,joblisttype,getAdminSercive) {
        var vm = this;
        vm.joblisttype = joblisttype;
        /*外面值定义一下这个对象的page属性*/
        vm.jobListData = {
            page:""
        };
        /*翻页*/
        vm.pagingdata = function (page) {
            /*搜索的参数*/

            vm.jobListData.page = page?page:1;
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
        /*清除*/
        vm.clear = function () {
            vm.jobListData = {
                page:""
            };
            vm.pagingdata()
        }
    })