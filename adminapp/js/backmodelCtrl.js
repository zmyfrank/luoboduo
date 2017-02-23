/**
 * Created by ivws on 2017/2/22.
 */
angular.module('adminApp')
    /* 账户管理页面 */
    .controller('accountCtrl',function ($scope,$filter,$location,getAdminSercive,backStageAdmin,articlemodealinfo,userIds) {
        var vm = this;

        /* 角色下拉框数据 */
        vm.roledata =  backStageAdmin.role;

        /* 所有用户ids */
        vm.allUserhttp  = function () {
            vm.roleids = '';
            getAdminSercive.userList(1).then(function (res) {
                if (res.data.code == 0 ) {
                    vm.userIds = res.data.data.ids
                    vm.userInfohttp();
                }
            })
        }
        /* 获取用户详细信息展示到列表 */
        vm.userInfohttp =function (page) {
            /* 把数据转换成请求约定格式 */
            page ? page : page = 1 ;
            if (vm.userIds == '') return;
            vm.httpdata = $filter('accountFilter')(vm.userIds);
            getAdminSercive.userInfo(vm.httpdata,page).then(function (res) {
                if (res.data.code == 0 ) {
                    vm.userInfo = res.data.data.managerList;
                    vm.totalItems.totals = res.data.data.total;
                    vm.totalItems.page = page;
                }
            })
        }

        /* 搜索事件搜索角色下所有用户 */
        vm.roleSearch =function () {
            if (vm.roleids) {
                getAdminSercive.roleuserIds(vm.roleids).then(function (res) {
                    if (res.data.code == 0 ) {
                        vm.userIds = res.data.data.ids
                        vm.userInfohttp();
                    }
                })
            }else {
                vm.allUserhttp();
            }
        }
        /* 删除 */
        /* 获取ids；添加膜态文本 */
        vm.deleteinfo =function (ele) {
            vm.userIds = ele.$parent.data.id;
            articlemodealinfo.deleteuser = ['从数据库中删除将无法回复','是否执行删除操作？','删除成功'];
        }
        /* 点击确定之后处理的函数 */
        vm.delete = function () {
            getAdminSercive.deleteUser(vm.userIds).then(function (res) {
                if (res.data.code == 0) {
                    vm.roleSearch();
                }
            })
        }
        /* 编辑跳转 */
        vm.editJump = function (ele) {
            $location.url('app/accountadd?id='+ele.data.id)
        }

        /* 初次入 */
        vm.allUserhttp();

        /* 分页指令 */
        vm.pagingdata = vm.userInfohttp;
    })
    /* 用户ids数组分页请求数据同步可能需要一个存放用户ids的数据，后台功能没有完善 */
    .value('userIds',{
        userIds:'',
    })
    /* 用户新增/编辑页面 */
    .controller('accountAddCtrl',function ($scope,$location,backStageAdmin,getAdminSercive) {
        var vm = this;

        /* 角色下拉框 */
        vm.roled =  backStageAdmin.role;

        /* 表单验证测试函数 */
        vm.test = function (ele) {
            //console.log(vm.adduser.pwd,vm.adduser.newPwd)
        }

        /* 新增用户 */
        vm.addUser = function () {
            //console.log(vm.adduser)
            getAdminSercive.addUser(vm.adduser).then(function (res) {
                if (res.data.code == 0 ) {
                    $location.url('app/account');
                }
            })
        }

        /* 用户编辑 */
        /* 获取用户id */
        vm.id = $location.search().id;
        if (vm.id != undefined) {
            vm.ifEditUser = true;
            getAdminSercive.userIdInfo(vm.id).then(function (res) {
                if (res.data.code == 0 ) {
                    vm.adduser =  res.data.data.manager;
                }
            })
        }

        /* 编辑用户请求 */
        vm.editUser = function () {
            //console.log(vm.adduser)
            getAdminSercive.editUser(vm.adduser,vm.id).then(function (res) {
                if (res.data.code == 0 ) {
                    $location.url('app/account');
                }
            })
        }
    })
    /* 角色管理页面 */
    .controller('roleCtrl',function ($scope,$filter,$location,getAdminSercive,articlemodealinfo) {
        var vm = this;

        /* 角色所有ids请求 */
        vm.roleIdsHttp = function () {
            getAdminSercive.roleIds().then(function (res) {
                if (res.data.code == 0 ) {
                    vm.roleIds = res.data.data.ids;
                    vm.roleInfoHttp();
                }
            })
        }

        /* 角色列表详细信息请求 */
        vm.roleInfoHttp = function () {
            vm.httpdata = $filter('accountFilter')(vm.roleIds);
            getAdminSercive.roleInfo(vm.httpdata).then(function (res) {
                if (res.data.code == 0 ) {
                    vm.roleInfo = res.data.data.roleList;
                    //vm.totalItems.totals = res.data.data.total;
                    //vm.totalItems.page = page;
                }
            })
        }

        /* 删除角色 */
        /* 获取ids；添加膜态文本 此处模板和删除用户的共用 */
        vm.deleteinfo =function (ele) {
            vm.roleIds = ele.$parent.data.id;
            articlemodealinfo.deleteuser = ['从数据库中删除将无法回复','是否执行删除操作？','删除成功'];
        }

        /* 点击确定之后处理的函数 */
        vm.delete = function () {
            getAdminSercive.deleteRole(vm.roleIds).then(function (res) {
                if (res.data.code == 0) {
                    vm.roleIdsHttp();
                }
            })
        }

        /* 编辑跳转 */
        vm.editJump = function (id) {
            $location.url('app/addrole?id='+id);
        }

        /* 初次进入请求角色列表 */
        vm.roleIdsHttp();
    })
    .controller('addRoleCtrl',function ($scope,$filter,$location,getAdminSercive,$http) {
        var vm = this;
        vm.article ={}
        var b=[];
        vm.ss = function (ele) {

        }
        
        vm.subsetValue = function () {
            
        }
        
        var filter=  function (obj) {
            var s = [];
            for (data in obj) {
                console.log(vm.article[data])
                if (vm.article[data]  == true) {
                    b.push(data);
                }
            }
            return s;
        }

        /* 获取用户id */
        vm.id = $location.search().id;
        getAdminSercive.roleIdsRight(vm.id).then(function (res) {
            if (res.data.code == 0) {
                //console.log(res.data.data)
            }
        })





        vm.rolemodel = function () {


            $http({
                method:"GET",
                url:'/carrots-admin-ajax/a/u/module/',
                params:{next: undefined, page: 1, size: 65535}
            }).then(function (res) {
                if (res.data.code == 0) {
                    var id = $filter('accountFilter')(res.data.data.ids);
                    $http({
                        method:"GET",
                        url:'/carrots-admin-ajax/a/u/multi/module?'+id,
                    }).then(function (res) {
                        if (res.data.code == 0) {
                            console.log(res.data.data.moduleList)
                            var tree =[];
                            rigthFilter(0,null,tree,res.data.data.moduleList)
                        }
                    })
                }
            })
        }
        vm.rolemodel();
        
        function rigthFilter(pid,node, tree, modules) {
            var now = this;
            angular.forEach(modules, function (data, index, array) {
                var module = data;
                if (module.parentID == pid) {
                    tree = rigthFilter(module.id, module, tree, modules);
                    if (pid == 0) {
                        tree.push(module);
                    } else {
                        if (node.nodes == undefined) {
                            node.nodes = [];
                        }
                        node.nodes.push(module);
                    }
                }
            });
            angular.forEach(tree,function (item, index) {
                if (item.nodes) {
                    item.nodes = item.nodes.sort(now.treeSort);
                }
            });
            return tree;
        }
    })