/**
 * Created by ivws on 2017/2/17.
 */
/* article列表页面 */

angular.module('adminApp')
    .controller('articleCtrl',
        function ($scope,getAdminSercive) {
            var vm = this;

            /* 搜索值 */
            vm.arcitle = {
                //创建者
                author:'',
                //标题
                title:'',
                //状态
                status:'',
                //类型
                type:'',
                //终止更新时间
                endAt: '',
                //起始更新时间
                startAt: '',
            }

            /* 搜索事件 */
            vm.search = function (page) {
                vm.arcitle.page = page ? page : 1 ;
                vm.arcitle.endAt = vm.enddata ? vm.enddata : '';
                vm.arcitle.startAt = vm.startdata? vm.startdata : '';
                vm.arcitleHttp(vm.arcitle);
            }
            /* 清除事件 */
            vm.clean = function () {
                for(k in vm.arcitle) {
                    vm.arcitle[''+k] = '';
                }
                vm.enddata = '';
                vm.startdata ='';
                vm.arcitleHttp(vm.arcitle);
            }

            //arcitle请求
            vm.arcitleHttp = function (params){
                getAdminSercive.searchArcitle(params).then(function (res) {
                    if (res.data.code == 0) {
                        //console.log(res.data.data)
                        vm.arcitledata = res.data.data.articleList;
                        vm.totalItems = res.data.data.total;
                    }
                })
            }

            /* 进入初始调用 */
            vm.search()
            /* 分页 */
            vm.pagingdata = vm.search;


        }
    )