(function(){CATS.bb.ReportTextView=CATS.bb.BaseView.extend({template:$("#reporttextviewtemplate").html(),localizeid:"reporttext",className:"reportview davidmodalcontent",initialize:function(info){this.info=info;return this.constructor.__super__.initialize.apply(this,[info])},noprocess:true,localizeSpecial:function(){var info,infolist,lang,val,_ref;lang=CATS.settings.lang;this.ui.sendbutton.attr("href","mailto:david@krawaller.se?subject=Algebra%20Explorer%20feedback&body=%0A%0A"+CATS.texts.ui.reporttext.maildata[lang]+"%0D%0A"+encodeURIComponent(function(){var _ref,_results;_ref=this.info;_results=[];for(info in _ref){val=_ref[info];if(info!=="why"){_results.push(""+info+": "+val+"\n")}}return _results}.call(this)));infolist="<dl>";console.log("ERRORREPORTER",this.info);_ref=this.info;for(info in _ref){val=_ref[info];if(info!=="why"){infolist+="<dt>"+info+":</dt><dd>"+val+"</dd>"}}infolist+="</dl>";this.ui.infoholder.html(infolist);return this.ui.errorwelcomemat.setText(["ui",this.localizeid,"errorwelcomemat"+this.info.why,CATS.settings.lang],true)},render:function(){var name,val,_ref,_ref1;this.info.displaymode=CATS.settings.size+"-"+CATS.settings.orientation;this.info.lang=CATS.settings.lang;this.info.appversion=CATS.texts.latestversion;this.info.height=document.height;this.info.width=document.width;if((_ref=window.device)!=null?_ref.available:void 0){_ref1=window.device;for(name in _ref1){val=_ref1[name];if(typeof val==="string"){this.info[name]=val}}}this.$el.html(this.template);this.setUI("sendbutton","infoholder","errorwelcomemat");this.localize();return this}})}).call(this);