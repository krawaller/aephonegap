(function(){CATS.bb.HelpItemView=CATS.bb.BaseView.extend({template:$("#helpitemviewtemplate").html(),category:"help",className:"viewbox helpitemview",events:{"click .killstacktabbutton":"killMeFromRoot"},noprocess:true,render:function(){this.localize();return this},renderItem:function(){this.hasrendereditem=true;this.setContent(this.template);this.setUI("infoitemheadline","infoitemholder");this.localize();return this},showItem:function(word){var def,lang;if(!this.hasrendereditem){this.renderItem()}def=CATS.texts.help[word];if(word==="helpitemview"){this.$(".viewhelpbutton").hide()}lang=CATS.settings.lang;this.setTitle(["help",word,"headline",lang]);return this.ui.infoitemholder.html(this.getText(["help",word,"html"],false,false,true))}})}).call(this);