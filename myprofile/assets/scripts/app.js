"use strict";function Leagle(){this.init()}function Openning(){this.init()}function List(){this.init()}function Detail(){this.init()}function Gallery(){this.init()}function Common(){this.getParamater(),this.bindEvent()}Leagle.prototype={init:function(){this.getParamater(),this.bindEvent()},getParamater:function(){this.$leagleForm=$(".js-leagle-form"),this.$leagleTxt=this.$leagleForm.find("input")},bindEvent:function(){this.$leagleForm.on("submit",this.changePage.bind(this))},changePage:function(i){switch(i.preventDefault(),this.val=this.$leagleTxt.val(),this.val){case"yoshinari takashi":case"Yoshinari Takashi":case"YOSHINARI TAKASHI":case"yoshinaritakashi":case"YoshinariTakashi":case"YOSHINARITAKASHI":case"takashi yoshinari":case"Takashi Yoshinari":case"TAKASHI YOSHINARI":case"takashiyoshinari":case"TakashiYoshinari":case"TAKASHIYOSHINARI":case"吉成敬":case"よしなりたかし":case"ヨシナリタカシ":case"吉成 敬":case"よしなり たかし":case"ヨシナリ タカシ":case"吉成　敬":case"よしなり　たかし":case"ヨシナリ　タカシ":window.location.href="/introduce/myprofile/openning/index.html";break;case"":break;default:window.location.href="https://www.google.co.jp/#q="+this.val}return!1}},Openning.prototype={init:function(){this.getParamater(),this.bindEvent()},getParamater:function(){this.$p1=$(".js-p1"),this.$p2=$(".js-p2"),this.$p3=$(".js-p3"),this.$pro=$(".js-openning-prologue"),this.$link=$(".js-openning-link")},bindEvent:function(){$(window).on("load",this.prologue.bind(this)),setTimeout(this.firstShow.bind(this),2e3),setTimeout(this.secondShow.bind(this),4e3),setTimeout(this.hidePro.bind(this),7500)},prologue:function(){this.$pro.contents().each(function(){3===this.nodeType&&$(this).replaceWith($(this).text().replace(/(\S)/g,"<span>$1</span>"))})},firstShow:function(){this.$p1.css({opacity:1});for(var i=0;i<=this.$p1.children().length-1;i++)this.$p1.children("span:eq("+i+")").delay(100*i).fadeIn(300)},secondShow:function(){this.$p2.css({opacity:1});for(var i=0;i<=this.$p2.children().length-1;i++)this.$p2.children("span:eq("+i+")").delay(100*i).fadeIn(300)},hidePro:function(){this.$pro.fadeOut(1e3),this.showLink()},showLink:function(){this.$p3.css({display:"block"}).animate({opacity:1},1500),this.animeLink()},animeLink:function(){var i=this;setInterval(function(){i.$p3.animate({marginTop:"-5px"},700,"swing").animate({marginTop:"5px"},400,"swing")},800)}},List.prototype={init:function(){this.getParamater(),this.bindEvent()},getParamater:function(){this.$window=$(window),this.$eachList=$(".js-list li")},bindEvent:function(){this.setSize(),this.$window.on("resize",this.setSize.bind(this)),this.$window.on("load",this.showList.bind(this))},setSize:function(){var i=this.$window.height(),t=i/3;this.$eachList.css("height",t+"px")},showList:function(){for(var i=0;i<this.$eachList.length;i++)this.$eachList.delay(100).fadeIn(),this.$eachList.eq(i).animate({opacity:1,top:0},1e3)}},Detail.prototype={init:function(){this.getParamater(),this.bindEvent()},getParamater:function(){this.$window=$(window),this.$body=$("html, body"),this.$sidebarList=$(".js-list"),this.$sidebarListItem=this.$sidebarList.find("li"),this.$listlength=this.$sidebarListItem.length,this.$slideBtn=$(".js-slide-btn a"),this.$downBtn=$(".js-slide-btn .down"),this.$detailContent=$(".js-detail")},bindEvent:function(){this.getData(),this.setPositionDownBtn(),this.$window.on("resize",this.setPositionDownBtn.bind(this)),this.$slideBtn.on("click",this.slideSidebar.bind(this)),this.$window.on("hashchange",this.getData.bind(this))},setPositionDownBtn:function(){this.$height=this.$window.height(),this.$listHeight=this.$sidebarList.height(),this.$downHeight=this.$downBtn.height(),this.$downBtn.css({top:this.$height-this.$downHeight+"px"})},slideSidebar:function(i){i.preventDefault();var t=$(i.currentTarget),s=t.attr("class"),e=this.$sidebarListItem.offset().top-this.$window.scrollTop();if(this.$listItemHeight=this.$sidebarListItem.height(),"up"===s&&e<=0)Math.abs(e)>this.$listItemHeight?this.$sidebarList.stop().animate({top:"+="+this.$listItemHeight+"px"}):this.$sidebarList.stop().animate({top:"+="+Math.abs(e)+"px"});else{this.$listWholeHeight=this.$sidebarListItem.length*this.$listItemHeight;var a=Math.abs(e)+this.$height,n=this.$listWholeHeight-a;a<this.$listWholeHeight&&(n>this.$listItemHeight?this.$sidebarList.stop().animate({top:"-="+this.$listItemHeight+"px"}):this.$sidebarList.stop().animate({top:"-="+n+"px"}))}},matchSlide:function(){var i=this,t=window.location.hash,s=$(".is-active");s.removeClass("is-active");for(var e=0;e<this.$listlength;e++){var a=i.$sidebarListItem.eq(e).find("a").attr("href");t===a?(i.$sidebarListItem.eq(e).css({cssText:"-webkit-filter: grayscale(0);"}).addClass("is-active"),i.$sidebarListItem.eq(e).find(".js-list-en").hide(),i.$sidebarListItem.eq(e).find(".js-list-ja").show()):(i.$sidebarListItem.eq(e).css({cssText:"-webkit-filter: grayscale(100%);"}),i.$sidebarListItem.eq(e).find(".js-list-en").show(),i.$sidebarListItem.eq(e).find(".js-list-ja").hide())}},getData:function(){var i=this,t=window.location.hash.substr(1);$.ajax({url:"/introduce/myprofile/list/detail/data/"+t+".html",type:"GET",dataType:"HTML"}).done(function(t){i.$detailContent.empty().append(t),i.matchSlide(),i.$body.scrollTop(0)}).fail(function(i){console.log("cannot get html data...")})}},Gallery.prototype={init:function(){this.getParamater(),this.bindEvent()},getParamater:function(){this.$window=$(window),this.$body=$("body"),this.$galleryWrap=$(".p-gallery__wrapper"),this.$galleryImages=this.$galleryWrap.find("img"),this.$galleryImageLink=this.$galleryWrap.find("a"),this.$modalWrap=$(".p-modal"),this.$modalImage=$(".p-modal__image"),this.$modalBtn=$(".p-modal__btn"),this.$modalClose=$(".p-modal__close"),this.arrayOfImages=[],this.focusPicIndex=0},bindEvent:function(){this.randomPhotos(),this.$window.on("load",this.showPhotos.bind(this)),this.$galleryImageLink.on("click",this.showModal.bind(this)),this.$modalClose.on("click",this.closeModal.bind(this)),this.$modalBtn.on("click",this.slideModal.bind(this))},randomPhotos:function(){for(var i=this,t=this.$galleryImages.length,s=0,e=0;e<t;e++){var a=this.$galleryImages.eq(e).attr("src");this.arrayOfImages.push(a)}for(var n=t-1;n>0;n--){var h=Math.floor(Math.random()*(n+1)),o=this.arrayOfImages[n];this.arrayOfImages[n]=this.arrayOfImages[h],this.arrayOfImages[h]=o}this.$galleryImages.each(function(){i.$galleryImages.eq(s).attr({src:i.arrayOfImages[s]}),s++})},showPhotos:function(){this.$galleryImages.animate({opacity:1},1e3)},showModal:function(i){i.preventDefault();var t=$(i.currentTarget),s=t.find("img").attr("src");this.$body.addClass("modal-open"),this.$modalWrap.css({width:"100%",height:"100%"}).fadeIn(700),this.$modalImage.append('<img alt="" src="'+s+'">'),this.focusPicIndex=this.arrayOfImages.indexOf(s)},closeModal:function(i){i.preventDefault();var t=this,s=this.$window.scrollTop();this.$modalWrap.fadeOut(1e3,function(){t.$modalImage.empty()}),this.$body.removeClass("modal-open"),$("html, body").prop({scrollTop:s})},slideModal:function(i){i.preventDefault();var t=$(i.currentTarget),s=t.data("direction");"next"===s&&47!==this.focusPicIndex?this.focusPicIndex+=1:"prev"===s&&0!==this.focusPicIndex?this.focusPicIndex-=1:"next"===s&&47===this.focusPicIndex?this.focusPicIndex=0:"prev"===s&&0===this.focusPicIndex&&(this.focusPicIndex=47),this.$modalImage.empty().append('<img class="modal-img" src="'+this.arrayOfImages[this.focusPicIndex]+'">').hide().fadeIn()}},Common.prototype={getParamater:function(){this.$window=$(window),this.$header=$(".js-header"),this.$eachList=$(".js-list li")},bindEvent:function(){this.setHeader(),this.$window.on("resize",this.setHeader.bind(this)),this.$eachList.hover(this.hoverAction.bind(this,!0),this.hoverAction.bind(this,!1))},setHeader:function(){this.$width=this.$window.width(),this.$height=this.$window.height(),this.$header.css("height",this.$height+"px").fadeIn(700)},hoverAction:function(i,t){if(i){var s=$(t.currentTarget).not(".is-active");s.css("-webkit-filter","grayscale(0)"),s.find(".js-list-en").stop().fadeOut(600),s.find(".js-list-ja").stop().fadeIn(600)}else s=$(t.currentTarget).not(".is-active"),s.css("-webkit-filter","grayscale(100%)"),s.find(".js-list-en").stop().fadeIn(600),s.find(".js-list-ja").stop().fadeOut(600)}},$(function(){var i=window.location.href,t=window.location.hash,s=i.split("/");"detail"===s[6]&&""===t&&(window.location.href="#background");var e=!s.includes("openning")&&!s.includes("list")&&!s.includes("gallery"),a=s.includes("openning"),n=s.includes("list")&&!s.includes("detail"),h=s.includes("list")&&s.includes("detail"),o=s.includes("gallery");if(e){new Leagle}else if(a){new Openning}else if(n){new List}else if(h){new Detail}else if(o){new Gallery}new Common});