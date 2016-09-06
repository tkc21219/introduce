'use strict';

var App = App || {};

(function(){
  // index.htmlでのjs
  function Leagle(){
    this.$leagleForm = $('.l-form');
    this.$leagleTxt = $('.l-text__area');
    this.init();
  };
  Leagle.prototype = {
    init: function() {
      this.bindEvent();
    },
    bindEvent: function () {
      this.$leagleForm.on('submit', this.changePage.bind(this));
    },
    changePage: function(){
      this.val = this.$leagleTxt.val();
      // alert(_this.val);
      // console.log(_this.val);
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
        location.href = '../myprofile/top.html';
        break;
      case '':
        break;
      default:
        window.location.href = 'https://www.google.co.jp/#q=' + _this.val;
        break;
      }
      return false;
    }
  };

  // top.htmlでのjs
  function Top(){
    this.init();
  };
  Top.prototype = {
    init: function() {
      this.getParameter();
      this.bindEvent();
    },
    getParameter: function() {
      this.$p1 = $('.p1');
      this.$p2 = $('.p2');
      this.$p3 = $('.p3');
      this.$pro = $('.prologue');
      this.$link = $('.topLink');
    },
    bindEvent: function() {
      this.wrapWord();
      setTimeout( this.showNum01.bind(this), 2000 );
      setTimeout( this.showNum02.bind(this), 4500 );
      setTimeout( this.hidePro.bind(this), 8000 );
    },
    wrapWord: function() {
      this.$pro.contents().each(function() {
        if (this.nodeType == 3) {
          $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
        }
      });
    },
    showNum01: function() {
      this.$p1.css({'opacity':1});
      for (var i = 0; i <= this.$p1.children().size() - 1; i++) {
        this.$p1.children('span:eq('+i+')').delay(100*i).fadeIn(300);
      };
    },
    showNum02: function() {
      this.$p2.css({'opacity':1});
      for (var i = 0; i <= this.$p2.children().size() - 1; i++) {
        this.$p2.children('span:eq('+i+')').delay(100*i).fadeIn(300);
      };
    },
    hidePro: function() {
      this.$pro.fadeOut(1000);
      this.showLink(this.animateLink);
    },
    showLink: function(callback) {
      this.$p3.css({
        display: 'block'
      }).animate({
        opacity:1
      },1500);
      setInterval( callback.bind(this), 800);
    },
    animateLink: function() {
      this.$p3.animate({
        marginTop: '-3px'
      }, 700, 'swing').animate({
        marginTop: '3px'
      }, 700, 'swing');
    }
  };



  // list.htmlでのjs
  function List(){
    this.init();
  };
  List.prototype = {
    init: function(){
      this.getParameter();
      this.bindEvent();
    },
    getParameter: function() {
      this.$window = $(window);
      this.$hdrWrapper = $('.hdrWrapper');
      this.$contWrapper = $('.d-cont__innerWrap');
      this.$list = $('.d-cont__list li');
      this.$listImg = $('.d-cont__list li').find('img');
      this.$listHover = $('d-contList__hover');
      this.$height = this.$window.height();
      this.$listHeight = (this.$height / 3);
    },
    bindEvent: function() {
      this.setList();
      this.showList();
      this.$window.on('resize', this.resizeList.bind(this));
      this.$list.on('mouseenter', this.hoverAction.bind(this));
      this.$list.on('mouseleave', this.leaveAction.bind(this));
    },
    setList: function() {
      this.$hdrWrapper.css('height', this.$height + 'px');
      this.$list.css('height', this.$listHeight + 'px');
    },
    showList: function() {
      this.$hdrWrapper.fadeIn(700);
      for(var i = 0; i < this.$list.length; i++){
        this.$list.delay(100).fadeIn();
        this.$list.eq(i).animate({
          'opacity': 1,
          'top': 0
        },1000);
      }
    },
    resizeList: function() {
      this.$hdrWrapper.css('height', this.$height + 'px');
      this.$height = this.$window.height();
      this.$listHeight = (this.$height / 3);
      this.$hdrWrapper.css('height', this.$height + 'px');
      this.$list.css('height', this.$listHeight + 'px');
    },
    hoverAction: function(e) {
      var $target = $(e.currentTarget);
      var index = $target.index();
      $target.find('img').css("-webkit-filter", "grayscale(0)");
      if(index == 7){
        $target.find('img').attr('src', $target.find('img').attr('src').replace('_off', '_on'));
      }
      $target.find('div').children('.d-hoverTtl__en').stop().fadeOut(600);
      $target.find('div').children('.d-hoverTtl__ja').stop().fadeIn(600);
    },
    leaveAction: function(e) {
      var $target = $(e.currentTarget);
      var index = $target.index();
      $target.find('img').css("-webkit-filter", "grayscale(100%)");
      if(index == 7){
        $target.find('img').attr('src', $target.find('img').attr('src').replace('_on', '_off'));
      }
      $target.find('div').children('.d-hoverTtl__en').stop().fadeIn(600);
      $target.find('div').children('.d-hoverTtl__ja').stop().fadeOut(600);
    }
  };

  // detail下層ページでのjs
  function Detail(){
    this.init();
  };
  Detail.prototype = {
    init: function(){
      this.getParameter();
      this.bindEvent();
    },
    getParameter: function() {
      this.$window = $(window);
      this.$ul = $('.d-contMore__slideList');
      this.$list = $('.d-contMore__slideList').find('li');
      this.$slideBtn = $('.d-contMore__slideBtn');
      this.$up = this.$slideBtn.find('.up');
      this.$down = this.$slideBtn.find('.down');
      this.$listHover = $('d-contList__hover');
      this.listHeight = this.$list.height();
      this.listlength = this.$list.length;
      this.listWholeH = (this.$list.length * this.listHeight);
    },
    bindEvent: function() {
      this.setPosition();
      this.matchPic();
      this.$window.on('resize', this.setPosition.bind(this));
      this.$list.on('mouseover', this.hoverSlider.bind(this));
      this.$list.on('mouseleave',this.leaveSlider.bind(this));
      this.$up.on('click', this.slideUp.bind(this));
      this.$down.on('click', this.slideDown.bind(this));
    },
    setPosition: function(){
      this.downHeight = this.$down.height();
      this.$down.css({
        bottom: this.$downHeight + 'px'
      });
    },
     matchPic: function(){
      var _this = this;
      var url = window.location.href;
      var focus;
      for(var i = 0; i < _this.$listlength; i++){
        var link = this.$list.eq(i).find('a').attr('href');
        if(url.match(link)){
          focus = i;
          this.$list.eq(i).find('img').css({ /* ここはaddClassで対応 */
            'cssText': '-webkit-filter: grayscale(0);'
          });
        } else {
          /* removeClass */
        }
      }
    },
    hoverSlider: function(e){
      var $target = $(e.currentTarget);
      $target.find('img').css("-webkit-filter", "grayscale(0)");
      $target.find('div').children('.d-hoverTtl__en').stop().fadeOut(600);
      $target.find('div').children('.d-hoverTtl__ja').stop().fadeIn(600);
    },
    leaveSlider: function(e){
      var $target = $(e.currentTarget);
      $target.find('img').css("-webkit-filter", "grayscale(100%)");
      $target.find('div').children('.d-hoverTtl__en').stop().fadeIn(600);
      $target.find('div').children('.d-hoverTtl__ja').stop().fadeOut(600);
    },
    slideUp: function(){
      var fromTop = this.$list.offset().top - this.$window.scrollTop();
      if(fromTop < 0){
        if(Math.abs(fromTop) > this.listHeight){
          this.$ul.stop().animate({
            top: '+=' + this.listHeight + 'px'
          });
        } else {
          this.$ul.stop().animate({
            top: '+=' + Math.abs(fromTop) + 'px'
          });
        }
      }
    },
    slideDown: function() {
      var fromTop = this.$ul.offset().top - this.$window.scrollTop();
      var withoutUnder = (Math.abs(fromTop)) + this.height;
      var leftList = this.listWholeH - withoutUnder;
      if(withoutUnder < this.listWholeH ){
        if(leftList > this.listHeight){
          this.$ul.stop().animate({
            top: '-=' + this.listHeight + 'px'
          });
        } else {
          this.$ul.stop().animate({
            top: '-=' + leftList + 'px'
          });
        }
      }
    },

    ajaxArtical: function(){
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
            url: '../json/data.json',
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
              url: '../json/data.json',
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

  function Gallery(){
    this.init();
  };

  Gallery.prototype = {
    init: function(){
      this.getParameter();
      this.bindEvent();
    },

    getParameter: function() {
      this.$window = $(window);
      this.winWidth = this.$window.width();
      this.winHeight = this.$window.height();
      this.$gWrap = $('.g-cont__wrapper');
      this.$gImgs = this.$gWrap.find('img');
      this.$gOverLay = $('.g-overlay');
      this.$gLayImg = $('.g-overlay__img');
      this.$modalBtn = $('.g-overlay__btn');
      this.$modalClose = $('.g-modal-close');
      this.$modalImg = $('.modal-img');
    },
    bindEvent: function() {
      this.sortPic();
      this.$window.on('load', this.showPics.bind(this));
      this.$gImgs.on('click', this.showModal.bind(this));
      this.$window.on('resize', this.showModal.bind(this));
      this.$modalClose.on('click', this.closeModal.bind(this));
      this.$modalBtn.find('img').on('click', this.slideModal.bind(this));
    },

    sortPic: function(){
      var _this = this;
      var imgBox = [];
      for(var i = 0; i < 48; i++){
        var num = i + 1;
        this.$gImgs.eq(i).each(function(){
          imgBox.push(num);
        });
      }
      var sort = imgBox.sort(function() {
        return Math.random() - Math.random();
      });
      var j = 0;
      this.$gImgs.each(function() {
        $(this).attr({
          src: '../../img/gallery/photo' + imgBox[j] + '.jpg'
        });
        j++;
      });
    },
    showPics: function() {
      this.$gImgs.animate({
        opacity: 1
      }, 1000);
    },

    showModal: function(e){
      this.crntScrollTop = this.$window.scrollTop();
      this.focusPic = $(e.currentTarget).attr('src');
      this.$gWrap.css({
        position:'fixed',
        top: -1 * this.crntScrollTop
      });
      this.$gOverLay.css({
        width: '100%',
        height: this.$height
      }).fadeIn(1000);
      this.$gLayImg.append('<img class="modal-img" src="' + this.focusPic + '">');
    },
    closeModal: function() {
      this.$gWrap.css({
        position:'initial'
      });
      $('html, body').prop({scrollTop: this.crntScrollTop});

      //function removeModal(){
      //}
      this.$gOverLay.fadeOut(700);
      this.$gLayImg.empty();
    },
    slideModal: function(e) {
      var index = $(e.currentTarget).index();
      var slideWay = this.$modalBtn.find('img').eq(index).attr('class');
      if(slideWay === 'g-next' && !(this.focusPicIndex === 47)){
        this.focusPicIndex += 1;
        this.focusPic = this.$gImgs.eq(this.focusPicIndex).attr('src');
        this.$gLayImg.empty().append('<img class="modal-img" src="' + this.focusPic + '">');
      } else if (slideWay === 'g-prev' && !(this.focusPicIndex === 0)) {
        this.focusPicIndex -= 1;
        this.focusPic = this.$gImgs.eq(this.focusPicIndex).attr('src');
        this.$gLayImg.empty().append('<img class="modal-img" src="' + this.focusPic + '">');
      } else if(slideWay === 'g-next' && this.focusPicIndex === 47){
        this.focusPicIndex = 0;
        this.focusPic = this.$gImgs.eq(this.focusPicIndex).attr('src');
        this.$gLayImg.empty().append('<img class="modal-img" src="' + this.focusPic + '">');
      } else if(slideWay === 'g-prev' && this.focusPicIndex === 0){
        this.focusPicIndex = 47;
        this.focusPic = this.$gImgs.eq(this.focusPicIndex).attr('src');
        this.$gLayImg.empty().append('<img class="modal-img" src="' + this.focusPic + '">');
      }
    }
  };

  App.leagle = Leagle;
  App.top = Top;
  App.list = List;
  App.detail = Detail;
  App.gallery = Gallery;
}());

$(function(){
  var url = window.location.href;
  var file = url.split('/');
  if(file[4] === 'detail.html'){
    location.href = '#background';
  }

  if(!file[4]){
    console.log('This is leagle');
    new App.leagle;
  }else if(url.match('top.html')){
    console.log('This is top');
    new App.top;
  }else if(url.match('gallery.html')){
    console.log('This is gallery');
    new App.gallery;
    new App.list;
    new App.detail;
  }else{
    console.log('This is contents');
    new App.list;
    new App.detail;
  }
});
