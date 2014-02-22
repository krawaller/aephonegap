(function(){CATS.bb.MainView=CATS.bb.BaseView.extend({tagName:"div",className:"main nofocus",template:$("#mainviewtemplate").html(),localizeid:"main",events:{"click .externallink":"externalLink","click .btn-group[data-toggle='buttons-radio']":"radioButtons"},externalLink:function(e){var url;url=$(e.srcElement||e.target||e.currentTarget).attr("linkto");return window.open(url,"_blank","location=yes")},radioButtons:function(e){var btngroup,dataname,hidden,src,val;src=$(e.srcElement||e.target).closest("button");val=src.val();btngroup=src.closest(".btn-group");dataname=btngroup.attr("data-name");hidden=btngroup.prev();hidden.val(val);btngroup.find(".active").removeClass("active");src.addClass("active");return btngroup.trigger("radiobtnselect",{val:val,dataname:dataname})},focusTextField:function(){this.$el.addClass("focusedtext").removeClass("nofocus");return this.ui.buttoncalc.addClass("active")},blurTextField:function(){this.$el.removeClass("focusedtext").addClass("nofocus");return this.ui.buttoncalc.removeClass("active")},initialize:function(o){var me;this.updateDimensionsDo=_.bind(this.updateDimensionsDo,this);this.updateDimensions=_.bind(this.updateDimensions,this);this.updateDimensions();$(window).on("orientationchange",this.updateDimensions);if(window.location.protocol.match("http")||window.location.pathname.match("KungD")){$(window).resize(this.updateDimensions)}this.listenTo(Backbone,"sethideexpl",this.updateHideExpl);this.listenTo(Backbone,"settextreportmode",this.updateTextReport);this.listenTo(Backbone,"focusTextField",this.focusTextField);this.listenTo(Backbone,"blurTextField",this.blurTextField);me=this;this.prepareData(function(){me.render();$("body").prepend(me.el);return setTimeout(function(){return $("body").addClass("loaded")},800)});return this.constructor.__super__.initialize.apply(this,[o])},prepareData:function(callback){var lang,_i,_len,_ref;CATS.math.augmentTooldefsWithDependencies(CATS.math);CATS.math.simplifiers=CATS.math.gatherSimplifiers(CATS.math);CATS.math.decimalifiers=CATS.math.gatherDecimalifiers(CATS.math);CATS.math.desperates=CATS.math.gatherDesperates(CATS.math);CATS.texts.wordIndex={};CATS.texts.toolIndex={};CATS.texts.infoIndex={};console.log("FFS",CATS.texts);CATS.math.count=CATS.texts.totalToolCount();_ref=["sv","en"];for(_i=0,_len=_ref.length;_i<_len;_i++){lang=_ref[_i];CATS.texts.wordIndex[lang]=CATS.texts.makeWordIndex(lang);CATS.texts.toolIndex[lang]=CATS.texts.makeToolIndex(lang);CATS.texts.infoIndex[lang]=CATS.texts.makeInfoIndex(lang)}CATS.texts.generateToolTagIndex();CATS.texts.generateAllToolLists();if(callback){return callback()}},render:function(){this.$el.append((new CATS.bb.LanguageSelectView).render().el);$("#loadscreen").hide();return this.listenTo(Backbone,"setlang",this.render2)},addRoot:function(name,constr,active){var r,v;r=new CATS.bb.RootView;r.rootMe(name);r.$el.addClass("mainnavsection "+name+"section");if(active){r.$el.addClass("active")}v=new constr;r.$el.append(v.render().el);r.bottomview=v;return this.ui.wrapper.append(r.el)},render2:function(){$("#loadscreen").show();this.$el.html(this.template);this.setUI("wrapper","controlpanelsection","homesection","modalsection","leftsection","toursection","parsersection","buttoncalc","calcsection","schoolrootsection","glossarysection","toolboxsection");this.ui.controlpanelsection.append((new CATS.bb.ControlpanelView).render().el);this.addRoot("calc",CATS.bb.ParserView,true);this.addRoot("glossary",CATS.bb.WordIndexView);this.addRoot("toolbox",CATS.bb.ToolIndexView);this.addRoot("schoolroot",CATS.bb.LessonListView);this.addRoot("home",CATS.bb.InfoTabView);$("#loadscreen").hide();this.$el.show();this.updateTextReport();setTimeout(this.updateDimensions,10);return this},doLangTip:function(){console.log("DOing langtip",$(".buttonsettings"));$(".buttonsettings").tooltip({html:true,trigger:"manual",placement:"right",title:this.getText(["ui","main","langtip",CATS.settings.lang],true)});$(".buttonsettings").tooltip("show");return setTimeout(function(){return $(".buttonsettings").tooltip("destroy")},4e3)},updateDimensions:function(){clearTimeout(this.dimtime);return this.dimtime=setTimeout(this.updateDimensionsDo,100)},updateDimensionsDo:function(){var height,min,orientation,size,width;clearTimeout(this.dimtime);height=$(document).height();width=$(document).width();CATS.settings.height=height;CATS.settings.width=width;orientation=height>width?"portrait":"landscape";min=Math.min(height,width);size=width<710||height<390?"phone":"large";$("body").removeClass("phone").removeClass("large").removeClass("portrait").removeClass("landscape").addClass(size).addClass(orientation);CATS.settings.orientation=orientation;CATS.settings.size=size;return console.log("DIMENSIONS",orientation,size,height,width)},updateTextReport:function(){return $("body")[CATS.settings.textreportmode==="yes"?"addClass":"removeClass"]("textreportmode")}})}).call(this);