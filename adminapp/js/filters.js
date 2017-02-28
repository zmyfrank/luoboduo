/**
 * Created by Administrator on 2017/2/18.
 */
var mainFil = angular.module("mainFil",[]);
/*改变职位信息里的数字为文字*/
mainFil.filter('changeJobListName',function (joblisttype) {
    return function (num,name) {
        var value = '';
        angular.forEach(joblisttype,function (data,key,arry) {
            if (key == name) {
                angular.forEach(data,function (item) {
                    if (item.type == num) {
                        value = item.name;
                    }
                })
            }
        });
        return value;
    }
});
/* 省市县过滤  */
mainFil.filter('provinceFilter', function (PROVINCE) {
    return function (id) {
        if (id != undefined && id != '') {
            var name;
            angular.forEach(PROVINCE, function (data) {
                if (data.ProID == id) {
                    name = data.ProName;
                }
            });
            return name;
        }
    }
});

mainFil.filter('cityFilter', function (CITY) {
    return function (id) {
        if (id != undefined && id != '') {
            var name;
            angular.forEach(CITY, function (data) {
                if (data.CityID == id) {
                    name = data.CityName;
                }
            });
            return name;
        }
    }
});

mainFil.filter('countyFilter', function (COUNTY) {
    return function (id) {
        if (id != undefined && id != '') {
            var name;
            angular.forEach(COUNTY, function (data) {
                if (data.Id == id) {
                    name = data.countyName;
                }
            });
            return name;
        }
    }
});

/* article过滤 */
mainFil.filter('articleFilter',function (article) {
    var value;
    return function (data,type) {
        var datatype =  article[''+type];
        angular.forEach(datatype,function (val,index,arry) {
            if (data == val.type) {
                value =  arry[index].name;
            }
        })
        return value;
    }
})

/* 角色列表过滤 */
mainFil.filter('roleIDFilter',function (getAdminSercive,$filter) {
    var value;
    return function (id,roled) {
        angular.forEach(roled,function (it,k) {
            if (it.id == id ) {
                value =  it.name;
            }
        })
        return  value;
    }
})


/* 用户列表请求转换请求数据 */
mainFil.filter('accountFilter',function () {
    return function (data) {
        var value=[];
        angular.forEach(data,function (val,index,arry) {
            value.push('ids='+val);
        })
        return  value.join('&');
    }
})

