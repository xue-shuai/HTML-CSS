var Ealt = new Eject()

let rotates={
    toast:null,//提示信息
    prize : ['一等奖','二等奖','三等奖','四等奖','五等奖','六等奖'],//奖项信息
    num : 0,//转动的随机角度
    n : 0,//当前转动了角度
    j : 0,//鼠标左键点击次数
    //初始化
    init:function(){
        let {toast,prize,n,j,init,GetRandomNum,rotate,left} = rotates;
        $('html').css('overflow','hidden')
        $('#lmds').css("height",$(document).height())
        //每过1500毫秒检测一下鼠标点击了几次
        var timer = setInterval(function(){
            let k = sessionStorage.getItem('count');
            if(k>0){
                $('#btn').unbind();
                left(j);
                clearInterval(timer)
                sessionStorage.removeItem('count')
            }else{
                return false;
            }
        },1500)
        //点击左键
        $('#btn').click(function(){
            j++;
            sessionStorage.removeItem('count')
            sessionStorage.setItem('count',j)
        })
        //点击右键按钮(随机抽奖)
        document.getElementById('btn').oncontextmenu=function(e){
            rotates.rotate(false);
            document.getElementById('btn').oncontextmenu=function(){return false};
            e.preventDefault();
        }
    },
    //随机数
    GetRandomNum:function(min,max){
        let range = max-min;
        let rand = Math.random();
        return (min+Math.round(rand*range));
    },
    //封装转盘转动
    rotate:function(onOff,num){
        let {toast,prize,n,j,init,GetRandomNum,rotate,left} = rotates;

        onOff==true? num=num : num = this.GetRandomNum(720,1080);
        //如果随机抽奖(鼠标右键),则抽不到一等奖和二等奖
        /*if(!onOff){
            if(720<num && num<750  || 1050<num && num<1080){
                num = GetRandomNum(720,1080)
                n = num%360;
            }else if(750<num && num<810  || 990<num && num<1050){
                num = GetRandomNum(720,1080)
                n = num%360;
            }
        }*/

        //避开重合线
        var D=['30','90','150','210','270','330'];
        for(var i=0;i<D.length;i++){
            if(n == D[i]){
                num+=10
                n = num%360;
            }else{
                num = num;
                n = num%360;
            }
        }

        //判断角度显示提示
        if(0<=n && n<30 || 330<n && n<360){
            toast = prize[0]
        }else if(30<n && n<90){
            toast = prize[5]
        }else if(90<n && n<150){
            toast = prize[4]
        }else if(150<n && n<210){
            toast = prize[3]
        }else if(210<n && n<270){
            toast = prize[2]
        }else if(270<n && n<330){
            toast = prize[1]
        }

        //提示消息
        setTimeout(()=>{
            Ealt.Ealert({
                title:'中奖提示',
                message:'恭喜你中了'+toast+'!'
            })
        },6000)
        //旋转
        $('#turntableImg').css('transform','rotate('+num+'deg)');
    },
    //封装鼠标左键点击
    left:function(j){
        let {toast,prize,n,init,GetRandomNum,rotate,left} = rotates;

        //如果没有点击的话,页面不发生改变
        if(j==0){
            return false;
        }
        //根据鼠标左键点击次数决定中几等奖
        switch (j){
            case 1 :
                num = 1080;
                break;
            case 2 :
                num = 1035;
                break;
            case 3 :
                num = 970;
                break;
            case 4 :
                num = 900;
                break;
            case 5 :
                num = 840;
                break;
            case 6 :
                num = 784;
                break;
        }
        //如果一直点击,则随机抽奖
        if(j>prize.length){
            rotate(false);
            $('#btn').unbind()
        }else if(j>0 && j<6){
            rotate(true,num);
        }
    }
}

rotates.init();