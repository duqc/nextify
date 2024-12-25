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
function creatediv(){
    var div = document.createElement('img');
    div.id = 'overlay';
    div.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-PyUtdz3qbc_vBJng2Ze8eJJnspmt-JvsQ&s"

    if (document.body.firstChild){
        document.body.insertBefore(div, document.body.firstChild);
    }
    else{
        document.body.appendChild(div);
    }
    console.log("hella money hella money money money money")
    return div
}
var div = creatediv()
console.log(div)

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
if (document.location.host == "chapmanganato.to") {
    listofchapters = document.getElementsByClassName("navi-change-chapter")[0].options
    j = []
    for (var i = 0; i < listofchapters.length; i++) {
        j.push(listofchapters[i].dataset["c"]);
        //Do something
        if (listofchapters[i].outerHTML.includes("selected")) {
            currentchap = [listofchapters[i].dataset["c"], i]
        }
    }
    luh = document.location.href.replace("-" + currentchap[0], "")

    NextNonDecimal = ""
    for (var o = 1; o < 20; o++) {
        if (currentchap[1] - o < 0) {
            break
        }
        check = j[currentchap[1] - o]
        guh = check.includes(".")
        if (!guh) {
            NextNonDecimal = check
            break
        }
    }

    NextNonDecimalLink = luh + "-" + NextNonDecimal
}




window.addEventListener(
    "keydown",
    (event) => {
        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
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
                scroll(-50);
                break;

            case "s":
                scroll(50);
                break;

            case "Enter":
                if (NextNonDecimalLink != null) {
                    document.location.href = NextNonDecimalLink
                }
                break;

            case "a":
            case "ArrowLeft":
                //sound.play()
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
                break;
            case "d":
            case "ArrowRight":
                //sound.play()
                a = document.getElementsByClassName(classused[1]);
                if (a[1] == undefined) {
                    alert("this is the last chapter :(")
                }
                else if (getScrollPercent() < 30 || getScrollPercent() > 70 || getheight() < 10000) {
                    b = a[1].href
                    window.location.href = b
                }

                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }, true,
);