'use strict';

// index.htmlでのjs
function Leagle(){
  this.$leagleForm = $('.js-leagle-form');
  this.$leagleTxt = this.$leagleForm.find('input');
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
      window.location.href = '/introduce/myprofile/openning/index.html';
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
  this.$p1 = $('.js-p1');
  this.$p2 = $('.js-p2');
  this.$p3 = $('.js-p3');
  this.$pro = $('.js-openning-prologue');
  this.$link = $('.js-openning-link');
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
  this.$header = $('.header');
  this.$eachList = $('.js-list li');
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
    this.$header.css('height', this.$height + 'px');
    this.$eachList.css('height', this.$listHeight + 'px');
  },
  showList: function(){
    this.$header.fadeIn(700);
    for(var i = 0; i < this.$eachList.length; i++){
      this.$eachList.delay(100).fadeIn();
      this.$eachList.eq(i).animate({
        'opacity': 1,
        'top': 0
      },1000);
    }
  },
  hoverAction: function(){
    var _this = this;
    this.$eachList.on({
      'mouseenter': function(){
        var index = _this.$eachList.index(this);
        _this.$eachList.eq(index).css("-webkit-filter", "grayscale(0)");
        _this.$eachList.eq(index).find('.js-list-en').stop().fadeOut(600);
        _this.$eachList.eq(index).find('.js-list-ja').stop().fadeIn(600);
      },
      'mouseleave': function(){
        var index = _this.$eachList.index(this);
        _this.$eachList.eq(index).css("-webkit-filter", "grayscale(100%)");
        _this.$eachList.eq(index).find('.js-list-en').stop().fadeIn(600);
        _this.$eachList.eq(index).find('.js-list-ja').stop().fadeOut(600);
      }
    });
  }
};

