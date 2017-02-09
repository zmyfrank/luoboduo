/**
 * Created by ivws on 2017/1/21.
 */
var mainDirectives = angular.module('mainDirectives',[])
    /* 轮播图 */
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
