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
    var t = `
        <div class="musicPack">
            <div class="musciHeader">
                <h3>Music and Life</h3>
                <input id="progress" type="range" min="0" step="0.5"><br>
                <span class="currentTime"></span>
                <span class="durationTime"></span>
                <div class="musicLine"></div>
                <div class="songList" >
                    <ul></ul>
                </div>
                <img src="images/声音.png" style="position: relative;top:13px;left:-12px;"/>
                <input id="musicVolume" type="range" max='1' min="0" step="0.0002" value="0.5">
                <div class="musicLine" style=""></div>
            </div>
            <audio id="audio">
                <source src="">
            </audio>
            <div>
                <img class="musicLeft" src="images/左.png" />
                <img class='musicPlay' data-src = 'images/播放.png' src="images/暂停.png" alt="" />
                <img class="musicRight" src="images/右.png"/>
                <img class="playWay" data-src="images/列表循环.png" src="images/列表循环.png" alt="" />
                <div class="musicLine" style=""></div>
            </div>
        </div>
    `
    $('.demoContainer').html(t)
    $('.popUp').fadeIn(800)
    $('.overspread').fadeIn(0)
    //常用函数
    var e = function(element) {
        return document.querySelector(element)
    }

    var es = function(element) {
        return document.querySelectorAll(element)
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

    //播放方式函数

    var __mainForMusic = function() {
        //歌曲列表
        var songs = [
            {
                src : '1.mp3',
                name : '陈一发儿 - 阿婆说',
            },
            {
                src : '2.mp3',
                name : '陈一发儿 - 童话镇',
            },
            {
                src : '3.mp3',
                name : '光宗信吉 - I SAY YES',
            },
            {
                src : '4.mp3',
                name : '骆集益 - 回梦游仙',
            },
            {
                src : '5.mp3',
                name : '骆集益 - 御剑江湖',
            },
            {
                src : '6.mp3',
                name : '麦振鸿 - 莫失莫忘',
            },
        ]
        var musicdq = function() {
            audio.play()
        }

        var musiclb = function() {
            e('.musicRight').click()
        }

        var musicsj = function() {
            var n = parseInt(Math.random() * 10000) % songs.length
            audio.src = 'music/' + songs[n].src
        }
        //绑定按钮
        var audio = e('#audio')
        //页面载入初始化
        var musicLoad = function() {
            audio.src = 'music/' + songs[0].src
            audio.volume = 0.5
            bindEvent(audio, 'ended', musiclb)
            //歌单加入页面并绑定切歌功能
            var songList = function(s) {
                for (var i = 0; i < s.length; i++) {
                    var t =`
                        <li data-name = '${s[i].name}' data-src = '${s[i].src}'>${s[i].name}</li>
                    `
                    e('.songList ul').insertAdjacentHTML('beforeend',t)
                }
                bindAll('.songList li','click',function(event) {
                    var self = event.target.dataset.src
                    audio.src = 'music/' + self
                })
            }
            songList(songs)
        }
        musicLoad()
        //载入后初始化
        bindEvent(audio, 'canplay', function() {
            audio.play()
            var now = audio.duration
            var m = String(Math.floor(now / 60))
            var s = String(Math.floor(now % 60))
            if (m.length === 1) {
                m = '0' + m
            }
            if (s.length === 1) {
                s = '0' + s
            }
            e('.durationTime').innerHTML = `${m}:${s}`
            e('#progress').max = parseInt(audio.duration) + ''
            if (e('.songListShow') != null) {
                e('.songListShow').classList.remove('songListShow')
            }
            for (var i = 0; i < es('.songList li').length; i++) {
                if (es('.songList li')[i].dataset.src == audio.src.slice(-5)) {
                    es('.songList li')[i].classList.add('songListShow')
                    break
                }
            }
        })
        //播放/暂停
        bindEvent(e('.musicPlay'), 'click', function(event) {
            var self = event.target.dataset.src
            if (self == 'images/播放.png') {
                audio.pause()
                e('.musicPlay').src = 'images/播放.png'
                e('.musicPlay').dataset.src = 'images/暂停.png'
            } else {
                audio.play()
                e('.musicPlay').src = 'images/暂停.png'
                e('.musicPlay').dataset.src = 'images/播放.png'
            }
        })
        // 进度条
        bindEvent(e('#progress'), 'change', function() {
            audio.currentTime = e('#progress').value
        })
        //音量条
        bindEvent(e('#musicVolume'), 'change', function() {
            audio.volume =  e('#musicVolume').value
        })
        //计时器
        bindEvent(audio, 'timeupdate', function() {
            var now = parseInt(audio.currentTime)
            var m = String(Math.floor(now / 60))
            var s = String(Math.floor(now % 60))
            if (m.length === 1) {
                m = '0' + m
            }
            if (s.length === 1) {
                s = '0' + s
            }
            e('.currentTime').innerHTML = `${m}:${s}`
            e('#progress').value = parseInt(audio.currentTime) + ''
        })
        // 上一首
        bindEvent(e('.musicLeft'), 'click', function() {
            var next = ((parseInt(e('.songListShow').dataset.src.split('.')[0]) - 1) + songs.length - 1)  %  songs.length
            audio.src = 'music/' + songs[next].src

        })
        //下一首
        bindEvent(e('.musicRight'), 'click', function() {
            var next = ((parseInt(e('.songListShow').dataset.src.split('.')[0]) - 1) + songs.length + 1)  %  songs.length
            audio.src = 'music/' + songs[next].src
        })
        //播放方式
        bindEvent(e('.playWay'),'click', function(event) {
            var self = event.target.dataset.src
            if (self == 'images/列表循环.png') {
                audio.removeEventListener('ended',musiclb)
                bindEvent(audio, 'ended', musicdq)
                e('.playWay').src = 'images/单曲循环.png'
                e('.playWay').dataset.src = 'images/单曲循环.png'
                return
            } else if (self == 'images/单曲循环.png') {
                audio.removeEventListener('ended',musicdq)
                bindEvent(audio, 'ended', musicsj)
                e('.playWay').src = 'images/随机循环.png'
                e('.playWay').dataset.src = 'images/随机循环.png'
                return
            } else {
                audio.removeEventListener('ended',musicsj)
                bindEvent(audio, 'ended', musiclb)
                e('.playWay').src = 'images/列表循环.png'
                e('.playWay').dataset.src = 'images/列表循环.png'
                return
            }
        })
    }
    __mainForMusic()
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
    var t = `
        <div class="todolist">
            <header>
                <form>
                    <input class="listValue" type="input" name="name" value="">
                    <button class="addList" type="button" name="button">添加便签</button>
                </form>
            </header>
            <div class="noteList">
                <ul>
                </ul>
            </div>
        </div>
    `

    $('.demoContainer').html(t)
    $('.popUp').fadeIn(800)
    $('.overspread').fadeIn(0)

    var e = function(selector) {
        return document.querySelector(selector)
    }

    var es = function(selector) {
        return document.querySelectorAll(selector)
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

    var appendHtml = function(element, html) {
        element.insertAdjacentHTML('beforeend', html)
    }

    var time = function(z) {
        if (z === undefined) { z = new Date() }
        var han = '日一二三四五六'
        var Year   = z.getFullYear()
        var Month  = z.getMonth() + 1
        var Day    = z.getDate()
        var Hour   = z.getHours()
        var Minute = z.getMinutes()
        var Second = z.getSeconds()
        var Week   = han[z.getDay()]
        if ( String(Month).length === 1) {
            Month = '0' + Month
        }
        return `${Month}月${Day}日 星期${Week}
        ${Hour}时${Minute}分`
    }

    var strColor = [
        "rgba(219,112,147,0.9)",
        "rgba(169,169,169,0.9)",
        "rgba(255,165,0,0.9)",
        "rgba(95,158,160,0.9)",
        "rgba(255,192,203,0.9)",
    ]

    var colorFor = function() {
        var a = es('.noteList ul li')
        for (var i = 0; i < a.length; i++) {
            var liRotate = `rotate(${parseInt((Math.random()*100)%20-10)}deg)`;
            a[i].style.transform = liRotate
            var liColor = strColor[parseInt(Math.random() * 10 % strColor.length)];
            a[i].style.backgroundColor = liColor
        }
    }

    var todoList = []
    // localStorage.clear()
    //设立储存
    var saveForTodo = function(t) {
        localStorage.todo = JSON.stringify(t)
    }
    //读取
    var loadForTodo = function() {
        if (localStorage.todo === undefined || localStorage.todo === '[]') {
            localStorage.todo = JSON.stringify([{
                time : '幸福一万年',
                value : '给你留个言,愿你天天开心',
            }])
        }
        return JSON.parse(localStorage.todo)
    }

    //添加todo
    var addTodo = function() {
        bindEvent(e('.addList'), 'click', function() {
            var s = e('.listValue').value
            if(s == ""){return}
            var nowTime = time()
            var t = `
            <li class='todoLiList'>
            <time>${nowTime}</time><br>
            <span>${s}</span>
            <img src="images/关闭.png"/>
            </li>
            `
            var todoValue = {
                time : nowTime,
                value : s,
            }
            todoList.push(todoValue)
            saveForTodo(todoList)
            appendHtml(e('.noteList ul'),t)
            e('.listValue').value = ''
            colorFor()
        })
        bindEvent(e('.listValue'), 'keydown', function(event) {
            var self = event.keyCode
            if (self == 13) {
                //阻止默认事件
                event.preventDefault()
                var s = e('.listValue').value
                if(s == ""){
                    event.target.blur()
                    return
                }
                var nowTime = time()
                var t = `
                <li class='todoLiList'>
                <time>${nowTime}</time><br>
                <span>${s}</span>
                <img src="images/关闭.png"/>
                </li>
                `
                var todoValue = {
                    time : nowTime,
                    value : s,
                }
                todoList.push(todoValue)
                saveForTodo(todoList)
                appendHtml(e('.noteList ul'),t)
                event.target.blur()
                e('.listValue').value = ''
                colorFor()
            }
        })
    }

    //操作todo
    var updataTodo = function() {
        bindEvent(e('.noteList ul'), 'click', function(event) {
            var self = event.target
            var todoul = e('.noteList ul')
            if (self.parentElement == todoul) {
                var litime = self.children[0]
                var litext = self.children[2]
                litext.setAttribute('contenteditable',true)
                litext.focus()
                bindEvent(litext, 'blur', function(event) {
                    for (var i = 0; i < todoList.length; i++) {
                        if (todoList[i].time == litime.innerHTML ) {
                           todoList[i].value = event.target.innerHTML
                           saveForTodo(todoList)
                           break
                        }
                    }
                    litext.setAttribute('contenteditable',false)
                })
                bindEvent(litext, 'keydown', function(event) {
                    var self = event.keyCode
                    if (self == 13) {
                        //阻止默认事件
                        event.preventDefault()
                        litext.blur()
                        for (var i = 0; i < todoList.length; i++) {
                            if (todoList[i].time == litime.innerHTML ) {
                               todoList[i].value = event.target.innerHTML
                               saveForTodo(todoList)
                               break
                            }
                        }
                        litext.setAttribute('contenteditable',false)
                    }
                })
            } else {
                var time = self.parentElement.children[0]
                var text = self.parentElement.children[2]
                var deleteButton = self.parentElement.children[3]
                //可编辑
                if (self == text ) {
                    text.setAttribute('contenteditable',true)
                    //获取焦点
                    text.focus()
                } //删除
                else if (self == deleteButton) {
                    for (var i = 0; i < todoList.length; i++) {
                        if (todoList[i].value == text.innerHTML) {
                            todoList.splice(i,1)
                            saveForTodo(todoList)
                            self.parentElement.remove()
                            break
                        }
                    }
                }
                // 不可编辑
                bindEvent(text, 'blur', function(event) {
                    for (var i = 0; i < todoList.length; i++) {
                        if (todoList[i].time == time.innerHTML ) {
                           todoList[i].value = event.target.innerHTML
                           saveForTodo(todoList)
                           break
                        }
                    }
                    text.setAttribute('contenteditable',false)
                })
                bindEvent(text, 'keydown', function(event) {
                        var self = event.keyCode
                        if (self == 13) {
                            //阻止默认事件
                            event.preventDefault()
                            text.blur()
                            for (var i = 0; i < todoList.length; i++) {
                                if (todoList[i].time == time.innerHTML ) {
                                   todoList[i].value = event.target.innerHTML
                                   saveForTodo(todoList)
                                   break
                                }
                            }
                            text.setAttribute('contenteditable',false)
                        }
                    })
            }
        })
    }

    //页面加载
    var loadAdd = function() {
        todoList = loadForTodo()
        for (var i = 0; i < todoList.length; i++) {
            var t = `
            <li class='todoLiList'>
            <time>${todoList[i].time}</time>
            <br>
            <span>${todoList[i].value}</span>
            <img src="images/关闭.png"/>
            </li>
            `
            appendHtml(e('.noteList ul'),t)
        }
    }

    var __mainFortodo = function() {
        loadAdd()
        colorFor()
        addTodo()
        updataTodo()
    }

    __mainFortodo()
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
    console.log('想和我交流？请发送邮件到 zhaohang1229@foxmail.com','^(*￣(oo)￣)^')
})
