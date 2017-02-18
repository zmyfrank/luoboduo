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
            dt: '=ngModel',
        },
        link: function (scope, ele, attrs, supermanCtrl) {
            /* 日期插件 */
            scope.today = function() {  //生成当前日期
                scope.dt = scope.ngModel? scope.ngModel : new Date();
            };

            scope.today();

            scope.clear = function() {  //清除 scope.dt
                scope.dt = null;
            };

            scope.options = {
                customClass: getDayClass,   //自定义类？
                minDate: new Date(), //最小日期
                showWeeks: true  //显示周
            };

            // Disable weekend selection 周末选择禁用
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            scope.toggleMin = function() {
                scope.options.minDate = scope.options.minDate ? null : new Date();
            };

            scope.toggleMin();

            /* 跳转某个日期 */
            scope.setDate = function(year, month, day) {
                scope.dt = new Date(year, month, day);
            };

            /* 明天时间戳 */
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            console.log(tomorrow.setDate(tomorrow.getDate() + 1));

            /* 明天过后时间戳 */
            var afterTomorrow = new Date(tomorrow);
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            console.log(afterTomorrow.setDate(tomorrow.getDate() + 1));

            scope.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

            /* 获取天数？ */
            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    /* 通过一个时间对象转换成时间戳 */
                    var dayToCheck = new Date(date).setHours(0,0,0,0);

                    for (var i = 0; i < scope.events.length; i++) {

                        var currentDay = new Date(scope.events[i].date).setHours(0,0,0,0);

                        if (dayToCheck === currentDay) {
                            return scope.events[i].status;
                        }
                    }
                }
                return '';
            }
        }
    }
})
    /* 日期输入框 */
    .directive('dateparser', function (uibDateParser) {
        return {
            restrict: 'AE',
            replace: false,
            template: '<input type="text" class="form-control ui-bs" uib-datepicker-popup="{{format}}" ng-model="date" />',
            scope: {
                ngModel: '=',
            },
            link: function (scope, ele, attrs, supermanCtrl) {
                /* 日期输入框插件 */
                scope.format = 'yyyy/MM/dd';
                scope.$watch('ngModel',function () {
                    scope.date = scope.ngModel? scope.ngModel : new Date();
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
