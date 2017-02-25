/**
 * Created by Administrator on 2017/2/23.
 */
angular.module('adminApp')
    .controller('jobEditCtrl', function ($scope, joblisttype) {
        var vm = this;
        vm.joblisttype = joblisttype;
        vm.jobData = {
            "profession": {
                "companyId": 1,
                'companyName': "xxx有限公司",
                "name": "Java",
                "category": 2,
                "subCategory": 2,
                "education": 1,
                "experience": 2,
                "recommend": 1,
                "compensation": 2,
                "responsibility": "一口气写2万行代码",
                "requisite": "调1000bug不喘气",
                "boon": "程序猿鼓励师环绕"
            },
            "tags": [
                {"tag": "test"},
                {"tag": "test2"},
                {"tag": "test3"},
                {"tag": "test4"},
                {"tag": "test5"},
                {"tag": "test6"},
                {"tag": "test7"},
                {"tag": "test8"}
                ]
        }
        vm.zhiwei = [
            {"tag":"test"},
            {"tag":"test2"},
            {"tag":"test3"},
            {"tag":"test4"}
            ]
        /*新建一个数组，用于存放本职位有的tag*/
        vm.checkedArry = [];
        /*将本职位的有的tag放入数组，用于判断*/
        angular.forEach(vm.zhiwei,function (data) {
            vm.checkedArry.push(data.tag)
        });
        vm.chooseTag = function (eve,tag) {
            var checked = eve.target.checked;
            if (checked===true) {
                if (vm.checkedArry.indexOf(tag)==-1){
                    vm.checkedArry.push(tag)
                }
            }else {
                vm.checkedArry.splice(vm.checkedArry.indexOf(tag),1)
            }
            console.log(vm.checkedArry)
        };
        /*判断是否选择*/
        vm.isSelect = function (name) {
            return vm.checkedArry.indexOf(name)!= -1
        }
    })