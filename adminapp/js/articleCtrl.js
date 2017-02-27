/**
 * Created by ivws on 2017/2/17.
 */
/* article列表页面 */

angular.module('adminApp')
    .controller('articleCtrl',
        function ($scope,getAdminSercive,$http,articlemodealinfo,$location) {
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
            vm.totalItems ={};
            vm.arcitleHttp = function (params){
                page = params.page;
                getAdminSercive.searchArcitle(params).then(function (res) {
                    if (res.data.code == 0) {
                        //console.log(res.data.data)
                        vm.arcitledata = res.data.data.articleList;
                        vm.totalItems.totals = res.data.data.total;
                        vm.totalItems.page = page;
                    }
                })
            }

            /* 进入初始调用 */
            vm.search()
            /* 分页 */
            vm.pagingdata = vm.search;
            /* 上 下 线 */
            /* 提示信息 */
            vm.stastusinfo = function (ele) {
                ele.data.status == 2 ? info = '下线':info = '上线';
                vm.statusnumber = ele.data.status == 2 ? 1: 2;
                vm.id =  ele.data.id;
                articlemodealinfo.status = [info+'后该图片将不展示站轮播banner中。','是否执行'+info+'操作？',info+'成功'];
            }

            /* 确认后处理函数 */
            vm.stastus = function () {
                getAdminSercive.login().then(function (res) {
                    if (res.data.code == 0) {
                        $http({
                            method:'PUT',
                            url:'/carrots-admin-ajax/a/u/article/status',
                            params:{
                                id:vm.id,
                                status:vm.statusnumber
                            }
                        }).then(function (res) {
                            if (res.data.code == 0) {
                                vm.search();
                            }
                        })
                    }
                })
            }
            /* 删除 */
            //提示信息
            vm.deleteinfo =function (ele) {
                vm.id = ele.$parent.data.id;
                articlemodealinfo.delete = ['从数据库中删除将无法回复','是否执行删除操作？','删除成功'];
            }
            /* 确认后处理函数 */
            vm.delete =function () {
                getAdminSercive.login().then(function (res) {
                    if (res.data.code == 0) {
                        getAdminSercive.deleteArticle(vm.id).then(function (res) {
                            if (res.data.code == 0) {
                                vm.search();
                            }
                        })
                    }
                })
            }
            
            /* 编辑 */
            vm.edit = function (ele) {
                $location.url('app/articleadd?id='+ele.data.id);
            }
        }
    )
