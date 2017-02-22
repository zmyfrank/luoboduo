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
            findJobListUrl:'/carrots-admin-ajax/a/profession/search',

            /* 模块管理接口 */
            /* 获取全部用户列表 */
            userListUrl: '/carrots-admin-ajax/a/u/manager/?page=',
            /* 批量获取用户列表详细信息 */
            userInfoUrl:'/carrots-admin-ajax/a/u/multi/manager?',
            /* 删除/编辑 单个用户 */
            singleUser :'/carrots-admin-ajax/a/u/manager/',

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
                    url:searviceList.findJobListUrl,
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
            'roleuserIds':function (id) {
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
                    data:data
                })
            },
        }
    })