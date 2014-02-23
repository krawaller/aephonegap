// Generated by CoffeeScript 1.6.2
(function() {
  var change, changelog, exportTo, help, info, k, latestversion, makeInfoIndex, txticon, v, _ref;

  txticon = (typeof require === "undefined" ? this.CATS.app.helpers : require("./helpers")).txticon;

  changelog = (typeof require === "undefined" ? CATS.texts.about : require("./texts_about")).changelog;

  help = {
    overview: {
      headline: {
        en: "App overview",
        sv: "Översikt över appen"
      }
    },
    parserview: {
      headline: {
        en: "The calculator tab",
        sv: "Miniräknartabben"
      }
    },
    expressionsview: {
      headline: {
        en: "Expressions view",
        sv: "Uttrycksvy"
      }
    },
    mathview: {
      headline: {
        en: "CLoseup view",
        sv: "Närbildsvy"
      }
    },
    resultview: {
      headline: {
        en: "The result view",
        sv: "Resultatvyn"
      }
    },
    lessonlistview: {
      headline: {
        en: "The lesson list tab",
        sv: "Lektionstabben"
      }
    },
    lessonview: {
      headline: {
        en: "Lesson view",
        sv: "Lektionsvyn"
      }
    },
    wordindexview: {
      headline: {
        en: "The glossary tab",
        sv: "Ordlistetabben"
      }
    },
    wordview: {
      headline: {
        en: "The word definition view",
        sv: "Ordvyn"
      }
    },
    toolindexview: {
      headline: {
        en: "The operations tab",
        sv: "Operationstabben"
      }
    },
    toolinfoviewexplanation: {
      headline: {
        en: "Operation explanation view",
        sv: "Operationsvyns förklaringsdel"
      }
    },
    toolinfoviewlinks: {
      headline: {
        en: "Operation links view",
        sv: "Operationsvyns länkdel"
      }
    },
    toolinfoviewschool: {
      headline: {
        en: "Operation learning view",
        sv: "Operationsvyns inlärningsdel"
      }
    },
    infotabview: {
      headline: {
        en: "The information tab",
        sv: "Informationstabben"
      }
    },
    reporttextview: {
      headline: {
        en: "Report view",
        sv: "Rapporteringsvy"
      }
    }
  };

  info = {
    about: {
      headline: {
        en: "About the app",
        sv: "Om appen"
      },
      description: {
        en: "<p>\nAlgebra Explorer was painstakingly but lovingly built by David Waller between 2007-2014. David is a mathematics teacher\nemployed by the Swedish Prison &amp; Probation Service, and the original vision for the app was to help inmates study \nmathematics in prisons without a local maths teacher.</p>\n\n<p>The app has an official homepage at <a href='#' class='externallink' linkto='http://algebraexplorer.com'>http://algebraexplorer.com</a>.\nTo give feedback to the creator, please use the report function found at the bottom of the info tab!</p>\n\n<p>Many thanx for your interest in the app!</p>",
        sv: "<p>Algebra Explorer byggdes med blod, svett, tårar och kärlek av David Waller mellan 2007-2014. David är matematiklärare inom \nKriminalvården, och appens ursprungliga syfte var att hjälpa intagna studera matematik från fängelser utan lokal matematiklärare.</p>\n\n<p>Appen har en officiela hemsida på <a href='#' class='externallink' linkto='http://algebraexplorer.se'>http://algebraexplorer.se</a>.\nFör att ge feedback till utvecklaren, vänligen använd rapporteringsfunktionen längst ned på infotabben.</p>\n\n<p>Stort tack för ditt intresse i appen, hoppas den kommer till glädje!</p>"
      }
    },
    changelog: {
      headline: {
        en: "Changelog",
        sv: "Uppdateringar"
      }
    },
    future: {
      headline: {
        en: "The future",
        sv: "Framtiden"
      },
      description: {
        en: "<p>We hope to be able to keep supporting Algebra Explorer for a long time to come! Here is a list of what we hope to accomplish:</p>\n<ul>\n<li>Fix bugs and adjust texts as reported by users</li>\n<li>Solidify support for inequalities and complex numbers</li>\n<li>Add trigonometry</li>\n<li>Add units and prefixes</li>\n<li>Add limits, derivatives and primitive functions</li>\n<li>Add number on bases other than 10</li>\n<li>Add visualization such as graphs</li>\n</ul>\n<p>User feedback is an integral part of the journey to improve Algebra Explorer, so if you have a comment on current content or an idea\non things missing from the above roadmap, please don't hesitate to get in touch!</p>",
        sv: "<p>Vi hoppas kunna fortsätta uppdatera Algebra Explorer under lång tid framöver! Här är en lista över vad vi hoppas kunna åstadkomma:</p>\n<ul>\n<li>Fixa buggar och förbättra texter utifrån rapporter från användare</li>\n<li>Förbättra stöd för olikheter och komplexa tal</li>\n<li>Lägg till trigonometri</li>\n<li>Lägg till enheter och prefix</li>\n<li>Lägg till gränsvärden, derivator och integraler</li>\n<li>Lägg till tal på andra baser än 10</li>\n<li>Lägg till visualiseringar såsom grafer</li>\n</ul>"
      }
    },
    underthehood: {
      headline: {
        en: "Under the hood",
        sv: "Under motorhuven"
      },
      description: {
        en: "<ul>\n<li>The main app infrastructure is built with <a href='#' class='externallink' linkto='http://backbonejs.org'>Backbone</a>,\n<a href='#' class='externallink' linkto='http://underscorejs.org'>Underscore</a> and <a href='#' class='externallink' linkto='http://jquery.com'>jQuery</a>.</li>\n<li>Code is written in <a href='#' class='externallink' linkto='http://coffeescript.org'>CoffeeScript</a></li>.\n<li>Build process uses <a href='#' class='externallink' linkto='http://nodejs.org'>Node.js</a>.</li>\n<li>Test suite uses <a href='#' class='externallink' linkto='http://vowsjs.org'>Vows.js</a>.</li>\n<li>Flags in language select from <a href='#' class='externallink' linkto='https://github.com/koppi/iso-country-flags-svg-collection'>Koppi's github repo</a>.</li>\n<li>In-app icons are from a licence for <a href='#' class='externallink' linkto='https://glyphicons.com'>GlyphIcons Pro</a>.</li>\n<li>Application icon and splash screen created by <a href='#' class='externallink' linkto='https://tristania.com'>Tjeerd van Saas</a>.</li>\n<li>Packaging for mobile is done using <a href='#' class='externallink' linkto='https://cordova.apache.org'>Cordova</a>.</li>\n<li>For rendering on mathematics on non-mathml platforms we use <a href='#' class='externallink' linkto='https://mathjax.com'>Mathjax</a>.</li>\n</ul>\nNo external libraries were used for handling the mathematics, all has been custom built for Algebra Explorer.",
        sv: "<ul>\n<li>Appens infrastruktur är byggd med <a href='#' class='externallink' linkto='http://backbonejs.org'>Backbone</a>,\n<a href='#' class='externallink' linkto='http://underscorejs.org'>Underscore</a> och <a href='#' class='externallink' linkto='http://jquery.com'>jQuery</a>.</li>\n<li>Koden är skriven i <a href='#' class='externallink' linkto='http://coffeescript.org'>CoffeeScript</a></li>.\n<li>Kompileringsprocessen använder <a href='#' class='externallink' linkto='http://nodejs.org'>Node.js</a>.</li>\n<li>Kodtestning görs med <a href='#' class='externallink' linkto='http://vowsjs.org'>Vows.js</a>.</li>\n<li>Flaggorna i språkvalet kommer ifrån <a href='#' class='externallink' linkto='https://github.com/koppi/iso-country-flags-svg-collection'>Koppi's github repo</a>.</li>\n<li>Ikonerna inuti appen kommer ifrån en licens för <a href='#' class='externallink' linkto='https://glyphicons.com'>GlyphIcons Pro</a>.</li>\n<li>Appens ikoner och landningsskärm skapad av <a href='#' class='externallink' linkto='https://tristania.com'>Tjeerd van Saas</a>.</li>\n<li>Förpackning av appen för mobil gjord med <a href='#' class='externallink' linkto='https://cordova.apache.org'>Cordova</a>.</li>\n<li>Rendering av matematik på plattformar utan stöd för MathML görs med <a href='#' class='externallink' linkto='https://mathjax.com'>Mathjax</a>.</li>\n</ul>\nInga externa bibliotek har använts för matematikhanteringen, allt är specialskapat för Algebra Explorer."
      }
    }
  };

  latestversion = 0;

  info.changelog.description = {
    en: "",
    sv: ""
  };

  for (v in changelog) {
    change = changelog[v];
    if (!latestversion) {
      latestversion = v;
    }
    info.changelog.description.en += "<dt>" + v + "</dt><dd>" + change.en + "</dd>";
    info.changelog.description.sv += "<dt>" + v + "</dt><dd>" + change.sv + "</dd>";
  }

  info.changelog.description = {
    en: "<dl>" + info.changelog.description.en + "</dl>",
    sv: "<dl>" + info.changelog.description.sv + "</dl>"
  };

  makeInfoIndex = function(lang) {
    var cat, def, ret;

    ret = [];
    for (cat in info) {
      def = info[cat];
      ret.push([cat, def.headline[lang]]);
    }
    return ret.sort(function(o1, o2) {
      if (o1[1].toLowerCase() < o2[1].toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
  };

  if (typeof exports === "undefined") {
    exportTo = this.CATS.texts;
  } else {
    exportTo = exports;
  }

  _ref = {
    latestversion: latestversion,
    info: info,
    makeInfoIndex: makeInfoIndex,
    help: help
  };
  for (k in _ref) {
    v = _ref[k];
    exportTo[k] = v;
  }

}).call(this);
