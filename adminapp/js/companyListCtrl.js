/**
 * Created by Administrator on 2017/2/17.
 */
angular.module('adminApp')
    .controller('companyListCtrl', function ($scope,getAdminSercive,joblisttype) {
        var vm = this;
        vm.joblisttype = joblisttype;
        /*公司数据begin*/
        vm.name = "";
        vm.product = "";
        vm.province = null;
        vm.city = null;
        vm.county = null;
        vm.approved = '';
        vm.freezed = '';
        vm.financing = '';
        vm.industry = '';
        /*获取数据*/
        vm.pagingdata = function (page) {
            /*搜索的参数*/
            var companyData = {
                /*公司名称*/
                name: vm.name,
                /*产品名称*/
                product: vm.product,
                /*行业*/
                industry: vm.industry,
                /*地区*/
                province: vm.province,
                city: vm.city,
                county: vm.county,
                /*认证*/
                approved: vm.approved,
                /*冻结状态*/
                freezed: vm.freezed,
                /*融资状态*/
                financing: vm.financing,
                /*页数*/
                page: page
            };
            getAdminSercive.searchCompany(companyData).then(function (res) {
                if (res.data.code == 0) {
                    vm.companyListData = res.data.data;
                    vm.totalItems = res.data.total;
                }else {
                    alert('获取数据失败，请联系管理员')
                }
            });
        };
        /*清空数据并搜索*/
        vm.clear = function () {
            vm.name = "";
            vm.product = "";
            vm.province = null;
            vm.city = null;
            vm.county = null;
            vm.approved = '';
            vm.freezed = '';
            vm.financing = '';
            vm.industry = '';
            vm.pagingdata(1);
        };
    });