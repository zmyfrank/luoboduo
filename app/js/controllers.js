/**
 * Created by ivws on 2017/1/21.
 */
var mainCtrl = angular.module('mainCtrl', [])
    .controller('mainHtmlCtrl', ['$scope','$cookieStore','myService','aboutWe',
        function ($scope,$cookieStore,myService,aboutWe) {
            var vm = this;

            /* 导航栏 */
            vm.focuspage = myService.pages();
            vm.pagesBtn = function(index){
                $cookieStore.put('pages',index);
                vm.focuspage = index;
            };
            /* 底部联系我们跳转 */
            vm.aboutWe = function(bl){
                aboutWe.toggle=bl;
            }
        }
    ])
    /* 关于我们页面 */
    .controller('weCtrl',['$scope','aboutWe',
        function ($scope,aboutWe) {
            var vm = this;
            vm.toggle = aboutWe.toggle;
        }
    ])
    /* 首页 */
    .controller('homeHtmlCtrl', function ($scope,partnerSay,getService) {
        var vm = this;

        /* 伙伴之言轮播 */
        vm.partnersay_data = partnerSay.partnersay_data;
        vm.promise = {
            'index':0,
            'movesize':1020,
            'Xaxis':true,
            'Yaxis':false,
            'elelength':true,
            'data':partnerSay.partnersay_data
        };

        /* 获取banner图列表 */
        getService.get_article(0).then(function (res) {
            if(res.data.code == 0){
                vm.bannerimg = res.data.data.articleList[0].img;
                //console.log(vm.bannerimg);
            }
        })

        /* 最新职位 */
        getService.get_profession(0,16).then(function (res) {
          if (res.data.code == 0){
              vm.newsjob = res.data.data;
              console.log(vm.newsjob);
              /* 最新职位轮播 */
              $scope.myInterval = 5000;
              $scope.noWrapSlides = false;
              $scope.active = 0;
              var slides = $scope.slides = [];
              var currIndex = 0;

              /* 添加图片 */
              $scope.addSlide = function() {
                  b = i*4;
                  slides.push({
                      image1:  vm.newsjob[b].logo,
                      image2:  vm.newsjob[b+1].logo,
                      image3:  vm.newsjob[b+2].logo,
                      image4:  vm.newsjob[b+3].logo,
                      company1: vm.newsjob[b].companyName,
                      company2: vm.newsjob[b+1].companyName,
                      company3: vm.newsjob[b+2].companyName,
                      company4: vm.newsjob[b+3].companyName,
                      job1: vm.newsjob[b].name,
                      job2: vm.newsjob[b+1].name,
                      job3: vm.newsjob[b+2].name,
                      job4: vm.newsjob[b+3].name,
                      id: currIndex++
                  });
              };

              for (var i = 0; i < 4; i++) {
                  $scope.addSlide()
              }
          }
        })
    })
    /* 找职位 */
    .controller('jobHtmlCtrl',function ($scope,getService,$filter,userFellType,developType,bigdataType) {
        var vm = this;
        vm.isActive1 = true;
        //改变状态，并且重新获取
        vm.changeActive1T = function () {
            vm.isActive1 = true;
            getDataP();
        };
        vm.changeActive1F = function () {
            vm.isActive1 = false;
            getDataP();
        };
        //获取数据的函数
        function getDataP() {
            switch (vm.isActive1) {
                case true:
                    getService.get_profession(1,8).then(function (res) {
                        if (res.data.code == 0) {
                            vm.newprofessionList = res.data.data;
                            //console.log(vm.newprofessionList);
                        }
                    });
                    break;
                case false:
                    getService.get_profession(0,8).then(function (res) {
                        if (res.data.code == 0) {
                            vm.newprofessionList = res.data.data;
                            //console.log(vm.newprofessionList);
                        }
                    });
                    break;
            }
        }
        getDataP();
        //顶部选项卡的数据
        vm.userFellType = userFellType;
        vm.developType = developType;
        vm.bigdataType = bigdataType;
        //获取推荐公司
        getService.get_industry(1,'','').then(function (res) {
            if (res.data.code == 0) {
                vm.approvedCompanyList1 = res.data.approvedCompanyList;
            }
        });
    })
    .controller('eliteHtmlCtrl',function ($scope,getService) {
        var vm = this;

        getService.get_article(2).then(function (res) {
            if (res.data.code == 0){
                vm.articleurl = res.data.data.articleList[0].img;
            }
        })
        getService.get_industry(0,8,'').then(function (res) {
            if (res.data.code == 0){
                vm.companyimgdata = res.data.data;
            }
        })
    })
    /* 职位列表页面 */
    .controller('jobListCtrl',function ($scope,getService) {
        var vm = this;

    })
    /* 公司列表页面 */
    .controller('companyListCtrl',function ($scope) {
        var vm = this;

    })
    /* 公司详情页 */
    .controller('companyInfoCtrl',function ($scope,$location,getService) {
        var vm = this;
        var id = '';
        vm.isActive = false;
        $location.search().id?id=$location.search().id:'';
        /*获取公司详情*/
        getService.search_company(id).then(function (res) {
            if (res.data.code == 0) {
                vm.companyData = res.data.data;
            };
        });
        /*获取公司在招职位详情*/
        getService.search_job(id).then(function (res) {
            if (res.data.code == 0) {
                vm.jobData = res.data.data;
                vm.jobNum = res.data.total;
            }
        })
        vm.isActiveT = function () {
            vm.isActive = true;
        };
        vm.isActiveF = function () {
            vm.isActive = false
        }

    })
    /* 职业详情页 */
    .controller('PaginationDemoCtrl', function ($scope, $log) {

    });


