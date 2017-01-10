'use strict';


    // index.htmlでのjs
  function Leagle(){
    this.$leagleForm = $('.l-form');
    this.$leagleTxt = $('.l-text__area');
    this.bind();
  };
  Leagle.prototype = {
    bind: function(){
      this.$leagleForm.on('submit', this.changePage.bind(this));
    },
    changePage: function(){
      this.val = this.$leagleTxt.val();
      // alert(this.val);
      // console.log(this.val);
      switch(this.val){
        case 'yoshinari takashi':
        case 'Yoshinari Takashi':
        case 'YOSHINARI TAKASHI':
        case 'yoshinaritakashi':
        case 'YoshinariTakashi':
        case 'YOSHINARITAKASHI':
        case 'takashi yoshinari':
        case 'Takashi Yoshinari':
        case 'TAKASHI YOSHINARI':
        case 'takashiyoshinari':
        case 'TakashiYoshinari':
        case 'TAKASHIYOSHINARI':
        case '吉成敬':
        case 'よしなりたかし':
        case 'ヨシナリタカシ':
        case '吉成 敬':
        case 'よしなり たかし':
        case 'ヨシナリ タカシ':
        case '吉成　敬':
        case 'よしなり　たかし':
        case 'ヨシナリ　タカシ':
          window.location.href = '/myprofile/openning/index.html';
          break;
        case '':
          break;
        default:
          window.location.href = 'https://www.google.co.jp/#q=' + this.val;
          break;
      }
      return false;
    }
  };

// top.htmlでのjs
  function Top(){
      this.$p1 = $('.p1');
      this.$p2 = $('.p2');
      this.$p3 = $('.p3');
      this.$pro = $('.prologue');
      this.$link = $('.topLink');
      this.bind();
  };
  Top.prototype = {
    bind: function(){
      $(window).on('load', this.prologue.bind(this));
      setTimeout(this.firstShow.bind(this), 2000);
      setTimeout(this.secondShow.bind(this), 4500);
      setTimeout(this.hidePro.bind(this), 8000);
    },
    prologue: function(){
      this.$pro.contents().each(function(){
        if (this.nodeType === 3) {
          $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
        }
      });
    },
    firstShow: function(){
      this.$p1.css({'opacity':1});
      for (var i = 0; i <= this.$p1.children().length - 1; i++) {
          this.$p1.children('span:eq('+i+')').delay(100*i).fadeIn(300);
      };
    },
    secondShow: function(){
      this.$p2.css({'opacity':1});
      for (var i = 0; i <= this.$p2.children().length - 1; i++) {
        this.$p2.children('span:eq('+i+')').delay(100*i).fadeIn(300);
      };
    },
    hidePro: function(){
      this.$pro.fadeOut(1000);
      this.showLink();
    },
    showLink: function(){
      this.$p3.css({
          display: 'block'
      }).animate({
          opacity:1
      },1500);
      this.animeLink();
    },
    animeLink: function(){
      var _this = this;
      setInterval(function(){
        _this.$p3.animate({
          marginTop: '-5px'
        }, 700, 'swing').animate({
          marginTop: '5px'
        }, 400, 'swing');
      }, 800);
    }
  };

// list.htmlでのjs
function List(){
  this.$window = $(window);
    this.$hdrWrapper = $('.hdrWrapper');
    this.$contWrapper = $('.d-cont__innerWrap');
    this.$list = $('.d-cont__list li');
    this.$listImg = $('.d-cont__list li').find('img');
    this.$listHover = $('d-contList__hover');
    this.bind();
  };
  List.prototype = {
    bind: function(){
      this.setSize();
      this.hoverAction();
      this.$window.on('resize', this.setSize.bind(this));
      this.$window.on('load', this.showList.bind(this));
    },
    setSize: function(){
      this.$width = this.$window.width();
      this.$height = this.$window.height();
      this.$listHeight = (this.$height / 3);
      this.$hdrWrapper.css('height', this.$height + 'px');
      this.$list.css('height', this.$listHeight + 'px');
    },
    showList: function(){
      this.$hdrWrapper.fadeIn(700);
      for(var i = 0; i < this.$list.length; i++){
        this.$list.delay(100).fadeIn();
        this.$list.eq(i).animate({
          'opacity': 1,
          'top': 0
        },1000);
      }
    },
    hoverAction: function(){
      var _this = this;
      this.$list.on({
        'mouseenter': function(e){
          var index = _this.$list.index(this);
          _this.$list.eq(index).find('img').css("-webkit-filter", "grayscale(0)");
          if(index == 7){
            _this.$list.eq(7).find('img').attr('src', _this.$list.eq(7).find('img').attr('src').replace('_off', '_on'));
          }
          _this.$list.eq(index).find('div').children('.d-hoverTtl__en').stop().fadeOut(600);
          _this.$list.eq(index).find('div').children('.d-hoverTtl__ja').stop().fadeIn(600);
        },
        'mouseleave': function(){
          var index = _this.$list.index(this);
          _this.$list.eq(index).find('img').css("-webkit-filter", "grayscale(100%)");
          if(index == 7){
            _this.$list.eq(7).find('img').attr('src', _this.$list.eq(7).find('img').attr('src').replace('_on', '_off'));
          }
          _this.$list.eq(index).find('div').children('.d-hoverTtl__en').stop().fadeIn(600);
          _this.$list.eq(index).find('div').children('.d-hoverTtl__ja').stop().fadeOut(600);
        },
      });
    }
  };

