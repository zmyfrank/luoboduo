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
    })

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
    /*改变省/市名*/
    mainFil.filter('changeProName',function (PROVINCE) {
        return function (num) {
            var value = '';
            angular.forEach(PROVINCE,function (data,key) {
                if (PROVINCE[key].ProSort == num) {
                    value = PROVINCE[key].ProName;
                }
            })
            return value
        }
    });
    /* 搜索多选改变true和false的状态*/
    mainFil.filter('searchPanelChooseFilter',function () {
        return function (num,arr) {
            var value ='';
            if (arr.length==0) {
                if (num == null) {
                    value = true
                } else {
                    value = false;
                }
            }else {
               if (num==null|arr.indexOf(num)==-1) {
                   value=false
               }else {
                   value = true
               }
            }
            return value
        };
    });
    /* 搜索单选 */
    mainFil.filter('radioFilter',function () {
        return function (num,data) {
            var value = '';
            if (data>=1||data===0){
                if (num==null){
                    value = false;
                }
                if (num == data) {
                    value =true;
                }
            }else {
                if (num==null){
                    value = true;
                }else {
                    value = false;
                }
            }
            return value
        }
    })
