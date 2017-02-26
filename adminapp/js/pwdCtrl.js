/**
 * Created by Administrator on 2017/2/25.
 */
angular.module('adminApp')
    .controller('pwdCtrl',function ($scope,getAdminSercive,$uibModal) {
        var vm = this;
        vm.pwdData = {
        };
        /*这个东西要全部return回去才能使用then方法*/
        vm.pwdChange = function () {
           return getAdminSercive.pwd(vm.pwdData).then(function (res) {
                if (res.data.message=="success") {
                   return vm.modaldata= {
                        title:'',
                        content:"修改成功"
                    }
                }else {
                   return vm.modaldata= {
                        title:'',
                        content:res.data.message
                    }
                }
            })
        };
    })