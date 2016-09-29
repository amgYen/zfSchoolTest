/*适配*/
//rem 相对于根元素字体大小
~(function (desW) {
    var winW = document.documentElement.clientWidth;
    var scale = winW / desW;
    document.documentElement.style.fontSize = scale * 100 + "px";
})(640);

//音频
var chatM = document.querySelector("#chatM");
var sentM = document.querySelector("#sentM");

//预加载图片

var fileList = ['cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'date.png', 'unlock.png', 'weixin_msg.png', 'unlock_bg.jpg',  'user_headimg.png', 'icon_input.png', 'weichat.png',  'keyboard.png'];
for (var i = 0; i < fileList.length; i++) {
    var filed = fileList[i];
    loadImg(filed,i);
}
var j = 0, num = null, loadtimer;
function loadImg(oImg, i) {
    var oTemp = new Image();
    oTemp.src = "img/" + oImg;
    oTemp.onload = function () {
        window.setTimeout(function () {
            j++;
            num = Math.round(j / fileList.length * 100);
            $(".percent").html(num + "%");
            if (j == fileList.length) {
                window.setTimeout(function () {
                    $("#loading").remove();
                    fnUnlockTip();
                    fnLock();
                }, 1000)

            }
        }, 500 * i);

    },
        oTemp.onerror = function () {
            console.log("error");
        }
}

//滑动屏幕来解锁
function fnUnlockTip(){
    var height = 0.39;
    var width = 2.75;
    var index = 0;
    var total = 20;
     setInterval(function () {
        var positionX = 0;
        var positionY = -index *height;
        $("#unlockTip").css({'background-position': positionX + 'rem ' + positionY + 'rem'});
        index++;
        if (index >= 20) {
            index = 0;
        }
    }, 70);
}


function fnLock() {
    chatM.play();
    $("#unlock").show();
    var unlockTip = document.querySelector("#unlockTip");
    unlockTip.addEventListener("touchstart", function (e) {
        var touch1 = event.touches[0];
        this.startX = touch1.pageX;
    }, false);
    unlockTip.addEventListener("touchmove", function (e) {
        e.preventDefault();//阻止页面滚动
        var touch1 = event.touches[0];
        var moveX = touch1.pageX;
        var mx = moveX - this.startX;
        this.movePos = mx;
        $("#unlock").css("transform", "translate(" + mx + "px)");
    }, false);
    unlockTip.addEventListener("touchend", function (e) {
        if (this.movePos > 130) {
            $("#unlock").remove();
            fnMessage();
        } else {
            $("#unlock").css("transform", "translate(0px)");
        }
    }, false);
}

function fnMessage(){
    var sentM = document.querySelector("#sentM");
    var h = 0;
    var oUl = document.querySelector("#msgList");
    var keyboard = document.querySelector(".keyboard");
    var timer = null;
    var n = 0;
    var message = document.querySelector("#message");
    var inputBar = document.querySelector(".inputBar");
    message.style.display = "block";
    inputBar.style.display = "block";
    var winH = document.documentElement.clientHeight;
    processMess(0);
    function processMess(n) {

        var eles = document.querySelectorAll("#message li");
        timer = window.setInterval(function(){
            var ele = eles[n];
            if (!/btnMsg/.test(ele.className)) {/*正常*/
                sentM.play();
                ele.style.opacity = 1;
                ele.style.webkitTransform = "translate(0,0)";
                h += ele.offsetHeight;
                n++;
                if(n>=4){
                    oUl.style.webkitTransform = "translate(0,"+(-h)+"px)";
                }

            }else{/*发送信息*/
                clearInterval(timer);
                fnKeyBoard(ele);
            }
            if(n ==eles.length ){
                clearInterval(timer);
                message.remove();
                fnCube();
            }

        },1000)
    }
    var text1 = document.querySelector(".text1");
    var btnSend = document.querySelector(".btnSend");

    var strTimer = null;
    var keyFlag = true;
    function fnKeyBoard(ele){
        if(keyFlag){
            keyboard.style.webkitTransform = "translate(0,0)";
            keyboard.addEventListener("webkitTransitionEnd",function(){
                this.style.webkitTransition = "";
                btnSend.className+=" btnSendCur";
                fnSendMsg(ele);
            },false);
            keyFlag = false;
        }else{
            fnSendMsg(ele);
        }
    }


    function fnSendMsg(ele){
        var info = ele.innerHTML.replace(/[\s*<span>\s*</span>\s*]/g,"");
        info = info.split("");
        var strNum = 0;
        strTimer = window.setInterval(function(){
            text1.style.display ="block";
            text1.innerHTML+=info[strNum];
            strNum++;
            if(strNum == info.length){
                clearInterval(strTimer);
                btnSend.className+=" btnSendCur";
                btnSend.addEventListener("touchstart",function(){
                    text1.style.display = "none";
                    text1.innerHTML = "";
                    sentM.play();
                    ele.style.opacity = 1;
                    ele.style.webkitTransform = "translate(0,0)";
                    h+=ele.offsetHeight;
                    var index = $(ele).index();
                    if(index>=4){
                        oUl.style.webkitTransform = "translate(0,"+(-h)+"px)";
                    }
                    btnSend.className = "btnSend";
                    btnSend.removeEventListener("touchstart",arguments.callee,false);
                    processMess($(ele).index()+1);
                },false)
            }
        },100)

    }



}


function fnCube() {
    var $cube = $("#cube");
    $cube.show();
    var $cubeBox = $('#cubeBox');

    var $details = $('#details');
    var $detailsList = $('#detailsList');
    var $detailsReturn = $('#detailsReturn');

    var cube = (function () {
        var $li = $cubeBox.find('li');
        var downX = 0;
        var downY = 0;
        var startX = -45;
        var startY = 45;
        var step = 1 / 2;
        var x = 0;
        var y = 0;
        var bBtn = true;

        function init() {
            $cubeBox.css('transform', 'scale(0.5) rotateX(' + startX + 'deg) rotateY(' + startY + 'deg)');
            $cubeBox.css('transition', '1s');
            $cubeBox.on('transitionEnd webkitTransitionEnd', function () {
                $cubeBox.css('transition', '');
            });
            bind();
        }

        function bind() {

            $(document).on('touchstart', function (ev) {
                var touch = ev.originalEvent.changedTouches[0];
                downX = touch.pageX;
                downY = touch.pageY;
                bBtn = true;
                $(document).on('touchmove.move', function (ev) {
                    ev.preventDefault();
                    bBtn = false;
                    var touch = ev.originalEvent.changedTouches[0];

                    x = (downY - touch.pageY) * step;
                    y = (touch.pageX - downX) * step;

                    if (startX + x > 70) {
                        x = -startX + 70;
                    }
                    else if (startX + x < -70) {
                        x = -startX - 70;
                    }

                    $cubeBox.css('transform', 'scale(0.5) rotateX(' + (startX + x) + 'deg) rotateY(' + (startY + y) + 'deg)');

                });
                $(document).on('touchend.move', function () {
                    $(document).off('.move');
                });
            });

            $li.on('touchend', function () {
                if (bBtn) {  //点击
                    $cube.hide();
                    $details.show();
                    details.init($(this).index());
                }
                else {  //拖拽
                    startX += x;
                    startY += y;
                }
            });
        }

        return {
            init: init
        };
    })();


    var details = (function (index) {
        function init(index) {
            var slides = document.querySelectorAll("#detailsList   .swiper-slide");
            [].forEach.call(slides, function (item) {
                item.firstElementChild.id = "";
            });
            window.setTimeout(function(){
                slides[index].firstElementChild.id = "n" + index;
                if(index==0){
                    fnNav().open();
                }
            },200);
            bind(index);

            $detailsReturn.on('touchstart', function () {
                $cube.show();
                $details.hide();
                [].forEach.call(slides, function (item) {
                    item.firstElementChild.id = "";
                });
            });
        }

        function bind(index) {
            var mySwiper = new Swiper('.swiper-container', {
                direction: 'horizontal',
                initialSlide: index,
                effect: "coverflow",
                onSlideChangeStart: function (swiper) {
                    var curIn = swiper.activeIndex;
                    var sildes = swiper.slides;
                    [].forEach.call(sildes, function (item, index) {
                        item.firstElementChild.id = "";
                        fnNav().close();
                        if (index == curIn) {
                            item.firstElementChild.id = "n" + curIn;
                            if(index==0){
                                fnNav().open();
                            }
                        }

                    })
                }

            })
        }

        return {
            init: init
        };
    })();

    cube.init();
}

function fnNav() {
    var wrap = document.querySelector("#course");
    var oDivs = document.querySelectorAll("#course div");
    var btn = document.querySelector("#btn");
    var i;
    var flag = true;

    function open() {
        i = 0;
        var timer = setInterval(function () {
            oDivs[i].className = "show";
            if (i == oDivs.length - 1) {
                clearInterval(timer);
                timer = null;
                flag = false;
            }
            i++;
        }, 200)
    }

    function close() {
        for(var i= 0;i<oDivs.length;i++){
            oDivs[i].className = "";
        }
    }

    return {
        open:open,
        close:close
    }

}