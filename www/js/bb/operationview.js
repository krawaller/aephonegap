(function(){CATS.bb.OperationView=CATS.bb.BaseView.extend({tagName:"div",className:"operation",localizeid:"operation",initialize:function(o,rownum,sequencepath,belowbtn,parenttool,prevstepnums,rownumspecial){this.o=o;this.rownum=rownum;this.sequencepath=sequencepath!=null?sequencepath:[];this.belowbtn=belowbtn;this.parenttool=parenttool;this.prevstepnums=prevstepnums!=null?prevstepnums:[];this.rownumspecial=rownumspecial;return this.constructor.__super__.initialize.apply(this,[o])},events:{"click .buttonstepsbelow":"zoom","click .toggler":"toggleDetails"},toggleDetails:function(e){return this.$el.toggleClass("collapsed")},zoom:function(e){var button,me,oldhtml;console.log("Operationview zoom top! "+this.substeps.descriptor);if(this.substeps.rendered){console.log("Operationview stepbutton clicked for rendered view! "+this.substeps.descriptor);return this.trigger("zoom",this.substeps,this.sequencepath)}else{console.log("Operationview stepbutton clicked! "+this.substeps.descriptor);button=$(e.currentTarget);button.css("min-width",button.outerWidth());oldhtml=button.html();button.html(this.getLoadingHTML(CATS.settings.lang));me=this;return setTimeout(function(){return me.substeps.getready(_.bind(function(){console.log("Operationview zoom callback triggered! "+this.substeps.descriptor);button.html(oldhtml);return me.trigger("zoom",me.substeps,me.sequencepath)},me))},50)}},back:function(){return this.trigger("sequenceback")},passOnZoom:function(view,path){return this.trigger("zoom",view,path)},passOnNewSequenceContainer:function(view){return this.trigger("newsequenceview",view)},sequenceTop:function(){return this.trigger("sequencetop")},kill:function(){this.before.kill();this.after.kill();if(this.substeps){this.substeps.kill()}return this.cleanup()},specialString:function(){var lang,path,_ref,_ref1,_ref2;lang=CATS.settings.lang;path=(_ref=this.o.because)==="toolexample"||_ref==="userinputsingle"||_ref==="userinputsingleatomic"||_ref==="inputexamplesingle"||this.o.because==="simplifying"&&((_ref1=this.parenttool)==="simplifier"||_ref1==="decimalifier")?[this.o.who,lang,"explanation"]:[this.parenttool,lang,"steps",this.o.because];this.setText(".becausecontainer",["tools"].concat(path),false,false,true);if(!((_ref2=this.o.who)==="simplifier"||_ref2==="decimalifier")){this.ui.toolnamecontainer.html(this.toolLink(this.o.who))}else{this.ui.toolnamecontainer.hide()}if(!this.belowbtn){return this.ui.buttonstepsbelow.html(this.ui.buttonstepsbelow.html().replace("%s","<span class='inlinerownum'>"+this.ui.rownum.text()+"</span>"))}else{return this.setText(this.ui.buttonstepsbelow,["ui","mastersequence",this.belowbtn,lang],false,false,true)}},render:function(startcollapsed){var afterobj,lang,prepath,prepathcalc,_ref,_ref1,_ref2,_ref3;lang=CATS.settings.lang;prepathcalc=function(digpast,path){var i,pathpart,ret,_i,_len;ret=[];for(i=_i=0,_len=path.length;_i<_len;i=++_i){pathpart=path[i];if(i>=digpast.length){ret.push(pathpart)}}return ret};prepath=prepathcalc(this.sequencepath,this.o.path||[]);this.before=new CATS.bb.jaxview(CATS.math.lookUp(this.o.before,this.sequencepath),(_ref=this.o.who)==="simplifier"||_ref==="decimalifier"?[999]:prepath,this.o.beforemarks||[],true,(_ref1=this.o.who)==="simplifier"||_ref1==="decimalifier");afterobj=CATS.math.lookUp(this.o.after,this.sequencepath);this.after=new CATS.bb.jaxview(afterobj,(_ref2=this.o.who)==="simplifier"||_ref2==="decimalifier"?[999]:prepath,this.o.aftermarks||[],true,(_ref3=this.o.who)==="simplifier"||_ref3==="decimalifier");this.$el.html(CATS.cache.templates["#operationviewtemplate"]);this.setUI("buttonstepsbelow","beforecontainer","aftercontainer","afternomarkcontainer","becausecontainer","toolnamecontainer","rownum");this.ui.afternomarkcontainer.html(CATS.app.mathmlprinter(afterobj,[],[],true,CATS.settings,true));if(this.rownumspecial){this.setText(this.ui.rownum,["ui","mastersequence",this.rownumspecial,lang],false,false,true)}else{console.log("SO, ROWNUM!",startcollapsed,this.rownum,this.prevstepnums,startcollapsed&&this.prevstepnums.length&&this.rownnum);if(startcollapsed&&this.prevstepnums.length&&this.rownum){this.ui.rownum.html("<span>"+this.prevstepnums.join(".")+".</span>"+this.rownum)}else{this.ui.rownum.text(this.prevstepnums.concat(this.rownum||[]).join("."))}}if(this.belowbtn){console.log("BELOWBUTTON: "+this.belowbtn);this.ui.buttonstepsbelow.removeClass("buttonstepsbelow").addClass(this.belowbtn)}else if(this.rownum&&this.o.steps){this.substeps=new CATS.bb.SequenceView(this.o,this.o.path,this.o.who,this.parenttool,this.sequencepath,this.prevstepnums.concat(this.rownum));this.substeps.$el.addClass("sequencehiddenright "+this.prevstepnums.concat(this.rownum).join("-"));this.listenTo(this.substeps,"sequenceback",this.back);this.listenTo(this.substeps,"sequencetop",this.sequenceTop);this.listenTo(this.substeps,"zoom",this.passOnZoom);this.listenTo(this.substeps,"newsequenceview",this.passOnNewSequenceContainer);this.trigger("newsequenceview",this.substeps)}else{this.ui.buttonstepsbelow.hide()}this.ui.beforecontainer.append(this.before.render().el);this.ui.aftercontainer.append(this.after.render().el);this.specialString();if(startcollapsed){this.$el.addClass("collapsed")}this.toolLinkAware();return this}})}).call(this);