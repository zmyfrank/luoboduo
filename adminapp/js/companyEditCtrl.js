/**
 * Created by Administrator on 2017/2/20.
 */
angular.module('adminApp')
    .controller('companyEditCtrl',function ($scope,getAdminSercive,FileUploader,joblisttype) {
        var vm = this;
        vm.industryData = joblisttype.industrytype;
        vm.taglist = []
        vm.creatData = {
            taglist:vm.taglist.join(',')
        };
        /*标签绑定*/
        vm.joblisttype = joblisttype
        vm.addTag = function () {
            if (vm.taglist.indexOf(vm.tag)==-1) {
                vm.taglist.push(vm.tag)
            }
        }
        vm.deleteTag =function (index) {
            vm.taglist.slice(index,1)
        }
    })