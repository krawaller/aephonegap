// Generated by CoffeeScript 1.6.2
(function() {
  CATS.bb.LessonView = CATS.bb.BaseView.extend({
    localizeid: "lesson",
    className: "lessonview viewbox",
    category: "school",
    events: {
      "click .canfinishbutton": "finishLesson",
      "click .havefinishedbutton": "forgetLesson",
      "click .killstacktabbutton": "killMeFromRoot",
      "click .showexamplesbutton": "showExampleList",
      "click .hideexamplesbutton": "hideExampleList"
    },
    finishLesson: function() {
      return CATS.school.learnLesson(this.lessonid);
    },
    forgetLesson: function() {
      return CATS.school.forgetLesson(this.lessonid);
    },
    render: function() {
      this.toolLinkAware();
      return this;
    },
    renderItem: function() {
      this.hasrendereditem = true;
      this.setContent(CATS.cache.templates["#lessonviewtemplate"]);
      this.setUI("lessonoperationsection", "finishexplanation", "trafficlight", "lessondescription", "toolsimplelist", "toolexamplelist", "lessonlinksection", "linklist", "togglebox");
      this.listenTo(Backbone, "updatelesson", this.updateMe);
      return this;
    },
    showItem: function(lessonid) {
      var lang, lessondef, word, _i, _len, _ref, _ref1;

      this.lessonid = lessonid;
      lang = CATS.settings.lang;
      if (!this.hasrendereditem) {
        this.renderItem();
      }
      this.lessondef = lessondef = CATS.school.lessons[lessonid];
      this.updateMe();
      this.ui.lessondescription.html(lessondef.description[lang] + this.reportLink("text", "lesson-description-" + lang));
      if (true || this.lessondef.hasmath) {
        this.ui.lessondescription.html(this.ui.lessondescription.html().replace(/MATH\[([^\[\]]*)]/g, function(part, mathstr, a, b, c) {
          console.log("MAATH", part, "STR", mathstr);
          return $("#MATH" + mathstr + " > ." + lang).html();
        }));
        this.typeset(this.ui.lessondescription);
      }
      if (lessondef.links) {
        this.ui.lessonlinksection.show();
        this.ui.toolsimplelist.empty();
        _ref = lessondef.links;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          word = _ref[_i];
          this.ui.linklist.append("<a href='#' class='wordlink davidlink' linkto='" + word + "'>" + CATS.texts.links[word].headline[lang] + "</a>");
        }
      } else {
        this.ui.lessonlinksection.hide();
      }
      if ((_ref1 = lessondef.tools) != null ? _ref1.length : void 0) {
        this.drawPreRenderedPart("#LESSONLIST" + lessonid + " > ." + lang + " > .simplelist", this.ui.toolsimplelist);
        this.updateAllMyToolLinks(this.ui.toolsimplelist);
      } else {
        this.ui.lessonoperationsection.hide();
      }
      return this;
    },
    updateMe: function() {
      var left, status, str, total, _ref;

      this.setTitle((this.lessonLink(this.lessonid, true)) + this.reportLink("text", "lesson-title-" + CATS.settings.lang));
      this.$el.removeClass("canfinishlesson cannotfinishlesson havefinishedlesson");
      status = CATS.school.getLessonStatus(this.lessonid);
      left = CATS.school.remainingOpsInLesson(this.lessonid);
      total = this.lessondef.tools.length;
      str = status + (status !== "red" ? "" : Math.min(left, 2)) + (status === "yellow" && !((_ref = CATS.school.lessons[this.lessonid].tools) != null ? _ref.length : void 0) ? "none" : "") + "explanation";
      this.ui.finishexplanation.setText(str, false, false, true);
      this.ui.finishexplanation.html(this.ui.finishexplanation.html().replace("%NUMLEFT", CATS.texts.numberStr(left, CATS.settings.lang)));
      this.ui.finishexplanation.html(this.ui.finishexplanation.html().replace("%NUMTOTAL", CATS.texts.numberStr(total, CATS.settings.lang)));
      this.$el.addClass({
        yellow: "canfinishlesson",
        red: "cannotfinishlesson",
        green: "havefinishedlesson"
      }[status]);
      return this.ui.trafficlight.removeClass("trafficred trafficyellow trafficgreen").addClass("traffic" + status);
    },
    showExampleList: function(e) {
      var button, lang, lessonid, old;

      button = $(e.srcElement || e.target).closest("button");
      lessonid = this.lessonid;
      lang = CATS.settings.lang;
      if (this.havedrawnexamples) {
        return this.changeToExampleList();
      } else {
        old = button.html();
        button.css("min-width", button.width());
        button.html(this.getLoadingHTML());
        return this.drawPreRenderedPart("#LESSONLIST" + lessonid + " > ." + lang + " > .examplelist", this.ui.toolexamplelist, _.bind((function() {
          this.changeToExampleList();
          button.html(old);
          return setTimeout(_.bind(this.updateAllMyToolLinks, this), 10);
        }), this));
      }
    },
    changeToExampleList: function() {
      return this.ui.togglebox.addClass("togglesecond");
    },
    hideExampleList: function(e) {
      return this.ui.togglebox.removeClass("togglesecond");
    }
  });

}).call(this);
