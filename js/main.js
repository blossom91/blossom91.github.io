//page2所有图片加动画效果
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
// page4所有li加图片背景
const imgForLi = function() {
    $('.contentFour li').each(function(i){
        $(this).css('background-image',`url(images/backimg/${i + 1}.jpg)`)
    })
}
//清里demo演示区
const clearDemo = function() {
    $('.closePop,.overspread').click(function() {
        $('.popUp').hide(0)
        $('.overspread').hide(0)
        $('.demoContainer').html('')
    })
}

const demo2048 = function() {
    var t = `
        <header class="game2048">
            <h1>2048</h1>
            <a href="javascript:newgame()" id="newgame">New Game</a>
            <p>
                score: <span id="score">0</span><br>
            </p>
        </header>
        <div id="container">
            <div class="grid-cell" id="cell-0-0"></div>
            <div class="grid-cell" id="cell-0-1"></div>
            <div class="grid-cell" id="cell-0-2"></div>
            <div class="grid-cell" id="cell-0-3"></div>

            <div class="grid-cell" id="cell-1-0"></div>
            <div class="grid-cell" id="cell-1-1"></div>
            <div class="grid-cell" id="cell-1-2"></div>
            <div class="grid-cell" id="cell-1-3"></div>

            <div class="grid-cell" id="cell-2-0"></div>
            <div class="grid-cell" id="cell-2-1"></div>
            <div class="grid-cell" id="cell-2-2"></div>
            <div class="grid-cell" id="cell-2-3"></div>

            <div class="grid-cell" id="cell-3-0"></div>
            <div class="grid-cell" id="cell-3-1"></div>
            <div class="grid-cell" id="cell-3-2"></div>
            <div class="grid-cell" id="cell-3-3"></div>
        </div>
    `
    $('.demoContainer').html(t)
    $('.popUp').fadeIn(800)
    $('.overspread').fadeIn(0)
    __main2048()

}

const demoMovies = function() {
    var t = `
        <div id="pie" class="chart" style='width:300px'></div>
        <div id="line" class="chart" style='width:440px'></div>
        <div id="bar" class="chart" style='width:740px'></div>
    `
    $('.demoContainer').html(t)
    $('.popUp').fadeIn(800)
    $('.overspread').fadeIn(0)
    __mainmovies()
}

