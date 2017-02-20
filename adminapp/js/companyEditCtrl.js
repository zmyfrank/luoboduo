/**
 * Created by Administrator on 2017/2/20.
 */
angular.module('adminApp')
    .controller('companyEditCtrl',function ($scope,getAdminSercive,FileUploader,joblisttype) {
        var vm = this;
        vm.industryData = joblisttype.industrytype;
        vm.creatData = {};
        vm.xxx = function () {
            console.log(vm.output);
        }
    })