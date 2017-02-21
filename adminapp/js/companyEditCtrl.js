/**
 * Created by Administrator on 2017/2/20.
 */
angular.module('adminApp')
    .controller('companyEditCtrl', function ($scope, getAdminSercive, FileUploader, joblisttype) {
        var vm = this;
        /*上传信息的列表*/
        vm.choosetype = [];//用这个来实现取值
        vm.data = {
            industryList: [
                {industry:2},
                {industry:1},
                {industry:3}
            ],
            tagList: []
        };
        vm.test = function () {

        };
        vm.joblisttype = joblisttype;
        vm.industryData = joblisttype.industrytype;
        /*从服务器上获取到的数据，对这个数据进行处理才能正确显示我页面中的东西，begin*/
        /*新建一个数组，用于储存服务器上数据的值，下面是储存操作*/
        var _industryData = [];
        angular.forEach(vm.data.industryList, function (data) {
            _industryData.push(data.industry);
        });
        /*实现选择数组中有的东西*/
        vm.choosetype = _industryData;
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
        /*对于公司标签所使用插件中数据的操作*/
        // /*选择当前的点击事件*/
        // vm.selectIt = function (data) {
        //     if (vm.choosetype.indexOf(data.type) == -1) {
        //         vm.choosetype.push(data.type)
        //     } else {
        //         vm.choosetype.splice(vm.choosetype.indexOf(data.type), 1);
        //     }
        //     console.log(vm.choosetype);
        // };
        // /*选择全部的点击事件*/
        // vm.selectAll = function () {
        //     vm.choosetype = [1, 2, 3, 4, 5, 6]
        // };
        // /*选择这一个的点击事件*/
        // vm.clearSelect = function () {
        //     vm.choosetype = []
        // };
        /*当关闭的时候，改变data对象里面的值*/
        /*先声明一下它为一个空对象，防止报错*/
        vm.output = {};
        /*关闭的时候把选择的东西，传入我要上传的对象中*/
        vm.changeIndustry = function () {
            vm.data.industryList = [];
            angular.forEach(vm.output, function (data) {
                if (data.choose == true) {
                    vm.data.industryList.push({'industry': data.type})
                }
            })
            console.log(vm.data.industryList)
        };
        vm.test2 = function () {

        }
        /*点击reset的时候触发的事件*/
        vm.resetIdustry = function () {
             vm.choosetype = _industryData;
        };
    })