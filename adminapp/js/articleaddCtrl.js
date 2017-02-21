/**
 * Created by ivws on 2017/2/21.
 */
/* 新增article */
angular.module('adminApp')
    .controller('articleaddCtrl',
        function ($scope) {
        var vm = this;
        vm.articleadd = function (tp) {
            vm.adddata = {
                type:tp,
            }
        }
    }
)