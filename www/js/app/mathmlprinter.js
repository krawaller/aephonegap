(function(){var exportTo,helpers,print,printtexts,printwrap,spacewidth;if(typeof require==="function"){helpers=require("./helpers");printtexts=require("./texts_parser").parser.print}else{helpers=this.CATS.app.helpers;printtexts=this.CATS.texts.parser.print}printwrap=function(o,pre,markpaths,block,settings,nomark,noimplicit){var str;if(settings==null){settings={lang:"en"}}str="<math xmlns='http://www.w3.org/1998/Math/MathML' display='"+(block?"block":"inline")+"'>"+"<mrow>"+print(o,pre,markpaths,void 0,void 0,void 0,settings,nomark,noimplicit)+"</mrow></math>";if(settings.rendermode==="mathjax"){str="<script type='math/mml'>"+str+"</script>"}return str="<div class='mathobj' linkto='"+JSON.stringify(o)+"'>"+str+"</div>"};spacewidth="0.4em";print=function(o,pre,markpaths,me,parenttype,mypos,settings,nomark,noimplicit){var base,child,classes,denom,dividee,divider,exp,first,i,lang,log,name,numer,op,ret,second,signs,str,trgt,v;if(me==null){me=[]}lang=settings.lang;classes=o.type;if(o.isblock){classes+=" isblock"}str=function(){var _i,_j,_k,_len,_len1,_len2,_ref,_ref1,_ref2,_ref3,_ref4,_ref5;switch(o.type){case"isinteger":name=printtexts.isinteger[lang];trgt=print(o.objs[0],pre,markpaths,me.concat([0]),"isinteger",0,settings,nomark,noimplicit);return"<mrow class='"+classes+"'>"+trgt+"<mspace width='"+spacewidth+"' /><mo> "+name+"</mo></mrow>";case"log":trgt=print(o.objs[0],pre,markpaths,me.concat([0]),"log",0,settings,nomark,noimplicit);log=print(o.objs[1],pre,markpaths,me.concat([1]),"log",1,settings,nomark,noimplicit);return"<mrow><msub class='"+classes+"'><mi>log</mi>"+log+"</msub>"+trgt+"</mrow>";case"DIVTEST":dividee=print(o.objs[0],pre,markpaths,me.concat([0]),"DIVTEST",0,settings,nomark,noimplicit);divider=print(o.objs[1],pre,markpaths,me.concat([1]),"DIVTEST",1,settings,nomark,noimplicit);return"<mrow>"+dividee+("<mspace width='"+spacewidth+"' /><mo>")+printtexts.isdividable[lang]+("</mo><mspace width='"+spacewidth+"' />")+divider+"</mrow>";case"BOOLEAN":case"true":case"false":return"<mi>"+printtexts["logic"+("false"===o.val||"false"===o.type?"false":"true")][lang]+"</mi>";case"NOT":return"<mo>"+printtexts.logicNOT[lang]+"</mo>"+print(o.objs[0],pre,markpaths,me.concat([0]),"NOT",0,settings,nomark,noimplicit);case"XOR":first=print(o.objs[0],pre,markpaths,me.concat([0]),o.type,0,settings,nomark,noimplicit);second=print(o.objs[1],pre,markpaths,me.concat([1]),o.type,1,settings,nomark,noimplicit);op="&#8891;";return"<mrow>"+first+"<mo>"+op+"</mo>"+second+"</mrow>";case"AND":case"OR":name=printtexts["logic"+o.type][lang];ret="<mtable frame='none' rowlines='none'>";_ref=o.objs;for(i=_i=0,_len=_ref.length;_i<_len;i=++_i){v=_ref[i];ret+="<mtr><mtd>"+print(o.objs[i],pre,markpaths,me.concat([i]),o.type,i,settings,nomark,noimplicit)+"</mtd></mtr>";if(i<o.objs.length-1){ret+="<mtr><mtd><mrow mathcolor='#BBB'><mi>"+name+"</mi></mrow></mtd></mtr>"}}return ret+="</mtable>";case"ifelse":ret="<mtable frame='none' rowlines='none' columnalign='right left'>";ret+="<mtr><mtd><mi mathcolor='#BBB'>"+(printtexts["if"][lang]||"BAJSPOOP"+lang)+"</mi></mtd><mtd>"+print(o.objs[0],pre,markpaths,me.concat([0]),"ifelse",0,settings,nomark,noimplicit)+"</mtd></mtr>";ret+="<mtr><mtd><mi mathcolor='#BBB'>"+printtexts.then[lang]+"</mi></mtd><mtd>"+print(o.objs[1],pre,markpaths,me.concat([1]),"ifelse",1,settings,nomark,noimplicit)+"</mtd></mtr>";ret+="<mtr><mtd><mi mathcolor='#BBB'>"+printtexts["else"][lang]+"</mi></mtd><mtd>"+print(o.objs[2],pre,markpaths,me.concat([2]),"ifelse",2,settings,nomark,noimplicit)+"</mtd></mtr>";return ret+="</mtable>";case"number":return"<mn class='"+classes+"'>"+(settings.lang==="sv"?o.val.replace(".",","):o.val)+"</mn>";case"void":return"<mstyle mathcolor='red'><mi>&#8224;</mi></mstyle>";case"fraction":numer=print(o.objs[0],pre,markpaths,me.concat([0]),"fraction",0,settings,nomark,noimplicit);denom=print(o.objs[1],pre,markpaths,me.concat([1]),"fraction",1,settings,nomark,noimplicit);return"<mfrac class='"+classes+"'>"+((_ref1=numer.type)==="sum"||_ref1==="product"?numer:"<mrow>"+numer+"</mrow>")+((_ref2=denom.type)==="sum"||_ref2==="product"?denom:"<mrow>"+denom+"</mrow>")+"</mfrac>";case"demo":return"<mrow>"+print(o.objs[0],pre,markpaths,me.concat([0]),"demo",0,settings,nomark,noimplicit)+"<mo>&#8596;</mo>"+print(o.objs[1],pre,markpaths,me.concat([1]),"demo",1,settings,nomark,noimplicit)+"</mrow>";case"gives":return"<mrow>"+print(o.objs[0],pre,markpaths,me.concat([0]),"demo",0,settings,nomark,noimplicit)+"<mo>&rarr;</mo>"+print(o.objs[1],pre,markpaths,me.concat([1]),"demo",1,settings,nomark,noimplicit)+"</mrow>";case"sum":ret="";_ref3=o.objs;for(i=_j=0,_len1=_ref3.length;_j<_len1;i=++_j){v=_ref3[i];child=print(v,pre,markpaths,me.concat([i]),"sum",i,settings,nomark,noimplicit);ret+=child;if(i<o.objs.length-1&&!(i<o.objs.length-1&&((_ref4=o.objs[i+1].type)==="negation"||_ref4==="plusminus"))){ret+="<mo>+</mo>"}else{ret+=" "}}return"<mrow>"+ret+"</mrow>";case"product":ret="";_ref5=o.objs;for(i=_k=0,_len2=_ref5.length;_k<_len2;i=++_k){v=_ref5[i];child=print(v,pre,markpaths,me.concat([i]),"product",i,settings,nomark,noimplicit);ret+=child;if(i<o.objs.length-1){if(!noimplicit&&helpers.implicitmult(v,o.objs[i+1])){ret+="<mo>&#x2062;</mo>"}else{ret+="<mo>&middot;</mo>"}}}return"<mrow>"+ret+"</mrow>";case"variable":return"<mi>"+o.val+"</mi>";case"power":base=print(o.objs[0],pre,markpaths,me.concat([0]),"power",0,settings,nomark,noimplicit);exp=print(o.objs[1],pre,markpaths,me.concat([1]),"power",1,settings,nomark,noimplicit);return"<msup class='"+classes+"'>"+base+"<mrow>"+exp+"</mrow></msup>";case"negation":return"<mrow><mo>&#8722;</mo>"+print(o.objs[0],pre,markpaths,me.concat([0]),"negation",0,settings,nomark,noimplicit)+"</mrow>";case"plusminus":return"<mrow><mo>&#177;</mo>"+print(o.objs[0],pre,markpaths,me.concat([0]),"plusminus",0,settings,nomark,noimplicit)+"</mrow>";case"concept":return"<mrow><mi>&quot;"+o.val+"&quot;</mi></mrow>";case"absolute":return"<mfenced open='|' close='|'>"+print(o.objs[0],pre,markpaths,me.concat([0]),"absolute",0,settings,nomark,noimplicit)+"</mfenced>";case"relation":signs={eq:"&#61;",lt:"&lt;",gt:"&gt;",leq:"&le;",geq:"&ge;",neq:"&ne;"};return"<mrow>"+print(o.objs[0],pre,markpaths,me.concat([0]),"relation",0,settings,nomark,noimplicit)+("<mo>"+signs[o.val||"eq"]+"</mo>")+print(o.objs[1],pre,markpaths,me.concat([1]),"relation",1,settings,nomark,noimplicit)+"</mrow>";case"function":return"<mrow><mi>"+o.val+"</mi><mfenced separators=''>"+print(o.objs[0],pre,markpaths,me.concat([0]),"function",0,settings,nomark,noimplicit)+"</mfenced></mrow>";case"const":switch(o.val){case"pi":return"<mi>&#960;</mi>";case"undefined":return"<mi>"+printtexts["undefinedval"][settings.lang]+"</mi>";case"percent":return"<mi>%</mi>";default:return"<mi>"+o.val+"</mi>"}break;case"true":case"false":return"<mi>"+printtexts[o.type][settings.lang]+"</mi>";case"root":if(o.objs[1].type==="number"&&o.objs[1].val==="2"){return"<msqrt>"+print(o.objs[0],pre,markpaths,me.concat([0]),"root",0,settings,nomark,noimplicit)+"</msqrt>"}else{return"<mroot>"+print(o.objs[0],pre,markpaths,me.concat([0]),"root",0,settings)+print(o.objs[1],pre,markpaths,me.concat([1]),"root",1,settings,nomark,noimplicit)+"</mroot>"}break;default:return"<mi>"+o.type+"</mi>"}}();if(helpers.needsparens(o,parenttype,mypos)){str="<mfenced separators=''>"+str+"</mfenced>"}if(!nomark){if(helpers.matchAddress(me,[],[pre])){str="<mrow mathbackground='"+(!(markpaths.length||true)?"#C7D3FF":"#E7EDFF")+"'>"+str+"</mrow>"}else if(helpers.matchAddress(me,pre,markpaths)){str="<mrow mathbackground='#C7D3FF'>"+str+"</mrow>"}}return str};if(typeof exports==="undefined"){exportTo=this.CATS.app}else{exportTo=exports}exportTo.mathmlprinter=printwrap}).call(this);