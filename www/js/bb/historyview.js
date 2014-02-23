// Generated by CoffeeScript 1.6.2
(function() {
  CATS.bb.HistoryView = CATS.bb.BaseView.extend({
    localizeid: "historyview",
    className: "historyview emptyhistory",
    initialize: function(o) {
      this.strings = [];
      this.listenTo(Backbone, "updatedhistory", this.render);
      this.listenTo(Backbone, "setlang", this.render);
      return this.constructor.__super__.initialize.apply(this, [o]);
    },
    render: function() {
      this.setContent(CATS.cache.templates["#historyviewtemplate"], true, true);
      this.setUI("historyinstruction", "historylist");
      this.drawHistory();
      return this;
    },
    drawHistory: function() {
      var arr, date, example, list, strings, _i, _len, _ref;

      arr = [];
      _ref = CATS.history;
      for (date in _ref) {
        strings = _ref[date];
        if (!(date !== "all")) {
          continue;
        }
        for (_i = 0, _len = strings.length; _i < _len; _i++) {
          example = strings[_i];
          arr.push("<a href='#' class='davidlink expressionitem'>" + this.escapeStr(example) + "</a>");
        }
        arr.push("<h5 class='nav-header'>" + date + "</h5>");
      }
      if (arr.length) {
        this.$el.removeClass("emptyhistory");
      }
      list = $((["<div class='davidlist'>"].concat(arr.reverse().concat(["</div>"]))).join(""));
      return this.$el.append(list);
    }
  });

}).call(this);
