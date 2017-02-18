/**
 * Created by Administrator on 2017/2/17.
 */
angular.module('adminApp')//主要的model名称
.controller('mainCtrl',
    function ($scope) {
        var vm = this;
        vm.name = "我是主要的控制器";
        /* 下拉插件 */
        $scope.oneAtATime = true;  //是只能有一个菜单打开
        $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }
)
