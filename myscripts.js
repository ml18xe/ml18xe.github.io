var question;
var answer;
var bag;
var incorrectBag;
var correctBag;
var questionNumber;

function init(){

    bag = new Bag();
    incorrectBag = new Bag();
    correctBag = new Bag();

    kanji = ["角","角度","三角","四角",
            "直前","直後","直す","正直","直行","直角",
            "値上げ","値下げ","値切る","値段",
            "全部","全く",
            "体","全体","人体","体育",
            "出身","身の上","身体",
            "知っている","知らない","知り合い","知人","無知","通知",
            "考える","思考","考古学",
            "～様","様子","様々",
            "市長","市民","市場",
            "町内","下町",
            "市町村","村長","小さい村",
            "旅行","旅先","旅館","旅立つ",
            "乗る","乗車","分乗","乗っ取る","乗馬",
            "有名","所有","有力","国有","私有",
            "無事","無口","無言","無休","有無",
            "生活","活動","活用","活字",
            "合計","時計","会計","計る",
            "計画","画家","絵画","画数",
            "例文","例えば","例年","例外","一例"];
    kana = ["かど","かくど","さんかく","しかく",
            "ちょくぜん","ちょくご","なおす","しょうじき","ちょっこう","ちょっかく",
            "ねあげ","ねさげ","ねぎる","ねだん",
            "ぜんぶ","まったく",
            "からだ","ぜんたい","じんたい","たいいく",
            "しゅっしん","みのうえ","しんたい",
            "しっている","しらない","しりあい","ちじん","むち","つうち",
            "かんがえる","しこう","こうこがく",
            "～さま","ようす","さまざま",
            "しちょう","しみん","いちば、しじょう",
            "ちょうない","したまち",
            "しちょうそん","そんちょう","ちいさいむら",
            "りょこう","たびさき","りょかん","たびだつ",
            "のる","じょうしゃ","ぶんじょうする","のっとる","じょうば",
            "ゆうめい","しょゆう","ゆうりょく","こくゆう","しゆう",
            "ぶじ","むくち","むごん","むきゅう","うむ",
            "せいかつ","かつどう","かつよう","かつじ",
            "ごうけい","とけい","かいけい","はかる",
            "けいかく","がか","かいが","かくすう",
            "れいぶん","たとえば","れいねん","れいがい","いちれい"];
    english = ["corner","degree of an angle","triangle","square",
            "immediately before/after","fix, correct","honest","go directly","right angle",
            "price increase; increase a price","price decrease; decrease a price","haggle over the price","price",
            "all","entirely, quite",
            "body","the whole, in (all)","the human body","physical education",
            "(be) from …","one's condition","body",
            "know","not know","acquaintance","acquaintance","ignorance","notification, communication; notify","Kochi Prefecture",
            "think","thinking, thought; think, consider","archaeology",
            "Mr./Ms. (honorific)","situation, aspect, appearance","various",
            "mayor","citizen, townspeople","marketplace, market",
            "neighborhood","downtown area",
            "cities, towns, and villages","village mayor","small village",
            "trip, travel; go travelling","destination","Japanese inn","start on a journey",
            "get on/in","get on a train/get in a car","pool people into separate cars","take over, commandeer, hijack","horseback riding",
            "famous","possession, ownership; possess","influential, powerful","state-owned","privately-owned",
            "safe and sound","taciturn, laconic","silent, mute","no holidays, always open (shop)","presence or absence, yes or no",
            "life; live","activity; be active","practical use; conjugate; make use of","printing",
            "total; sum up","clock, watch","accounting, paying a bill","time, calculate",
            "plan, project","painter","pictures, paintings","number of strokes",
            "sample sentence","for instance","normal year, every year","exception","one example"];

    console.log(kanji.length+" "+kana.length+" "+english.length);

    for(let i=0;i<kanji.length;i++){
        bag.add(bag.count(), [kanji[i],kana[i]+" - "+english[i]]);
        bag.add(bag.count(), [kana[i],kanji[i]+" - "+english[i]]);
    }

    questionNumber = Math.floor(Math.random() * bag.count());

    question = bag.get(questionNumber)[0];
    answer = bag.get(questionNumber)[1];
    document.getElementById("question").innerHTML = question;
}

function revealAnswer(){
    if(!document.getElementById("answer") && document.getElementById("question").innerHTML != "COMPLETE"){

        //Answer
        let x = document.createElement("p");
        let t = document.createTextNode(answer);
        
        x.id = "answer";
        x.className = "answer";
        x.appendChild(t);
        document.getElementById("center").appendChild(x);
        
        //Nav Buttons
        let remainingText = document.createElement("h1");
        let incorrectButton = document.createElement("button");
        let correctButton = document.createElement("button");
        let container = document.createElement("div");

        incorrectButton.onclick = function() {nextQuestion(false)};
        correctButton.onclick = function() {nextQuestion(true)};

        remainingText.id = "remainingText";
        container.id = "container";

        incorrectButton.className = "answer";
        correctButton.className = "answer";
        container.className = "bottom";

        remainingText.appendChild(document.createTextNode("Remaining: " + (bag.count()-1)));
        incorrectButton.appendChild(document.createTextNode("Incorrect: " + incorrectBag.count()));
        correctButton.appendChild(document.createTextNode("Correct: " + correctBag.count()));

        container.appendChild(incorrectButton);
        container.appendChild(correctButton);
        
        document.body.appendChild(container);
        document.body.appendChild(remainingText);

    }
}

function nextQuestion(correct){
    if(correct){
        correctBag.add(correctBag.count(), (bag.get(questionNumber)));
    }
    else{
        incorrectBag.add(incorrectBag.count(), (bag.get(questionNumber)));
    }
    bag.remove(questionNumber);

    if(bag.count() != 0 || incorrectBag.count() != 0){
        if(bag.count() == 0 && incorrectBag.count() != 0){
            bag = incorrectBag;
            incorrectBag = new Bag();
        }

        questionNumber = Math.floor(Math.random() * bag.count());

        question = bag.get(questionNumber)[0];
        answer = bag.get(questionNumber)[1];
        document.getElementById("question").innerHTML = question;
    }
    else{
        document.getElementById("question").innerHTML = "COMPLETE";
    }

    document.getElementById("answer").remove();
    document.getElementById("remainingText").remove();
    document.getElementById("container").remove();
}


function Bag() {
    var _items = {};
    var _itemCount = 0;

    return {
        add: function(key, item) { 
            _items[key] = item; 
            _itemCount++;
        },
        get: function(key) { 
            return _items[key]; 
        },
        remove: function(key) { 
            delete _items[key]; 
            _itemCount--;

            //mod
            for(let i=key;i<_itemCount;i++){
                _items[i] = _items[i+1];
            }
            delete _items[_itemCount]; 
        },
        clear: function() {
            _items = {};
        },
        count: function() {
            return _itemCount;
        },
        log: function() {
            for(var key in _items) {
                if (_items.hasOwnProperty(key)) {
                    console.log(key + " = " + _items[key]);
                }
              }
        }
    }
}