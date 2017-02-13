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
                return "/lbd/a/article/search?type="+type;
            },
            /* 最新/推荐职位 */
            profession_url:function (type,size,page) {
                return "/lbd/a/profession/search?recommend="+type+'&size='+size+'&page='+page;
            },
            /*公司信息&在招职位*/
            industry_url:function (type,size,page) {
                return "/lbd/a/company/search?returnPage=" + type + '&size=' + size + '&page=' + page;
            },
            /*通过id搜索公司*/
            searchCompany_url:function (id) {
                return "/lbd/a/company/"+id;
            },
            /*通过公司id搜索对应职位*/
            searchJob_url:function (id) {
                return '/lbd/a/profession/search?companyId='+id;
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
            }
        }
    })