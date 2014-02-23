// Generated by CoffeeScript 1.6.2
(function() {
  CATS.bb.ExpressionsView = CATS.bb.BaseView.extend({
    localizeid: "expressions",
    className: "expressionsview viewbox examplessection",
    category: "calc",
    noprocess: true,
    events: {
      "click .examplesbutton": "examplesSection",
      "click .historybutton": "historySection"
    },
    historySection: function(e) {
      (this.$el.removeClass("examplessection")).addClass("historysection");
      this.ui.examplesbutton.removeClass("active");
      return this.ui.historybutton.addClass("active");
    },
    examplesSection: function(e) {
      (this.$el.removeClass("historysection")).addClass("examplessection");
      this.ui.historybutton.removeClass("active");
      return this.ui.examplesbutton.addClass("active");
    },
    render: function() {
      var examplesview, historyview;

      this.setContent(CATS.cache.templates["#expressionsviewtemplate"]);
      this.setTitle("expressionsheadline");
      this.setUI("examplessection", "historysection", "examplesbutton", "historybutton");
      examplesview = new CATS.bb.ExamplesView();
      historyview = new CATS.bb.HistoryView;
      this.childViews = [examplesview, historyview];
      this.ui.examplessection.append(examplesview.render().el);
      this.ui.historysection.append(historyview.render().el);
      return this;
    }
  });

}).call(this);
