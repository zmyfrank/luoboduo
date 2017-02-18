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
                    scope.dt = new Date();
                };

                scope.$watch('dt',function () {
                    scope.data= scope.dt;
                })

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


