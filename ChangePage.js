useAltEnterFunction = true // should probbly make a like dropdown menu for this idk. toggles using the next whole number chapter function instead of next non decimal
tempNextChapFix = true //dude they broke the fucking site how the fuck is that even possible. fixes the next link by doing some fucky shit

function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

function getheight() {
    var body = document.body,
        html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    return height;
}


function scroll(x) {
    window.scrollBy({
        top: x,
        behavior: "smooth"
    })
}
function creatediv() {
    var div = document.createElement('div');
    div.id = 'overlay';
    div.innerText = "Next non decimal chapter is chapter: "
    sty = div.style;
    sty.position = "fixed"
    sty.color = "white"
    sty.backgroundColor = "grey"
    sty.opacity = "25%"
    sty.marginLeft = "80px"
    sty.zIndex = "999"
    if (document.body.firstChild) {
        document.body.insertBefore(div, document.body.firstChild);
    }
    else {
        document.body.appendChild(div);
    }
    return div
}
var div = creatediv()

currentchap = ""
if (document.location.host == "mangakakalot.com") {
    console.log("Hello Bro =)")
    try {
        FACKYOUMAN = document.getElementsByClassName("fb-comments fb_iframe_widget fb_iframe_widget_fluid_desktop")
        FACKYOUMAN[0].innerHTML = ""
    } catch (error) {
        console.log(error)
    }
}

async function duuude() {
    await new Promise(r => setTimeout(r, 2000));
    listofchapters = document.getElementsByClassName(" border-r border-l rounded-none border-gray-300 dark:border-gray-600 flex-1 ")[0].options
    j = []
    for (var i = 0; i < listofchapters.length; i++) {
        j.push(listofchapters[i].innerHTML.match(/(\d+)/))[0];
        if (listofchapters[i].outerHTML.includes("selected")) {
            currentchap = [listofchapters[i].innerHTML.match(/(\d+)/)[0] , i]
        }
    }
    luh = document.location.href.replace("-" + currentchap[0], "")

    nextchapter = currentchap[1]
    previouschapter = 
    currentchapwholenumber = Array.from(j[currentchap[1]])[0]
    NextNonDecimal = ""

    lastchap = j[0][0]
    
    for (var o = 1; o < 20; o++) {
        if (o == 1){
            try {
                nextChapter = j[currentchap[1] - o]
            } catch (error) {
                nextChapter = currentchap[1]
            }
            
            try {
                previouschapter = j[currentchap[1] + o]
            } catch (error) {
                previouschapter = currentchap[1]
            }
            
        }
        if (currentchap[1] - o < 0) {
            break
        }
        check = j[currentchap[1] - o][0]

        if (
            Array.from(check)[0] >
            currentchapwholenumber 
            && useAltEnterFunction
        ) {
            console.log("perhaps you wanted to go to chapter " + check)     
            NextNonDecimal = check
            numbertween = o
            break
        }

        guh = check.includes(".")
        if (!guh) {
            NextNonDecimal = check
            numbertween = o
            break
        }
    }

    if (NextNonDecimal == "") {
        console.log("no next decimal link")
        div.innerText = "all remaining chapters are sliced or this is the last chapter"
        NextNonDecimalLink = null
    }
    else {
        //div.innerText = div.innerText + NextNonDecimal
        div.innerText = div.innerText + "\r\ncurent chapter is chapter:" + Array.from(j[currentchap[1]])[0]// + "\r\nyou would be skipping " + numbertween + " chapter(s) \r\n"
        div.innerText = div.innerText + "\r\nlast chapter = " + lastchap + " There are " + (lastchap-currentchap[0]) +" chapters left"
        NextNonDecimalLink = luh + "-" + NextNonDecimal
        nextLink = luh + "-" + nextChapter
        prevLink = luh + "-" + previouschapter
    }
    
}



if (document.location.host == "comick.io") {
    duuude()
}




window.addEventListener(
    "keydown",
    (event) => {
        if (event.defaultPrevented) {
            return;
        }

        if (document.location.host == "chapmanganato.to" || document.location.host == "chapmanganelo.com") {
            classused = ["navi-change-chapter-btn-prev a-h", "navi-change-chapter-btn-next a-h"]
        } else if (document.location.host == "mangakakalot.com") {
            classused = ["next", "back"]
        } else {
            classused = ["col-md-6 next-post", "col-md-6 prev-post"]
        }



        switch (event.key) {
            case "q":
                scroll(-700);
                break;
            case "e":
                scroll(700)
                break;

            case "w":
                scroll(-200);
                break;

            case "s":
                scroll(200);
                break;

            case "Enter":
                if (NextNonDecimalLink != null) {
                    document.location.href = NextNonDecimalLink
                }
                else {
                    console.log("none")
                }
                break;

            case "a":
            case "ArrowLeft":
                if (document.location.host != "comick.io"){
                    if (tempNextChapFix){
                        if (previouschapter == currentchap[1]){
                            console.log ("somethings fucked")
                        }else{
                            console.log("help me help4")
                            window.location.href = prevLink
                        }
                        break;
                    } 

                    a = document.getElementsByClassName(classused[0]);
                    if (classused[0] == "col-md-6 next-post") {
                        a[1] = a[1].children[0]
                    }
                    if (a[1] == undefined) {
                        alert("this is the first chapter")
                    }
                    else if (getScrollPercent() < 30 || getScrollPercent() > 70 || getheight() < 10000) {
                        b = a[1].href
                        window.location.href = b
                    }
                }
                break;
            case "d":
            case "ArrowRight":
                if (document.location.host != "comick.io"){
                    if (tempNextChapFix){
                        if (nextChapter == currentchap[1]){
                            console.log ("somethings fucked")
                        }else{
                            console.log("help me help4")
                            window.location.href = nextLink
                        }
                        break;
                    } 

                    a = document.getElementsByClassName(classused[1]);
                    if (a[1] == undefined) {
                        alert("this is the last chapter :(")
                    }
                    else if (getScrollPercent() < 30 || getScrollPercent() > 70 || getheight() < 10000) {
                        b = a[1].href
                        console.log(b)
                        //window.location.href = b
                    }
                }
                break;
            default:
                return;
        }
        event.preventDefault();
    }, true,
);
