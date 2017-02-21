/**
 * Created by ivws on 2017/2/21.
 */
/* 新增article */
angular.module('adminApp')
    .controller('articleaddCtrl',
        function ($scope,$http,$state) {
        var vm = this;
        vm.articleadd = function (tp) {
            vm.adddata.status = tp;
            $http({
                method:'POST',
                url:'/carrots-admin-ajax/a/u/article',
                params:vm.adddata,
            }).then(function (res) {
                if (res.data.code == 0) {
                    $state.go('app.article');
                }
            })
        }
    }
)