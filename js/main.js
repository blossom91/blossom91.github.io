const imgBounce = function() {
    $('.contentTwo img').each(function() {
        $(this).on('mouseover',function() {
            $(this).addClass('pulse')
        })
        $(this).on('mouseout',function() {
            $(this).removeClass('pulse')
        })
    })

}

const imgForLi = function() {
    $('.contentFour li').each(function(i){
        $(this).css('background-image',`url(images/backimg/${i + 1}.jpg)`)
    })
}



$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4rdPage'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['首页', '关于我', '技能栈', '作品集'],
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        controlArrowColor: '#000',
        controlArrows: false,
        anchors:['page1','page2','page3','page4'],
    });
    imgBounce()
    imgForLi()
});
