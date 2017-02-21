/**
 * Created by Administrator on 2017/2/20.
 */
angular.module('adminApp')
    .controller('companyEditCtrl', function ($scope, getAdminSercive, FileUploader, joblisttype,$location) {
        var vm = this;
        /*上传信息的列表,有两个东西有初始值*/
        vm.data = {
            company: {
                approved: 0,
                financing:0
            },
            tagList: []
        };
        vm.test = function () {

        };
        vm.creatCompany = function () {
            getAdminSercive.login
            getAdminSercive.creatCompany(vm.data).then(function (res) {
                if (res.data.code==0) {
                    $location.url('app/companyList')
                }
            })
        }
        vm.joblisttype = joblisttype;
        /*从服务器上获取到的数据，对这个数据进行处理才能正确显示我页面中的东西，begin*/
        vm.industryData = joblisttype.industrytype;
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
        /*关闭的时候把选择的东西，传入我要上传的对象中*/
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