/**
 * Created by ivws on 2017/2/21.
 */
/* 新增article */
angular.module('adminApp')
    .controller('articleaddCtrl',
        function ($scope,$http,$state,getAdminSercive,articleEdit) {
        var vm = this;

       //类型和行业的数据
        vm.status = articleEdit.status;
        vm.industry =articleEdit.industry;

        vm.articleId =  $state.params.id;
        if (vm.articleId) {
            getAdminSercive.singleArticle(vm.articleId).then(function (res) {
                if (res.data.code == 0 ) {
                    vm.adddata = res.data.data.article;
                    vm.adddata.img = res.data.data.article.img;
                }
            })
        }

        /* 上线/存稿 */
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