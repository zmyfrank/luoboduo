/**
 * Created by ivws on 2017/2/18.
 */


angular.module('adminApp')
    /* 日期指令 */
    .directive('datepicker', function () {
        return {
            restrict: 'AE',
            replace: false,
            templateUrl: 'tpls/dirtpls/data.html',
            scope: {
                ngModel:'=',
                data:'=',
            },
            link: function (scope, ele, attrs, supermanCtrl) {
                /* 日期插件 */

                scope.today = function() {  //生成当前日期
                    if (attrs.data == 'vm.startdata') {
                        scope.dt = "";
                    }else {
                        scope.dt= new Date();
                    }
                };

                scope.$watch('dt',function (n,o) {
                    if (n!=o){
                        scope.data= scope.dt.valueOf();
                    }
                })

                /* 监听前一个时间选择器的值 */
                scope.$watch('ngModel',function () {
                    scope.toggleMin();
                })

                scope.today();

                /* 清除当前选中的日期 */
                scope.clear = function() {
                    scope.dt = null;
                };

                scope.dateOptions = {
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1,
                };

                /* 最小选择日期 */
                scope.toggleMin = function() {
                    scope.dateOptions.minDate = scope.ngModel ? scope.ngModel : null;
                };

                scope.toggleMin();

                scope.open = function() {
                    scope.popup.opened = true;
                };

                scope.setDate = function(year, month, day) {
                    scope.dt = new Date(year, month, day);
                };

                scope.popup = {
                    opened: false
                };
            }
        }
    })
    /* 日期输入框 */
    .directive('dateparser', function (uibDateParser) {
        return {
            restrict: 'AE',
            replace: false,
            template: '<input type="text"  class="form-control ui-bs"  uib-datepicker-popup="{{format}}" ng-model="date" />',
            scope: {
                ngModel: '=',
            },
            link: function (scope, ele, attrs, supermanCtrl) {
                /* 日期输入框插件 */
                scope.format = 'yyyy/MM/dd';
                scope.$watch('ngModel',function (n,o) {
                    scope.date = scope.ngModel ? scope.ngModel : new Date();
                })
            }
        }
})
    /*三级联动地区搜索*/
    .directive('citychoose', function (PROVINCE, CITY, COUNTY) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'tpls/dirtpls/cityChoose.html',
            scope: {
                provinceNum: '=',
                cityNum: '=',
                countyNum: '='
                //ngModel:'='
            },
            link: function (scope, ele, arrts, Ctrl) {
                /*原始省份数据*/
                scope.provinceIn = PROVINCE;
                /*原始省份绑定数据,为了它最开始传过去有值*/
                scope.provinceNum = null;
                scope.cityNum = null;
                scope.countyNum = null;
                /*选择省市之后弹出显示省市后边的城市名字*/
                scope.changeProince = function () {
                    scope.cityData = [];    //每次选择都会清空市的数组
                    scope.countyNum = null;     //每次改变都会清空最后countynum选择的值
                    if (scope.provinceNum != null) {
                        angular.forEach(CITY, function (data, key, obj) {
                            if (data.ProID == scope.provinceNum) {
                                scope.cityData.push(data);
                            }
                        })
                    }
                };
                /*选择城市之后弹出下面区县的值*/
                scope.changeCity = function () {
                    scope.countyData = [];  //改变的时候清空区县的值
                    scope.countyNum = null; //改变的时候清空区县里的选择
                    if (scope.cityNum!= null) {
                        angular.forEach(COUNTY,function (data,key,obj) {
                            if (data.CityID ==scope.cityNum) {
                                scope.countyData.push(data);
                            }
                        })
                    }
                };
            }
        }
    })
    /*分页*/
    /* 分页指令 */
    .directive('mypagintion', function (getAdminSercive) {
        /* 分页 */
        return {
            restrict: 'AE',
            replace: false,
            templateUrl: 'tpls/dirtpls/pagination.html',
            scope: {
                total: '=',
            },
            link: function (scope, ele, attrs, supermanCtrl) {
                /* 分页插件参数 */
                scope.currentPage = 1; //初始页
                scope.$parent.vm.pagingdata(scope.currentPage)

                scope.$watch('total', function (n, o) {
                    if (n != o) {
                        scope.totalItems = scope.total;
                    }
                })
                scope.pageChanged = function () {
                    scope.$parent.vm.pagingdata(scope.currentPage);
                };
            }
        }
    })
