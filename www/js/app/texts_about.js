// Generated by CoffeeScript 1.6.2
(function() {
  var about, exportTo, k, v, _ref;

  about = {
    changelog: {
      "0.12.04": {
        en: "Redid design",
        sv: "Ny design"
      },
      "0.11.28": {
        en: "Help system",
        sv: "Hjälpsystem"
      },
      "0.11.25": {
        en: "New stacking navigation",
        sv: "Ny stacknavigation"
      },
      "0.11.19": {
        en: "Course tab and lesson integration.",
        sv: "Kursavdelning och lektionsintegrering."
      },
      "0.10.28": {
        en: "Support for inequalities.",
        sv: "Stöd för olikheter."
      },
      "0.10.21": {
        en: "Overhaul of equation tools.",
        sv: "Allmän förbättring av ekvationsoperationer."
      },
      "0.10.19": {
        en: "Error handling for analysis. Smarter dimension selection (Android prep). Navigation redone. Variabelsubstitution.",
        sv: "Felhantering för analys. Förbättrat skärmlägesval utifrån fönsterstorlek (Android prep). Navigering omgjord. Variabelsubstitution."
      },
      "0.10.18": {
        en: "New dynamic descriptor in parser/closeup. Calculator nav work.",
        sv: "Ny dynamisk beskrivning i räknare/närbild. Ändring i räknarnavigering."
      },
      "0.10.17": {
        en: "Icons and splash screens. Ipad interface. Redid calculator section. Beta tester instructions.",
        sv: "Ikoner och startbilder. Ipadgränssnitt. Omgjord räknare. Instruktioner till Betatestare."
      },
      "0.10.16": {
        en: "New tool presentation. Textreporter hooked up to all errors. Bugfixes and CSS tweaks.",
        sv: "Ny presentation av verktyg. Textrapporterare generaliserad till samtliga fel. Bugfixes and CSS tweaks."
      },
      "0.10.15": {
        en: "Prerendered math for quicker startup. Control panel restructure. Started this log.",
        sv: "Förrenderade uttryck för snabb start. Kontrollpanelsdesign. Initierade denna logg."
      }
    },
    ui: {
      test: {
        en: "After testing the app, please do mail <a href='mailto:david@krawaller.se'>David</a> with any thoughts and ideas about what's working and what's not!",
        sv: "När du testat appen, maila (väldigt) gärna <a href='mailto:david@krawaller.se'>David</a> med tankar och funderingar kring vad som fungerar och inte fungerar!"
      },
      introheadline: {
        sv: "Välkommen till Algebra Explorer!",
        en: "Welcome to Algebra Explorer!"
      },
      introtext: {
        sv: "Denna app är en symbolhanterande miniräknare som visar deloperationerna och har en integrerad ordlista och lista över tillgängliga operationer. Förhoppningen är att detta skall leda till en ökad förståelse för algebra. Huruvida den lyckas eller inte är vad DU är här för att hjälpa till att ta reda på! :)",
        en: "This app is a symbolic calculator that shows all substeps and has an integrated glossary and a list of all operations. The hope is that this approach will facilitate algebraic understanding. Whether this actually works or not is exactly what YOU're here to help figure out! :)"
      },
      launchbutton: {
        sv: "Starta Algebra Explorer!",
        en: "Launch Algebra Explorer!"
      },
      todoheadline: {
        en: "To do",
        sv: "Kvar att göra"
      },
      todoexplanation: {
        en: "This application is still a work in progress, so mind the sharp corners! Here are the <strong>major items left to finish</strong> in the app:",
        sv: "Applikationen är fortfarande under utveckling, och innehåller därmed en del vassa kanter. Dessa är de <strong>stora återstående bitarna</strong> i själv applikationen:"
      },
      mathexplanation: {
        en: "This <strong>mathematical functionality</strong> is still missing for the first version:",
        sv: "Här är <strong>matematikfunktionaliteten</strong> som måste vara med i första versionen:"
      },
      bugexplanation: {
        en: "Here's a list of the <strong>known bugs</strong>:",
        sv: "Här är en lista över de <strong>hittills funna buggarna</strong>:"
      },
      futureexplanation: {
        en: "These features are planned for <strong>future versions</strong>:",
        sv: "Denna funktionalitet är planerad för <strong>framtida versioner</strong>:"
      },
      hasmathml: {
        en: "Your browser has MathML rendering capability, which will make Algebra Explorer run faster. In other browsers (Chrome, IE) a helper library is used to render the math, which makes for a slower experience.",
        sv: "Din webbläsare har MathML-rendering, vilket gör att Algebra Explorer fungerar bra. I andra webbläsare som saknar MathML-stöd (Chrome, IE) så används ett hjälpbibliotek för att rendera matematiken, vilket gör att det går långsammare."
      },
      missingmathml: {
        en: "Your browser has no support for MathML! That means Algebra Explorer will use a helper library to render the math, which makes for a slower experience. We recommend using a MathML-capable browser such as Safari or Firefox.",
        sv: "Din webbläsare saknar stöd för MathML! Det gör att Algebra Explorer använder ett hjälpbibliotek för att rendera matematiken, vilket går långsammare. Vi rekommenderar att du använder en webbläsare med MathML-stöd så som Safari eller Firefox."
      },
      portrait: {
        en: "portrait",
        sv: "porträtt"
      },
      landscape: {
        en: "landscape",
        sv: "landskap"
      },
      orientation: {
        en: "orientation",
        sv: "orientering"
      },
      ipad: {
        en: "iPad",
        sv: "iPad"
      },
      iphone: {
        en: "iPhone",
        sv: "iPhone"
      },
      size: {
        en: "Select window size",
        sv: "Välj fönsterstorlek"
      },
      done: {
        en: "done",
        sv: "klar"
      }
    },
    bug: {
      matchrootneg: {
        done: "2013-06-18",
        en: "incorrectly collapses root of negations like sqrt((-3)^2)",
        sv: "kollapsar felaktigt roten ur negationer som roten ur ((-3)^2)"
      },
      addobjects: {
        en: "Cannot add xy+x*-y.",
        sv: "Kan ej addera xy+x*-y."
      },
      jesperrel: {
        done: "2013-04-24",
        en: "Error on (x(d^e)/x(d/e))=(dex)",
        sv: "Fel vid (x(d^e)/x(d/e))=(dex)"
      },
      davidsameeq: {
        done: "2013-04-24",
        en: "Crashes on 5=5",
        sv: "Kraschar för 5=5"
      },
      ekvskum: {
        done: "2013-04-23",
        en: "Error on 8/3=2x+3",
        sv: "Fel vid 8/3=2x+3"
      },
      fracbapp: {
        done: "2013-04-26",
        en: "Chokes on 6/(3^2)",
        sv: "Kräks på 6/(3^2)"
      },
      parserprio: {
        en: "Make parser interpret for example 'x=3p and p=7' as '(x=3p) and (p=7)' instead of 'x=(3*(p and p)=7'",
        sv: "Gör så att tolkaren läser in till exempel 'x=3p och p=7' som '(x=3p) och (p=7)' istället för 'x=(3*(p och p)=7'"
      },
      complex: {
        en: "Fails for i^(3y)",
        sv: "Fel för i^(3y)"
      },
      eqwithneg: {
        en: "Fails for x2-(2xy)+y2=0",
        sv: "Fel för x2-(2xy)+y2=0"
      },
      negroot: {
        en: "Puts absolute values around collapsed roots even when odd",
        sv: "Sätter absolutvärden runt kollapsade rötter även när de är udda"
      }
    },
    todo: {
      roothandling: {
        done: "2013-06-30",
        en: "Handle arithmetics for roots such as sqrt(27)-sqrt(12)",
        sv: "Hantera aritmetik för rötter såsom roten ur 27 - roten ur 12"
      },
      mathrender: {
        done: "2013-05-01",
        en: "Make the math operations render nicer and more coherent",
        sv: "Rendera matteoperationerna snyggare och mer konsekvent"
      },
      round: {
        en: "Make AE approximate if needed.",
        sv: "Visa approximationer om sådana finns.",
        done: "2013-08-02"
      },
      info: {
        en: "Finish intro texts!",
        sv: "Färdigställ introduktionstexter!"
      },
      helpmode: {
        en: "Finish interactive tour, or replace by new help mode.",
        sv: "Färdigställ den interaktiva guidade turen, eller ersätt med nytt hjälpläge."
      },
      hidesubcalc: {
        done: "2013-04-21",
        en: "Hide substeps behind a button, so that only the full simplification is shown initially.",
        sv: "Dölj delstegen bakom en knapp, så att endast den fullständiga förenklingen visas initialt."
      },
      toolpresentation: {
        en: "Make operation presentation more readable.",
        sv: "Gör operationspresentationerna mer läsbara."
      },
      consistentvocabulary: {
        en: "Make the vocabulary used in the various operations consistent.",
        sv: "Gör det använda vokabuläret i operationsförklaringarna konsekvent."
      },
      centralfundamentalrulelist: {
        en: "Make a central list of all fundamental rules.",
        sv: "Gör en central lista över alla fundamentala regler."
      },
      loadscreen: {
        en: "Make proper loadscreen that shows what is being done.",
        sv: "Fixa iordning laddningsskärmen och lägg till meddelande om vad som görs."
      },
      mobilekeyboard: {
        en: "Add custom keyboard for mobile users.",
        sv: "Lägg till anpassat tagentbord för mobilanvändare."
      }
    },
    math: {
      abswork: {
        done: "2013-06-18",
        en: "Add absolute values and related functions",
        sv: "Lägg till hantering av absolutbelopp"
      },
      rootprod: {
        done: "2013-06-30",
        en: "Add root of products like sqrt(x2*16)",
        sv: "Lägg till hantering av rot ur produkter såsom roten ur (x2*16)"
      },
      simpleeq: {
        done: "2013-04-26",
        en: "Add solving of simple equations like '3x=11'",
        sv: "Lägg till lösning av enkla ekvationer såsom '3x=11'"
      },
      quadrcompl: {
        done: "2013-05-03",
        en: "Enable solving full quadratic equations",
        sv: "Lösning av fullständiga andragradsekvationer"
      },
      setupquadr: {
        en: "Enable solving of quadratic equations that need setup",
        sv: "Lösning av andragradsekvationer som kräver iordningställande"
      },
      hiddenquadr: {
        en: "Enable solving of 'hidden' quadratic equations such as x^8+x^4=5.",
        sv: "Lösning av 'dolda' andragradsekvationer såsom x^8+x^4=5."
      },
      substitution: {
        en: "Enable substitutions so we can solve equation systems",
        sv: "Inför substitutioner så vi kan lösa ekvationssystem"
      },
      root: {
        done: "2013-05-03",
        en: "Finish the basic root operations",
        sv: "Färdigställ grundläggande rotoperationer."
      },
      logic: {
        en: "Finish the logic operations.",
        sv: "Färdigställ operationerna med logik."
      }
    },
    future: {
      logarithms: {
        en: "Add support for logarithms and numbers on non-10 bases.",
        sv: "Lägg till logaritmer och tal på andra baser än 10."
      },
      prefix: {
        en: "Add support for prefixes such as deci, centi, mega, etc.",
        sv: "Lägg till support för prefix såsom deci, centi, mega, etc."
      },
      units: {
        en: "Add support for units such as meter, second.",
        sv: "Lägg till support för enheter såsom meter, sekund, etc."
      },
      geometry: {
        en: "Add support for geometry such as circles, triangles, areaOf, volumeOf, etc.",
        sv: "Lägg till support för geometri såsom cirklar, kuber, areaAv, volymAv, etc."
      },
      derivation: {
        en: "Add support for derivations, integrals and limits.",
        sv: "Lägg till support för derivator, integraler och gränsvärden."
      }
    }
  };

  if (typeof exports === "undefined") {
    exportTo = this.CATS.texts;
  } else {
    exportTo = exports;
  }

  _ref = {
    about: about
  };
  for (k in _ref) {
    v = _ref[k];
    exportTo[k] = v;
  }

}).call(this);
