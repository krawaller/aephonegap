(function(){CATS.bb.ControlpanelView=CATS.bb.BaseView.extend({template:$("#controlpaneltemplate").html(),localizeid:"controlpanel",className:"controlpanel",initialize:function(o){this.listenTo(Backbone,"mainnavto",this.mainNav);return this.constructor.__super__.initialize.apply(this,arguments)},events:{"click .mainnav":"mainNav"},mainNav:function(e,section){var btn,oldsection;if(typeof e==="string"){section=e}else{btn=$(e.srcElement||e.target).closest(".mainnav");section=btn.attr("data-section")}this.$(".active").removeClass("active");this.$(".button"+section).addClass("active");$(".mainnavsection.active").removeClass("active");$(".mainnavsection."+section+"section").addClass("active");console.log("mainnav TO ",section);oldsection=CATS.currentsection;CATS.currentsection=section;return Backbone.trigger("mainnav",section,oldsection)},render:function(){this.$el.html(this.template);this.setUI("buttoncalc");this.localize();return this}})}).call(this);