(function(){var exportTo,helpers,objprint,types,vals;if(typeof require==="function"){helpers=require("./helpers")}else{helpers=this.CATS.app.helpers}types={sv:{root:"rot",power:"potens",product:"produkt",sum:"summa",number:"tal","const":"knst",variable:"var",AND:"konj",OR:"disj",fraction:"kvot",relationeq:"=",relationneq:"!=",relationlt:"<",relationleq:"<=",relationgt:">",relationgeq:">=",negation:"neg",NOT:"ej",ifelse:"omså",DIVTEST:"div?",isinteger:"hel?",plusminus:"+-","true":"sant","false":"falskt","void":"?"},en:{root:"root",power:"pow",product:"prod",sum:"sum",number:"nbr","const":"cnst",variable:"var",AND:"conj",OR:"disj",fraction:"frac",relationeq:"=",relationneq:"!=",relationlt:"<",relationleq:"<=",relationgt:">",relationgeq:">=",negation:"neg",NOT:"not",ifelse:"ifthen",DIVTEST:"div?",isinteger:"int?",plusminus:"+-","true":"true","false":"false","void":"?"}};vals={sv:{undefined:"odef",percent:"%",e:"e",i:"i",pi:"π"},en:{undefined:"undef",percent:"%",e:"e",i:"i",pi:"π"}};objprint=function(o,prepath,markpaths,me,child,lang,jedenachka){var isatom,kid,kidpos,kids,markclass,pre,type,val,_i,_len,_ref;if(me==null){me=[]}isatom=!o.hasOwnProperty("objs");console.log("Now we're gonna print ffs.",prepath,markpaths,me,typeof me,lang);if(helpers.matchAddress(me,[],[prepath])){markclass=markpaths.length||true?"markme ":"markpart "}else if(helpers.matchAddress(me,prepath,markpaths)){markclass="markpart "}else{markclass="ffs "}if(jedenachka){markclass+="lonechild "}pre="<span class='"+markclass+(o.root?"root ":"")+"structobj "+o.type+" "+(isatom||"parent")+"' data-addr='"+(me.length+"|"+me.join(","))+"'>";type=o.objs&&o.val?o.type+o.val:o.type;type="<span class='structtype'>"+(types[lang][type]||type)+"</span>";if(!o.objs&&!o.val){o.val="&nbsp;"}val=o.val&&!o.objs?"<span class='structval'>"+(vals[lang][o.val]||o.val)+"</span>":"";kids="";if(o.objs){kids+="<span class='structobjs group'>";_ref=o.objs;for(kidpos=_i=0,_len=_ref.length;_i<_len;kidpos=++_i){kid=_ref[kidpos];kids+=objprint(kid,prepath,markpaths,me.concat([kidpos]),true,lang,o.objs.length===1)}kids+="</span>"}if(child){return pre+type+val+kids+"</span>"}else{return"<span class='objbox group'>"+pre+type+val+kids+"</span></span>"}};if(typeof exports==="undefined"){exportTo=this.CATS.app}else{exportTo=exports}exportTo.objprinter=objprint}).call(this);