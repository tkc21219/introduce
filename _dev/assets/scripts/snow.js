$(function(){
    function drop(param){
        var topWidth = $(window).width(),
            topHeight = $(window).height();
        $('.topWrapper').css({
            width: topWidth,
            height: topHeight
        });
        $(window).on('resize', function(){
            var topWidth = $(window).width(),
                topHeight = $(window).height();
            $('.topWrapper').css({
                width: topWidth,
                height: topHeight
            });
        });
        //画像を生成
        var create = function() {
            var img = document.createElement('img');
            img.src = param.imgpath;
            $(img).on('load',function(){
                for (var i = 0; i < param.objectMax; i += 1) {
                    $(param.wrap).append('<img src="' + param.imgpath + '" class="' + param.targetClass + '" />');
                }
                play();
            });
        };
        //落ちる動きの処理
        var move = function(obj) {
            var xPosition = Math.floor(Math.random() * $(window).width()),
                yPosition = {
                    start:Math.random() * 1000 * -1,
                    end:$(window).height()
                },
            size = Math.floor(Math.random() * (param.size.max - param.size.min) + param.size.min),
            time = Math.floor(Math.abs(yPosition.start - yPosition.end) * (param.speed / 480)) * (param.size.max / size);
            $(obj).stop()
            .css({width: size + 'px', top: yPosition.start + 'px', left: xPosition + 'px' ,position:'fixed'})
            .animate({ top: yPosition.end + 'px'}, { duration:time, queue:false, easing:'linear',
                complete:function(){
                move(this);
            }});
            swing(obj);
        };
        //揺れる動きの処理
        var swing = function(obj) {
            var swingNum = Math.floor(Math.random() * (param.swing.max - param.swing.min) + param.swing.min) * -1;
            $(obj).animate({marginLeft: swingNum + 'px'}, {duration:param.swing.speed, queue:false,
                complete:function(){
                $(obj).animate({marginLeft: 0}, {duration:param.swing.speed, queue:false,
                    complete:function(){
                    swing(this);
                }});
            }});
        };
        //再生
        var play = function(){
            $('.' + param.targetClass).each(function(){
                move(this);
            });
        };
        //init
        var init = function(){
            create();
            $(window).on('resize',function(){
                play();
            });
        };
        init();
    }
    $(document).ready(function() {
        drop({
            wrap:'.topWrapper',
            //配置する場所
            targetClass: 'snow',
            //オブジェクトのクラス
            size: {max: 40, min: 10 },
            //オブジェクトの最大サイズ
            objectMax: 70,
            //オブジェクトの数
            speed: 3000,
            //オブジェクトの速度
            swing: {max: 25, min: .5, speed: 850},
            //オブジェクトの揺れ幅
            imgpath: '/assets/images/diamond.png'
            //オブジェクトの画像パス
        });
    });
});
