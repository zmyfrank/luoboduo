/**
 * Created by ivws on 2017/2/22.
 */
angular.module('adminApp')
    .controller('accountCtrl',function ($scope,$filter,getAdminSercive,backStageAdmin) {
        var vm = this;

        /* 角色下拉框数据 */
        vm.roledata =  backStageAdmin.role;

        /* 所有用户ids */
        getAdminSercive.userList(1).then(function (res) {
            if (res.data.code == 0 ) {
                vm.userids = res.data.data.ids;
                /* 把数据转换成请求约定格式 */
                vm.userids = $filter('accountFilter')(vm.userids);
                /* 用户详细信息 */
                getAdminSercive.userInfo(vm.userids).then(function (res) {
                    if (res.data.code == 0 ) {
                        vm.userInfo = res.data.data.managerList;
                    }
                })
            }
        })

        /* 搜索 */

    })