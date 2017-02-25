/**
 * Created by Administrator on 2017/2/23.
 */
angular.module('adminApp')
    .controller('jobEditCtrl', function ($scope, joblisttype, $location, getAdminSercive) {
        var vm = this;
        vm.jobData = {
            profession:{
                recommend:0
            }
        }
        /*先取一下location中id的值,id是职位id，companyid是公司id*/
        if ($location.search().companyId) {
            vm.companyId = $location.search().companyId
            /*取出tag*/
            getAdminSercive.getprofessionTag(vm.companyId).then(function (res) {
                if (res.data.code == 0) {
                    vm.alltag = res.data.tags;
                }
            })
        }
        /*如果有公司数据的话取出公司数据*/
        if ($location.search().id) {
            vm.searchId = $location.search().id;
            getAdminSercive.getPosition(vm.searchId).then(function (res) {
                if (res.data.code == 0) {
                    vm.jobData.profession = res.data.data;
                    //delete vm.jobData.profession.tags;  //删除这个对象里的tags属性
                    vm.jobData.tags = res.data.data.tags;
                    vm.pushCurrentTag();
                    //console.log(vm.jobData.tags)
                }
            })
        }
        /*如果有传入公司名字*/
        if ($location.search().companyName) {
            vm.companyName = $location.search().companyName;
            vm.jobData.profession.companyName = $location.search().companyName
        }
        vm.joblisttype = joblisttype;
        /*新建一个数组，用于存放本职位有的tag*/
        vm.checkedArry = [];
        /*将本职位的有的tag放入数组，用于判断*/
        vm.pushCurrentTag = function () {
            angular.forEach(vm.jobData.tags, function (data) {
                vm.checkedArry.push(data.tag)
            });
        };
        /*选择tag的时候对于储存现有数据数组的操作*/
        vm.chooseTag = function (eve, tag) {
            var checked = eve.target.checked;
            if (checked === true) {
                if (vm.checkedArry.indexOf(tag) == -1) {
                    vm.checkedArry.push(tag)
                }
            } else {
                vm.checkedArry.splice(vm.checkedArry.indexOf(tag), 1)
            }
            console.log(vm.checkedArry)
        };
        /*判断是否选择,有为true，没有为false*/
        vm.isSelect = function (name) {
            return vm.checkedArry.indexOf(name) != -1
        };
        /*保存按钮————————————————————————————*/
        /*修改职业数据*/
        var changeProfession = function () {
            getAdminSercive.changeProfession(vm.searchId, vm.jobData).then(function (res) {
                if (res.data.code === 0) {
                    $location.url('app/jobList');
                }
            })
        };
        /*新建职业数据*/
        var creatProfession = function () {
            vm.jobData.profession.companyId = vm.companyId;
            getAdminSercive.creatProfession(vm.jobData).then(function (res) {
                if (res.data.code === 0) {
                    $location.url('app/jobList?id='+vm.companyId+'&companyName='+vm.jobData.profession.companyName)
                }
            })
        };
        /*保存按钮*/
        vm.confirm = function () {
            /*先让这个tag为空*/
            vm.jobData.tags = [];
            /*删除多余的这条数据，保证上传成功*/
            delete vm.jobData.profession.tags;
            /*将本地数组里的东西传入我要上传的数据中*/
            angular.forEach(vm.checkedArry, function (data) {
                vm.jobData.tags.push({'tag': data})
            });
            /*发送，这里需要进行一个判断*/
            /*第一段是新增，第二段是修改*/
            if ($location.search().companyName) {
                creatProfession();
            }else {
                changeProfession();
            }
        };
    })