// detail下層ページでのjs
  function Detail(){
    this.$ul = $('.d-contMore__slideList');
    this.$list = $('.d-contMore__slideList').find('li');
    this.$listlength = this.$list.length;
    this.$slideBtn = $('.d-contMore__slideBtn');
    this.$up = this.$slideBtn.find('.up');
    this.$down = this.$slideBtn.find('.down');
    this.$listHover = $('d-contList__hover');
    this.bind();
  };
  Detail.prototype = {
    bind: function(){
      this.setPos();
      $(window).on('resize', this.setPos.bind(this));
      this.hoverSlide();
      this.$up.on('click', this.picSlideUp.bind(this));
      this.$down.on('click', this.picSlideDown.bind(this));
      this.matchSlide();
      this.ajaxEach();
    },
    setPos: function(){
      this.$height = $(window).height();
      this.$listHeight = this.$list.height();
      this.$slideBtn = $('.d-contMore__slideBtn');
      this.$down = this.$slideBtn.find('.down');
      this.$downHeight = this.$down.height();
      this.$down.css({
        top: (this.$height - this.$downHeight) + 'px'
      });
    },
    hoverSlide: function(){
      var _this = this;
      this.$list.on({
        'mouseenter': function(e){
          var target = $(e.target).offsetParent();
          var index = _this.$list.index(this);
          _this.$list.eq(index).find('img').css("-webkit-filter", "grayscale(0)");
          _this.$list.eq(index).find('div').children('.d-hoverTtl__en').stop().fadeOut(600);
          _this.$list.eq(index).find('div').children('.d-hoverTtl__ja').stop().fadeIn(600);
        },
        'mouseleave': function(e){
          var target = $(e.target).offsetParent();
          var index = _this.$list.index(this);
          _this.$list.eq(index).find('img').css("-webkit-filter", "grayscale(100%)");
          _this.$list.eq(index).find('div').children('.d-hoverTtl__en').stop().fadeIn(600);
          _this.$list.eq(index).find('div').children('.d-hoverTtl__ja').stop().fadeOut(600);
        }
      });
    },
    picSlideUp: function(){
      this.$height = $(window).height();
      this.$listHeight = this.$list.height();
      var fromTop = this.$list.offset().top - $(window).scrollTop();
      if(fromTop < 0){
          if(Math.abs(fromTop) > this.$listHeight){
              this.$ul.stop().animate({
                  top: '+=' + this.$listHeight + 'px'
              });
          } else {
              this.$ul.stop().animate({
                  top: '+=' + Math.abs(fromTop) + 'px'
              });
          }
      }
    },
    picSlideDown: function(){
      this.$height = $(window).height();
      this.$listHeight = this.$list.height();
      this.$listWholeH = (this.$list.length * this.$listHeight);
      var fromTop = this.$ul.offset().top - $(window).scrollTop();
      var withoutUnder = (Math.abs(fromTop)) + this.$height;
      var leftList = this.$listWholeH - withoutUnder;
      if(withoutUnder < this.$listWholeH ){
        if(leftList > this.$listHeight){
          this.$ul.stop().animate({
            top: '-=' + this.$listHeight + 'px'
          });
        } else {
          this.$ul.stop().animate({
            top: '-=' + leftList + 'px'
          });
        }
      }
    },
    matchSlide: function(){
      var _this = this;
      var url = window.location.href;
      var focus;
      for(var i = 0; i < _this.$listlength; i++){
        var link = _this.$list.eq(i).find('a').attr('href');
        if(url.match(link)){
          focus = i;
          _this.$list.eq(focus).find('img').css({
            'cssText': '-webkit-filter: grayscale(0);'
          });
        }
      }
      this.$list.on('mouseout', function(){
        _this.$list.eq(focus).find('img').css("-webkit-filter", "grayscale(0)");
      });
    },
    ajaxEach: function(){
      var _this = this;
      var hash = window.location.hash;
      var hashArrey = ["#background", "#oversea", "#skill", "#sports", "#game", "#tv-movie", "#book" ,"#mygirl", "#future"];
      var url = window.location.href.split("/");
      var crntFile = url[url.length - 1];
      this.$moreList = $('.d-contMore__list');
      for(var i = 0; i < hashArrey.length; i++){
        if(hash == hashArrey[i]){
          var nowHash = i;
          $.ajax({
            url: '/introduce/myprofile/assets/json/data.json',
            dataType: 'json',
            data: {name: 'contents'}
          }).done(function(data){
            var dataArray = data.contents;
            $('title').text(dataArray[nowHash].title);
            _this.$moreList.prepend(dataArray[nowHash].body);
          }).fail(function(data){
            console.log(nowHash);
          });
        }
      }
      window.onhashchange = function(){
        var hash = window.location.hash;
        var nowHash;
        for(var i = 0; i < hashArrey.length; i++){
          if(hash == hashArrey[i]){
            nowHash = i;
            $.ajax({
              url: '/introduce/myprofile/assets/json/data.json',
              dataType: 'json',
              data: {name: 'contents'}
            }).done(function(data){
              var dataArray = data.contents;
              $("title").text(dataArray[nowHash].title);
              _this.$moreList.empty().animate({ scrollTop: 0 }).prepend(dataArray[nowHash].body);
              _this.$list.find('img').css({
                  'cssText': '-webkit-filter: grayscale(100%);'
              });
              _this.$list.eq(nowHash).find('img').css({
                  'cssText': '-webkit-filter: grayscale(0);'
              });
            }).fail(function(data){
                console.log(nowHash);
            });
          }
        }
        _this.$list.on('mouseout', function(){
          _this.$list.find('img').css("-webkit-filter", "grayscale(100%)");
          _this.$list.eq(nowHash).find('img').css("-webkit-filter", "grayscale(0)");
        });
        _this.$list.eq(nowHash).on('mouseout', function(){
          _this.$list.eq(nowHash).find('img').css("-webkit-filter", "grayscale(0)");
        });
      };
    }
  };

