(function(){CATS.bb.SequenceView=CATS.bb.BaseView.extend({className:"sequence absbox",localizeid:"sequence",events:{"click .backbutton":"back","click .sequencetopbutton":"top"},top:function(){return this.trigger("sequencetop")},back:function(){return this.trigger("sequenceback")},passOnZoom:function(view,path){return this.trigger("zoom",view,path)},passOnNewSequenceView:function(view){return this.trigger("newsequenceview",view)},initialize:function(o,path,parenttool,grandparenttool,parentpath,prevstepnums){this.o=o;this.path=path!=null?path:[];this.parenttool=parenttool;this.grandparenttool=grandparenttool;this.parentpath=parentpath;this.prevstepnums=prevstepnums!=null?prevstepnums:[];this.descriptor="Sequence-"+this.prevstepnums.join(",")+"-"+this.o.who;return this.constructor.__super__.initialize.apply(this,[o])},specialStrings:function(){var lang,path;lang=CATS.settings.lang;path=["ui","sequence",this.prevstepnums.length<2?"backbuttonhead":"backbuttonstep",lang];this.ui.topbackbutton.html(this.getText(path).replace("%s","<span class='inlinerownum'>"+this.prevstepnums.slice(0,-1).join(".")+"</span>"));this.ui.bottombackbutton.html(this.getText(path).replace("%s","<span class='inlinerownum'>"+this.prevstepnums.slice(0,-1).join(".")+"</span>"));this.ui.summary.html(this.ui.summary.html().replace("%NUM",CATS.texts.numberStr((this.o.steps||[]).length,lang)));this.ui.summary.html(this.ui.summary.html().replace("%THIS","<span class='inlinerownum'>"+this.prevstepnums.join(".")+"</span>"));this.ui.summary.html(this.ui.summary.html().replace("%NAME",this.toolLink(this.o.who,lang)));this.ui.substepsintro.html(this.ui.substepsintro.html().replace("%NUM",CATS.texts.numberStr((this.o.steps||[]).length,lang)));return this.ui.substepsintro.html(this.ui.substepsintro.html().replace("%THIS","<span class='inlinerownum'>"+this.prevstepnums.join(".")+"</span>"))},render:function(){var n,opview,step,_i,_len,_ref;this.$el.html(CATS.cache.templates["#sequenceviewtemplate"]);this.setUI("sequencetopbutton","startcontainer","sequencefooter","summary","bottombackbutton","firstresultcontainer","substeps","substepsintro");this.views=[];this.ui.startcontainer.html(CATS.app.mathmlprinter(CATS.math.lookUp(this.o.before,this.path),[],[],true,CATS.settings,true));_ref=[this.o].concat(this.o.steps||[]);for(n=_i=0,_len=_ref.length;_i<_len;n=++_i){step=_ref[n];opview=new CATS.bb.OperationView(step,n,!n?this.parentpath:this.path,!n?"topbackbutton backbutton":void 0,n?this.parenttool:this.grandparenttool,this.prevstepnums);this.listenTo(opview,"zoom",this.passOnZoom);this.listenTo(opview,"sequenceback",this.back);this.listenTo(opview,"sequencetop",this.top);this.listenTo(opview,"newsequenceview",this.passOnNewSequenceView);this.views.push(opview);this.ui[n?"substeps":"firstresultcontainer"].append(opview.render(n>0).$el.addClass(n?"substep":"firstsubstep"));if(n>0&&n<this.o.steps.length){this.ui.substeps.append($("<div class='opbreaker'><div/></div>"))}}this.setUI("topbackbutton");this.specialStrings();console.log("SEQUENCERENDER"+this.prevstepnums.join("."));this.descriptor=this.descriptor+"-rendered";this.rendered=true;if(this.prevstepnums.length<2){this.ui.sequencetopbutton.hide()}return this},kill:function(){var view,_i,_len,_ref;_ref=this.views||[];for(_i=0,_len=_ref.length;_i<_len;_i++){view=_ref[_i];view.kill()}return this.cleanup()},getready:function(callback){console.log("Getting ready!! "+this.descriptor);if(!this.rendered){this.render();return this.typeset(this.$el,callback)}else{return callback()}}})}).call(this);