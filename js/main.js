let tStories = 0;
let progress = 0;
let inventory = [0, 0, 0, 0, 0];

let texts = {
    'error': `Logical error`,
    '1': `<i>The afternoon sun gleams in your eyes. Today is the day for you to die. 
    All you have ever been to your clansmen is a disappointment. 
    The people you call your family have a ritual where those who cannot 
    carry their own weight are abandoned in the nearby forest, left to die.</i><br /><br />
    You take a quick glance at your surroundings. Looming ahead of you is the dreaded <b><u>forest</u></b>. 
    On the table next to you is some bread.`,
    '2': `<i>Well, this will probably be your last meal anyway. Can't hurt to take some bread. You stuff the bread into your pocket.</i> 
Now what? Looming ahead of you is the dreaded <b><u>forest</u></b>.`,
    '3': `<i>The forest is quite dark. You could barely see five feet ahead of you. Surprisingly, walking through the forest felt peaceful.</i>
You have not walked far from your village yet. Continuing <b><u>walking</u></b> seems to be the only option here?`,
    '4': `<i>How genius! You crumble the bread that you brought along with you and create a trail behind you. This reminds you of that one story
your parents read to you when you were a child.</i> <b><u>Walking</u></b> further into the forest seems less of a threat now.`,
    '5': `<i>You reach into your pocket for bread. But wait, did you even remember to bring bread with you? It seems like you forgot!</i> 
Continuing <b><u>walking</u></b> seems to be the only option.`,
    '6': `<i>The sun is almost setting. You've been walking for quite a while now. Looking into the sky, you see crows circling above you.
You've been taught that it's never a good idea to wander in the woods during the night.</i>`
}

$(function() {
    chatMessage(texts['1']);
});

function doChat() {
    let chatContent = document.getElementById('chatSequence').value.toLowerCase();
    if (progress === 0) {
        if (chatContent.includes('forest')) {
            chatMessage(texts['3']);
            progress++;
        } else if (chatContent.includes('bread') && inventory[0] === 0) {
            inventory[0] = 1;
            chatMessage(texts['2']);
        } else {
            chatMessage(texts['error']);
        }
    } else if (progress === 1) {
        if (chatContent.includes('bread') && inventory[0] === 1) {
            inventory[0] = 0;
            chatMessage(texts['4']);
        } else if (chatContent.includes('bread') && inventory[0] === 5) {
            chatMessage(texts['5']);
        } else if (chatContent.includes('walking')) {
            chatMessage(texts['6']);
            progress++;
        } else {
            chatMessage(texts['error'])
        }
    } else {
        chatMessage(texts['error'])
    }
    document.getElementById('chatSequence').value = "";
}

function chatMessage(arg) {
    $($.parseHTML('<li class="list-group-item" style="border-radius:0 !important; border:none !important;"> <span>' + arg + '</span></li>')).hide().appendTo("#story").fadeIn(1000);
    tStories++;
    if (tStories > 1) {
        $('#story li:first').remove();
        tStories--;
    }
}