// gallery.htmlでのjs
  function Gallery(){
    this.$gWrap = $('.g-cont__wrapper');
    this.$gImgs = this.$gWrap.find('img');
    this.$gOverLay = $('.g-overlay');
    this.$gLayImg = $('.g-overlay__img');
    this.$modalBtn = $('.g-overlay__btn');
    this.$modalClose = $('.g-modal-close');
    this.$modalImg = $('.modal-img');
    this.init();
  };
  Gallery.prototype = {
    init: function(){
      this.sortPic();
      this.modalPic();
    },
    sortPic: function(){
      var _this = this;
      var imgBox = [];
      for(var i = 0; i < 48; i++){
        var num = i + 1;
        _this.$gImgs.eq(i).each(function(){
            imgBox.push(num);
        });
      }
      var sort = imgBox.sort(function() {
        return Math.random() - Math.random();
      });
      var j = 0;
      this.$gImgs.each(function() {
        _this.$gImgs.eq(j).attr({
          src: '/introduce/myprofile/assets/images/gallery/photo'+imgBox[j]+'.jpg'
        });
        j++;
      });
      $(window).on('load', function(){
        _this.$gImgs.animate({
          opacity: 1
        }, 1000);
      });
    },

    modalPic: function(){
      var _this = this;
      var focusPicIndex;
      var focusPic;
      var crntScrollTop;
      this.$height = $(window).height();
      _this.$gImgs.on('click', function(){
        crntScrollTop = $(window).scrollTop();
        focusPicIndex = _this.$gImgs.index(this);
        focusPic = _this.$gImgs.eq(focusPicIndex).attr('src');
        _this.$gWrap.css({
          position:'fixed',
          top: -1 * crntScrollTop
        });
        _this.$gOverLay.css({
          width: '100%',
          height: _this.$height
        }).fadeIn(1000);
        _this.$gLayImg.append('<img class="modal-img" src="'+focusPic+'">');
      });
      $(window).on('resize', function(){
        this.$height = $(window).height();
        _this.$gOverLay.css({
          width: '100%',
          height: this.$height
        });
      });
      _this.$modalClose.on('click', function(){
        _this.$gWrap.css({
          position:'initial'
        });
        $('html, body').prop({scrollTop:crntScrollTop});

        function removeModal(){
          _this.$gLayImg.empty();
        }
        _this.$gOverLay.fadeOut(700, removeModal);
      });

      _this.$modalBtn.find('img').on('click', function(){
        var index = _this.$modalBtn.find('img').index(this);
        var className = _this.$modalBtn.find('img').eq(index).attr('class');
        if(className === 'g-next' && !(focusPicIndex === 47)){
          focusPicIndex += 1;
          focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
          _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
        } else if (className === 'g-prev' && !(focusPicIndex === 0)) {
          focusPicIndex -= 1;
          focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
          _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
        } else if(className === 'g-next' && focusPicIndex === 47){
          focusPicIndex = 0;
          focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
          _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
        } else if(className === 'g-prev' && focusPicIndex === 0){
          focusPicIndex = 47;
          focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
          _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
        }
      });
    }
  };


$(function(){
  var url = window.location.href;
  var file = url.split('/');
  if(file[5] === 'detail'){
      window.location.href = '#background';
  }

  var leagle = new Leagle();
  var top = new Top();
  var list = new List();
  var detail = new Detail();
  var gallery = new Gallery();
});
