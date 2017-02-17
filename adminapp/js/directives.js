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

