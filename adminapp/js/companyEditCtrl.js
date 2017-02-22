/**
 * Created by Administrator on 2017/2/20.
 */
angular.module('adminApp')
    .controller('companyEditCtrl', function ($scope, getAdminSercive, FileUploader, joblisttype,$location) {
        var vm = this;
        /*上传信息的列表,有两个东西有初始值*/
        vm.industryData = [];
        vm.output = [];
        vm.data = {
            company: {
                approved: 0,
                financing:0,
            },
            tagList: [],
            productList:[]
        };
        /*由于插件的原因，在进入的时候给它设置一个全选为false，保证在新增页面正确显示*/
        angular.forEach(joblisttype.industrytype,function (data) {
            data.choose = false;
        })
        /*从服务器上获取到的数据，对这个数据进行处理才能正确显示我页面中的东西，begin*/
        vm.industryData = joblisttype.industrytype;
        /*如果有传入ID的话，先获取并渲染一下页面啦*/
        if($location.search().id) {
            vm.searchid = $location.search().id
            getAdminSercive.companySeachrById(vm.searchid).then(function (res) {
                if (res.data.code==0) {
                    vm.data = res.data.data;
                    /*对于productList储存的对象的处理*/
                    vm.productList = vm.data.productList[0]
                }
                /*新建一个数组，用于储存服务器上数据的值，下面是储存操作*/
                var _industryData = [];
                angular.forEach(vm.data.industryList, function (data) {
                    _industryData.push(data.industry);
                });
                /*改变数组为我需要的样子，也就是添加choose属性，给它一个true和false*/
                angular.forEach(vm.industryData, function (data) {
                    if (_industryData.indexOf(data.type) == -1) {
                        data.choose = false
                    } else {
                        data.choose = true
                    }
                });
            })
        }
        vm.test = function () {

        };
        /*这个是点击上传,有ID的时候修改公司，没有ID的时候创建公司*/
        vm.creatCompany = function () {
            vm.data.productList.push(vm.productList);
            if (!vm.searchid) {
                getAdminSercive.login().then(function () {
                    getAdminSercive.creatCompany(vm.data).then(function (res) {
                        if (res.data.code==0) {
                            $location.url('app/companyList')
                        }
                    })
                })
            }else {
                getAdminSercive.companyChangeById(vm.searchid,vm.data).then(function (res) {
                    if (res.data.code==0) {
                        $location.url('app/companyList');
                    }else {
                        alert('上传失败，请联系管理员');
                    }
                });
            }
        };
        vm.joblisttype = joblisttype;
        /*这里是对于tag列表的操作*/
        /*对于taglist的操作*/
        /*添加操作*/
        vm.addTag = function () {
            var _hasattr = false;
            angular.forEach(vm.data.tagList, function (data) {
                if (data.tag === vm.tag || vm.tag == "") {
                    _hasattr = true
                }
            });
            _hasattr ? '' : vm.data.tagList.push({'tag': vm.tag});
        };
        /*删除操作*/
        vm.deleteTag = function (index) {
            vm.data.tagList.splice(index, 1);
        };
        /*对于公司行业列表的操作，关闭的时候把选择的东西，传入我要上传的对象中*/
        vm.changeIndustry = function () {
            vm.data.industryList = [];
            angular.forEach(vm.output, function (data) {
                if (data.choose == true) {
                    vm.data.industryList.push({'industry': data.type})
                }
            });
            console.log(vm.data.industryList)
        };
    })