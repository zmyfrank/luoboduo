/**
 * Created by Administrator on 2017/2/17.
 */
angular.module('mainServices',[])
    .factory('getAdminSercive',function ($http) {
        /*服务的地址列表*/
        var searviceList = {
            /*公司搜索地址*/
            companyUrl:'/carrots-admin-ajax/a/company/search',
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
            }
        }
    })