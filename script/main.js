var hub = new Vue();
getPage("json/alluser.json", 4);

function getPage(url, num) {
    var pageBar = new Vue({
        el: '.page-bar',
        data: {
            total: '',
            all: '', //总页数
            cur: 1, //当前页码
            num: num,
        },
        watch: {
            cur: function(oldValue, newValue) {
                //console.log(arguments);
            }
        },
        created() {
            this.getTotal();
        },
        methods: {
            btnClick: function(data) { //页码点击事件
                if (data != this.cur) {
                    this.cur = data
                    hub.$emit('change', this.cur);
                    console.log(this.cur);
                }
            },
            pageClick: function() {
                console.log('现在在' + this.cur + '页');
            },
            getTotal() {
                $.ajax({
                    url: url,
                    type: 'get',
                    data: {},
                    dataType: 'json',
                    success: function(res) {
                        pageBar.total = res.users.length;
                        pageBar.all = Math.ceil(pageBar.total / pageBar.num);
                    }
                });

            }
        },
        computed: {
            indexs: function() {
                var left = 1;
                var right = this.all;
                var ar = [];
                if (this.all >= 5) {
                    if (this.cur > 3 && this.cur < this.all - 2) {
                        left = this.cur - 2
                        right = this.cur + 2
                    } else {
                        if (this.cur <= 3) {
                            left = 1
                            right = 5
                        } else {
                            right = this.all
                            left = this.all - 4
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left)
                    left++
                }
                return ar
            }

        }
    });
}

getData("json/alluser.json", 4);

function getData(url, number) {
    var vm = new Vue({
        el: '#app',
        data: {
            user: {},
            users: [],
            newArr: [],
            num: number,
            curPage: 1,
            total: ''
        },
        created() {
            this.initData();
            hub.$on('change', function(val) {
                vm.curPage = val;
                console.log(vm.curPage + "liebiao");
                vm.initData();
            });

        },
        methods: {
            initData() {
                var number = this.num;
                var page = this.curPage;
                $.ajax({
                    url: url,
                    type: 'get',
                    data: {},
                    dataType: 'json',
                    success: function(res) {
                        vm.users = res.users;
                        var len = vm.users.length;
                        console.log(vm.users);
                        vm.newArr = [];
                        var temp = 0;
                        if ((len - number * (page - 1)) > number) {
                            temp = number * page;
                        } else {
                            temp = len;
                        }
                        console.log(temp);
                        for (var i = number * (page - 1); i < temp; i++) {

                            vm.newArr.push(vm.users[i]);

                        }
                        vm.total = len;
                        console.log(vm.newArr);
                        console.log(vm.total + "------------");
                    }
                });
                console.log(this.total + "-----222-------");
                console.log(this.curPage);
            }

        },

    });
}





/* function pageData(page, number) {
    console.log(page + "=========" + number);
    let vm = new Vue({
        el: '#app',
        data: {
            user: {},
            users: [],
            newArr: []
        },
        created() {
            this.initData();
        },
        methods: {
            initData() {

                $.ajax({
                    url: 'alluser.json',
                    type: 'post',
                    data: {},
                    dataType: 'json',
                    success: function(res) {
                        console.log(res)
                        vm.users = res.users;
                        vm.newArr = [];
                        for (var i = number * (page - 1); i < number * page; i++) {

                            vm.newArr.push(vm.users[i]));

                        }
                        console.log(vm.newArr);
                    }

                });
                console.log(this.newArr);
            }

        },

    });


} */