(function(){CATS.bb.MasterSequenceView=CATS.bb.BaseView.extend({master:true,className:"sequence absbox finishedloading master",template:$("#mastersequenceviewtemplate").html(),localizeid:"mastersequence",events:{"click .decbutton":"showDec","click .backtosimplbutton":"back"},back:function(){return this.trigger("sequenceback")},passOnTop:function(){return this.trigger("sequencetop")},passOnZoom:function(view,path){return this.trigger("zoom",view,path)},passOnNewSequenceView:function(view){return this.trigger("newsequenceview",view)},initialize:function(o,dec,isdec){this.o=o;this.dec=dec;this.isdec=isdec;return this.constructor.__super__.initialize.apply(this,[o])},localizeSpecial:function(){var intro,_ref;this.ui.firstresultheadline.setText(["ui","mastersequence",this.because+"headlinetop",CATS.settings.lang]);this.ui.substepsheadline.setText(["ui","mastersequence",this.because+"headlinesteps",CATS.settings.lang]);intro=this.why+"intro"+(!this.o.steps?"none":this.o.steps.length===1?"single":"multiple");return this.ui.substepsintro.html(this.getText(["ui","mastersequence",intro,CATS.settings.lang]).replace("%s",CATS.texts.numberStr((_ref=this.o.steps)!=null?_ref.length:void 0,CATS.settings.lang)))},showDec:function(e){return this.trigger("zoom",this.decview)},render:function(){var allsteps,firstopbtn,firstophead,firstopview,me,_ref;this.$el.html(this.template);this.setUI("loadindicator","substepsintro","startcontainer","firstresult","firstresultheadline","firstresultcontainer","substeps","substepsheadline","substepslist");this.ui.loadindicator.html(this.getLoadingHTML());allsteps=[this.o].concat(this.o.steps||[]);firstopbtn=this.isdec?"backtosimplbutton":this.dec?"decbutton":false;this.why=(_ref=this.o.who)==="simplifier"||_ref==="decimalifier"?this.o.who:"example";firstophead="headline"+this.why;firstopview=new CATS.bb.OperationView(allsteps[0],0,[],firstopbtn,this.o.who,[],firstophead);console.log("GADDÄMMIT",this.o.who);this.views=[firstopview];this.ui.firstresultcontainer.append(firstopview.render().el);me=this;this.because=this.o.because;this.typeset(this.ui.firstresult.get(0),_.bind(function(){var n,opview,step,_i,_len,_ref1;if(allsteps.length>1||this.dec){if(this.dec){console.log("WOO DECVIEW!");this.decview=new CATS.bb.MasterSequenceView(this.dec,void 0,true);this.listenTo(this.decview,"sequenceback",this.back);this.listenTo(this.decview,"sequencetop",this.passOnTop);this.listenTo(this.decview,"sequencetop",this.passOnZoom);this.listenTo(this.decview,"newsequenceview",this.passOnNewSequenceView);this.decview.render().$el.addClass("sequencehiddenright");this.trigger("newsequenceview",this.decview);this.views.push(this.decview)}else{console.log("NOPE there was NO dec")}this.ui.loadindicator.removeClass("hidden");this.ui.startcontainer.html(CATS.app.mathmlprinter(this.o.before,[],[],true,CATS.settings,true));_ref1=allsteps.slice(1);for(n=_i=0,_len=_ref1.length;_i<_len;n=++_i){step=_ref1[n];opview=new CATS.bb.OperationView(step,n+1,[],false,this.o.who,[]);this.listenTo(opview,"sequenceback",this.back);this.listenTo(opview,"sequencetop",this.passOnTop);this.listenTo(opview,"zoom",this.passOnZoom);this.listenTo(opview,"newsequenceview",this.passOnNewSequenceView);this.views.push(opview);this.ui.substepslist.append(opview.render(true).$el.addClass("substep"));if(n<allsteps.length-2){this.ui.substepslist.append($("<div class='opbreaker'><div/></div>"))}}return setTimeout(_.bind(function(){return this.typeset(this.ui.substepslist.get(0),_.bind(function(){console.log("FFS",me.ui.substepslist.get(0));me.ui.loadindicator.hide();me.ui.substeps.removeClass("hidden");return me.localizeSpecial()}),this)},this),100)}},this));this.localize();return this},kill:function(){var view,_i,_len,_ref;_ref=this.views;for(_i=0,_len=_ref.length;_i<_len;_i++){view=_ref[_i];view.kill()}return this.cleanup()}})}).call(this);