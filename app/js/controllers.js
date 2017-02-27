/**
 * Created by ivws on 2017/1/21.
 */
var mainCtrl = angular.module('mainCtrl', [])
    .controller('mainHtmlCtrl', ['$scope', '$cookieStore', 'myService', 'aboutWe',
        function ($scope, $cookieStore, myService, aboutWe) {
            var vm = this;

            /* 导航栏 */
            vm.focuspage = myService.pages();
            vm.pagesBtn = function (index) {
                $cookieStore.put('pages', index);
                vm.focuspage = index;
            };
            /* 底部联系我们跳转 */
            vm.aboutWe = function (bl) {
                aboutWe.toggle = bl;
                $cookieStore.put('pages',4);
            }
        }
    ])
    /* 关于我们页面 */
    .controller('weCtrl', ['$scope', 'aboutWe','$cookieStore',
        function ($scope, aboutWe,$cookieStore) {
            var vm = this;
            vm.toggle = aboutWe.toggle;

        }
    ])
    /* 首页 */
    .controller('homeHtmlCtrl', function ($scope, partnerSay, getService) {
        var vm = this;

        /* 伙伴之言轮播 */
        vm.partnersay_data = partnerSay.partnersay_data;
        vm.promise = {
            'index': 0,
            'movesize': 1020,
            'Xaxis': true,
            'Yaxis': false,
            'elelength': true,
            'data': partnerSay.partnersay_data
        };

        /* 获取banner图列表 */
        getService.get_article(0).then(function (res) {
            if (res.data.code == 0) {
                vm.bannerimg = res.data.data.articleList[0].img;
                //console.log(vm.bannerimg);
            }
        })

        /* 最新职位 */
        getService.get_profession(0, 16, '').then(function (res) {
            if (res.data.code == 0) {
                vm.newsjob = res.data.data;
                //console.log(vm.newsjob);
                /* 最新职位轮播 */
                $scope.myInterval = 5000;
                $scope.noWrapSlides = false;
                $scope.active = 0;
                var slides = $scope.slides = [];
                //var currIndex = 0;

                /* 添加图片 */
                $scope.addSlide = function () {
                    b = i * 4;
                    slides.push({
                        image1: vm.newsjob[b].logo,
                        image2: vm.newsjob[b + 1].logo,
                        image3: vm.newsjob[b + 2].logo,
                        image4: vm.newsjob[b + 3].logo,
                        company1: vm.newsjob[b].companyName,
                        company2: vm.newsjob[b + 1].companyName,
                        company3: vm.newsjob[b + 2].companyName,
                        company4: vm.newsjob[b + 3].companyName,
                        job1: vm.newsjob[b].name,
                        job2: vm.newsjob[b + 1].name,
                        job3: vm.newsjob[b + 2].name,
                        job4: vm.newsjob[b + 3].name,
                        id1: vm.newsjob[b].id,
                        id2: vm.newsjob[b + 1].id,
                        id3: vm.newsjob[b + 2].id,
                        id4: vm.newsjob[b + 3].id,
                    });
                };

                for (var i = 0; i < 4; i++) {
                    $scope.addSlide()
                }
            }
        })
    })
    /* 找职位 */
    .controller('jobHtmlCtrl', function ($scope, getService, $filter, userFellType, developType, bigdataType) {
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
                    getService.get_profession(1, 8, '').then(function (res) {
                        if (res.data.code == 0) {
                            vm.newprofessionList = res.data.data;
                            //console.log(vm.newprofessionList);
                        }
                    });
                    break;
                case false:
                    getService.get_profession(0, 8, '').then(function (res) {
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
        getService.get_industry(1, '', '').then(function (res) {
            if (res.data.code == 0) {
                vm.approvedCompanyList1 = res.data.approvedCompanyList;
            }
        });
    })
    /* 找精英页面 */
    .controller('eliteHtmlCtrl', function ($scope, getService) {
        var vm = this;

        getService.get_article(2).then(function (res) {
            if (res.data.code == 0) {
                vm.articleurl = res.data.data.articleList[0].img;
            }
        })
        getService.get_industry(0, 8, '').then(function (res) {
            if (res.data.code == 0) {
                vm.companyimgdata = res.data.data;
            }
        })
    })
    /* 职位列表页面 */
    .controller('jobListCtrl', function ($scope, getService, $state, searchOptions) {
        var vm = this;

        vm.newurl = $state.params.new;
        if ( vm.newurl  == "true") {
            vm.newurl = 1;
            vm.pagename ='推荐职位';
        }else {
            vm.newurl = 0;
            vm.pagename ='最新职位';
        }

        /* 搜索为空时加载推荐职位数据 */
        getService.get_profession(1,4,'').then(function (res) {
            if (res.data.code == 0) {
                vm.newprofessionList = res.data.data;
                //console.log(vm.newprofessionList);
            }
        });

        /* 分页数据请求 */
        //vm.newurl == "true" ? vm.newurl = 1 : vm.newurl = 0;
        /*使用分页器上的指令来进行各种数据的搜索和交互*/
        vm.pagingdata = function (page) {
            var searchData = {
                recommend:vm.newurl,
                name: vm.name,
                category: vm.categeoryTypeArry.join(','),
                compensation: vm.compensationTypeArry.join(','),
                education: vm.educationTypeArry.join(','),
                experience: vm.experienceTypeArry.join(','),
                //financing: 1,
                industry: vm.industryTypeArry.join(','),
                page: page,
                province: vm.provinceTypeArry.join(","),
                returnTags: 1,
                size: 9,
                subCategory: vm.subCategoryTypeArry.join(','),
                updateAt: vm.updateAtTypeArry,
            }
            getService.search_jobMinute(searchData).then(function (res) {
                if (res.data.code == 0) {
                    if (res.data.data.length == 0) {
                        vm.nodata = true;
                        vm.joblistdata = res.data.data;
                        vm.totalItems = res.data.total;
                    }else {
                        vm.nodata = false;
                        vm.joblistdata = res.data.data;
                        vm.totalItems = res.data.total;
                    }
                }
            })
        };
        /*筛选搜索数据begin*/
        vm.searchOption = searchOptions;
        vm.categeoryTypeArry = [];
        vm.subCategoryTypeArry = [];
        /*所在地区*/
        vm.provinceTypeArry = [];
        /*所属行业*/
        vm.industryTypeArry = [];
        /*学历要求*/
        vm.educationTypeArry = [];
        /*工作经验*/
        vm.experienceTypeArry = [];
        /*薪资水平*/
        vm.compensationTypeArry = [];
        /*发布时间*/
        vm.updateAtTypeArry = '';
        /*融资规模*/
        vm.financingTypeArry = [];
        /*关键字*/
        vm.name = '';
        /*筛选搜索数据end*/
        /*当选择两个职位类别时，清空职位等级数组*/
        vm.clearSubCategory = function (ele) {
            if (vm.categeoryTypeArry.length !== 1) {
                vm.subCategoryTypeArry = [];
            }
            if (ele.items.type == null) {
                vm.subCategoryTypeArry = [];
            }
        };
        /*清空并搜索*/
        vm.clearList = function () {
            /*清空各种*/
            /*所在地区*/
            vm.provinceTypeArry = [];
            /*职位类别*/
            vm.categeoryTypeArry = [];
            /*职位等级*/
            vm.subCategoryTypeArry = [];
            /*所属行业*/
            vm.industryTypeArry = [];
            /*学历要求*/
            vm.educationTypeArry = [];
            /*工作经验*/
            vm.experienceTypeArry = [];
            /*薪资水平*/
            vm.compensationTypeArry = [];
            /*发布时间*/
            vm.updateAtTypeArry = '';
            vm.pagingdata(1);
        };
    })
    /* 公司列表页面 */
    .controller('companyListCtrl', function ($scope, getService, searchOptions, $filter, $state) {
        var vm = this;
        /* 搜索为空推荐职业数据 */
        getService.get_profession(1,4,'').then(function (res) {
            if (res.data.code == 0) {
                vm.newprofessionList = res.data.data;
                //console.log(vm.newprofessionList);
            }
        });


        /*获取公司列表信息，三个参数，第二个是每页多少个，第三个是第几页，现在为每页9个，第1页*/
        /* 分页数据请求 */

        vm.pagingdata = function (page) {
            var searchData = {
                financing: vm.financingTypeArry.join(','),
                industry: vm.industryTypeArry.join(','),
                page: page,
                province: vm.provinceTypeArry.join(","),
                size: 9,
                returnPage: '',
                name: vm.name
            }
            getService.search_companyMinute(searchData).then(function (res) {
                if (res.data.code == 0) {
                    if (res.data.code == 0) {
                        if (res.data.data.length == 0) {
                            vm.nodata = true;
                            vm.joblistdata = res.data.data;
                            vm.totalItems = res.data.total;
                        }else {
                            vm.nodata = false;
                            vm.joblistdata = res.data.data;
                            vm.totalItems = res.data.total;
                        }
                    }
                }
            });
        }
        /*给vm.name赋值*/
        $state.params.name?vm.name = $state.params.name:vm.name='';
        /*筛选搜索数据begin*/
        vm.searchOption = searchOptions;
        /*所在地区*/
        vm.provinceTypeArry = [];
        /*所属行业*/
        vm.industryTypeArry = [];
        /*融资规模*/
        vm.financingTypeArry = [];
        /*筛选搜索数据end*/
        vm.clearList = function () {
            /*所在地区*/
            vm.provinceTypeArry = [];
            /*所属行业*/
            vm.industryTypeArry = [];
            vm.financingTypeArry = [];
            vm.name = '';
            vm.pagingdata(1);
        };

    })
    /* 公司详情页 */
    .controller('companyInfoCtrl', function ($scope, $location, getService) {
        var vm = this;
        var id = '';
        vm.isActive = true;
        $location.search().id ? id = $location.search().id : '';
        /*获取公司详情*/
        getService.search_company(id).then(function (res) {
            if (res.data.code == 0) {
                vm.companyData = res.data.data;
            }
        });
        /*获取公司在招职位详情*/
        getService.search_job(id).then(function (res) {
            if (res.data.code == 0) {
                vm.jobData = res.data.data;
                vm.jobNum = res.data.total;
            }
        });
        vm.isActiveT = function () {
            vm.isActive = true;
        };
        vm.isActiveF = function () {
            vm.isActive = false
        }

    })
    /* 职业详情页 */
    .controller('jobInfoCtrl', function ($scope, getService, $location) {
        var vm = this;
        //获取ID
        $location.search().id ? id = $location.search().id : id = '';
        //通过ID获取职位响应信息
        getService.search_JobMinute(id).then(function (res) {
            if (res.data.code == 0) {
                vm.jobMinute = res.data.data;
            }
            //console.log(vm.jobMinute);
        });
    })
    /*职业搜索页*/
    .controller('searchjobCtrl', function ($scope, searchOptions, getService,$state) {
        var vm = this;
        /* 搜索为空推荐职业数据 */
        getService.get_profession(1,4,'').then(function (res) {
            if (res.data.code == 0) {
                vm.newprofessionList = res.data.data;
                //console.log(vm.newprofessionList);
            }
        });
        vm.categeoryTypeArry = [];
        vm.subCategoryTypeArry = [];
        /*获取上页传入的数据*/
        /*职位类别*/
        $state.params.type?vm.categeoryTypeArry.push(parseInt($state.params.type)):vm.categeoryTypeArry = [];
        /*职位等级*/
        $state.params.subtype?vm.subCategoryTypeArry.push(parseInt($state.params.subtype)):vm.subCategoryTypeArry = [];
        /*获取公司列表信息，三个参数，第二个是每页多少个，第三个是第几页，现在为每页9个，第1页*/
        /* 分页数据请求 */
        vm.pagingdata = function (page) {
            var searchData = {
                name: vm.name,
                category: vm.categeoryTypeArry.join(','),
                compensation: vm.compensationTypeArry.join(','),
                education: vm.educationTypeArry.join(','),
                experience: vm.experienceTypeArry.join(','),
                //financing: 1,
                industry: vm.industryTypeArry.join(','),
                page: page,
                province: vm.provinceTypeArry.join(","),
                returnTags: 1,
                size: 9,
                subCategory: vm.subCategoryTypeArry.join(','),
                updateAt: vm.updateAtTypeArry,
            }
            getService.search_jobMinute(searchData).then(function (res) {
                if (res.data.code == 0) {
                    if (res.data.code == 0) {
                        if (res.data.data.length == 0) {
                            vm.nodata = true;
                            vm.joblistdata = res.data.data;
                            vm.totalItems = res.data.total;
                        }else {
                            vm.nodata = false;
                            vm.joblistdata = res.data.data;
                            vm.totalItems = res.data.total;
                        }
                    }
                }
            })
        };
        /*筛选搜索数据begin*/
        vm.searchOption = searchOptions;
        /*所在地区*/
        vm.provinceTypeArry = [];
        /*所属行业*/
        vm.industryTypeArry = [];
        /*学历要求*/
        vm.educationTypeArry = [];
        /*工作经验*/
        vm.experienceTypeArry = [];
        /*薪资水平*/
        vm.compensationTypeArry = [];
        /*发布时间*/
        vm.updateAtTypeArry = '';
        /*融资规模*/
        vm.financingTypeArry = [];
        /*关键字*/
        vm.name = '';
        /*筛选搜索数据end*/
        /*当选择两个职位类别时，清空职位等级数组*/
        vm.clearSubCategory = function (ele) {
            if (vm.categeoryTypeArry.length !== 1) {
                vm.subCategoryTypeArry = [];
            }
            if (ele.items.type == null) {
                vm.subCategoryTypeArry = [];
            }
        };
        /*清空并搜索*/
        vm.clearList = function () {
            /*清空各种*/
            /*所在地区*/
            vm.provinceTypeArry = [];
            /*职位类别*/
            vm.categeoryTypeArry = [];
            /*职位等级*/
            vm.subCategoryTypeArry = [];
            /*所属行业*/
            vm.industryTypeArry = [];
            /*学历要求*/
            vm.educationTypeArry = [];
            /*工作经验*/
            vm.experienceTypeArry = [];
            /*薪资水平*/
            vm.compensationTypeArry = [];
            /*发布时间*/
            vm.updateAtTypeArry = '';
            vm.pagingdata(1);
        };
    })


