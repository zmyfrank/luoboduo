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
    /*上传时显示图片预览的指令*/
    .directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                /*正则，用于确定文件是否为图片后缀*/
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                /*如果不是图片直接退出*/
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                /*绑定文件预览*/
                var reader = new FileReader();
                /*使用了FileReader新Api*/
                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }])
    /*选择图片上传的指令,有一个参数，传入一个选项框的名字,用=绑定成功就会有数据返回的接口*/
    .directive('uploadImg',function (FileUploader,getAdminSercive) {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'tpls/uploadImg.html',
            scope: {
                labelName:'@',
                fileItem:'='
            },
            controller:function ($scope) {
                var uploader = $scope.uploader = new FileUploader({
                    url:getAdminSercive.uploadImg()
                })
                $scope.fileItem = "";
                uploader.onSuccessItem = function (fileItem,response) {
                    $scope.fileItem = response.data.url;
                }
                /*添加过滤规则，这个是只能上传图片*/
                uploader.filters.push({
                    name:'imageFilter',
                    fn: function (item/*这是传入的需要过滤的东西*/,options) {
                        var type = '|'+item.type.slice(item.type.lastIndexOf('/') + 1) + '|'; /*确认传入文件的后缀*/
                        return 'jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;    //确认后缀是不是图片
                    }
                })
            }
        }
    })
    /*规定每一个上传上去的数据都是空的，避免出现错误，外面改变了里面也会改变*/
    .directive('dataSet',function () {
        return {
            restrict:"A",
            replace:false,
            scope: {
                ngModel:'=',
                /*传入一个东西，表明它是数组*/
                isArry:'@'
            },
            controller:function ($scope) {
                /*先把这个值设置为空,如果是数组则多个arry参数*/
                if ($scope.isArry=='arry') {
                    $scope.ngModel = $scope.ngModel.join(',');
                }else {
                    $scope.ngModel = null;
                }
            }
        }
    })
