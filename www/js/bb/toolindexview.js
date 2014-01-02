(function(){CATS.bb.ToolIndexView=CATS.bb.RootView.extend({tagName:"div",category:"tool",localizeid:"toolindex",className:"toolindex viewbox",initialize:function(o){this.listenTo(Backbone,"setlang",this.changeIndex);return this.constructor.__super__.initialize.apply(this,[o])},events:{radiobtnselect:"changeFilter","click .showexamplesbutton":"showExampleList","click .hideexamplesbutton":"hideExampleList"},render:function(){var complexity,effect,el,lang,_i,_j,_len,_len1,_ref,_ref1;this.setContent(CATS.cache.templates["#toolindextemplate"]);this.toolLinkAware();this.setTitle("toolindexheadline",true);this.setUI("toollist","complexityval","effectval","toollistfilter","filterexplanation");lang=CATS.settings.lang;_ref=["basic","complex"];for(_i=0,_len=_ref.length;_i<_len;_i++){complexity=_ref[_i];_ref1=["simplifying","complicating","decimalifying","rephrasing","integritycheck","conditionallysimplify"];for(_j=0,_len1=_ref1.length;_j<_len1;_j++){effect=_ref1[_j];el=this.$("."+effect+complexity+"simplelist");this.drawPreRenderedPart("#WORDLIST"+effect+" > ."+lang+"_"+complexity+" > .simplelist",el);console.log("Rendered simplelist for",effect,complexity,el.length,el.children().length)}}this.updateAllMyToolLinks();this.changeFilter();return this},changeFilter:function(e,f,g){this.complexity=this.ui.complexityval.val();this.effect=this.ui.effectval.val();this.ui.toollistfilter.attr("class","show"+this.effect+this.complexity);return this.changeExplanation()},changeExplanation:function(){var compl,eff,kind,mytext;mytext=function(){var _i,_len,_ref,_results;_ref=["start",this.complexity,"middle",this.effect];_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){kind=_ref[_i];_results.push(this.getText(["ui","toolindex","lead"+kind,CATS.settings.lang],true,false,true))}return _results}.call(this).join(" ");compl={basic:"atomic"}[this.complexity]||this.complexity;eff={integritycheck:"integrity",decimal:"decimalifying",integritycheck:"integrity",conditionallysimplify:"condsimpl"}[this.effect]||this.effect;mytext+=" <span class='smalltext'>("+(CATS.math.count[compl+eff]||0)+" "+this.getText(["ui","toolindex","outof",CATS.settings.lang],true)+" "+CATS.math.count.total+")</span>";return this.ui.filterexplanation.html(CATS.texts.processText(mytext,CATS.settings.lang))},showExampleList:function(e){var box,button,complexity,effect,lang,list,old,_ref;button=$(e.srcElement||e.target).closest("button");box=button.closest(".togglebox");_ref=button.attr("data-kind").split("_"),effect=_ref[0],complexity=_ref[1];lang=CATS.settings.lang;console.log("OK, examples for ",effect,complexity);if(this["havedrawn"+effect+complexity]){return box.addClass("togglesecond")}else{this["havedrawn"+effect+complexity]=true;old=button.html();button.css("min-width",button.width());button.html(this.getLoadingHTML());list=box.find(".examplelist");return this.drawPreRenderedPart("#WORDLIST"+effect+" > ."+lang+"_"+complexity+" > .examplelist",list,_.bind(function(){box.addClass("togglesecond");setTimeout(_.bind(this.updateAllMyToolLinks,this),10);return button.html(old)},this))}},hideExampleList:function(e){return $(e.srcElement||e.target).closest(".togglebox").removeClass("togglesecond")}})}).call(this);