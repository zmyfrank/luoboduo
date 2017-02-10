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
            }
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
            'data':partnerSay.partnersay_data,
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
              $scope.myInterval = 50000000;
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
    .controller('jobHtmlCtrl',function ($scope,getService,$filter) {
        var vm = this;
        /*轮播1*/
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//unsplash.it/' + newWidth + '/300',
                text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
                id: currIndex++
            });
        };

        for (var i = 0; i < 3; i++) {
            $scope.addSlide();
        }
        /*轮播2*/
        getService.get_industry(1).then(function (res) {
            if (res.data.code == 0) {
                $scope.industry1data = res.data.approvedCompanyList;
                //console.log($scope.industry1data);
                $scope.newInd = $filter('reachIndustry')($scope.industry1data,'industryList');
                console.log($scope.newInd);
                $scope.myInterval = 500000;
                $scope.noWrapSlides1 = false;
                $scope.active1 = 0;
                var industry1 = $scope.industry1 = [];
                var currIndex1 = 0;
                $scope.addIndustry1 = function () {
                    industry1.push({
                        image:$scope.newInd[i].logo,
                        name:$scope.newInd[i].name,
                        slogan:$scope.newInd[i].slogan,
                        professionList:$scope.newInd[i].professionList,
                        industryList:$scope.newInd[i].industryList,
                        id1:currIndex1++
                    })
                }
                for (var i = 0; i < 4; i++) {
                    $scope.addIndustry1();
                    console.log($scope.industry1);
                    console.log($scope.newInd[i].logo);
                };
            }
        });
    })
    /* 职位列表页面 */
    .controller('jobListCtrl',function ($scope) {
        var vm = this;

    })
    /* 公司列表页面 */
    .controller('companyListCtrl',function ($scope) {
        var vm = this;

    })
    /* 公司详情页 */
    .controller('companyInfoCtrl',function ($scope) {
        var vm = this;

    })
    /* 职业详情页 */
    .controller('jobInfoCtrl',function ($scope) {
        var vm = this;

    })


