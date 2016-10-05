
/*适配*/
//rem 相对于根元素字体大小
~(function (desW) {
    var winW = document.documentElement.clientWidth;
    var scale = winW / desW;
    document.documentElement.style.fontSize = scale * 100 + "px";
})(414);
var mySwiper = new Swiper("#wrapper",{
    direction: 'vertical',
    initialSlide: 0,
    onSlideChangeStart : function(swiper){
        var curIn = swiper.activeIndex;
        var slides = swiper.slides;
        [].forEach.call(slides, function (item, index) {
            item.firstElementChild.id = "";
            if(index == curIn){
                var num = item.firstElementChild.className;

                item.firstElementChild.id=num;
            }
        })
    }

})
var mySwiper2 = new Swiper("#student-wrapper",{
    direction: 'horizontal',
    initialSlide: 0,
    pagination: '.swiper-pagination',
    onSlideChangeStart : function(swiper){


    }

})