const demoWeather = function() {
    var t = `
        <div class="container-fluid">
            <input id="city" type="text" placeholder="查询天气的城市名">
            <button id='cx' type="button">提交</button>
        </div>
        <div class="tq"></div>
    `
    $('.demoContainer').html(t)
    $('.popUp').fadeIn(800)
    $('.overspread').fadeIn(0)
    var getFormax = function(city) {
        var a = {
            max:[],
            min:[],
        }
        var request = {
            type : "get",
            async : false,
            url : `https://free-api.heweather.com/v5/forecast?city=${city}&key=30673095b0f647e2992f5c3b5e606371`,
            success : function(r){
              a.max.push(Number(r.HeWeather5[0].daily_forecast[0].tmp.max))
              a.max.push(Number(r.HeWeather5[0].daily_forecast[1].tmp.max))
              a.max.push(Number(r.HeWeather5[0].daily_forecast[2].tmp.max))
              a.min.push(Number(r.HeWeather5[0].daily_forecast[0].tmp.min))
              a.min.push(Number(r.HeWeather5[0].daily_forecast[1].tmp.min))
              a.min.push(Number(r.HeWeather5[0].daily_forecast[2].tmp.min))
          }
        }

        $.ajax(request)
        return a
    }
    var chartForWeather = function(city) {
        var myChart = echarts.init(document.querySelector('.tq'))
        var maxmin = getFormax(city)
        var options = function() {
            option = {
                title: {
                    text: `${city}未来三天气温变化`,
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['最高气温','最低气温']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: ['今天','明天','后天']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                series: [
                    {
                        name:'最高气温',
                        type:'line',
                        data: maxmin.max,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'最低气温',
                        type:'line',
                        data: maxmin.min,
                        markPoint: {
                            data: [
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                            ]
                        }
                    }
                ]
            };
            return option
        }
            myChart.setOption(options())
            window.onresize = myChart.resize
    }
    var cityWeather = function() {
        $('#cx').click(function() {
            var map = $('#city').val()
            if (!map) {
                alert('请输入正确的城市名')
            } else {
               chartForWeather(map)
            }
        })
    }
    cityWeather()
}

const demoMusic = function() {

}

const demoSlide = function() {
    var t = `
        <div class="slideShow" data-img=8 data-run=0>
            <div class="slideImg">
                <img id="slideImg-0" class="showImg" src="images/jd/1.jpg" alt="商品" />
                <img id="slideImg-1" src="images/jd/2.jpg" alt="商品" />
                <img id="slideImg-2" src="images/jd/3.jpg" alt="商品" />
                <img id="slideImg-3" src="images/jd/4.jpg" alt="商品" />
                <img id="slideImg-4" src="images/jd/5.jpg" alt="商品" />
                <img id="slideImg-5" src="images/jd/6.jpg" alt="商品" />
                <img id="slideImg-6" src="images/jd/7.jpg" alt="商品" />
                <img id="slideImg-7" src="images/jd/8.jpg" alt="商品" />
            </div>
            <div class="slideButton">
                <img src="images/jd/左.png" alt="" class="left" data-run=-1/>
                <img src="images/jd/右.png" alt="" class="right" data-run=1/>
            </div>
            <div class="slideDot">
                <ul>
                    <li id="dot-0" class="dai-dot showDot" data-index=0></li>
                    <li id="dot-1" class="dai-dot" data-index=1></li>
                    <li id="dot-2" class="dai-dot" data-index=2></li>
                    <li id="dot-3" class="dai-dot" data-index=3></li>
                    <li id="dot-4" class="dai-dot" data-index=4></li>
                    <li id="dot-5" class="dai-dot" data-index=5></li>
                    <li id="dot-6" class="dai-dot" data-index=6></li>
                    <li id="dot-7" class="dai-dot" data-index=7></li>
                </ul>
            </div>
        </div>
    `
    $('.demoContainer').html(t)
    $('.popUp').fadeIn(800)
    $('.overspread').fadeIn(0)
    var __mainSlideShow = function() {
        var e = function(element) {
            return document.querySelector(element)
        }
        var bindEvent = function(element, eventName, callback) {
            element.addEventListener(eventName, callback)
        }
        var bindAll = function(selector, eventName, callback) {
            var elements = document.querySelectorAll(selector)
            for(var i = 0; i < elements.length; i++) {
                var e = elements[i]
                bindEvent(e, eventName, callback)
            }
        }
        var slideShowRun = function(className) {
            var a = e('.' + className).dataset.run
            var a1 = e('.slideShow').dataset.run
            var a2 = e('.slideShow').dataset.img
            var next = (parseInt(a1) + parseInt(a2) + parseInt(a)) % parseInt(a2)
            e('.slideShow').dataset.run = next
            var c = e('.showImg')
            c.classList.remove('showImg')
            var a3 = e('#slideImg-' + next)
            a3.classList.add('showImg')
            var d = e('.showDot')
            d.classList.remove('showDot')
            var a4 = e('#dot-' + next)
            a4.classList.add('showDot')
        }
        bindEvent(e('.left'), 'click', function() {
            slideShowRun('left')
        })

        bindEvent(e('.right'), 'click', function() {
            slideShowRun('right')
        })

        bindAll('.dai-dot', 'mouseover', function(event) {
            var self = event.target
            var z = self.dataset.index
            e('.slideShow').dataset.run = z
            var c = e('.showImg')
            c.classList.remove('showImg')
            var z1 = e('#slideImg-' + z)
            z1.classList.add('showImg')
            var d = e('.showDot')
            d.classList.remove('showDot')
            self.classList.add('showDot')
        })

        var autoRun = setInterval(function(){
            e('.right').click()
        }, 3000)

        bindEvent(e('.slideShow'),'mouseover',function() {
            clearInterval(autoRun)
            e('.slideButton').style.display = 'block'
        })

        bindEvent(e('.slideShow'),'mouseout',function() {
            e('.slideButton').style.display = 'none'
            autoRun = setInterval(function(){
                e('.right').click()
            }, 3000)
        })
    }
     __mainSlideShow()
}

const demoTodo = function() {

}

const demoButton = function() {
    $('#demo1 button').click(function() {
        demoSlide()
    })
    $('#demo2 button').click(function() {
        demoTodo()
    })
    $('#demo3 button').click(function() {
        demoMusic()
    })
    $('#demo4 button').click(function() {
        demo2048()
    })
    $('#demo5 button').click(function() {
        demoWeather()
    })
    $('#demo6 button').click(function() {
        demoMovies()
    })
}

const __main = function() {
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
        keyboardScrolling: false,
        'afterLoad': function(anchorLink, index){
            if(index == 1){
                $('.contentOne').slideDown(1500);
            } else if (index == 2) {
                $('.contentTwo').fadeIn(1600);
            } else if (index == 3) {
                $('.contentThree').show(1500);
            } else if (index == 4) {
                $('.contentFourLeft').animate({left:20},1000);
                $('.contentFourRight').animate({right:20},1000);
            }
        },
        'onLeave': function(index, nextIndex, direction){
            $('.contentOne').slideUp(0);
            $('.contentTwo').fadeOut(0);
            $('.contentThree').hide(0);
            $('.contentFourLeft').animate({left:-600},500);
            $('.contentFourRight').animate({right:-600},500);
        }
    });
    imgBounce()
    imgForLi()
    demoButton()
    clearDemo()
}

$(function(){
    __main()
})
