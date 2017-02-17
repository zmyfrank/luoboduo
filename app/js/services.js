/**
 * Created by ivws on 2017/1/21.
 */
var mainConstant = angular.module('mainServices', [])

    .factory('myService', function($cookieStore) {
        return {
            'pages': function () {
                return $cookieStore.get('pages');
            }
        };
    })
    .factory('myInterface',function () {
        return{
            /* 焦点图 */
            article_url:function (type) {
                return "/carrots-ajax/a/article/search?type="+type;
            },
            /* 最新/推荐职位 */
            profession_url:function (type,size,page) {
                return "/carrots-ajax/a/profession/search?recommend="+type+'&size='+size+'&page='+page;
            },
            /*公司信息&在招职位*/
            industry_url:function (type,size,page) {
                return "/carrots-ajax/a/company/search?returnPage=" + type + '&size=' + size + '&page=' + page;
            },
            /*通过id搜索公司*/
            searchCompany_url:function (id) {
                return "/carrots-ajax/a/company/"+id;
            },
            /*通过公司id搜索对应职位*/
            searchJob_url:function (id) {
                return '/carrots-ajax/a/profession/search?companyId='+id;
            },
            /*通过职位id获取职位详细信息*/
            searchJobMinute_Url:function (id) {
                return '/carrots-ajax/a/profession/'+id;
            },
            /*公司名模糊搜索*/
            searchCompanyName_Url:function (name) {
                return '/carrots-ajax/a/company/search?name='+name;
            }
        }
    })
    .factory('getService',function($http,myInterface){
        return{
            /* 焦点图 */
            'get_article':function (type) {
                return $http.get(myInterface.article_url(type))
            },
            /* 最新/推荐职位 */
            'get_profession':function(type,size,page){
                return $http.get(myInterface.profession_url(type,size,page))
            },
            /*公司信息&在招职位*/
            "get_industry":function (type,size,page) {
                return $http.get(myInterface.industry_url(type, size, page))
            },
            /*通过id搜索公司*/
            "search_company":function (id) {
                return $http.get(myInterface.searchCompany_url(id))
            },
            /*通过公司id搜索对应职位*/
            "search_job":function (id) {
                return $http.get(myInterface.searchJob_url(id))
            },
            /*通过职位id获取职位详细信息*/
            "search_JobMinute":function (id) {
                return $http.get(myInterface.searchJobMinute_Url(id))
            },
            /*公司名模糊搜索*/
            "search_companyName":function (name) {
                return $http.get(myInterface.searchCompanyName_Url(name))
            },
            /*搜索职位的接口，接收一个对象*/
            "search_jobMinute":function (data) {
                return $http({
                    method:"GET",
                    url:"/carrots-ajax/a/profession/search",
                    params:data
                })
            },
            /*搜索公司接口，接收一个对象*/
            "search_companyMinute":function (data) {
                return $http({
                    method:"GET",
                    url:"/carrots-ajax/a/company/search",
                    params:data
                })

            }
        }
    })