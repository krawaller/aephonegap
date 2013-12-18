(function(){CATS.bb.WordView=CATS.bb.BaseView.extend({localizeid:"word",className:"wordview viewbox",category:"glossary",events:{"click .killstacktabbutton":"killMeFromRoot","click .showexamplesbutton":"showExampleList","click .hideexamplesbutton":"hideExampleList"},render:function(){this.toolLinkAware();return this},renderItem:function(){this.hasrendereditem=true;this.setContent(CATS.cache.templates["#wordviewtemplate"]);this.setUI("redirectedfrom","wordname","mathex","worddescription","worddescriptionheadline","basicopsheadline","complexopsheadline","basiclist","complexlist","toollists","basiclistdesc","complexlistdesc","basicsimplelist","basicexamplelist","complexsimplelist","complexexamplelist");return this},showItem:function(word){var def,lang;this.word=word;lang=CATS.settings.lang;if(!this.hasrendereditem){this.renderItem()}def=CATS.texts.links[word];if(def.redirectto){this.redirectedfrom=word;this.ui.redirectedfrom.html(this.ui.redirectedfrom.html().replace("%OP",def.headline[lang]));this.word=word=def.redirectto;def=CATS.texts.links[word]}else{this.ui.redirectedfrom.hide()}this.cachedlist=CATS.texts.getCachedToolListsForTag(word);this.setTitle(["links",word,"headline",lang]);this.setText(this.ui.worddescription,["links",word,"description",lang],false,false,true);if(CATS.texts.maths[word]){this.ui.mathex.show();this.drawPreRenderedPart("#MATH"+word+" > ."+lang,this.ui.mathex,this.updateAllMyToolLinks)}else{this.ui.mathex.hide()}if(def.redirectto||this.cachedlist.basic+this.cachedlist.complex===0){this.ui.toollists.hide()}else{this.ui.toollists.show();this.drawSimpleLists()}if(def.hasmath){this.ui.worddescription.html(this.ui.worddescription.html().replace(/MATH\[([^\[\]]*)]/g,function(part,mathstr,a,b,c){console.log("MAATH",part,"STR",mathstr);return $("#MATH"+mathstr+" > ."+lang).html()}));return this.typeset(this.ui.worddescription)}},drawSimpleLists:function(){var count,def,kind,lang,toolarr,word,_i,_len,_ref;word=this.word;lang=CATS.settings.lang;def=CATS.texts.links[word];_ref=["basic","complex"];for(_i=0,_len=_ref.length;_i<_len;_i++){kind=_ref[_i];count=this.cachedlist[kind];if(count===0){this.ui[kind+"listdesc"].setText("therearenotools"+kind,false,false,true);this.ui[kind+"list"].empty()}else{toolarr=CATS.texts.toolTagIndex[word][kind];this.ui[kind+"listdesc"].setText(count>1?"therearemanytools"+kind:"thereisonetool"+kind,false,false,true);this.ui[kind+"listdesc"].html(this.ui[kind+"listdesc"].html().replace("%s",CATS.texts.numberStr(count,lang)));this.drawPreRenderedPart("#WORDLIST"+word+" > ."+lang+"_"+kind+" > .simplelist",this.ui[kind+"simplelist"])}this.ui[kind+"listdesc"].html(this.ui[kind+"listdesc"].html()+" "+def.headline[lang]+(count?":":"."))}return this.updateAllMyToolLinks()},showExampleList:function(e){var button,kind,lang,old,word;button=$(e.srcElement||e.target).closest("button");word=this.word;lang=CATS.settings.lang;kind=button.attr("data-kind");console.log("OK, examples for ",kind);if(this["havedrawn"+kind]){return this.changeToExampleList(kind)}else{old=button.html();button.css("min-width",button.width());button.html(this.getLoadingHTML());return this.drawPreRenderedPart("#WORDLIST"+word+" > ."+lang+"_"+kind+" > .examplelist",this.ui[kind+"examplelist"],_.bind(function(){this.changeToExampleList(kind);setTimeout(_.bind(this.updateAllMyToolLinks,this),10);return button.html(old)},this))}},changeToExampleList:function(kind){return this.ui[kind+"list"].addClass("togglesecond")},hideExampleList:function(e){return $(e.srcElement||e.target).closest(".togglebox").removeClass("togglesecond")}})}).call(this);