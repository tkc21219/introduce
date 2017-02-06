"use strict";function Leagle(){this.init()}function Openning(){this.init()}function List(){this.init()}function Detail(){this.init()}function Gallery(){this.init()}function Common(){this.getParamater(),this.bindEvent()}Leagle.prototype={init:function(){this.getParamater(),this.bindEvent()},getParamater:function(){this.$leagleForm=$(".js-leagle-form"),this.$leagleTxt=this.$leagleForm.find("input")},bindEvent:function(){this.$leagleForm.on("submit",this.changePage.bind(this))},changePage:function(){switch(this.val=this.$leagleTxt.val(),this.val){case"yoshinari takashi":case"Yoshinari Takashi":case"YOSHINARI TAKASHI":case"yoshinaritakashi":case"YoshinariTakashi":case"YOSHINARITAKASHI":case"takashi yoshinari":case"Takashi Yoshinari":case"TAKASHI YOSHINARI":case"takashiyoshinari":case"TakashiYoshinari":case"TAKASHIYOSHINARI":case"吉成敬":case"よしなりたかし":case"ヨシナリタカシ":case"吉成 敬":case"よしなり たかし":case"ヨシナリ タカシ":case"吉成　敬":case"よしなり　たかし":case"ヨシナリ　タカシ":window.location.href="/introduce/myprofile/openning/index.html";break;case"":break;default:window.location.href="https://www.google.co.jp/#q="+this.val}return!1}},Openning.prototype={init:function(){this.getParamater(),this.bindEvent()},getParamater:function(){this.$p1=$(".js-p1"),this.$p2=$(".js-p2"),this.$p3=$(".js-p3"),this.$pro=$(".js-openning-prologue"),this.$link=$(".js-openning-link")},bindEvent:function(){$(window).on("load",this.prologue.bind(this)),setTimeout(this.firstShow.bind(this),2e3),setTimeout(this.secondShow.bind(this),4500),setTimeout(this.hidePro.bind(this),8e3)},prologue:function(){this.$pro.contents().each(function(){3===this.nodeType&&$(this).replaceWith($(this).text().replace(/(\S)/g,"<span>$1</span>"))})},firstShow:function(){this.$p1.css({opacity:1});for(var t=0;t<=this.$p1.children().length-1;t++)this.$p1.children("span:eq("+t+")").delay(100*t).fadeIn(300)},secondShow:function(){this.$p2.css({opacity:1});for(var t=0;t<=this.$p2.children().length-1;t++)this.$p2.children("span:eq("+t+")").delay(100*t).fadeIn(300)},hidePro:function(){this.$pro.fadeOut(1e3),this.showLink()},showLink:function(){this.$p3.css({display:"block"}).animate({opacity:1},1500),this.animeLink()},animeLink:function(){var t=this;setInterval(function(){t.$p3.animate({marginTop:"-5px"},700,"swing").animate({marginTop:"5px"},400,"swing")},800)}},List.prototype={init:function(){this.getParamater(),this.bindEvent()},getParamater:function(){this.$window=$(window),this.$eachList=$(".js-list li")},bindEvent:function(){this.setSize(),this.$window.on("resize",this.setSize.bind(this)),this.$window.on("load",this.showList.bind(this))},setSize:function(){var t=this.$window.height(),i=t/3;this.$eachList.css("height",i+"px")},showList:function(){for(var t=0;t<this.$eachList.length;t++)this.$eachList.delay(100).fadeIn(),this.$eachList.eq(t).animate({opacity:1,top:0},1e3)}},Detail.prototype={init:function(){this.getParamater(),this.bindEvent()},getParamater:function(){this.$ul=$(".p-detailSlide__list"),this.$list=$(".p-detailSlide__list li"),this.$listlength=this.$list.length,this.$slideBtn=$(".p-detailSlide__btn"),this.$up=this.$slideBtn.find(".up"),this.$down=this.$slideBtn.find(".down"),this.$detailContent=$(".js-detail"),this.data=""},bindEvent:function(){this.setPositionDownBtn(),$(window).on("resize",this.setPositionDownBtn.bind(this)),this.$up.on("click",this.slideUp.bind(this)),this.$down.on("click",this.slideDown.bind(this)),this.matchSlide(),this.getData(),$(window).on("hashchange",this.getData.bind(this))},setPositionDownBtn:function(){this.$height=$(window).height(),this.$listHeight=this.$list.height(),this.$downHeight=this.$down.height(),this.$down.css({top:this.$height-this.$downHeight+"px"})},slideUp:function(t){t.preventDefault(),this.$height=$(window).height(),this.$listHeight=this.$list.height();var i=this.$list.offset().top-$(window).scrollTop();i<0&&(Math.abs(i)>this.$listHeight?this.$ul.stop().animate({top:"+="+this.$listHeight+"px"}):this.$ul.stop().animate({top:"+="+Math.abs(i)+"px"}))},slideDown:function(t){t.preventDefault(),this.$height=$(window).height(),this.$listHeight=this.$list.height(),this.$listWholeH=this.$list.length*this.$listHeight;var i=this.$ul.offset().top-$(window).scrollTop(),s=Math.abs(i)+this.$height,e=this.$listWholeH-s;s<this.$listWholeH&&(e>this.$listHeight?this.$ul.stop().animate({top:"-="+this.$listHeight+"px"}):this.$ul.stop().animate({top:"-="+e+"px"}))},matchSlide:function(){for(var t,i=this,s=window.location.href,e=0;e<this.$listlength;e++){var n=i.$list.eq(e).find("a").attr("href");s.match(n)&&(i.$list.eq(e).find("img").css({cssText:"-webkit-filter: grayscale(0);"}),t=e)}this.$list.on("mouseout",function(){i.$list.eq(t).find("img").css("-webkit-filter","grayscale(0)")})},getData:function(){var t=this,i=window.location.hash.substr(1);$.ajax({url:"/introduce/myprofile/list/detail/data/"+i+".html",type:"GET",dataType:"HTML"}).done(function(i){t.$detailContent.empty().append(i)}).fail(function(t){console.log("cannot get html data...")})}},Gallery.prototype={init:function(){this.getParamater(),this.bindEvent()},getParamater:function(){this.$window=$(window),this.$body=$("body"),this.$galleryWrap=$(".p-gallery__wrapper"),this.$galleryImages=this.$galleryWrap.find("img"),this.$galleryImageLink=this.$galleryWrap.find("a"),this.$modalWrap=$(".p-modal"),this.$modalImage=$(".p-modal__image"),this.$modalBtn=$(".p-modal__btn"),this.$modalClose=$(".p-modal__close")},bindEvent:function(){this.sortPhotos(),this.$window.on("load",this.showPhotos.bind(this)),this.$galleryImageLink.on("click",this.showModal.bind(this)),this.$modalClose.on("click",this.closeModal.bind(this)),this.$modalBtn.on("click",this.slideModal.bind(this))},sortPhotos:function(){for(var t=this,i=this.$galleryImages.length,s=[],e=0,n=0;n<i;n++){var a=n+1;this.$galleryImages.eq(n).each(function(){s.push(a)})}for(var h=i-1;h>0;h--){var o=Math.floor(Math.random()*(h+1)),l=s[h];s[h]=s[o],s[o]=l}this.$galleryImages.each(function(){t.$galleryImages.eq(e).attr({src:"/introduce/myprofile/assets/images/gallery/photo"+s[e]+".jpg"}),e++})},showPhotos:function(){this.$galleryImages.animate({opacity:1},1e3)},showModal:function(t){t.preventDefault();var i=$(t.currentTarget),s=i.find("img").attr("src");this.$body.addClass("modal-open"),this.$modalWrap.css({width:"100%",height:"100%"}).fadeIn(1e3),this.$modalImage.append('<img class="modal-img" src="'+s+'">')},closeModal:function(t){t.preventDefault();var i=this,s=this.$window.scrollTop();this.$modalWrap.fadeOut(1e3,function(){i.$modalImage.empty()}),this.$body.removeClass("modal-open"),$("html, body").prop({scrollTop:s})},slideModal:function(t){t.preventDefault();var i=$(t.currentTarget),s=i.data("direction");console.log(s)}},Common.prototype={getParamater:function(){this.$window=$(window),this.$header=$(".js-header"),this.$eachList=$(".js-list li")},bindEvent:function(){this.setHeader(),this.$eachList.hover(this.hoverAction.bind(this,!0),this.hoverAction.bind(this,!1)),this.$window.on("resize",this.setHeader.bind(this))},setHeader:function(){this.$width=this.$window.width(),this.$height=this.$window.height(),this.$header.css("height",this.$height+"px").fadeIn(700)},hoverAction:function(t,i){if(t){var s=$(i.currentTarget);s.css("-webkit-filter","grayscale(0)"),s.find(".js-list-en").stop().fadeOut(600),s.find(".js-list-ja").stop().fadeIn(600)}else s=$(i.currentTarget),s.css("-webkit-filter","grayscale(100%)"),s.find(".js-list-en").stop().fadeIn(600),s.find(".js-list-ja").stop().fadeOut(600)}},$(function(){var t=window.location.href,i=t.split("/");"detail"===i[6]&&(window.location.href="#background");new Leagle,new Openning,new List,new Detail,new Gallery,new Common});