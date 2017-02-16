/**
 * Created by ivws on 2017/1/21.
 */
var mainConstant = angular.module('mainConstant', [])
    .value('aboutWe', {'toggle': true})
    .constant('partnerSay', {
        'partnersay_data': [{
            url: 'img/home/ms.png',
            name: '王思聪',
            company: '托尔思集团创始人',
            info: ' 作为在萝卜多已经招募了50人的 leader萝卜多除了是我成功的基石，也是我的社交入口',
        },
            {
                url: 'img/home/xd.png',
                name: '王思聪',
                company: '托尔思集团创始人',
                info: ' 作为在萝卜多已经招募了50人的 leader萝卜多除了是我成功的基石，也是我的社交入口。',
            },
            {
                url: 'img/home/tx.png',
                name: '王思聪',
                company: '托尔思集团创始人',
                info: ' 作为在萝卜多已经招募了50人的 leader萝卜多除了是我成功的基石，也是我的社交入口。',
            },
            {
                url: 'img/home/bt.png',
                name: '王思聪',
                company: '托尔思集团创始人',
                info: ' 作为在萝卜多已经招募了50人的 leader萝卜多除了是我成功的基石，也是我的社交入口。',
            }]

    })
    /*针对数字转换为文字的筛选*/
    .constant('searchOptions', {
        province: [
            {type:null,name: '不限', choose: true},
            {type: 1, name: '北京', choose: false}
        ],
        category: [
            {type:null,name: '不限', choose: true},
            {type: 1, name: '产品', choose: false},
            {type: 2, name: 'UI', choose: false},
            {type: 3, name: 'QA', choose: false},
            {type: 4, name: 'Android', choose: false},
            {type: 5, name: 'IOS', choose: false},
            {type: 6, name: 'WEB', choose: false},
            {type: 7, name: 'OP', choose: false},
            {type: 8, name: 'Java', choose: false},
            {type: 9, name: 'NLP', choose: false},
            {type: 10, name: 'DM', choose: false},
            {type: 11, name: 'DL', choose: false}
        ],
        subCategory: [
            {
                name: "产品",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '助理', choose: false},
                    {type: 2, name: '初级', choose: false},
                    {type: 3, name: '中级', choose: false},
                    {type: 4, name: '高级', choose: false},
                    {type: 5, name: '总监', choose: false}]
            },
            {
                name: "UI",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false},
                    {type: 4, name: '总监', choose: false}
                ]
            },
            {
                name: "QA",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                name: "Android",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                name: "IOS",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                name: "WEB",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                name: "OP",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                name: "Java",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false},
                    {type: 4, name: '总监', choose: false}
                ]
            },
            {
                name: "NLP",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                name: "DM",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                name: "DL",
                data: [{type:null,name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            }
        ],
        industry: [
            {type:null,name: '不限', choose: true},
            {type: 0, name: '移动互联网', choose: false},
            {type: 1, name: '电子商务', choose: false},
            {type: 2, name: '企业服务', choose: false},
            {type: 3, name: 'O2O', choose: false},
            {type: 4, name: '教育', choose: false},
            {type: 5, name: '金融', choose: false},
            {type: 6, name: '游戏', choose: false}
        ],
        compensation: [
            {type:null,name: '不限', choose: true},
            {type: 0, name: '8K以下', choose: false},
            {type: 1, name: '8K-15K', choose: false},
            {type: 2, name: '16K-25K', choose: false},
            {type: 3, name: '25K以上', choose: false}
        ],
        education: [
            {type:null,name: '不限', choose: true},
            {type: 0, name: '大专', choose: false},
            {type: 1, name: '本科', choose: false},
            {type: 2, name: '硕士', choose: false},
            {type: 3, name: '博士及以上', choose: false}

        ],
        experience: [
            {type:null,name: '不限', choose: true},
            {type: 0, name: '应届', choose: false},
            {type: 1, name: '1~2年', choose: false},
            {type: 2, name: '3~5年', choose: false},
            {type: 3, name: '6～9年', choose: false},
            {type: 4, name: '10年及以上', choose: false}

        ],
        updateAt: [
            {type:null,name: '不限', choose: true},
            {type: 0, name: '24h内', choose: false},
            {type: 1, name: '三天内', choose: false},
            {type: 2, name: '七天内', choose: false}
        ],
        financing: [
            {type:null,name: '不限', choose: true},
            {type: 0, name: '无需融资', choose: false},
            {type: 1, name: '天使轮', choose: false},
            {type: 2, name: 'A轮', choose: false},
            {type: 3, name: 'B轮', choose: false},
            {type: 4, name: 'C轮', choose: false},
            {type: 5, name: 'D轮及以上', choose: false},
            {type: 6, name: '上市公司', choose: false}
        ]
        // category: [
        //     {type:null,name: "全部", choose: true},
        //     {type: 0, name: "产品", choose: false},
        //     {type: 1, name: "运营", choose: false},
        //     {type: 2, name: "技术", choose: false},
        //     {type: 3, name: "设计", choose: false},
        //     {type: 4, name: "测试", choose: false}
        // ]
        // begin 找职位面板的分类列表
    })
    .constant('jobList',{

    })
    // 一级分类
    .constant('jobType', [
        {type: 1, name: "用户体验"},
        {type: 2, name: "研发"},
        {type: 3, name: "大数据"}
    ])
    //二级分类
    .constant('secondType', [
        {type: 1, name: "产品"},
        {type: 2, name: "UI"},
        {type: 3, name: "QA"},
        {type: 4, name: "Android"},
        {type: 5, name: "IOS"},
        {type: 6, name: "WEB"},
        {type: 7, name: "OP"},
        {type: 8, name: "JAVA"},
        {type: 9, name: "NLP"},
        {type: 10, name: "DM"},
        {type: 11, name: "DL"}
    ])


    //  begin 独立过滤器所需
    .constant('joblisttype', {
        //薪资水平
        compensationtype :[
            {type: 0, name: '8K以下', choose: false},
            {type: 1, name: '8K-15K', choose: false},
            {type: 2, name: '16K-25K', choose: false},
            {type: 3, name: '25K以上', choose: false}
        ],
        //公司行业
        industrytype :[
            {type: 0, name: '移动互联网'},
            {type: 1, name: '电子商务'},
            {type: 2, name: '企业服务'},
            {type: 3, name: 'O2O'},
            {type: 4, name: '教育'},
            {type: 5, name: '金融'},
            {type: 6, name: '游戏'}
        ],
        //融资规模 financing
        financingtype:[
            {type: 0, name: '无需融资'},
            {type: 1, name: '天使轮'},
            {type: 2, name: 'A轮'},
            {type: 3, name: 'B轮'},
            {type: 4, name: 'C轮'},
            {type: 5, name: 'D轮及以上'},
            {type: 6, name: '上市公司'}
        ],
        //工作经验 experience
        experiencetype:[
            {type: 0, name: '应届'},
            {type: 1, name: '1~2年'},
            {type: 2, name: '3~5年'},
            {type: 3, name: '6～9年'},
            {type: 4, name: '10年及以上'}
        ],
        //学历要求 education
        educationtype:[
            {type: 0, name: '大专'},
            {type: 1, name: '本科'},
            {type: 2, name: '硕士'},
            {type: 3, name: '博士及以上'}
        ],
        //发布时间 updateAt
        updateAttype:[
            {type: 0, name: '今天'},
            {type: 1, name: '昨天'}
        ]
    })
    /*找工作页面上侧选择begin*/
    /*用户体验*/
    .constant('userFellType',[
        {
            name: "产品",
            type:1,
            data: [
                {type: 1, name: '助理', choose: false},
                {type: 2, name: '初级', choose: false},
                {type: 3, name: '中级', choose: false},
                {type: 4, name: '高级', choose: false},
                {type: 5, name: '总监', choose: false}]
        },
        {
            name: "UI",
            type:2,
            data: [
                {type: 1, name: '初级', choose: false},
                {type: 2, name: '中级', choose: false},
                {type: 3, name: '高级', choose: false},
                {type: 4, name: '总监', choose: false}
            ]
        },
        {
            name: "QA",
            type:3,
            data: [
                {type: 1, name: '初级', choose: false},
                {type: 2, name: '中级', choose: false},
                {type: 3, name: '高级', choose: false}
            ]
        }
    ])
    /*研发*/
    .constant('developType',[
        {
            name: "Android",
            type:4,
            data: [
                {type: 1, name: '初级', choose: false},
                {type: 2, name: '中级', choose: false},
                {type: 3, name: '高级', choose: false}
            ]
        },
        {
            name: "IOS",
            type:5,
            data: [
                {type: 1, name: '初级', choose: false},
                {type: 2, name: '中级', choose: false},
                {type: 3, name: '高级', choose: false}
            ]
        },
        {
            name: "WEB",
            type:6,
            data: [
                {type: 1, name: '初级', choose: false},
                {type: 2, name: '中级', choose: false},
                {type: 3, name: '高级', choose: false}
            ]
        },
        {
            name: "OP",
            type:7,
            data: [
                {type: 1, name: '初级', choose: false},
                {type: 2, name: '中级', choose: false},
                {type: 3, name: '高级', choose: false}
            ]
        },
        {
            name: "Java",
            type:8,
            data: [
                {type: 1, name: '初级', choose: false},
                {type: 2, name: '中级', choose: false},
                {type: 3, name: '高级', choose: false},
                {type: 4, name: '总监', choose: false}
            ]
        },
    ])
    /*大数据*/
    .constant('bigdataType',[
        {
            name: "NLP",
            type:9,
            data: [
                {type: 1, name: '初级', choose: false},
                {type: 2, name: '中级', choose: false},
                {type: 3, name: '高级', choose: false}
            ]
        },
        {
            name: "DM",
            type:10,
            data: [
                {type: 1, name: '初级', choose: false},
                {type: 2, name: '中级', choose: false},
                {type: 3, name: '高级', choose: false}
            ]
        },
        {
            name: "DL",
            type:11,
            data: [
                {type: 1, name: '初级', choose: false},
                {type: 2, name: '中级', choose: false},
                {type: 3, name: '高级', choose: false}
            ]
        }
    ])