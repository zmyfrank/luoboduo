/**
 * Created by Administrator on 2017/2/17.
 */
angular.module('adminApp')
    .controller('companyListCtrl', function ($scope,getAdminSercive) {
        var vm = this;
        /*设定搜索的各种数据*/
        var companyData = {
            /*公司名称*/
            name:vm.name,
            /*产品名称*/
            product:vm.product
        };
        vm.test = function () {
            console.log(vm.name);
            console.log(vm.product);
        }
    })