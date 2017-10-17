/*
 Author:mstzhen,
 License:MIT
 Update:2017/10/17 22:15
*/
(function(win, doc, $, undefined) {
        //这是构造函数
        var dateTimer = function(opts) {
            this.common = opts;
        };
        //这是构造函数原型
        dateTimer.prototype = {
            init: function(obj) {
                this.fillHtml(obj);
            },
            fillHtml: function(obj) {
                var html = `<table id="calendar-box-table" class="table-len">
            <thead>
                <tr>
                    <th id="prev">
                        &lt;
                    </th>
                    <th colspan="5">
                        <span id="year">2017</span>年<span id="month">九</span>月
                    </th>
                    <th id="next">
                        &gt;
                    </th>
                </tr>
                <tr>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                    <th>七</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                </tr>
                 <tr>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                </tr>
                 <tr>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                </tr>
                 <tr>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                </tr>
                 <tr>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                </tr>
                 <tr>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                    <td class="td"></td>
                </tr>
            </tbody>
        </table>`;
                var top = $(obj).offset().top;
                var left = $(obj).offset().left;
                var selfTop = $(obj).height();
                top = top + selfTop + 8;
                //已经有了日历面板不在往下走
                var len = $(".table-len").length;
                if (len > 0) {
                    return;
                }

                $("body").append(html);
                //移除多余的
                $(document).click(function(obj) {
                    $("#calendar-box-table").remove();
                })
                //初始化数据
                this.initTime(obj);
                var _this = this;
                $("#next").click(function(e) {
                    e.stopPropagation();
                    _this.next(obj);
                })
                $("#prev").click(function(e) {
                    e.stopPropagation();
                    _this.prev(obj);
                })
                $("#calendar-box-table").css({ "top": top + "px", "left": left + "px" });
            },
            initTime: function(obj) {
                var currentTime = new Date();
                this.common.year = currentTime.getFullYear(); //年
                this.common.month = currentTime.getMonth(); //月 
                this.common.day = currentTime.getDate(); //日
                var dayNum = this.common.montharr[this.common.month];
                if (this.common.month + 1 < 10) {
                    $("#month").text("0" + (this.common.month + 1));
                } else {
                    $("#month").text(this.common.month + 1);
                }
                $("#year").text(this.common.year);
                //修正闰年的二月份时间
                if (this.yearKind(this.common.year)) {
                    this.common.montharr[0] = 29;
                } else {
                    this.common.montharr[0] = 28;
                }
                this.common.week = this.oneWeek(this.common.year, this.common.month, 1); //周
               
                if ($(obj).val().length > 0) {
                    console.log(this.inithook(obj).w, this.inithook(obj).dayNum);
                    $("#year").text(this.inithook(obj).year);
                    $("#month").text(this.inithook(obj).month);
                    this.createNum(this.inithook(obj).w, this.inithook(obj).dayNum, obj);

                } else {

                    this.createNum(this.common.week, dayNum, obj);

                }
            },
            yearKind: function(year) {
                return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
            },
            //填充函数,主程序
            createNum: function(start, len, obj) {
                var y = $("#year").text();
                var m = $("#month").text();
                //重置
                $(".td").text("");
                $(".td").removeClass("calendar-current");
                $(".td").removeClass("calendar-flag");
                $(".td").removeClass("disabled");
                for (var i = 1; i <= len; i++) {
                    $(".td").eq(start - 1 + i - 1).text(i);
                    console.log(1);
                    $(".td").eq(start - 1 + i - 1).addClass("calendar-flag");
                    if (this.common.year == y && this.common.month + 1 == m) {
                        if (i == this.common.day) {
                            $(".td").eq(start - 1 + i - 1).addClass("calendar-current");
                        }
                    }
                    if ($(obj).attr("id") == this.common.vary) {

                        if (y < this.common.year) {
                            $(".td").eq(start - 1 + i - 1).addClass("disabled");

                        }
                        if (y == this.common.year && m < this.common.month + 1) {
                            $(".td").eq(start - 1 + i - 1).addClass("disabled");

                        }
                        if (i < parseInt(this.common.day) + parseInt(this.common.dis) && m == (this.common.month + 1) && y == this.common.year) {
                            $(".td").eq(start - 1 + i - 1).addClass("disabled");
                        }

                    } else {
                        if (y < this.common.year) {
                            $(".td").eq(start - 1 + i - 1).addClass("disabled");

                        }
                        if (y == this.common.year && m < this.common.month + 1) {
                            $(".td").eq(start - 1 + i - 1).addClass("disabled");

                        }
                        if (i < this.common.day && m == (this.common.month + 1) && y == this.common.year) {
                            $(".td").eq(start - 1 + i - 1).addClass("disabled");
                        }
                    }
                    $(".td").each(function(index, el) {
                        var b = $(this).hasClass('disabled');
                        if (b) {
                            $(this).removeClass('calendar-flag');
                        }

                    });
                }

                if ($(obj).val().length > 0 & this.inithook(obj).year == y && this.inithook(obj).month == parseInt(m)) {
                    var c = this.inithook(obj).day - 1;
                    $(".calendar-flag").removeClass('calendar-chosed');
                    $(".calendar-flag").eq(c).addClass('calendar-chosed');
                } else {
                    $(".td").removeClass('calendar-chosed');
                }
                var _this = this;
                $(".calendar-flag").off("click");
                $(".td").off("click");
                $(".calendar-flag").click(function(e) {
                    e.stopPropagation();
                    if ($(this).hasClass('disabled')) {
                        return;
                    }
                    $(obj).val($("#year").text() + "-" + $("#month").text() + "-" + $(e.target).text());
                    var b = $("#" + _this.common.base).val();
                    var v = $("#" + _this.common.vary).val();
                    var basestamp = _this.changestamps(b);
                    var varystamp = _this.changestamps(v);
                    console.log("基准", _this.common.base);
                    console.log("变化", varystamp);
                    //先选择基准日期
                    if ($(obj).attr("id") == _this.common.base) {
                        if (basestamp >= varystamp) {
                            varystamp = parseInt(basestamp) + 24 * 3600 * 1000;
                            var newdate = _this.changedate(varystamp);
                            $("#" + _this.common.vary).val(newdate);
                        }
                    }
                    //先选择变化日期
                    if ($(obj).attr("id") == _this.common.vary) {
                        if (varystamp <= basestamp) {
                            basestamp = parseInt(varystamp) - 24 * 3600 * 1000;
                            var newdate = _this.changedate(basestamp);
                            $("#" + _this.common.base).val(newdate);
                        } else if ($("#" + _this.common.base).val().length == 0) {
                            var month = (_this.common.month+1).toString().length == 1 ? ("0" + parseInt(_this.common.month + 1)) : (_this.common.month + 1);
                            var current = _this.common.year + "-" + month + "-" + _this.common.day;
                            $("#" + _this.common.base).val(current);
                        }
                    }
                    var baseTime=$("#"+_this.common.base).val();
                    var varyTime=$("#"+_this.common.vary).val();
                    var dayNum=(_this.changestamps(varyTime)-_this.changestamps(baseTime))/(24*3600*1000);
                    $("#"+_this.common.dayNum).val(Math.ceil(dayNum));
                    $("#calendar-box-table").remove();

                })

            },
            //当月一号是周几，7是周日
            oneWeek: function(year, month) {
                var weekObj = new Date(year, month, 1);
                var week = weekObj.getDay();
                if (week == 0) {
                    week = 7;
                }
                return week;
            },
            //向后
            next: function(obj) {
                var y = $("#year").text();
                var m = parseInt($("#month").text());

                m++;
                if (m == 13) {
                    m = 1;
                    y++;
                }
                $("#year").text(y);
                if (m < 10) {
                    $("#month").text("0" + m);
                } else {
                    $("#month").text(m);
                }
                if (this.yearKind(y)) {
                    this.common.montharr[1] = 29;
                } else {
                    this.common.montharr[1] = 28;
                }
                var w = this.oneWeek(y, m - 1);
                this.createNum(w, this.common.montharr[m - 1], obj);
            },
            //向前
            prev: function(obj) {
                var y = $("#year").text();
                var m = parseInt($("#month").text());
                m--;
                if (m == 0) {
                    m = 12;
                    y--;
                }
                $("#year").text(y);
                if (m < 10) {
                    $("#month").text("0" + m);
                } else {
                    $("#month").text(m);
                }
                if (this.yearKind(y)) {
                    this.common.montharr[1] = 29;
                } else {
                    this.common.montharr[1] = 28;
                }
                var w = this.oneWeek(y, m - 1);
                this.createNum(w, this.common.montharr[m - 1], obj);
            },
            //基准勾子函数
            basehook: function() {
                return {
                    year: $("#" + this.common.base).val().length > 0 ? $("#" + this.common.base).val().substring(0, 4) : this.common.year,
                    month: $("#" + this.common.base).val().length > 0 ? parseInt($("#" + this.common.base).val().substring(5, 7)) : (this.common.month + 1),
                    day: $("#" + this.common.base).val().length > 0 ? $("#" + this.common.base).val().substring(8) : this.common.day
                }

            },
            //变动钩子函数
            varyhook: function() {
                return {
                    year: $("#" + this.common.vary).val().length > 0 ? $("#" + this.common.vary).val().substring(0, 4) : this.common.year,
                    month: $("#" + this.common.vary).val().length > 0 ? parseInt($("#" + this.common.vary).val().substring(5, 7)) : (this.common.month + 1),
                    day: $("#" + this.common.vary).val().length > 0 ? $("#" + this.common.vary).val().substring(8) : this.common.day
                }
            },
            //初始化勾子函数
            inithook: function(obj) {
                var y = $(obj).val().substring(0, 4);
                var m = $(obj).val().substring(5, 7);
                console.log(m);
                var d = $(obj).val().substring(8);
                var w = this.oneWeek(y, m - 1);
                var daynums = this.common.montharr[parseInt(m) - 1];
                return {
                    "w": w,
                    "dayNum": daynums,
                    "year": y,
                    "month": m,
                    "day": d
                }
            },
            //时间转为时间戳
            changestamps: function(time) {
                if (time.length == 0) {
                    return 0;
                }
                var timestamp = Date.parse(new Date(time));
                return timestamp;
            },
            //时间戳换转为时间
            changedate: function(date) {
                var d = new Date(date);
                var y = d.getFullYear();
                var m = d.getMonth() + 1;
                var d = d.getDate();
                if (m.toString().length == 1) {
                    m = "0" + m;
                }
                var ddd = y + "-" + m + "-" + d;
                return ddd;
            }
        }

        $.fn.calendar = function(options) {

            var defaults = {
                montharr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                day: "", //当天是几号
                week: "", //当月一号是周几
                year: "", //当年是哪一年
                month: "", //当月是那一个月
                base: "start", //基准日历
                vary: "end", //变动日历
                dis: 7, //基准日历与变动日历差距,变动大于基准日历的最短时间
                dayNum:"dayNum"
            }
            var opts = $.extend({}, defaults, options);
            var _this = this;
            $(this).click(function(e) {
                e.stopPropagation();
                $("#calendar-box-table").remove();
                var ddd = new dateTimer(opts);
                ddd.init(_this);
            })
        }
    })(window, document, $)