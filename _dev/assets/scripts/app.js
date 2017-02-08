'use strict';

/**
 *     /myprofile/index.htmlでのjs   (Leagle)
 **/
function Leagle(){
  this.init();
};
Leagle.prototype = {
  init: function(){
    this.getParamater();
    this.bindEvent();
  },
  getParamater: function() {
    this.$leagleForm = $('.js-leagle-form');
    this.$leagleTxt = this.$leagleForm.find('input');
  },
  bindEvent: function() {
    this.$leagleForm.on('submit', this.changePage.bind(this));
  },
  changePage: function(e) {
    e.preventDefault();
    this.val = this.$leagleTxt.val();
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

/**
 *     /myprofile/openning/index.htmlでのjs
 **/
function Openning(){
  this.init();
};
Openning.prototype = {
  init: function(){
    this.getParamater();
    this.bindEvent();
  },
  getParamater: function() {
    this.$p1 = $('.js-p1');
    this.$p2 = $('.js-p2');
    this.$p3 = $('.js-p3');
    this.$pro = $('.js-openning-prologue');
    this.$link = $('.js-openning-link');
  },
  bindEvent: function() {
    $(window).on('load', this.prologue.bind(this));
    setTimeout(this.firstShow.bind(this), 2000);
    setTimeout(this.secondShow.bind(this), 4000);
    setTimeout(this.hidePro.bind(this), 7500);
  },
  prologue: function() {
    this.$pro.contents().each(function(){
      if (this.nodeType === 3) {
        $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
      }
    });
  },
  firstShow: function() {
    this.$p1.css({'opacity':1});
    for (var i = 0; i <= this.$p1.children().length - 1; i++) {
      this.$p1.children('span:eq('+i+')').delay(100*i).fadeIn(300);
    };
  },
  secondShow: function() {
    this.$p2.css({'opacity':1});
    for (var i = 0; i <= this.$p2.children().length - 1; i++) {
      this.$p2.children('span:eq('+i+')').delay(100*i).fadeIn(300);
    };
  },
  hidePro: function() {
    this.$pro.fadeOut(1000);
    this.showLink();
  },
  showLink: function() {
    this.$p3.css({
      display: 'block'
    }).animate({
      opacity:1
    },1500);
    this.animeLink();
  },
  animeLink: function() {
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

/**
 *     /myprofile/list/index.htmlでのjs
 **/
function List(){
  this.init();
};
List.prototype = {
  init: function() {
    this.getParamater();
    this.bindEvent();
  },
  getParamater: function() {
    this.$window = $(window);
    this.$eachList = $('.js-list li');
  },
  bindEvent: function() {
    this.setSize();
    this.$window.on('resize', this.setSize.bind(this));
    this.$window.on('load', this.showList.bind(this));
  },
  setSize: function() {
    var height = this.$window.height();
    var listHeight = (height / 3);
    this.$eachList.css('height', listHeight + 'px');
  },
  showList: function() {
    for(var i = 0; i < this.$eachList.length; i++){
      this.$eachList.delay(100).fadeIn();
      this.$eachList.eq(i).animate({
        'opacity': 1,
        'top': 0
      },1000);
    }
  }
};

/**
 *     /myprofile/list/detail/index.htmlでのjs
 **/
function Detail(){
  this.init();
};
Detail.prototype = {
  init: function() {
    this.getParamater();
    this.bindEvent();
  },
  getParamater: function() {
    this.$window = $(window);
    this.$sidebarList = $('.js-list');
    this.$sidebarListItem = this.$sidebarList.find('li');
    this.$listlength = this.$sidebarListItem.length;
    this.$slideBtn = $('.js-slide-btn a');
    this.$downBtn = $('.js-slide-btn .down');
    this.$detailContent = $('.js-detail');
  },
  bindEvent: function(){
    this.getData();
    this.setPositionDownBtn();
    this.$window.on('resize', this.setPositionDownBtn.bind(this));
    this.$slideBtn.on('click', this.slideSidebar.bind(this));
    this.$window.on('hashchange', this.getData.bind(this));
  },
  setPositionDownBtn: function(){
    this.$height = this.$window.height();
    this.$listHeight = this.$sidebarList.height();
    this.$downHeight = this.$downBtn.height();
    this.$downBtn.css({
      top: (this.$height - this.$downHeight) + 'px'
    });
  },
  slideSidebar: function(e){
    e.preventDefault();
    var $target = $(e.currentTarget),
        flg = $target.attr('class'),
        fromTop = this.$sidebarListItem.offset().top - this.$window.scrollTop();
    this.$listItemHeight = this.$sidebarListItem.height();
    if (flg === 'up' && fromTop <= 0) {
      if (Math.abs(fromTop) > this.$listItemHeight){
        this.$sidebarList.stop().animate({
          top: '+=' + this.$listItemHeight + 'px'
        });
      } else {
        this.$sidebarList.stop().animate({
          top: '+=' + Math.abs(fromTop) + 'px'
        });
      }
    } else {
      this.$listWholeHeight = (this.$sidebarListItem.length * this.$listItemHeight);
      var withoutUnder = (Math.abs(fromTop)) + this.$height;
      var leftList = this.$listWholeHeight - withoutUnder;
      if (withoutUnder < this.$listWholeHeight){
        if (leftList > this.$listItemHeight){
          this.$sidebarList.stop().animate({
            top: '-=' + this.$listItemHeight + 'px'
          });
        } else {
          this.$sidebarList.stop().animate({
            top: '-=' + leftList + 'px'
          });
        }
      }
    }
  },
  matchSlide: function(){
    var _this = this,
        hash = window.location.hash,
        $active = $('.is-active');
    $active.removeClass('is-active');
    for(var i = 0; i < this.$listlength; i++){
      var link = _this.$sidebarListItem.eq(i).find('a').attr('href');
      if (hash === link){
        _this.$sidebarListItem.eq(i).css({
          'cssText': '-webkit-filter: grayscale(0);'
        }).addClass('is-active');
        _this.$sidebarListItem.eq(i).find('.js-list-en').hide();
        _this.$sidebarListItem.eq(i).find('.js-list-ja').show();
      } else {
        _this.$sidebarListItem.eq(i).css({
          'cssText': '-webkit-filter: grayscale(100%);'
        });
        _this.$sidebarListItem.eq(i).find('.js-list-en').show();
        _this.$sidebarListItem.eq(i).find('.js-list-ja').hide();
      }
    }
  },
  getData: function(){
    var _this = this,
        hash = window.location.hash.substr(1);
    $.ajax({
      url: '/introduce/myprofile/list/detail/data/' + hash + '.html',
      type: 'GET',
      dataType: 'HTML'
    }).done(function(data){
      _this.$detailContent.empty().append(data);
      _this.matchSlide();
    }).fail(function(data){
      console.log('cannot get html data...');
    });
  }
};

/**
 *     /myprofile/gallery/index.htmlでのjs
 **/
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
    this.arrayOfImages = [];
    this.focusPicIndex = 0;
  },
  bindEvent: function() {
    this.randomPhotos();
    this.$window.on('load', this.showPhotos.bind(this));
    this.$galleryImageLink.on('click', this.showModal.bind(this));
    this.$modalClose.on('click', this.closeModal.bind(this));
    this.$modalBtn.on('click', this.slideModal.bind(this));
  },
  randomPhotos: function(){
    var _this = this,
        lengthOfImages = this.$galleryImages.length,
        i = 0;
    for(var index = 0; index < lengthOfImages; index++){
      var src = this.$galleryImages.eq(index).attr('src');
      this.arrayOfImages.push(src);
    }
    for(var sortIndex = lengthOfImages - 1; sortIndex > 0; sortIndex--) {
      var sortedIndex = Math.floor(Math.random() * (sortIndex + 1));
      var sortedImage = this.arrayOfImages[sortIndex];
      this.arrayOfImages[sortIndex] = this.arrayOfImages[sortedIndex];
      this.arrayOfImages[sortedIndex] = sortedImage;
    }
    this.$galleryImages.each(function() {
      _this.$galleryImages.eq(i).attr({
        src: _this.arrayOfImages[i]
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
    this.$modalWrap.css({ width: '100%', height: '100%' }).fadeIn(700);
    this.$modalImage.append('<img alt="" src="' + src + '">');
    this.focusPicIndex = this.arrayOfImages.indexOf(src);
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
    if (direction === 'next' && !(this.focusPicIndex === 47)){
      this.focusPicIndex += 1;
    } else if (direction === 'prev' && !(this.focusPicIndex === 0)) {
      this.focusPicIndex -= 1;
    } else if (direction === 'next' && this.focusPicIndex === 47){
      this.focusPicIndex = 0;
    } else if (direction === 'prev' && this.focusPicIndex === 0){
      this.focusPicIndex = 47;
    }
    this.$modalImage.empty().append('<img class="modal-img" src="' + this.arrayOfImages[this.focusPicIndex] + '">').hide().fadeIn();
  }
};


/**
 *     共通のjs
 **/
function Common(){
  this.getParamater();
  this.bindEvent();
};
Common.prototype = {
  getParamater: function() {
    this.$window = $(window);
    this.$header = $('.js-header');
    this.$eachList = $('.js-list li');
  },
  bindEvent: function() {
    this.setHeader();
    this.$window.on('resize', this.setHeader.bind(this));
    this.$eachList.hover(this.hoverAction.bind(this, true), this.hoverAction.bind(this, false));
  },
  setHeader: function() {
    this.$width = this.$window.width();
    this.$height = this.$window.height();
    this.$header.css('height', this.$height + 'px').fadeIn(700);
  },
  hoverAction: function(isEnter, e){
    if (isEnter) {
      var $target = $(e.currentTarget).not('.is-active');
      $target.css("-webkit-filter", "grayscale(0)");
      $target.find('.js-list-en').stop().fadeOut(600);
      $target.find('.js-list-ja').stop().fadeIn(600);
    } else {
      $target = $(e.currentTarget).not('.is-active');
      $target.css("-webkit-filter", "grayscale(100%)");
      $target.find('.js-list-en').stop().fadeIn(600);
      $target.find('.js-list-ja').stop().fadeOut(600);
    }
  }
};



$(function(){
  var url = window.location.href,
      hash = window.location.hash,
      file = url.split('/');
  if (file[6] === 'detail' && hash === ''){
    window.location.href = '#background';
  }
  var flgLeagle = !file.includes('openning') && !file.includes('list') && !file.includes('gallery'),
      flgOpenning = file.includes('openning'),
      flgList = file.includes('list') && !file.includes('detail'),
      flgDetail = file.includes('list') && file.includes('detail'),
      flgGallery = file.includes('gallery');

  if (flgLeagle) {
    var leagle = new Leagle();
  } else if (flgOpenning) {
    var openning = new Openning();
  } else if (flgList) {
    var list = new List();
  } else if (flgDetail) {
    var detail = new Detail();
  } else if (flgGallery) {
    var gallery = new Gallery();
  }
  var common = new Common();
});
