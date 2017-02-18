/**
 * Created by ivws on 2017/2/17.
 */
/* article列表页面 */

angular.module('adminApp')
    .controller('articleCtrl',
        function ($scope,getAdminSercive) {
            var vm = this;

            /* 开始时间 */
            vm.startdata ="";
            /* 结束时间 */
            vm.enddata = "";

            vm.data={
                //创建者
                author:'',
                //标题
                title:'',
                //状态
                status:vm.arcitlestate,
                //类型
                type:vm.arcitletype,
                //终止更新时间
                endAt:vm.enddata,
                //起始更新时间
                startAt:vm.startdata,
            }
            /* 搜索事件 */
            vm.search = function () {
                getAdminSercive.searchArcitle(vm.data).then(function (res) {
                    if (res.data.code == 0) {
                        vm.arcitledata = res.data.data;
                    }
                })
            }
            /* arcitle请求 */
            getAdminSercive.searchArcitle(vm.data).then(function (res) {
                if (res.data.code == 0) {

                }
            })

        }
    )