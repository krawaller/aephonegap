(function(){var canLearn,canLearnLesson,countDeps,def,exportTo,forgetLesson,forgetTool,getCurrentDB,getLessonStatus,getToolStatus,haslesson,k,learnLesson,learnTool,lessonid,lessons,loadeddb,maybeYellowLightTool,remainingOpsInLesson,saveDB,signalLesson,toolname,tools,v,_i,_len,_ref;tools=typeof require==="undefined"?this.CATS.math:require("../code/tools");lessons={sum101:{headline:{sv:"Introduktion till summor",en:"Sum basics"},description:{en:"One of the most fundamental constructions in mathematics are sums, which represent the concept of addition. This lessons lets you learn the characteristics of the sum by listing the basic sum operations.",sv:"En av de mest fundamentala konstruktionerna i matematiken är summor. Denna lektion låter dig lära dig summans egenskaper genom att lista de viktigaste summarelaterade operationerna."},links:["sum","term","number","addition","naturalnum","integer"]},product101:{headline:{sv:"Introduktion till produkter",en:"Product basics"},description:{en:"Next to sums, the most fundamental construction is the product. They represent the concept of multiplication. These are the most important product operations.",sv:"Näst efter summor så är produkter den viktigaste konstruktionen. Här är de viktigaste produktrelaterade operationerna."},links:["product","factor","factorise","multiplication","distribution"]},fraction101:{headline:{en:"Fraction basics",sv:"Introduktion till kvoter"},description:{en:"The third most important construction is the fraction, which represents division. Here's what you need to know to get started!",sv:"Den tredje viktigaste konstruktionen är kvoten, som representerar division. Här är det du behöver veta för att komma igång!"},links:["fraction","numerator","denominator","division","rationalnum"]},negation101:{headline:{en:"Negation basics",sv:"Introduktion till negationer"},description:{en:"In this lesson we come to know negations.",sv:"I denna lektion lär vi känna negationer, och vilka egenskaper de har."},links:["negation","neg1","switchedsigns"]},power101:{headline:{en:"Power basics",sv:"Introduktion till potenser"},description:{sv:"Även om potensen inte representerar ett eget räknesätt, utan bara är ett smidigt sätt att ange att något multipliceras med sig själv ett visst antal gånger, så är potensen en väldigt viktig byggsten i algebran. Här är de viktigaste potenslagarna!",en:"Even though powers are just a convenient way to represent that something is multiplied by itself a certain number of times, powers are still a very important building block in algebra. These are the most important power operations!"},links:["power","base","exponent"]},factorise:{headline:{en:"Factorise",sv:"Faktorisering"},description:{en:"Before we move further, we need to master the art of factorising.",sv:"Innan vi kan gå vidare så måste vi bemästra faktorisering."},links:["factorise"]},decimalnums:{headline:{en:"Decimal numbers",sv:"Decimaltal"},description:{en:"After simplifying an expression, Algebra Explorer will also try to express it in decimal form, if applicable. These are the operations involved in that process.",sv:"Efter att ha förenklat ett uttryck så försöker Algebra Explorer också uttrycka det i decimalform, med hjälp av dessa operationer."},links:["decimal","approximate"]},fraction102:{headline:{sv:"Kvoter del 2",en:"Fraction part 2"},description:{en:"Let's go deeper into the characteristics of the fraction!",sv:"Låt oss gräva djupare i vilka möjligheter som finns med att manipulera kvoter!"}},sum102:{headline:{sv:"Summor del 2",en:"Sums part 2"},description:{sv:"Äntligen är vi redo för att slå ihop termer på riktigt!",en:"Finally we're ready to really start mastering the merging of sums!"}},power102:{headline:{sv:"Potenser del 2",en:"Powers part 2"},description:{sv:"Dags för nästa steg i bollandet med potenser!",en:"Time for the next step in manipulating powers!"}},log101:{headline:{sv:"Introduktion till logaritmer",en:"Logarithm basics"},description:{sv:"I denna lektion tittar vi på grunderna i logaritmer.",en:"In this lesson we'll learn the basics of logarithms."}},log102:{headline:{sv:"Avancerade logaritmer",en:"Advanced logarithms"},description:{en:"Now we dive into the more advanced logarithm operations!",sv:"Nu tittar vi närmre på de mer avancerade operationerna som hanterar logaritmer!"}},logic101:{headline:{en:"Logic basics",sv:"Introduktion till logik"},description:{sv:"I Algebra Explorer lever logiken och matematiken sida vid sida, något som visar sig gynnsamt framför allt när man kommer till lösning av ekvationssystem. I denna lektion möter du de mest grundläggande logiska operationerna!",en:"In Algebra Explorer, logic and mathematics live side by side. This is something that proves valuable, especially when it comes to solving equations and equation systems. In this lesson you'll meet the most foundational logic operations!"},links:["logictrue","logicfalse","logicand","logicor","logicnot","ifelse"]},logicevaluations:{headline:{en:"Logic evaluations",sv:"Logiska utvärderingar"},description:{en:"We can use logic to make evaluations of mathematical constructions.",sv:"Vi kan använda logik för att utvärdera och ställa villkor på matematiska konstruktioner."},links:["integertest","divtest"]},roots101:{headline:{en:"Root basics",sv:"Grunderna i rötter"},description:{en:"Now you will be introduced to a special case of powers, namely when the exponent is a fraction with numerator 1. This power is so special it has received a special name and notation, namely roots!",sv:"Nu kommer du introduceras till ett specialfall av potenser, nämligen de där exponenten är en kvot med täljare 1. Dessa potenser är så speciella att de fått ett eget namn och skrivsätt, nämligen rötter!"},links:["root"]},complexconst:{headline:{en:"The complex constant i",sv:"Den komplexa konstanten i"},description:{en:"Now the time has come to get to know the complex constant i!",sv:"Nu har det blivit dags att lära känna den komplexa konstanten i!"},links:["constanti"]},relationmanip:{headline:{en:"Relation basics",sv:"Introduktion till relationer"},description:{en:"The most important bridge between logic and mathematics is the relation. It states something about the relation between two mathematical entities, which is either true or false.",sv:"Den viktigaste bron mellan logik och matematik är relationen. Den hävdar något om förhållandet mellan två matematiska objekt, som antingen är sant eller falskt."},links:["relation","equality","forbiddenequality","inequality","comparison","equation"]},posneg:{headline:{en:"Positive and negative",sv:"Positiv och negativ"},description:{en:"In this lesson you'll get to know some operations related to whether an expression is positive or negative.",sv:"I den här lektionen kommer du få lära känna ett antal operationer som handlar om huruvida ett uttryck är positivt eller negativt."},links:["absolute","plusminus"]},equationsolve:{headline:{en:"Equation solving",sv:"Ekvationslösning"},description:{en:"Now that we know about algebra, and the basics of relations, we're finally ready to start learning about solving equations!",sv:"Nu när vi lärt oss om algebra, och grunderna i relationer, så är vi äntligen redo att börja lösa ekvationer!"}},relationcomb:{headline:{en:"Relation combinations",sv:"Att kombinera relationer"},description:{en:"In this lesson we learn about combining relations in a disjunction or a conjunction.",sv:"I den här lektionen lär vi oss kombinera relationer i en disjunktion eller konjunktion."}}};for(_i=0,_len=lessons.length;_i<_len;_i++){lessonid=lessons[_i];lessons[lessonid].tools=[]}haslesson=0;for(toolname in tools){def=tools[toolname];if(!(def.info&&def.info.lesson)){continue}haslesson++;lessons[def.info.lesson].tools=(lessons[def.info.lesson].tools||[]).concat(toolname)}loadeddb=null;getCurrentDB=function(){var currentname;if(!loadeddb){currentname=CATS.settings.currentpupil||"AEDEFAULT";loadeddb=JSON.parse(localStorage.getItem("ALGEBRAEPLORERPUPIL_"+currentname)||JSON.stringify({}));if(!loadeddb.format){loadeddb={format:1,lessons:{},tools:loadeddb}}}return loadeddb};saveDB=function(){var currentname,db;currentname=CATS.settings.currentpupil||"AEDEFAULT";db=getCurrentDB();return localStorage.setItem("ALGEBRAEPLORERPUPIL_"+currentname,JSON.stringify(db))};signalLesson=function(lessonid){console.log("LESSONSIGNAL",lessonid);return Backbone.trigger("updatelesson",lessonid)};learnTool=function(toolname){var db,dep,_j,_len1,_ref,_results;db=getCurrentDB().tools;if(db[toolname]!==2){db[toolname]=2;saveDB();Backbone.trigger("learnedtool",toolname);if(tools[toolname].info.lesson){signalLesson(tools[toolname].info.lesson)}_ref=tools[toolname].info.usedby||[];_results=[];for(_j=0,_len1=_ref.length;_j<_len1;_j++){dep=_ref[_j];_results.push(maybeYellowLightTool(dep))}return _results}};forgetTool=function(toolname,mem){var can,db,dbtools,dep,_j,_len1,_ref,_results;if(!mem){mem={};mem[toolname]=true}db=getCurrentDB();dbtools=db.tools;if(dbtools[toolname]){can=canLearn(toolname);if(tools[toolname].info.uses&&can){dbtools[toolname]=1}else{delete dbtools[toolname]}Backbone.trigger(can?"forgottool":"losttouchoftool",toolname);lessonid=tools[toolname].info.lesson;if(lessonid){delete db.lessons[lessonid];signalLesson(lessonid)}saveDB();_ref=tools[toolname].info.usedby||[];_results=[];for(_j=0,_len1=_ref.length;_j<_len1;_j++){dep=_ref[_j];if(!(dbtools[dep]&&!mem[dep])){continue}mem[dep]=true;_results.push(forgetTool(dep,mem))}return _results}};countDeps=function(toolname,mem){var count,db,dep,_j,_len1,_ref;if(!mem){mem={};mem[toolname]=true}db=getCurrentDB().tools;count=0;_ref=tools[toolname].info.usedby||[];for(_j=0,_len1=_ref.length;_j<_len1;_j++){dep=_ref[_j];if(!(db[dep]===2&&!mem[dep])){continue}mem[dep]=true;count+=1+countDeps(dep,mem)}return count};maybeYellowLightTool=function(toolname){var db,dep,tinfo,_j,_len1,_ref;db=getCurrentDB().tools;tinfo=tools[toolname].info;if(db[toolname]===2||!tinfo.uses){return}console.log("Maybe yellowlight",toolname);_ref=tinfo.uses;for(_j=0,_len1=_ref.length;_j<_len1;_j++){dep=_ref[_j];if(!(tinfo.circle&&tinfo.circle.indexOf(dep)!==-1)){if(db[dep]!==2){console.log("Nope, because",dep,db[dep]);return false}}}db[toolname]=1;saveDB();Backbone.trigger("qualifiedtool",toolname);if(tools[toolname].info.lesson){return signalLesson(tools[toolname].info.lesson)}};canLearn=function(toolname){var db,dep,tinfo,_j,_len1,_ref;db=getCurrentDB().tools;tinfo=tools[toolname].info;_ref=tinfo.uses||[];for(_j=0,_len1=_ref.length;_j<_len1;_j++){dep=_ref[_j];if(dep!==toolname&&!db[dep]&&!(tinfo.circle&&tinfo.circle.indexOf(toolname)!==-1)){return false}}return true};getToolStatus=function(toolname){var db,_ref;db=getCurrentDB().tools;if(!((_ref=tools[toolname])!=null?_ref.info:void 0)){throw"SCHOOL strange tool "+toolname}if(db[toolname]){return["FOOBAR","yellow","green"][db[toolname]]}else if((tools[toolname].info.uses||[]).length===0){return"yellow"}else{return"red"}};canLearnLesson=function(lessonid){var db,_j,_len1,_ref;db=getCurrentDB().tools;_ref=lessons[lessonid];for(_j=0,_len1=_ref.length;_j<_len1;_j++){toolname=_ref[_j];if(db[toolname]!==2){return false}}return true};remainingOpsInLesson=function(lessonid){var count,db,_j,_len1,_ref;db=getCurrentDB().tools;count=0;_ref=lessons[lessonid].tools;for(_j=0,_len1=_ref.length;_j<_len1;_j++){toolname=_ref[_j];if(db[toolname]!==2){count++}}return count};getLessonStatus=function(lessonid){var db,_j,_len1,_ref;db=getCurrentDB();if(db.lessons[lessonid]){return"green"}else{_ref=lessons[lessonid].tools;for(_j=0,_len1=_ref.length;_j<_len1;_j++){toolname=_ref[_j];if(db.tools[toolname]!==2){return"red"}}return"yellow"}};learnLesson=function(lessonid){var db;db=getCurrentDB();db.lessons[lessonid]=true;signalLesson(lessonid);return saveDB()};forgetLesson=function(lessonid){var db;db=getCurrentDB();delete db.lessons[lessonid];signalLesson(lessonid);return saveDB()};if(typeof exports==="undefined"){exportTo=this.CATS.school}else{exportTo=exports}_ref={canLearn:canLearn,maybeYellowLightTool:maybeYellowLightTool,signalLesson:signalLesson,remainingOpsInLesson:remainingOpsInLesson,countDeps:countDeps,lessons:lessons,getToolStatus:getToolStatus,learnTool:learnTool,forgetTool:forgetTool,getCurrentDB:getCurrentDB,getLessonStatus:getLessonStatus,learnLesson:learnLesson,forgetLesson:forgetLesson,haslesson:haslesson};for(k in _ref){v=_ref[k];exportTo[k]=v}}).call(this);