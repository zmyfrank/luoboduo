/**
 * Created by Administrator on 2017/2/17.
 */
angular.module('mainServices',[])
    .factory('getAdminSercive',function ($http) {
        /*服务的地址列表*/
        var searviceList = {
            /*公司搜索地址*/
            companyUrl:'/carrots-admin-ajax/a/company/search',
            joblistUrl:'/carrots-admin-ajax/',
            /* arcitle列表页面 */
            arcitleUrl:'/carrots-admin-ajax/a/article/search',
            /*操作公司列表*/
            companyOperationUrl:'/carrots-admin-ajax/a/u/company/status',
            /*删除和新增公司还有修改公司，修改时传入id*/
            deleteCompanyUrl:'/carrots-admin-ajax/a/u/company/',
            /*上传图片，最后是我的文件夹名 hzlbd*/
            uploadImgUrl:'/carrots-admin-ajax/a/u/img/hzlbd',
            /* 登陆 */
            loginUrl:'/carrots-admin-ajax/a/login?name=admin&pwd=123456',
            /* 退出 */
            outloginUrl:'/carrots-admin-ajax/a/logout',
            /* 删除article列表 */
            deleteArticleUrl :'/carrots-admin-ajax/a/u/article/',
            /* 获得单个article */
            ingleArticleUrl:'/carrots-admin-ajax/a/article/',
            /* 新增/ 编辑article */
            editArticleUrl:'/carrots-admin-ajax/a/u/article/',
            /*通过id获取公司明细*/
            companySeachrByIdUrl:'/carrots-admin-ajax/a/company/',
            /*获取公司职位信息*/
            findJobListUrl:'/carrots-admin-ajax/a/profession/',

            /* 模块管理接口 */
            /* 获取全部用户列表 */
            userListUrl: '/carrots-admin-ajax/a/u/manager/?page=',
            /* 批量获取用户列表详细信息 */
            userInfoUrl:'/carrots-admin-ajax/a/u/multi/manager?',
            /* 删除/编辑/新增 单个用户 */
            singleUser :'/carrots-admin-ajax/a/u/manager/',
            /* 获取角色列表/编辑/删除/新增角色 */
            roleListUrl :'/carrots-admin-ajax/a/u/role/',
            /* 批量获取角色详细信息 */
            roleInfoUrl :'/carrots-admin-ajax/a/u/multi/role?',
            /*职位各种信息修改*/
            professionUrl:'/carrots-admin-ajax/a/u/profession/',
            /*公司tag请求*/
            professionTagUrl:'/carrots-admin-ajax/a/tags/',
            /* 删除/编辑/新增 模块管理 */
            singleModular :'/carrots-admin-ajax/a/u/module/',
            /* 模块详细信息列表 */
            modularInfoUrl :'/carrots-admin-ajax/a/u/multi/module?',

            /*修改密码*/
            pwdUrl:'/carrots-admin-ajax/a/u/pwd',
        }
        /*请求的参数等*/
        return {
            /*公司信息搜索*/
            'searchCompany':function (data) {
                return $http({
                    method:'GET',
                    url:searviceList.companyUrl,
                    params:data
                })
            },
            /* arcitle搜索 */
            'searchArcitle':function (data) {
                return $http({
                    method:'GET',
                    url:searviceList.arcitleUrl,
                    params:data
                })
            },
            /*更改职位状态*/
            //解冻：status：0解冻解除认证，1冻结
            //type：0：冻结状态，1：认证状态
            'changeStatus':function (data) {
                return $http({
                    method:'PUT',
                    url:searviceList.companyOperationUrl,
                    params:data
                })
            },
            /*删除公司*/
            'deleteCompany':function (id) {
                return $http.delete(searviceList.deleteCompanyUrl+'/'+id)
            },
            /*上传图片,这个我只返回一个地址*/
            'uploadImg':function () {
                return searviceList.uploadImgUrl
            },
            /*新增公司*/
            'creatCompany':function (data) {
                return $http({
                    method:'POST',
                    url:searviceList.deleteCompanyUrl,
                    headers:{
                        "Content-Type":"Application/json"
                    },
                    data:data
                })
            },
            /* 登陆 */
            'login' :function () {
                return $http.post(searviceList.loginUrl);
            },
            /* 登陆2 */
            'login2' :function (data) {
                return $http({
                    method: 'POST',
                    url:'/carrots-admin-ajax/a/login',
                    params:data,
                })
            },
            /* 退出 */
            'outLogin' :function () {
                return $http.post(searviceList.outloginUrl);
            },
            /* 删除article列表 */
            'deleteArticle' :function (id) {
                return $http.delete(searviceList.deleteArticleUrl+id)
            },
            /* 获得单个article */
            'singleArticle' :function (id) {
              return $http.get(searviceList.ingleArticleUrl+id);
            },
            /* 新增article */
            'addArticle' :function (data) {
                return $http({
                    method:'POST',
                    url:searviceList.editArticleUrl,
                    params:data,
                })
            },
            /* 编辑article */
            'editArticle' : function (data,id) {
                return $http({
                    method:'PUT',
                    url:searviceList.editArticleUrl+id,
                    params:data
                })
            },
            /*通过id获取公司详细信息*/
            'companySeachrById':function (id) {
                return $http.get(searviceList.companySeachrByIdUrl+id)
            },
            /*通过id修改公司详细信息，传入两个参数，第一个是当前公司id，第二个是参数数组*/
            'companyChangeById':function (id,data) {
                return $http({
                    method:"PUT",
                    url:searviceList.deleteCompanyUrl+id,
                    data:data
                })
            },
            'findJobList':function (data) {
                return $http({
                    method:"GET",
                    url:searviceList.findJobListUrl+'search',
                    params:data
                })
            },
            /* 模块管理页面 */
            /* 获取用户列表ids */
            'userList':function (page) {
                return $http.get(searviceList.userListUrl+page)
            },
            /* 获取用户详细信息 */
            'userInfo':function (data,page) {
                return $http.get(searviceList.userInfoUrl+data+'&page='+page)
            },
            /* 获取单个角色下的所有用户的ids */
            'roleuserIds':function (id){
                return $http.get('/carrots-admin-ajax/a/u/role/'+id+'/manager');
            },
            /* 删除单个用户 */
            'deleteUser' :function (id) {
                return $http.delete(searviceList.singleUser+id)
            },
            /* 编辑用户 */
            'editUser' :function (data,id) {
                return $http({
                    method:"PUT",
                    url:searviceList.singleUser+id,
                    params:data
                })
            },
            /* 新增用户 */
            'addUser' :function (data) {
                return $http({
                    method:"POST",
                    url:searviceList.singleUser,
                    params:data
                })
            },
            /* 根据id获取单个用户信息 */
            /* 编辑用户 */
            'userIdInfo' :function (id) {
                return $http.get(searviceList.singleUser+id)
            },
            /* 查询角色所有角色ids */
            'roleIds' :function () {
                return $http.get(searviceList.roleListUrl)
            },
            /* 批量查询角色信息 */
            'roleInfo' :function (data) {
                return $http.get(searviceList.roleInfoUrl+data)
            },
            /* 新增角色 */
            'addRole' :function (data) {
                return $http({
                    method:"POST",
                    url:searviceList.roleListUrl,
                    data:data
                })
            },
            /* 编辑角色 */
            'editRole' :function (data,id) {
                return $http({
                    method:"PUT",
                    url:searviceList.roleListUrl+id,
                    data:data
                })
            },
            /* 删除角色 */
            'deleteRole' :function (id) {
                return $http.delete(searviceList.roleListUrl+id)
            },
            /* 返回单个角色及权限!!! */
            'roleIdsRight':function (id){
                return $http.get(searviceList.roleListUrl+id);
            },
            /* 模块id列表 */
            'modularIdsList':function () {
                return $http.get(searviceList.singleModular)
            },
            /* 批量查询模块详细信息 */
            'modularInfo' :function (data) {
                return $http.get(searviceList.modularInfoUrl+data)
            },
            /* 新增模块 */
            'addModular' :function (data) {
                // var module = new FormData();
                //     module.append(data);
                return $http({
                    method:"POST",
                    url:searviceList.singleModular,
                    //headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    params: data,
                })
            },
            /* 根据ID查询单个模块 */
            'modularIds':function (id){
                return $http.get(searviceList.singleModular+id);
            },
            /* 编辑模块 */
            'editModular' :function (data,id) {
                return $http({
                    method:"PUT",
                    url:searviceList.singleModular+id,
                    params:data
                })
            },
            /* 删除模块 */
            'deleteModular' :function (id) {
                return $http.delete(searviceList.singleModular+id)
            },
            /*改变职位上下架状态*/
            'changeProStatu':function (data) {
                return  $http({
                    method:"PUT",
                    url:searviceList.professionUrl+'/status',
                    params:data
                })
            },
            /*删除职位*/
            'deletejob':function (id) {
                return $http.delete(searviceList.professionUrl+id)
            },
            /*获取职位信息*/
            "getPosition":function (id) {
                return $http.get(searviceList.findJobListUrl+id)
            },
            /*获取公司tag*/
            'getprofessionTag':function (id) {
                return $http.get(searviceList.professionTagUrl+id)
            },
            /*改变公司职位信息*/
            'changeProfession':function (id,data) {
                return $http({
                    method:"PUT",
                    url:searviceList.professionUrl+id,
                    data:data
                })
            },
            /*新建职位*/
            'creatProfession':function (data) {
                return $http({
                    method:"POST",
                    url:searviceList.professionUrl,
                    data:data
                })
            },
            /*修改密码*/
            'pwd':function (data) {
                return $http({
                    method:"PUT",
                    url:searviceList.pwdUrl,
                    data:$.param(data),
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }
        }
    })
    /* 模块管理 */
    .factory('roleModularAdmin',function ($http,$filter,$rootScope,$cookies,getAdminSercive) {
        return {
            //获取所有模块
            'allRight' : function () {
               var now = this;
               return $http({
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
                            if (res.data.code == 0 ) {
                                var tree =[];
                                //所有权限模块
                                $rootScope.roleAllRight =$.extend(true, {},res.data.data.moduleList);

                                //父子集合并后的权限
                                $rootScope.roleAllRightdata = now.mergeRight(0,null,tree,res.data.data.moduleList);
                                $cookies.putObject('roleAllRightdata', $rootScope.modelright);

                                getAdminSercive.roleIdsRight($rootScope.loginCook.id).then(function (res) {
                                    if (res.data.code == 0) {
                                        //单个角色权限
                                        $rootScope.roleRightdata = res.data.data.role.permissionsSet;

                                        s = now.roleUnRight($rootScope.roleRightdata);
                                        angular.forEach($rootScope.roleAllRightdata,function (data,index) {
                                            angular.forEach(data.nodes,function (it,k,arry) {
                                                //console.log(it.id);
                                                //console.log(s.indexOf(''+it.id))
                                                if ( s.indexOf(''+it.id) == -1) {
                                                    arry.splice(k);
                                                }
                                            })
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            },
            //合并权限对应的父子级模块
            'mergeRight' : function (pid,node, tree, modules) {
                var now = this;
                angular.forEach(modules, function (data, index, array) {
                    var module = data;
                    if (module.parentID == pid) {
                        tree = now.mergeRight(module.id, module, tree, modules);
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
            },
            //当前路由权限判断
            'urlRight' :function (right,data) {
              return  data.indexOf(right) < 0 ? false : true;
            },
            //返回当前角色不可用权限
            'roleUnRight' : function (data) {
                var right=[]
                angular.forEach( data,function (data,index) {
                        right.push(index);
                });
                return right;
            }
        }
    })