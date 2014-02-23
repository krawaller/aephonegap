// Generated by CoffeeScript 1.6.2
(function() {
  CATS.bb.WordIndexView = CATS.bb.BaseView.extend({
    template: $("#wordindextemplate").html(),
    tagName: "div",
    className: "viewbox",
    localizeid: "wordindex",
    category: "glossary",
    initialize: function(o) {
      return this.constructor.__super__.initialize.apply(this, [o]);
    },
    render: function() {
      var lang, list, listitems, w, wordindex;

      this.setTitle("wordindexheadline", true);
      this.setContent(this.template);
      this.setUI("wordlist");
      this.localize();
      lang = CATS.settings.lang;
      wordindex = CATS.texts.wordIndex[lang];
      listitems = (function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = wordindex.length; _i < _len; _i++) {
          w = wordindex[_i];
          _results.push("<a href='#' class='lookupindexitem davidlink wordlink' linkto='" + w[0] + "'>" + w[1] + "</a>");
        }
        return _results;
      })();
      list = $("<div class='davidlist'>" + listitems.join("") + "</div>");
      this.ui.wordlist.append(list);
      this.ui[lang + "list"] = list;
      return this;
    }
  });

}).call(this);
