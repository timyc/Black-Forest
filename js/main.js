let tStories = 0;
let progress = 0;
let inventory = [0, 0, 0, 0, 0];
let special = [0, 0, 0];

let texts = {
    'error': `Logical error`,
    '1': `<i>The afternoon sun gleams in your eyes. Today is the day for you to die. 
    All you have ever been to your clansmen is a disappointment. 
    The people you call your family have a ritual where those who cannot 
    carry their own weight are abandoned in the nearby forest, left to die.</i><br /><br />
    You take a quick glance at your surroundings. Looming ahead of you is the dreaded <b><u>forest</u></b>. 
    On the table next to you is some bread.`,
    '2': `<i>Well, this will probably be your last meal anyway. Can't hurt to take some bread. You stuff the bread into your pocket.</i> <br /><br />
Now what? Looming ahead of you is the dreaded <b><u>forest</u></b>.`,
    '3': `<i>The forest is quite dark. You could barely see five feet ahead of you. Surprisingly, walking through the forest felt peaceful.</i><br /><br />
You have not walked far from your village yet. Continuing <b><u>walking</u></b> seems to be the only option here?`,
    '4': `<i>How genius! You crumble the bread that you brought along with you and create a trail behind you. This reminds you of that one story
your parents read to you when you were a child.</i><br /><br /> <b><u>Walking</u></b> further into the forest seems less of a threat now.`,
    '5': `<i>You reach into your pocket for bread. But wait, did you even remember to bring bread with you? It seems like you forgot!</i> <br /><br />
Continuing <b><u>walking</u></b> seems to be the only option.`,
    '6': `<i>The sun is almost setting. You've been walking for quite a while now. Looking into the sky, you see crows circling above you.
You've been taught that it's never a good idea to wander in the woods during the night.</i><br /><br /> Perhaps it is time to create a <b><u>campfire</u></b>? Or maybe <b><u>explore</u></b> a little further?`,
    'gameOver1': `<i>As you go deeper and deeper into the forest, the sky also becomes darker. Soon, you realize you cannot even see two feet ahead of you.
 Glowing eyes appear all around you. Those were definitely not the most friendly looking eyes you've seen in your life. You quickly fumble around to gather sticks to make a fire.
 But alas, it was too late. Pain shoots up your arm as you feel something bite into it. Slowly, you are consumed by these unknown creatures. Thankfully, you already passed out before the pain became unbearable.</i>
<br /><br /><b>Game Over</b>. To play again, refresh the page.`,
    '7': `<i>You begin gathering sticks on the forest floor. Soon, you have a bundle ready to be burned. Rubbing two sticks quickly together, you spark a fire. 
Now that you have made a fire, the forest seems less menacing.</i><br /><br /> It is time to make a <b><u>shelter</u></b> or maybe it's just time to <b><u>sleep</u></b>. After all, what's there to be scared of?`,
    'gameOver2': `<i>You lie down to sleep. As you start to drift off, you hear rustling noises all around you. You vaguely remember something about a cannibal tribe inhabiting this ancient forest.
 Snapping awake, you try to run. But it was too late. Pain shoots through your body as you are impaled by the spear of one of the cannibals. The last thing you see before drifting off into oblivion is the blood encrusted smile of a hideous humanoid.</i>
<br /><br /><b>Game Over</b>. To play again, refresh the page.`,
    '8': `<i>You dig a medium sized hole in the ground and cover it with leaves. Then, you interlock sticks to create a shield like structure. With all of that done, you lie down in the hole and place the stick structure over you.
 It didn't seem long before you were awaken by the rays of the morning son. You sit up and stretch a little.</i><br /><br /> `
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
        } else if (chatContent.includes('turn back')) {
            cutscene1();
        } else {
            makeLogicalError();
        }
    } else if (progress === 1) {
        if (chatContent.includes('bread') && inventory[0] === 1) {
            inventory[0] = 0;
            special[0] = 1;
            chatMessage(texts['4']);
        } else if (chatContent.includes('bread') && inventory[0] === 5) {
            chatMessage(texts['5']);
        } else if (chatContent.includes('walk')) {
            chatMessage(texts['6']);
            progress++;
        } else {
            makeLogicalError();
        }
    } else if (progress === 2) {
        if (chatContent.includes('fire')) {
            chatMessage(texts['7']);
            progress++;
        } else if (chatContent.includes('explor')) {
            chatMessage(texts['gameOver1']);
            disablePlay();
        } else if (chatContent.includes('back') && special[0] === 1) {
            cutscene2();
        } else {
            makeLogicalError();
        }
    } else if (progress === 3) {
        if (chatContent.includes('shelter')) {
            chatMessage(texts['8']);
            progress++;
        } else if (chatContent.includes('sleep')) {
            chatMessage(texts['gameOver2']);
            disablePlay();
        } else if (chatContent.includes('back') && special[0] === 1) {
            cutscene3();
        } else {
            makeLogicalError();
        }
    } else {
        makeLogicalError();
    }
    document.getElementById('chatSequence').value = "";
}

