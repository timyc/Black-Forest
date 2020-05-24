let tStories = 0;
let progress = 0;
let inventory = [0, 0, 0, 0, 0];

let texts = {
    '1': `<i>The afternoon sun gleams in your eyes. Today is the day for you to die. 
    All you have ever been to your clansmen is a disappointment. 
    The people you call your family have a ritual where those who cannot 
    carry their own weight are abandoned in the nearby forest, left to die.</i><br /><br />
    You take a quick glance at your surroundings. Looming ahead of you is the dreaded <b><u>forest</u></b>. 
    On the table next to you is some bread.`,
    '2': ``
}

$(function() {
    chatMessage(texts['1']);
});

function doChat() {
    let chatContent = document.getElementById('chatSequence').value;
    if (progress === 0) {
        if (chatContent.includes('forest')) {
            chatMessage(texts['2']);
        } else {
            chatMessage('Logical error')
        }
    }
    document.getElementById('chatSequence').value = "";
}

function chatMessage(arg) {
    $($.parseHTML('<li class="list-group-item" style="border-radius:0 !important; border:none !important;"> <span>' + arg + '</span></li>')).hide().prependTo("#story").fadeIn(1000);
    tStories++;
    if (tStories > 1) {
        $('#story li:last').remove();
        tStories--;
    }
}