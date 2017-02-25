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

        /* 子集权限选择 */
        vm.rightChoice = function (data,bl) {
            for (k in data ) {
                data[k] = bl;
            }
        }
        /* 父级权限选择 */
        vm.p_rightChoice  = function (index,bl) {
            if (index == 0) {
                index = 1;
            }else if (index == 2) {
                index = 0;
            }else if (index == 1) {
                index = 2;
            }
            angular.forEach(vm.rolerigthdata[index].nodes,function (items,k) {
                items.p_right = bl;
                vm.rightChoice(items.right,bl);
            })
        }
        /* 所有权限选择 */
        vm.all_rightChoice =function (bl) {
            angular.forEach(vm.rolerigthdata, function(item, key) {
                item.all_right = bl;
                angular.forEach(item.nodes, function(it, k) {
                    it.p_right = bl;
                    for (sk in it.right) {
                        it.right[sk] = bl
                    }
                })
            })
        }
        /* 获取角色权限列表 */
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
                            var tree =[];
                            vm.rolerigthdata =  rightFilter(0,null,tree,res.data.data.moduleList);
                            //console.log(vm.rolerigthdata)
                            /* 获取用户id */
                            vm.id = $location.search().id;
                            /* vm.id值为编辑请求时的id字段 */
                            vm.addrole.id = vm.id;
                            getAdminSercive.roleIdsRight(vm.id).then(function (res) {
                                if (res.data.code == 0) {
                                    /* 单个id的name */
                                    vm.addrole.name = res.data.data.role.name;
                                    /* 单个id权限数据 */
                                    vm.roleIdRight =  res.data.data.role.permissionsSet;
                                    angular.forEach(vm.rolerigthdata, function(item, key) {
                                        angular.forEach(item.nodes, function(it, k) {
                                            //调用过滤器把匹配到id的权限添加到对应的对象内。
                                            item.nodes[k].right = $filter('roleRigthFilter')(it.id,vm.roleIdRight)
                                            //根据当前id的权限给父级添加checkbox的ng-model值
                                            item.nodes[k].p_right=item.nodes[k].right.p
                                            item.all_right=item.nodes[k].right.p;
                                            delete item.nodes[k].right.p;
                                        })
                                    })
                                    //console.log(vm.rolerigthdata);
                                }
                            })
                        }
                    })
                }
            })
        }
        vm.rolemodel();
        /* 过滤数据为页面可输出格式 */
        function rightFilter(pid,node, tree, modules) {
            var now = this;
            angular.forEach(modules, function (data, index, array) {
                var module = data;
                if (module.parentID == pid) {
                    tree = rightFilter(module.id, module, tree, modules);
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
            var rolerigthdata = [];
            angular.forEach(tree,function (item, index,arry) {
                if (item.nodes) {
                    rolerigthdata.push(arry[index]);
                }
            });
            return rolerigthdata
        }
        /* 角色权限请求 */
        vm.addrole = {};
        vm.addrole.permissionsSet = {};
        vm.roleEitHtttp = function () {
            angular.forEach(vm.rolerigthdata,function (item,index) {
                angular.forEach(item.nodes,function (it,key) {
                    //把当前权限的id和权限值赋给请求数据
                    vm.addrole.permissionsSet[item.nodes[key].id] = roleHttp(item.nodes[key].right)
                })
            })

            /* 编辑请求 */
            getAdminSercive.editRole(vm.addrole,vm.id).then(function (res) {
                if (res.data.code == 0 ) {
                    $location.url('app/role');
                }
            })
        }

        /* 权限数据转请求数据 */
        function roleHttp(data) {
            var role = [];
            for (k in data) {
                if (data[k]  == true) {
                    role.push(k);
                }
            }
            return role;
        }
    })
    /* 用户权限过滤 */
    .filter('roleRigthFilter',function () {
        function rigth(data) {
            var value = {}
            var orole =  ['create','delete','update','sort'];
            var pright;
            angular.forEach(orole,function (item,index) {
                //判断是不是具有所有权限
                if (data.indexOf(item) == -1 ) {
                    value[''+item] = false;
                    pright = false;
                }else {
                    value[''+item] = true;
                }
            })
            value.p =  pright == undefined ? true : false;
            return value;
        }
        return function (id,role) {
            var value=[];
            angular.forEach(role,function (item,index,arry) {
                if (item.length !=0 ) {
                    //匹配权限id和角色id匹配的数组
                    if (index == id) {
                        value = rigth(item)
                    }
                }
            })
            return value;
        }
    })


