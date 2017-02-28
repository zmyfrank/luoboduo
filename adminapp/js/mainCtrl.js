/**
 * Created by Administrator on 2017/2/17.
 */
angular.module('adminApp')//主要的model名称
.controller('mainCtrl',
    function ($scope,$rootScope,$cookies,getAdminSercive,$location,roleModularAdmin) {
        var vm = this;
        /* 登陆 */
        vm.login = function () {
            getAdminSercive.login2(vm.logindata).then(function (res) {
                if (res.data.code == 0 ) {
                    //console.log(res.data.data)
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 1);
                    $cookies.putObject('login',
                        {'status':true,
                         'manager':res.data.data.manager.name,
                         'role':res.data.data.role.name,
                         'id': res.data.data.role.id,
                        },
                        [{'expires':expireDate}]);
                    $location.url('app');
                    roleModularAdmin.allRight();
                }else {
                    vm.loginMessage = res.data.message;
                }
            })
        }

        vm.logindata = $cookies.getObject('login');

        /* 退出登陆 */
        vm.outlogin =function () {
            getAdminSercive.outLogin().then(function (res) {
                if (res.data.code == 0 ) {
                    $cookies.remove('login');
                    $cookies.remove('modelright');
                    $rootScope.roleRightdata = null;
                    $location.url('login');
                }
            })
        }

        /* 下拉插件 */
        $scope.oneAtATime = true;  //是只能有一个菜单打开
        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };

    }
)
