(function(){CATS.bb.WordView=CATS.bb.BaseView.extend({template:$("#wordviewtemplate").html(),localizeid:"word",className:"wordview viewbox",events:{"click .killstacktabbutton":"killMeFromRoot","click .showexamplesbutton":"showExampleList","click .hideexamplesbutton":"hideExampleList"},render:function(){this.toolLinkAware();return this},renderItem:function(){this.hasrendereditem=true;this.setContent(this.template);this.setUI("wordname","mathex","worddescription","worddescriptionheadline","basicopsheadline","complexopsheadline","basiclist","complexlist","toollists","basiclistdesc","complexlistdesc","basicsimplelist","basicexamplelist","complexsimplelist","complexexamplelist");this.localize();return this},showItem:function(word){var def,lang;this.word=word;lang=CATS.settings.lang;console.log("WOOP WOOP",word);if(!this.hasrendereditem){this.renderItem()}def=CATS.texts.links[word];this.setTitle(["links",word,"headline",lang],"glossary");this.ui.worddescription.html(this.getText(["links",word,"description",lang]));if(CATS.texts.maths[word]){this.ui.mathex.show();this.drawPreRenderedPart("#MATH"+word+" > ."+lang,this.ui.mathex,this.updateAllMyToolLinks)}else{this.ui.mathex.hide()}if(def.notoollist){return this.ui.toollists.hide()}else{this.ui.toollists.show();return this.drawSimpleLists()}},drawSimpleLists:function(){var count,def,kind,lang,tname,tool,toolarr,word,_i,_j,_k,_len,_len1,_len2,_ref,_ref1,_results;word=this.word;lang=CATS.settings.lang;def=CATS.texts.links[word];_ref=["basic","complex"];_results=[];for(_i=0,_len=_ref.length;_i<_len;_i++){kind=_ref[_i];count=CATS.texts.getCachedToolListsForTag(word)[kind];if(count===0){this.ui[kind+"listdesc"].setText("therearenotools"+kind);this.ui[kind+"list"].empty()}else{toolarr=CATS.texts.toolTagIndex[word][kind];this.ui[kind+"listdesc"].setText(count>1?"therearemanytools"+kind:"thereisonetool"+kind);this.ui[kind+"listdesc"].html(this.ui[kind+"listdesc"].html().replace("%s",CATS.texts.numberStr(count,lang)));for(_j=0,_len1=toolarr.length;_j<_len1;_j++){tool=toolarr[_j];_ref1=tool.split("|");for(_k=0,_len2=_ref1.length;_k<_len2;_k++){tname=_ref1[_k];this.ui[kind+"simplelist"].append(this.toolLink(tname,lang))}}}_results.push(this.ui[kind+"listdesc"].html(this.ui[kind+"listdesc"].html()+" "+def.headline[lang]+(count?":":".")))}return _results},showExampleList:function(e){var button,kind,lang,old,word;button=$(e.srcElement||e.target).closest("button");word=this.word;lang=CATS.settings.lang;kind=button.attr("data-kind");console.log("OK, examples for ",kind);if(this["havedrawn"+kind]){return this.changeToExampleList(kind)}else{old=button.html();button.css("min-width",button.width());button.html(this.getLoadingHTML());return this.drawPreRenderedPart("#WORDLIST"+word+" > ."+lang+"_"+kind,this.ui[kind+"examplelist"],_.bind(function(){this.changeToExampleList(kind);setTimeout(_.bind(this.updateAllMyToolLinks,this),10);return button.html(old)},this))}},changeToExampleList:function(kind){return this.ui[kind+"list"].addClass("togglesecond")},hideExampleList:function(e){return $(e.srcElement||e.target).closest(".togglebox").removeClass("togglesecond")}})}).call(this);