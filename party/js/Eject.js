function Eject() {
    var _this = this;
    var qback = $('<div class="qback"></div>')
    //alert弹出框
    _this.Ealert = function (obj) {
        var alertBox = $('<div class="alertBox"></div>')//弹出层
        var alertHead = $('<div class="alertHead">' + obj.title + '</div>')//标题
        var alertMes = $('<div class="alertMes">' + obj.message + '</div>')//内容
        var alertBtn = $('<span class="alertBtn">确定</span>').on('click', function () {
            qback.remove();//移除覆盖背景
            alertBox.remove();//移除弹出层
            location.reload();//重新刷新页面
        })
        alertBox.append(alertHead);//弹出层中添加标题
        alertBox.append(alertMes);//弹出层中添加内容
        alertBox.append(alertBtn);//弹出层中添加按钮
        qback.append(alertBox);//覆盖层中添加弹出层
        $('body').append(qback);//页面中添加覆盖层
        alertBox.css({'marginTop': -alertBox.outerHeight() / 2 + 'px'});
    }
    //confirm弹出层
    _this.Econfirm = function (obj) {
        var confirmBox = $('<div class="alertBox"></div>')
        var confirmHead = $('<div class="alertHead">' + obj.title + '</div>')
        var confirmMes = $('<div class="alertMes">' + obj.message + '</div>')
        var confirmBtn = $('<span class="ConBtn">取消</span>').on('click', function () {
            qback.remove()
            confirmBox.remove()
            setTimeout(function () {
                obj.define()
            }, 100)
        })
        var confirmcancel = $('<span class="cancel">确定</span>').on('click', function () {
            qback.remove()
            confirmBox.remove()
            setTimeout(function () {
                obj.cancel()
            }, 100)
        })
        confirmBox.append(confirmHead);
        confirmBox.append(confirmMes);
        confirmBox.append(confirmBtn);
        confirmBox.append(confirmcancel);
        qback.append(confirmBox);
        $('body').append(qback);
        confirmBox.css({
            'marginTop': -confirmBox.outerHeight() / 2 + 'px'
        });
    }
    //toast弹出层
     _this.Etoast = function (mes, time) {
        var timer = null;
        var ToastBox = $('<div class="ToastBox">' + mes + '</div>')
        qback.append(ToastBox);
        $('body').append(qback);
        ToastBox.css({
            'marginTop': -ToastBox.outerHeight() / 2 + 'px'
        });
        clearInterval(timer)
        timer = setInterval(function () {
            time--
            if (time <= 0) {
                clearInterval(timer)
                qback.remove()
                ToastBox.remove()
            }
        }, 1000)
    }
}