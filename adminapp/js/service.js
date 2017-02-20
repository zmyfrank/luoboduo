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
            /* arcitle页面 */
            arcitleUrl:'/carrots-admin-ajax/a/article/search',
            /*操作公司列表*/
            companyOperationUrl:'/carrots-admin-ajax/a/u/company/status',
            /*删除公司*/
            deleteCompanyUrl:'/carrots-admin-ajax/a/u/company/'
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
            }
        }
    })