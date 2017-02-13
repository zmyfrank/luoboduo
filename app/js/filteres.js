/**
 * Created by ivws on 2017/1/21.
 */
'use strict'
var mainFil = angular.module("mainFil",[]);
        /*转化公司信息里的数字为文字*/
    mainFil.filter('reachIndustry',function () {
        return function (industry1data,name) {
            var industryLength = industry1data.length;
            for (var i = 0; i < industryLength; i++) {
                if (name=='industryList') {
                    var namelength = industry1data[i][''+name].length;
                    for (var j = 0; j<namelength;j++) {
                        switch (industry1data[i][''+name][j]) {
                            case 0 :
                                industry1data[i][''+name].splice(j,1,"移动互联网");
                                break;
                            case 1 :
                                industry1data[i][''+name].splice(j,1,"电子商务");
                                break;
                            case 2 :
                                industry1data[i][''+name].splice(j,1,"企业服务");
                                break;
                            case 3 :
                                industry1data[i][''+name].splice(j,1,"O2O");
                                break;
                            case 4 :
                                industry1data[i][''+name].splice(j,1,"教育");
                                break;
                            case 5 :
                                industry1data[i][''+name].splice(j,1,"金融");
                                break;
                            case 6 :
                                industry1data[i][''+name].splice(j,1,"游戏");
                                break;
                        }
                    }
                }
            }
            return industry1data;
        }
    });
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