// detail下層ページでのjs
function Detail(){
  this.init();
};
Detail.prototype = {
  init: function() {
    this.getParamater();
    this.bindEvent();
  },
  getParamater: function() {
    this.$ul = $('.p-detailSlide__list');
    this.$list = $('.p-detailSlide__list li');
    this.$listlength = this.$list.length;
    this.$slideBtn = $('.p-detailSlide__btn');
    this.$up = this.$slideBtn.find('.up');
    this.$down = this.$slideBtn.find('.down');
    this.data = '';
  },
  bindEvent: function(){
    this.setPositionDownBtn();
    $(window).on('resize', this.setPositionDownBtn.bind(this));
    this.hoverSlide();
    this.$up.on('click', this.slideUp.bind(this));
    this.$down.on('click', this.slideDown.bind(this));
    this.matchSlide();
    this.getData();
  },
  setPositionDownBtn: function(){
    this.$height = $(window).height();
    this.$listHeight = this.$list.height();
    this.$downHeight = this.$down.height();
    this.$down.css({
      top: (this.$height - this.$downHeight) + 'px'
    });
  },
  hoverSlide: function(){
    var _this = this;
    this.$list.on({
      'mouseenter': function(e){
        var $target = $(e.currentTarget);
        $target.find('img').css("-webkit-filter", "grayscale(0)");
        $target.find('.js-list-en').stop().fadeOut(600);
        $target.find('.js-list-ja').stop().fadeIn(600);
      },
      'mouseleave': function(e){
        var $target = $(e.currentTarget);
        $target.find('img').css("-webkit-filter", "grayscale(100%)");
        $target.find('.js-list-en').stop().fadeIn(600);
        $target.find('.js-list-ja').stop().fadeOut(600);
      }
    });
  },
  slideUp: function(e){
    e.preventDefault();
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
  slideDown: function(e){
    e.preventDefault();
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
    for(var i = 0; i < this.$listlength; i++){
      var link = _this.$list.eq(i).find('a').attr('href');
      if(url.match(link)){
        _this.$list.eq(i).find('img').css({
          'cssText': '-webkit-filter: grayscale(0);'
        });
        focus = i;
      }
    }
    this.$list.on('mouseout', function(){
      _this.$list.eq(focus).find('img').css("-webkit-filter", "grayscale(0)");
    });
  },
  getData: function(){
    var _this = this;
    var hash = window.location.hash;
    var hashArrey = ["#background", "#oversea", "#skill", "#sports", "#game", "#tv-movie", "#book" ,"#mygirl", "#future"];
    $.ajax({
      url: '/introduce/myprofile/assets/json/data.json',
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data){
      _this.data = data;
      _this.showContents(_this.data);
    }).fail(function(data){
      console.log('fail!!');
    });
  },
  showContents: function(data) {
    $.each(data, function() {
      console.log(this);
    });
  }
};

// gallery.htmlでのjs
function Gallery(){
  this.init();
};
Gallery.prototype = {
  init: function(){
    this.getParamater();
    this.bindEvent();
  },
  getParamater: function()  {
    this.$window = $(window);
    this.$body = $('body');
    this.$galleryWrap = $('.p-gallery__wrapper');
    this.$galleryImages = this.$galleryWrap.find('img');
    this.$galleryImageLink = this.$galleryWrap.find('a');
    this.$modalWrap = $('.p-modal');
    this.$modalImage = $('.p-modal__image');
    this.$modalBtn = $('.p-modal__btn');
    this.$modalClose = $('.p-modal__close');
  },
  bindEvent: function() {
    this.sortPhotos();
    this.$window.on('load', this.showPhotos.bind(this));
    this.$galleryImageLink.on('click', this.showModal.bind(this));
    this.$modalClose.on('click', this.closeModal.bind(this));
    this.$modalBtn.on('click', this.slideModal.bind(this));
  },
  sortPhotos: function(){
    var _this = this,
        lengthOfImages = this.$galleryImages.length,
        arrayOfImages = [],
        i = 0;
    for(var index = 0; index < lengthOfImages; index++){
      var num = index + 1;
      this.$galleryImages.eq(index).each(function(){
        arrayOfImages.push(num);
      });
    }
    for(var sortIndex = lengthOfImages - 1; sortIndex > 0; sortIndex--) {
      var sortedIndex = Math.floor(Math.random() * (sortIndex + 1));
      var tmp = arrayOfImages[sortIndex];
      arrayOfImages[sortIndex] = arrayOfImages[sortedIndex];
      arrayOfImages[sortedIndex] = tmp;
    }
    this.$galleryImages.each(function() {
      _this.$galleryImages.eq(i).attr({
        src: '/introduce/myprofile/assets/images/gallery/photo' + arrayOfImages[i] + '.jpg'
      });
      i++;
    });
  },
  showPhotos: function() {
    this.$galleryImages.animate({
        opacity: 1
      }, 1000);
  },
  showModal: function(e){
    e.preventDefault();
    var $target = $(e.currentTarget),
        src = $target.find('img').attr('src');
    this.$body.addClass('modal-open');
    this.$modalWrap.css({ width: '100%', height: '100%' }).fadeIn(1000);
    this.$modalImage.append('<img class="modal-img" src="' + src + '">');
  },
  closeModal: function(e) {
    e.preventDefault();
    var _this = this,
        currentScrollTop = this.$window.scrollTop();
    this.$modalWrap.fadeOut(1000, function() {
      _this.$modalImage.empty();
    });
    this.$body.removeClass('modal-open');
    $('html, body').prop({ scrollTop: currentScrollTop });
  },
  slideModal: function(e) {
    e.preventDefault();
    var $target = $(e.currentTarget),
        direction = $target.data('direction');
    console.log(direction);
    //   if(className === 'g-next' && !(focusPicIndex === 47)){
    //     focusPicIndex += 1;
    //     focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
    //     _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
    //   } else if (className === 'g-prev' && !(focusPicIndex === 0)) {
    //     focusPicIndex -= 1;
    //     focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
    //     _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
    //   } else if(className === 'g-next' && focusPicIndex === 47){
    //     focusPicIndex = 0;
    //     focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
    //     _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
    //   } else if(className === 'g-prev' && focusPicIndex === 0){
    //     focusPicIndex = 47;
    //     focusPic =_this.$gImgs.eq(focusPicIndex).attr('src');
    //     _this.$gLayImg.empty().append('<img class="modal-img" src="'+focusPic+'">');
    //   }
  }
};


$(function(){
  var url = window.location.href;
  var file = url.split('/');
  if(file[6] === 'detail'){
    window.location.href = '#background';
  }

  var leagle = new Leagle();
  var top = new Top();
  var list = new List();
  var detail = new Detail();
  var gallery = new Gallery();
});
