/**
 * Created by ivws on 2017/1/21.
 */
var mainDirectives = angular.module('mainDirectives',[])
    /* 首页单个tab轮播图 */
    .directive('myfocus', function ($interval,$timeout,$window) {
        return {
            restrict:'AE',
            replace:false,
            scope:{
                dirpromise : '=',
            },

            link: function (scope, ele, attrs,supermanCtrl) {

                scope.dirpromise.data.push(scope.dirpromise.data[0]);

                /* 初始化轮播尺寸 */
                var myfocus_wrap = $(".m-myfocus-wrap");

                var n,focusimg_wrap,myfocus,length;
                scope.focusimg_wrap = $timeout(function (){
                    n = $window.innerWidth
                    myfocus = $(".m-myfocus");
                    focusimg_wrap = $(".m-focusimg-wrap");
                    if(scope.dirpromise.length) {
                        length = scope.dirpromise.data.length
                    }else {
                        length = focusimg_wrap.length*4;
                    }
                    imgWrapSize();

                    /* 轮播定时器 */
                    scope.timer = $interval(function(){
                        scope.dirpromise.index++;
                        Move()
                    },5000);

                    myfocus.hover(function () {
                            $interval.cancel(scope.timer);
                        },
                        function () {
                            scope.timer = $interval(function(){
                                scope.dirpromise.index++;
                                Move()
                            },5000);
                        })
                },2000)

                /* 监听视口大小 */
                $(window).resize(function() {
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
                    if(length == scope.dirpromise.index) {
                        myfocus_wrap.css('left',0);
                        scope.dirpromise.index = 1;
                    }

                    if(scope.dirpromise.index == -1 ) {
                        myfocus_wrap.css({left:-(length-1)*scope.dirpromise.movesize});
                        scope.dirpromise.index = length-2;
                    }

                    myfocus_wrap.stop().animate({left:-scope.dirpromise.index*scope.dirpromise.movesize},800)
                }
                
                /* 轮播图片大小 */
                function imgWrapSize() {
                    if (n>1020){
                        scope.dirpromise.movesize = 1020/4 ;
                        focusimg_wrap.css('width','1020px');
                        myfocus.css('width','1020px');
                    }else if (n<=1020&&n>992){
                        scope.dirpromise.movesize = 940/4 ;
                        focusimg_wrap.css('width','940px');
                        myfocus.css('width','940px');
                    }else if(n<992&&n>768) {
                        scope.dirpromise.movesize = 750 ;
                        focusimg_wrap.css('width','750px');
                        myfocus.css('width','750px');
                    }else if (n<=768){
                        scope.dirpromise.movesize = n-1;
                        focusimg_wrap.css('width',n-1+'px');
                        myfocus.css('width',n-1+'px');
                    }
                }
            }
        }
    })
    /* 找职业轮播2 */
    .directive('jobfocus2',function($filter,getService){
        return {
            restrict:'AE',
            replace:false,
            templateUrl:'../tpls/focus/jobcarot.html',
            scope:{},
            link:function (scope, ele, attrs,supermanCtrl) {
                getService.get_industry(1).then(function (res) {
                    if (res.data.code == 0) {
                        scope.industry1data = res.data.approvedCompanyList;
                        //console.log(scope.industry1data);
                        scope.newInd = $filter('reachIndustry')(scope.industry1data,'industryList');

                        console.log(scope.newInd);
                        scope.myInterval = 5000000;
                        var slides = scope.slides = [];
                        var currIndex = 0;

                        scope.addIndustry1 = function () {
                            slides.push({
                                image:scope.newInd[i].logo,
                                name:scope.newInd[i].name,
                                slogan:scope.newInd[i].slogan,
                                professionList:scope.newInd[i].professionList,
                                industryList:scope.newInd[i].industryList,
                                id: currIndex++
                            })
                        }

                        for (var i = 0; i < 4; i++) {
                            scope.addIndustry1();
                            console.log(scope.industry1);
                            console.log(scope.newInd[i].logo);
                        };
                    }
                });
            }
        }
    })
    /* 找职业轮播2 */
    .directive('jobfocus1',function () {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: '../tpls/focus/jobcarot2.html',
            scope: {},
            link:function (scope, ele, attrs,supermanCtrl){
                scope.myInterval = 5000;
                var slides = scope.slides = [];
                var currIndex = 0;

                scope.addSlide = function() {
                    var newWidth = 600 + slides.length + 1;
                    slides.push({
                        image: '//unsplash.it/' + newWidth + '/300',
                        text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
                        id: currIndex++
                    });
                };

                for (var i = 0; i < 3; i++) {
                    scope.addSlide();
                }
            }
        }
    })
