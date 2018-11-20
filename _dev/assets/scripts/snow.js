$(function() {

  function dropObj(param) {
    this.param = param;
    this.init();
  };

  dropObj.prototype.init = function() {
    var that = this;
    this.setWindow();
    this.create();
    $(window).on('resize',function() {
      that.play();
    });
  };

  dropObj.prototype.setWindow = function() {
    var $window = $(window);
    var winWidth = $window.width();
    var winHeight = $window.height();
    var $openning = $('.js-openning');
    $openning.css({
      width: winWidth,
      height: winHeight
    });
    $window.on('resize', function() {
      var winWidth = $window.width();
      var winHeight = $window.height();
      $openning.css({
        width: winWidth,
        height: winHeight
      });
    });
  };

  //画像を生成
  dropObj.prototype.create = function() {
    var that = this;
    var img = document.createElement('img');
    img.src = this.param.imgpath;
    $(img).on('load',function() {
      for (var i = 0; i < that.param.objectMax; i += 1) {
        $(that.param.wrap).append('<img src="' + that.param.imgpath + '" class="' + that.param.targetClass + '" />');
      }
      that.play();
    });
  };

  //再生
  dropObj.prototype.play = function() {
    var that = this;
    $('.' + this.param.targetClass).each(function(i, item) {
      that.move(item);
    });
  };

  //落ちる動きの処理
  dropObj.prototype.move = function(obj) {
    var that = this;
    var xPosition = Math.floor(Math.random() * $(window).width());
    var yPosition = {
      start: Math.random() * 1000 * -1,
      end: $(window).height()
    };
    var size = Math.floor(Math.random() * (this.param.size.max - this.param.size.min) + this.param.size.min);
    var time = Math.floor(Math.abs(yPosition.start - yPosition.end) * (this.param.speed / 480)) * (this.param.size.max / size);
    $(obj).stop().css({
      width: size + 'px',
      top: yPosition.start + 'px',
      left: xPosition + 'px',
      position: 'fixed'
    }).animate({
      top: yPosition.end + 'px'
    }, {
      duration: time,
      queue: false,
      easing: 'linear',
      complete: function() {
        that.move(this);
      }
    });
    this.swing(obj);
  };

  //揺れる動きの処理
  dropObj.prototype.swing = function(obj) {
    var that = this;
    var swingNum = Math.floor(Math.random() * (this.param.swing.max - this.param.swing.min) + this.param.swing.min) * -1;
    $(obj).animate({
      marginLeft: swingNum + 'px'
    }, {
      duration: this.param.swing.speed,
      queue: false,
      complete: function() {
        $(obj).animate({
          marginLeft: 0
        }, {
          duration: that.param.swing.speed,
          queue: false,
          complete: function() {
            that.swing(this);
          }
        });
      }
    });
  };

  new dropObj({
    wrap:'.js-openning',
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
    imgpath: '/introduce/myprofile/assets/images/diamond.png'
    //オブジェクトの画像パス
  });
});
