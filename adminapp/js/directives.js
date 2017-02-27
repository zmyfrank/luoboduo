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
                /*绑定最小值*/
                ngModel:'=',
                /*当前选中值*/
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
    /*三级联动地区搜索,里面的search是用来标识是否用于搜索，用于搜索的时候不强制转为数字*/
    .directive('citychoose', function (PROVINCE, CITY, COUNTY,$timeout) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'tpls/dirtpls/cityChoose.html',
            scope: {
                provinceNum: '=',
                cityNum: '=',
                countyNum: '=',
                search:'@'
            },
            link: function (scope, ele, arrts, Ctrl) {
                /*原始省份数据*/
                scope.provinceIn = PROVINCE;
                /*原始省份绑定数据,为了它最开始传过去有值*/
                /*选择省市之后弹出显示省市后边的城市名字*/
                scope.$watch('provinceNum', function () {
                    scope.cityData = [];    //每次选择都会清空市的数组
                    //scope.countyNum = null;     //每次改变都会清空最后countynum选择的值
                    if (scope.provinceNum != null) {
                        angular.forEach(CITY, function (data) {
                            if (data.ProID == scope.provinceNum) {
                                scope.cityData.push(data);
                            }
                        })
                    }
                })
                scope.$watch('cityNum', function () {
                    scope.countyData = [];  //改变的时候清空区县的值
                    //scope.countyNum = null; //改变的时候清空区县里的选择
                    /*下面这一步是把取到的东西全部转成数字*/
                    if (!scope.search) {
                        scope.provinceNum = +scope.provinceNum;
                        scope.cityNum = +scope.cityNum;
                        scope.countyNum = +scope.countyNum;
                    }
                    if (scope.cityNum != null) {
                        angular.forEach(COUNTY, function (data) {
                            if (data.CityID == scope.cityNum) {
                                scope.countyData.push(data);
                            }
                        })
                    }
                })
            }
        }
    })
    /* 分页指令 */
    .directive('mypagintion', function () {
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
                scope.total = {};
                scope.currentPage = 1; //初始页
                scope.$parent.vm.pagingdata(scope.currentPage)

                scope.$watch('total.page;total.totals', function (n, o) {
                    if (n!=o) {
                        scope.totalItems = scope.total.totals;
                        scope.currentPage = scope.total.page;
                    }
                })
                scope.$watch('total.page', function (n, o) {
                    if (n!=o) {
                        scope.totalItems = scope.total.totals;
                        scope.currentPage = scope.total.page;
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
    /* 两次弹框页面模态 */
    //模态框的提示信息
    .value('articlemodealinfo',{
        /* 格式 ['第一次弹框：从数据库中删除将无法回复','第一次弹框：是否执行删除操作？','第二次弹框：删除成功']; */
        status: '',
        delete:'',
        deleteuser:'',
    })
    // Please note that $uibModalInstance represents a modal window (instance) dependency.
    // It is not the same as the $uibModal service used above.
    .controller('articleModalInstanceCtrl', function ($scope,$uibModalInstance,items) {
        //这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
        $scope.items = items;//这里就可以去外层主控制器的数据了

        $scope.ok = function () {
            //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
            $uibModalInstance.close('ok');
        };

        $scope.cancel = function () {
            //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
            $uibModalInstance.dismiss('cancel');
        };
    })
    //必须要引入的模块有两个ngAnimate\ui.bootstrap,一个都不能少,必须在这个模板加载的时候引入
    .directive('myModeal',function ($uibModal,articlemodealinfo) {
        return {
            restrict: 'AE',
            replace: false,
            //templateUrl: 'tpls/dirtpls/mymodeal.html',
            scope: {
                ngModel : '@', //模态1
                ngModel2:'@',  //模态2
                tipstext:'@',  //value服务中的值
                operation: '=', //点击确定调用的函数
                tipsinfo:'&', //调用控制器中的函数，获取提示信息
            },
            link: function (scope, ele, attrs, supermanCtrl) {
                scope.html = scope.ngModel; //模态html初始赋值
                scope.$parent.open = function (size) {
                    scope.tipsinfo();
                    scope.items = articlemodealinfo[''+scope.tipstext]; //赋值给模态控制器的值

                    //这里很关键,是打开模态框的过程
                    var modalInstance = $uibModal.open({
                        animation: scope.animationsEnabled,//打开时的动画开关
                        templateUrl: 'tpls/dirtpls/'+scope.html,//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                        controller:'articleModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
                        size: size,//模态框的大小尺寸
                        resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                            items: function () {//items是一个回调函数
                                return scope.items;//这个值会被模态框的控制器获取到
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
                        scope.selected = selectedItem;//模态框的返回值
                        if (scope.selected == 'ok') {
                            scope.operation();           //点击确定的处理函数
                            scope.html = scope.ngModel2; //更换模内容
                            scope.$parent.open();
                            scope.html = scope.ngModel;  //还原模态内容
                        }
                    }, function () {
                        //console.log('模态已关闭: ' + new Date());
                    });
                };
                scope.animationsEnabled = true;
                scope.toggleAnimation = function () {
                    scope.animationsEnabled = !scope.animationsEnabled;//动画效果
                };
            }
        }
    })
    /* 模态父级指令 */
    .directive('myModealBox',function () {
        return {
            restrict:'AE',
            repace:false,
            scope:true,
        }
    })
    /*模态指令fromFrank*/
    .directive('useModal',function ($uibModal) {
        return {
            restrict:"A",
            replace:false,
            scope:{
                /*点击确认后执行的函数*/
                ctrFn: '&',
                /*获取各种数据的函数*/
                ctrclick:'&',
                /*是否要显示第二段弹出框，没有默认会弹出第二段*/
                modalTwice:"@",
                /*第一次是否有确认按钮，没有就默认弹出会有*/
                okChoose:"@",
                /*是否为异步，异步执行这个*/
                asctrclick:'@'

            },
            //scope.modaldata中对应三个参数，首先第一个模板默认显示两行，第一行是tilte，第二行是content。第二个模板默认只显示一行，success并且只有一个取消按钮
            link:function (scope,ele) {
                /*给属性添加一个点击事件*/
                ele.bind("click",function () {
                    /*执行我那边传入值的函数*/
                    // scope.ctrclick();
                    if (scope.asctrclick) {
                        scope.ctrclick().then(function () {
                            scope.modaldata=scope.ctrclick();
                            scope.openModle();
                        })
                    }else {
                        scope.modaldata=scope.ctrclick();
                        scope.openModle();
                    }
                });
                scope.openModle = function (size,num) {
                    /*打开模态框的过程*/
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'tpls/modaltpls/test.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                        controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
                        size: size,//模态框的大小尺寸
                        resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                            items: function () {//items是一个回调函数,我这里需要让它在外部获取到
                                scope.modaldata.num = num?1:false;
                                scope.modaldata.okChoose = scope.okChoose?2:1;
                                return scope.modaldata;//这个值会被模态框的控制器获取到
                            }
                        }
                    });
                    modalInstance.result.then(function () {
                        scope.ctrFn();
                        scope.modalTwice?false:scope.openModle(size,1);
                    })
                }
            }
        }
    })
    /*模态框控制器*/
    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
        //这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
        $scope.items = items;//这里就可以去外层主控制器的数据了

        $scope.ok = function () {
            //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
            $uibModalInstance.close('OK');
        };

        $scope.cancel = function () {
            //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
            $uibModalInstance.dismiss('cancel');
        };
    })
    /*两次密码输入相同验证,传入一个check参数，绑定外部和它对比的参数，注意外部绑定参数需要用{{}}*/
    .directive('pwCheck',function () {
        return {
            require:'ngModel',
            scope:{
                check:'@'
            },
            link:function (scope,ele,attrs,ctrl) {
                ctrl.$validators.pwCheck = function (modelValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        return true;
                    }
                    return modelValue === scope.check?true:false;
                }
            }
        }
    })