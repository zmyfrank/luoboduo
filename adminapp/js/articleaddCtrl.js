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
                }
            })
        }

        /* 新增上线/存稿 */
        vm.articleadd = function (tp) {
            vm.adddata.status = tp;
            getAdminSercive.addArticle(vm.adddata).then(function (res) {
                 if (res.data.code == 0) {
                    $state.go('field.articleList');
                 }
            })
        }

        /* 编辑上线/存稿 */
        vm.articeditleadd =function (tp) {
            vm.adddata.status = tp;
            getAdminSercive.editArticle(vm.adddata,vm.articleId).then(function (res) {
                if (res.data.code == 0) {
                    $state.go('field.articleList');
                }
            })
        }
    }
)