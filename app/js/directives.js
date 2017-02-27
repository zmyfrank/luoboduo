/**
 * Created by ivws on 2017/1/21.
 */
var mainDirectives = angular.module('mainDirectives', [])
/* 首页单个tab轮播图 */
    .directive('myfocus', function ($interval, $timeout, $window) {
        return {
            restrict: 'AE',
            replace: false,
            scope: {
                dirpromise: '=',
            },

            link: function (scope, ele, attrs, supermanCtrl) {

                scope.dirpromise.data.push(scope.dirpromise.data[0]);
                /* 初始化轮播尺寸 */
                var myfocus_wrap = $(".m-myfocus-wrap");
                //屏幕宽度，轮播图片容器，整个轮播容器，轮播宽度
                var n, focusimg_wrap, myfocus, length;

                scope.focusimg_wrap = $timeout(function () {
                    n = $window.innerWidth
                    myfocus = $(".m-myfocus");
                    focusimg_wrap = $(".m-focusimg-wrap");
                    if (scope.dirpromise.length) {
                        length = scope.dirpromise.data.length
                    } else {
                        length = focusimg_wrap.length * 4;
                    }
                    imgWrapSize();

                    /* 轮播定时器 */
                    scope.timer = $interval(function () {
                        scope.dirpromise.index++;
                        Move()
                    }, 5000);

                    myfocus.hover(function () {
                            $interval.cancel(scope.timer);
                        },
                        function () {
                            scope.timer = $interval(function () {
                                scope.dirpromise.index++;
                                Move()
                            }, 5000);
                        })
                }, 5000)

                /* 监听视口大小 */
                $(window).resize(function () {
                    n = $window.innerWidth;
                    imgWrapSize();
                });

                /* 左右按钮点击事件 */
                $('.myfocus-pre').click(function () {
                    scope.dirpromise.index++;
                    Move()
                })

                $('.myfocus-next').click(function () {
                    scope.dirpromise.index--;
                    Move()
                })

                /* 轮播移动 */
                function Move() {
                    if (length == scope.dirpromise.index+3) {
                        myfocus_wrap.css('left', 0);
                        scope.dirpromise.index = 1;
                    }

                    if (scope.dirpromise.index == -1) {
                        myfocus_wrap.css({left: -(length - 4) * (scope.dirpromise.movesize)});
                        scope.dirpromise.index = length - 5;
                    }

                    myfocus_wrap.stop().animate({left: -scope.dirpromise.index * scope.dirpromise.movesize}, 800)
                }

                /* 轮播图片大小 */
                function imgWrapSize() {
                    if (n > 1020) {
                        scope.dirpromise.movesize = 1020 / 4;
                        focusimg_wrap.css('width', '1020px');
                        myfocus.css('width', '1020px');
                    } else if (n <= 1020 && n > 992) {
                        scope.dirpromise.movesize = 940 / 4;
                        focusimg_wrap.css('width', '940px');
                        myfocus.css('width', '940px');
                    } else if (n < 992 && n > 768) {
                        scope.dirpromise.movesize = 750;
                        focusimg_wrap.css('width', '750px');
                        myfocus.css('width', '750px');
                    } else if (n <= 768) {
                        scope.dirpromise.movesize = n - 1;
                        focusimg_wrap.css('width', n - 1 + 'px');
                        myfocus.css('width', n - 1 + 'px');
                    }
                }
            }
        }
    })
    /* 找职业轮播2 */
    .directive('jobfocus2', function ($filter, getService) {
        return {
            restrict: 'AE',
            replace: false,
            templateUrl: 'tpls/focus/jobcarot.html',
            scope: {},
            link: function (scope, ele, attrs, supermanCtrl) {
                getService.get_industry(1, '', '').then(function (res) {
                    if (res.data.code == 0) {
                        scope.industry1data = res.data.approvedCompanyList;
                        //console.log(scope.industry1data);
                        scope.newInd = $filter('reachIndustry')(scope.industry1data, 'industryList');
                        //console.log(scope.newInd);
                        scope.myInterval = 5000;
                        scope.slides = scope.industry1data;

                    }
                });
            }
        }
    })
    /* 找职业轮播1 */
    .directive('jobfocus1', function (getService) {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'tpls/focus/jobcarot2.html',
            scope: {},
            link: function (scope, ele, attrs, supermanCtrl) {
                getService.get_article(1).then(function (res) {
                    if (res.data.code == 0) {
                        scope.myInterval = 5000;
                        scope.slides = res.data.data.articleList;
                    }
                })
            }
        }
    })
    /* 分页指令 */
    .directive('mypagintion', function (getService) {
        /* 分页 */
        return {
            restrict: 'AE',
            replace: false,
            templateUrl: 'tpls/focus/pagination.html',
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
    /*筛选指令，单选请添加multiselect属性等于空*/
    .directive('searchJob', function () {
        return {
            restrict: 'AE',
            replace: false,
            scope: {
                slectarry: '=',
            },
            link: function (scope, ele, attrs, Ctrl) {
                //scope.slectarry = [];
                //console.log(scope.slectarry);

                scope.$parent.gettype = function (ele) {
                    if (Boolean(attrs.multiselect) == true) {
                        //当点击所有的时候，清空数组
                        if (ele.items.type == null) {
                            scope.slectarry = [];
                        }
                        //当数组中没有选择的数字的时候，添加这个数字，并选择
                        else if (scope.slectarry.indexOf(ele.items.type) == -1 && ele.items.type != null) {
                            scope.slectarry.push(ele.items.type);
                        }
                        //当数组中有添加的这个数字的时候，删除这个数字，并取消选择
                        else if (scope.slectarry.indexOf(ele.items.type) != -1 && ele.items.type != null) {   //当数组中有这个点击的数字的时候，splice
                            var index = scope.slectarry.indexOf(ele.items.type);
                            scope.slectarry.splice(index, 1);
                        };
                        //console.log(scope.slectarry);
                        return scope.slectarry;
                    }else {
                        if (ele.items.type == null) {
                            scope.slectarry = '';
                        }else {
                            scope.slectarry = ele.items.type
                        }
                    }
                }
                //console.log(scope)
            }
        }
    })
    /* 搜索指令测试 */
    .directive('myseach',function (getService) {
        return {
            restrict:'AE',
            replace:false,
            templateUrl:'../tpls/focus/search.html',
            link:function (scope, ele, attrs,supermanCtrl) {
                scope.tag = function (searchName) {
                    if (this.$index != 0) {
                       if (this.items.choose) {
                           this.items.choose = !this.items.choose;
                           scope.subname = this.items.name;
                       }else {
                           this.items.choose = !this.items.choose;
                           /* 多选时不显示3级菜单 */
                           if (this.items.choose && searchName == 'category') {
                               var s = 0;
                               angular.forEach(scope.vm.searchOption['' + searchName], function (data, index, arry) {
                                   if (index != 0) {
                                       ++s;
                                       s != 1 ? scope.subhidde = false : scope.subhidde = true;
                                       scope.subname = index;
                                   }
                               })
                           }
                       }
                    }
                    angular.forEach(scope.vm.searchOption[''+searchName],function (data,index,arry) {
                        if(index != 0&&data.choose == true) {
                            scope.vm.searchOption[''+searchName][0].choose = false;
                        }else {
                            if (index != 0) {
                                data.choose = false
                                if (data.choose) {

                                }
                            }else {
                                data.choose = true;
                            }
                        }
                    })
                }
                var  j = 0;
                scope.subtag = function (){
                    if(this.$parent.$index!=0){
                        scope.vm.searchOption.subCategory[scope.subname-1].data[0].choose = false;
                        if (this.$parent.subdata.choose) {
                            j--;
                            if (j <= 0) {
                                scope.vm.searchOption.subCategory[0].data[0].choose = true;
                            }
                            this.$parent.subdata.choose = !this.$parent.subdata.choose;
                        }else {
                            j++;
                            this.$parent.subdata.choose = !this.$parent.subdata.choose
                        }
                    }else {
                        angular.forEach(scope.vm.searchOption.subCategory[scope.subname-1].data,function (data,index,arry) {
                            if (index != 0) {
                                data.choose = false;
                            }else {
                                data.choose = true;
                            }
                        })
                    }
                }

              scope.ss =  function (data) {
                    console.log(scope.vm.searchOption.subCategory);
                    //转换为字符串
                    var asdas = {};
                    var dataname;
                    for (dataname in data) {
                        asdas[dataname] = data[dataname].filter(function (item, index) {
                           // console.log(item,index)
                            return item.choose === true
                        });
                        asdas[dataname] = asdas[dataname].map(function (item) {
                            //console.log(item)
                            return item.type
                        })
                        asdas[dataname] = asdas[dataname].toString()
                    }
                    return asdas;
                }

            }
        }
    })
    /* 搜索指令测试2 */
    .directive('myseach2',function (searchOptions) {
        return {
            restrict:'AE',
            replace:false,
            scope:{
            },
            link:function (scope, ele, attrs,supermanCtrl) {
                var i = 0;
                scope.$parent.tag2 = function (searchName,ele) {
                    if (this.$index!=0) {
                        this.items.choose = !this.items.choose;
                        if (this.items.choose) {
                            i++;
                            scope.$parent.vm.searchOption[''+searchName][0].choose = false;
                        }else {
                            i--;
                            if (i == 0) {
                                scope.$parent.vm.searchOption[''+searchName][0].choose = true;
                            }else {
                                scope.$parent.vm.searchOption[''+searchName][0].choose = false;
                            }
                        }
                    }
                }
            }
        }
    })
    /*模态框指令*/
    .directive('modalUse',function ($uibModal) {
        return {
            restrict : "A",
            replace: false,
            scope:{},
            link: function (scope,ele) {
                ele.bind('click',function () {
                   scope.openModal();
                });
                scope.openModal = function () {
                   var modalInstance = $uibModal.open({
                       animation:true,
                       templateUrl:'tpls/modal.html',
                       controller:'ModalInstanceCtrl',
                       size:'md'
                   })
                }
            }
        }
    })
    .controller('ModalInstanceCtrl',function ($scope, $uibModalInstance) {
        $scope.cancel = function () {
            //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
            $uibModalInstance.dismiss('cancel');
        };
    })


