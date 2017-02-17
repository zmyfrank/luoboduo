/**
 * Created by ivws on 2017/2/17.
 */
/* article列表页面 */

angular.module('adminApp')
    .controller('articleCtrl',
        function ($scope) {
            var vm = this;
            vm.name = "我是articleCtrl控制器";

            /* 时间1 */
            vm.startdata = new Date();
            vm.enddata = new Date();
        }
    )