(function(){var exportTo,k,parser,v,_ref;parser={print:{logictrue:{en:"true",sv:"sant"},logicfalse:{en:"false",sv:"falskt"},undefinedval:{en:"undefined",sv:"odefinierad"},logicOR:{en:"or",sv:"eller"},logicAND:{en:"and",sv:"och"},logicNOT:{en:"not",sv:"ej"},isinteger:{sv:"är heltal",en:"is integer"},isdividable:{sv:"är delbart med",en:"is divisible by"},"if":{sv:"om",en:"if"},then:{sv:"så",en:"then"},"else":{sv:"annars",en:"else"}},"const":{percent:{all:["%","pc",/(pro|per) *cent/]},undefined:{en:/undefined/i,sv:/odefiniera(t|d)/i},pi:{all:["pi","π"]},i:{all:"i"},e:{all:"e"}},postunary:{isinteger:{sv:/\ *(är ?)?(ett ?)?heltal/,en:/\ *(is ?)?(an? ?)?int(eger)?/}},binaryops:{REVDIVTEST:{sv:"delar",en:/divides|divs/},REVlog:{sv:[/log(aritme?n?)?( av)?/i],en:[/log(arithm)?( of)?/i]},DIVTEST:{all:["|"],sv:[/delas ?(av)?/,/(är )?delbart?( med)?/i,/innehåller faktorn?/i],en:[/(is )?(divisible|divided)( by)?|(is ?)?div ?by/i,/contains (the)? ?factor/i]},fraction:{all:["/","÷","÷"],sv:[/(delat|dividerat|div) *(med)*/,"genom"],en:[/divided *by|div/,"through","over"]},sum:{all:"+",sv:[/pluss?/,/addera(d|t) *(med|till)/],en:["plus",/added *(to|with)/]},power:{all:["^","^"],sv:[/upphöj(d|t)? ?(med|till)?/,"upp"],en:[/raised *by/,/to( the power( *of)*)*/,"pow"]},product:{all:["*","∗","⋅","•","×","×","·"],sv:["gånger","ggr",/(gångrat|mult(iplicera(t|d))*) *(med|till)*/i],en:["times","multiplied with","by"]},AND:{all:"^",sv:["och"],en:["and"]},OR:{all:"∨",sv:["eller"],en:"or"},root:{sv:[/-?rot(en)? ?(ur|av)?/],en:[/root ?(of)?/]},demo:{all:"demo"},IFELSEthen:{sv:"så",en:"then"},IFELSEelse:{sv:"annars",en:"else"}},relation:{leq:{all:["<=","=<"],sv:[/mel|(är)* *mindre *(än)* *(eller *)*(lika|samma) *(med|som)*/,/(är)* *(lika|samma) *(med|som)* *eller*mindre *(än)*/],en:[/leq|(is)* *(less|lower) *(than)* *(or)*(equals*|same) *(to|with|as)*/,/(is)* *(equals*|same) *(to|with|as)* *or*(less|lower) *(than)*/]},geq:{all:[">=","=>"],sv:[/sel|(är)* *(större|mer) *(än)* *(eller *)*(lika|samma) *(med|som)*/,/(är)* *(lika|samma) *(med|som)* *eller*(större|mer) *(än)*/],en:[/geq|(is)* *(more|bigger|larger) *(than)* *(or)* *(equals*|same) *(to|with|as)*/,/(is)* *(equals*|same) *(to|with|as)* *or* *(more|bigger|larger) *(than)*/]},neq:{all:["<>","!=","≠"],sv:/är ?(ej|inte|icke)(lika|samma)?(med|som)?|(är ?)?(ej|inte|icke)(lika|samma|som)(med|som)*/,en:/neq|((is *)*not|isnt|isn't)(( *the *)*(same *)*(as)*|equal( *to)*)/},lt:{all:"<",sv:/mä|(är)* *mindre *(än)*/,en:/lt|(is)* *(less|lower) *(than)*/},gt:{all:">",sv:/sä|(är)* *(mer|större) *(än)*/,en:/gt|(is)* *(more|bigger|larger) *(than)*/},eq:{all:["="],sv:[/(är *)*(lika|samma)* *(med|som)*/],en:[/(is *)*(equals*|same)* *(to|with|as)*/]}},"function":{log:{all:"log"},ln:{all:"ln"}},"boolean":{"true":{en:"true",sv:/san[nt]/},"false":{en:"false",sv:/falskt?/}},preunary:{plusminus:{all:["+-","-+"]},neutral:{all:"+"},negation:{all:["-","minus","−"]},NOT:{all:["!"],sv:/ej|inte|icke/,en:"not"},sqrt:{all:"√",sv:[/((andra|kvadrat) ?)?rot(en)? ?(ur|av)?/],en:[/((second ?)?root|sqrt) ?(of)?/]},cbrt:{sv:[/(tredje|kubik) ?rot(en)? ?(ur|av)?/],en:[/cbrt|(third|cubic|cube) ?root ?(of)?/]},log:{en:[/lo?g(arithm)?( of)?/i],sv:[/lo?g(aritme?n?)?( av)?/i]},ln:{en:[/ln( of)?/i],sv:[/ln( av)?/i]},absolute:{en:/abs(olute )?(valu?e? )?(of )?/,sv:/abs(oluta?)? ?(belopp|värde)?e?t? ?(av )?/},IFELSEif:{en:"if",sv:"om"}}};if(typeof exports==="undefined"){exportTo=this.CATS.texts}else{exportTo=exports}_ref={parser:parser};for(k in _ref){v=_ref[k];exportTo[k]=v}}).call(this);