function chatMessage(arg) {
    $($.parseHTML('<li class="list-group-item" style="border-radius:0 !important; border:none !important;"> <span>' + arg + '</span></li>')).hide().appendTo("#story").fadeIn(1000);
    document.getElementById('chatSequence').classList.remove('is-invalid');
    document.getElementById('chatSequence').placeholder = 'What do you want to do?';
    tStories++;
    if (tStories > 1) {
        $('#story li:first').remove();
        tStories--;
    }
}

function makeLogicalError() {
    document.getElementById('chatSequence').classList.add('is-invalid');
    document.getElementById('chatSequence').placeholder = texts['error'];
}

function disablePlay() {
    document.getElementById('playButton').disabled = true;
    document.getElementById('chatSequence').disabled = true;
}

function cutscene1() {
    $('#main').fadeTo(500, 0, function() {
        document.getElementById('main').style.display = "none";
        $('#cutscenes').fadeTo(500, 1, function() {
            document.getElementById('cutscenes').style.display = "";
            setTimeout(function() {
                $('#cutsceneText').fadeTo(500, 1, function() {
                    $($.parseHTML('<span class="font-italic" style="font-size: 1.5em">"No, today is not the end," you think to yourself as anger flows through you.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                });
                setTimeout(function() {
                    $('#cutsceneText').fadeTo(500, 0, function() {
                        document.getElementById('cutsceneText').innerHTML = "";
                    });
                    setTimeout(function() {
                        $('#cutsceneText').fadeTo(500, 1, function() {
                            $($.parseHTML('<span class="font-italic" style="font-size: 1.5em">Evil traditions need to be broken with change.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                        });
                        setTimeout(function() {
                            $('#cutsceneText').fadeTo(500, 0, function() {
                                document.getElementById('cutsceneText').innerHTML = "";
                            });
                            setTimeout(function() {
                                $('#cutsceneText').fadeTo(500, 1, function() {
                                    $($.parseHTML('<span class="font-italic" style="font-size: 1.5em">Today is the day you will change the fate of your lineage.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                                });
                                setTimeout(function() {
                                    $('#cutsceneText').fadeTo(500, 0, function() {
                                        document.getElementById('cutsceneText').innerHTML = "";
                                    });
                                    setTimeout(function() {
                                        $('#cutsceneText').fadeTo(500, 1, function() {
                                            $($.parseHTML('<span class="font-weight-bold" style="font-size: 2em">The End</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                                        });
                                        setTimeout(function() {
                                            $('#cutsceneText').fadeTo(1000, 0, function() {
                                                document.getElementById('cutsceneText').innerHTML = "";
                                                document.getElementById('cutscenes').style.display = "none";
                                                $('#main').fadeTo(3000, 1, function() {
                                                    document.getElementById('main').style.display = "";
                                                });
                                            });
                                        }, 75000);
                                    }, 1000);
                                }, 7500);
                            }, 1000);
                        }, 7500);
                    }, 1000);
                }, 7500);
            }, 1000);
        });
    });
}

function cutscene2() {
    $('#main').fadeTo(500, 0, function() {
        document.getElementById('main').style.display = "none";
        $('#cutscenes').fadeTo(500, 1, function() {
            document.getElementById('cutscenes').style.display = "";
            setTimeout(function() {
                $('#cutsceneText').fadeTo(500, 1, function() {
                    $($.parseHTML('<span class="font-italic" style="font-size: 1.5em">So the breadcrumbs did come in handy. You slowly walk back to the village.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                });
                setTimeout(function() {
                    $('#cutsceneText').fadeTo(500, 0, function() {
                        document.getElementById('cutsceneText').innerHTML = "";
                    });
                    setTimeout(function() {
                        $('#cutsceneText').fadeTo(500, 1, function() {
                            $($.parseHTML('<span class="font-italic" style="font-size: 1.5em">"No, today is not the end," you think to yourself as anger flows through you.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                        });
                        setTimeout(function() {
                            $('#cutsceneText').fadeTo(500, 0, function() {
                                document.getElementById('cutsceneText').innerHTML = "";
                            });
                            setTimeout(function() {
                                $('#cutsceneText').fadeTo(500, 1, function() {
                                    $($.parseHTML('<span class="font-italic" style="font-size: 1.5em">Evil traditions need to be broken with change.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                                });
                                setTimeout(function() {
                                    $('#cutsceneText').fadeTo(500, 0, function() {
                                        document.getElementById('cutsceneText').innerHTML = "";
                                    });
                                    setTimeout(function() {
                                        $('#cutsceneText').fadeTo(500, 1, function() {
                                            $($.parseHTML('<span class="font-italic" style="font-size: 1.5em">Today is the day you will change the fate of your lineage.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                                        });
                                        setTimeout(function() {
                                            $('#cutsceneText').fadeTo(500, 0, function() {
                                                document.getElementById('cutsceneText').innerHTML = "";
                                            });
                                            setTimeout(function() {
                                                $('#cutsceneText').fadeTo(500, 1, function() {
                                                    $($.parseHTML('<span class="font-weight-bold" style="font-size: 2em">The End</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                                                });
                                                setTimeout(function() {
                                                    $('#cutsceneText').fadeTo(1000, 0, function() {
                                                        document.getElementById('cutsceneText').innerHTML = "";
                                                        document.getElementById('cutscenes').style.display = "none";
                                                        $('#main').fadeTo(3000, 1, function() {
                                                            document.getElementById('main').style.display = "";
                                                        });
                                                    });
                                                }, 75000);
                                            }, 1000);
                                        }, 7500);
                                    }, 1000);
                                }, 7500);
                            }, 1000);
                        }, 7500);
                    }, 1000);
                }, 7500);
            }, 1000);
        });
    });
}

function cutscene3() {
    $('#main').fadeTo(500, 0, function() {
        document.getElementById('main').style.display = "none";
        $('#cutscenes').fadeTo(500, 1, function() {
            document.getElementById('cutscenes').style.display = "";
            setTimeout(function() {
                $('#cutsceneText').fadeTo(500, 1, function() {
                    $($.parseHTML('<span class="font-italic" style="font-size: 1.5em">Well, you did leave a trail of breadcrumbs behind.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                });
                setTimeout(function() {
                    $('#cutsceneText').fadeTo(500, 0, function() {
                        document.getElementById('cutsceneText').innerHTML = "";
                    });
                    setTimeout(function() {
                        $('#cutsceneText').fadeTo(500, 1, function() {
                            $($.parseHTML('<span class="font-italic" style="font-size: 1.5em">You slowly try to follow the breadcrumb trail back to camp.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                        });
                        setTimeout(function() {
                            $('#cutsceneText').fadeTo(500, 0, function() {
                                document.getElementById('cutsceneText').innerHTML = "";
                            });
                            setTimeout(function() {
                                $('#cutsceneText').fadeTo(500, 1, function() {
                                    $($.parseHTML('<span class="font-italic" style="font-size: 1.5em">But it simply is too dark and something knocks you in the back of your head.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                                });
                                setTimeout(function() {
                                    $('#cutsceneText').fadeTo(500, 0, function() {
                                        document.getElementById('cutsceneText').innerHTML = "";
                                    });
                                    setTimeout(function() {
                                        $('#cutsceneText').fadeTo(500, 1, function() {
                                            $($.parseHTML('<span class="font-weight-bold" style="font-size: 2em">The End. You were eaten by the cannibal tribe.</span>')).hide().prependTo("#cutsceneText").fadeIn(1000);
                                        });
                                        setTimeout(function() {
                                            $('#cutsceneText').fadeTo(1000, 0, function() {
                                                document.getElementById('cutsceneText').innerHTML = "";
                                                document.getElementById('cutscenes').style.display = "none";
                                                $('#main').fadeTo(3000, 1, function() {
                                                    document.getElementById('main').style.display = "";
                                                });
                                            });
                                        }, 75000);
                                    }, 1000);
                                }, 7500);
                            }, 1000);
                        }, 7500);
                    }, 1000);
                }, 7500);
            }, 1000);
        });
    });
}