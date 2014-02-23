// Generated by CoffeeScript 1.6.2
(function() {
  CATS.bb.ReportTextView = CATS.bb.BaseView.extend({
    localizeid: "reporttext",
    className: "reportview viewbox",
    category: "info",
    noprocess: true,
    events: {
      "click .textreportmodeonbutton": "toggleTextReport",
      "click .textreportmodeoffbutton": "toggleTextReport"
    },
    toggleTextReport: function() {
      CATS.settings.textreportmode = CATS.settings.textreportmode === "yes" ? "no" : "yes";
      return Backbone.trigger("settextreportmode");
    },
    showItem: function(data, e) {
      var info, infolist, lang, path, sent, val, why, _ref, _ref1;

      _ref = data.split("|"), why = _ref[0], path = _ref[1];
      lang = CATS.settings.lang;
      if (why === "text" || why === "describe" || why === "position") {
        this.info.text = $(e.currentTarget).parent().text().slice(0, -1);
        this.ui.relevanttext.html('"' + this.info.text + '"');
      }
      if (why === "interpret" || why === "describe" || why === "position") {
        sent = JSON.parse(path);
        if (why === "interpret") {
          this.ui.relevanttext.html(sent.input);
          this.info.input = sent.input;
        }
        this.info.math = JSON.stringify(sent.obj);
        this.ui.math.html(CATS.app.mathmlprinter(sent.obj, (sent.addr ? [sent.addr] : []), [], true, CATS.settings));
        this.typeset(this.ui.math);
      }
      if (why === "position") {
        this.info.address = "[" + (sent.addr.join("-")) + "]";
      }
      if (why === "calc") {
        sent = JSON.parse(path);
        this.info.performer = sent.performer;
        this.info.tool = sent.tool;
        this.info.because = sent.because;
        this.info.before = JSON.stringify(sent.before);
        this.info.after = JSON.stringify(sent.after);
      }
      if (why === "text") {
        this.info.path = path;
      }
      if (why === "describe") {
        this.info.entry = path;
      }
      if (why === "optaglist") {
        this.ui.relevanttext.html(path);
        this.info.tags = path;
      }
      this.info.reporttype = why;
      this.ui.sendbutton.attr("href", ("mailto:david@krawaller.se?subject=Algebra%20Explorer%20feedback&body=%0A%0A" + CATS.texts.ui.reporttext.maildata[lang] + "%0D%0A") + encodeURIComponent((function() {
        var _ref1, _results;

        _ref1 = this.info;
        _results = [];
        for (info in _ref1) {
          val = _ref1[info];
          if (info !== "why") {
            _results.push("" + info + ": " + val + "\n");
          }
        }
        return _results;
      }).call(this)));
      infolist = "<dl>";
      console.log("ERRORREPORTER", this.info);
      _ref1 = this.info;
      for (info in _ref1) {
        val = _ref1[info];
        if (info !== "why") {
          infolist += "<dt>" + info + ":</dt><dd>" + val + "</dd>";
        }
      }
      infolist += "</dl>";
      this.ui.infoholder.html(infolist);
      return this.ui.errorwelcomemat.setText(why);
    },
    render: function() {
      var name, val, _ref;

      this.info = {
        displaymode: CATS.settings.size + "-" + CATS.settings.orientation,
        lang: CATS.settings.lang,
        appversion: CATS.texts.latestversion,
        height: $(document).height(),
        width: $(document).width()
      };
      if (window.device != null) {
        _ref = window.device;
        for (name in _ref) {
          val = _ref[name];
          if (typeof val === "string") {
            this.info[name] = val;
          }
        }
      }
      this.setTitle("headlinereporttext");
      this.setContent(CATS.cache.templates["#reporttextviewtemplate"]);
      this.setUI("sendbutton", "infoholder", "errorwelcomemat", "relevanttext", "math");
      return this;
    }
  });

}).call(this);
