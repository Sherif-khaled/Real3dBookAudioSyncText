

function createElements (pageContent,srcFile) {

  let btn = '<button id="playButton">\n' +
    '    <svg class="play" width="50" height="50" viewBox="0 0 85 100">\n' +
    '    \t<path fill="currentColor" d="M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72 43.3z">\n' +
    '    \t\t<title>PLAY</title>\n' +
    '    \t</path>\n' +
    '    </svg>\n' +
    '    <svg class="pause" width="50" height="50" viewBox="0 0 60 100"><path fill="currentColor" d="M0 8c0-5 3-8 8-8s9 3 9 8v84c0 5-4 8-9 8s-8-3-8-8V8zm43 0c0-5 3-8 8-8s8 3 8 8v84c0 5-3 8-8 8s-8-3-8-8V8z"><title>PAUSE</title></path></svg>\n' +
    '</button>';

  if(jQuery(pageContent).find('#playButton').length === 0){
    jQuery(pageContent).append(btn);

  }

  let mediaPlayer = '<div class="mediaPlayer">\n' +
    '    <audio id="audiofile" src="' + srcFile +'" controls></audio>\n' +
    '</div><br>';

  if(jQuery(pageContent).find('#audiofile').length === 0){
    jQuery(pageContent).append(mediaPlayer);
  }

  let subtitles = '<div id="subtitles"></div>\n';

  if(jQuery(pageContent).find('#subtitles').length === 0){
    jQuery(pageContent).append(subtitles);
  }
}

function createJSBlock (pageContent,data) {
  let block = '  <script>\n' +
    '        ( function(win, doc) {\n' +
    '            let audioPlayer = jQuery("#audiofile");\n' +
    '            let subtitles   = jQuery("#subtitles");\n' +
    '            let playButton  = jQuery(\'#playButton\');\n' +
    '\n' +
    '            let syncData = '+ JSON.stringify(data) +';\n' +
    '\n' +
    '            createSubtitle();\n' +
    '\n' +
    '            jQuery(\'canvas\').on(\'click\', function(e) {\n' +
    '                if (e.target !== this)\n' +
    '                    return;\n' +
    '\n' +
    '                if(audioPlayer !== null){\n' +
    '\n' +
    '                   audioPlayer[0].play();\n' +
    '\n' +
    '                }\n' +
    '            });\n' +
    '\n' +
    '\n' +
    '            jQuery(\'.flipbook-right-arrow\').on(\'click\',function () {\n' +
    '         \n' +
    '                resetContent();\n' +
    '\n' +
    '\n' +
    '            });\n' +
    '            jQuery(\'.flipbook-left-arrow\').on(\'click\',function () {\n' +
    '         \n' +
    '                resetContent();\n' +
    '\n' +
    '\n' +
    '            });\n' +
    '\n' +
    '\n' +
    '\n' +
    '            jQuery("span[title=\'Close\']").on(\'click\',function () {\n' +
    '                audioPlayer[0].pause();\n' +
    '            });\n' +
    '\n' +
    '            function createSubtitle()\n' +
    '            {\n' +
    '                let element;\n' +
    '                for (let i = 0; i < syncData.length; i++) {\n' +
    '                    element = "<span id=\'c_"+ i +"\' >" + syncData[i].text + " " +"</span>";\n' +
    '                    subtitles.append(element);\n' +
    '                }\n' +
    '\n' +
    '            }\n' +
    '\n' +
    '            jQuery(\'#playButton\').on(\'click\', function () {\n' +
    '            \tif(audioPlayer[0].duration > 0 && !audioPlayer[0].paused){\n' +
    '                    audioPlayer[0].pause();\n' +
    '            \t}else{\n' +
    '                    audioPlayer[0].play();\n' +
    '            \t}\n' +
    '            });\n' +
    '\n' +
    '            audioPlayer.on(\'loadeddata\', function()\n' +
    '            {\n' +
    '\n' +
    '                return new Promise(function(resolve, reject) {\n' +
    '                    let promise = audioPlayer[0].play();\n' +
    '\n' +
    '                    promise.then(function(data) {\n' +
    '                        data = audioPlayer[0].play();\n' +
    '                        resolve(data);\n' +
    '                    }, function(error) {\n' +
    '    \n' +
    '                        doc.on(\'click\', function () {\n' +
    '                           audioPlayer[0].play();\n' +
    '                        }, { once: true });\n' +
    '                    });\n' +
    '                });\n' +
    '\n' +
    '            });\n' +
    '    \n' +
    '            audioPlayer.on(\'pause\',function(){\n' +
    '                playButton.removeClass(\'is-playing\');\n' +
    '            });\n' +
    '    \n' +
    '            audioPlayer.on(\'aborted\',function(){\n' +
    '                playButton.removeClass(\'is-playing\');\n' +
    '            });\n' +
    '    \n' +
    '            audioPlayer.on(\'play\',function(){\n' +
    '                playButton.addClass(\'is-playing\');\n' +
    '    \n' +
    '            });\n' +
    '\n' +
    '            \n' +
    '            audioPlayer.on("timeupdate", function(e){\n' +
    '                syncData.forEach(function(element,index, array){\n' +
    '                    syncData.filter(function(){return true;});\n' +
    '\n' +
    '                    if( audioPlayer[0].currentTime >= element.start && audioPlayer[0].currentTime <= element.end )\n' +
    '                        jQuery(\'#subtitles\').find(\'#c_\' + index).css(\'background-color\',\'yellow\');\n' +
    '                });\n' +
    '            });\n' +
    '    \n' +
    '            function resetContent() {\n' +
    '                console.log(\'resetting...\');\n' +
    '                console.log(audioPlayer[0]);\n' +
    '                if (typeof audioPlayer[0] !== \'undefined\'){\n' +
    '                    if(audioPlayer[0].length !== 0){\n' +
    '    \n' +
    '                        audioPlayer[0].pause();\n' +
    '                        playButton.removeClass(\'is-playing\');\n' +
    '                        audioPlayer[0].currentTime = 0;\n' +
    '                \n' +
    '                    }\n' +
    '                }\n' +
    '                audioPlayer.unbind();\n' +
    '                playButton.unbind();\n' +
    '        \n' +
    '                jQuery(\'canvas\').unbind();\n' +
    '        \n' +
    '                jQuery(\'#subtitles span\').remove();\n' +
    '        \n' +
    '                syncData.filter(function(){return true;});\n' +
    '        \n' +
    '            }\n' +
    '\n' +
    '\n' +
    '        }(window, document));\n' +
    '\n' +
    '\n' +
    '\n' +
    '        </script>\n' +
    '<style>\n' +
    '\n' +
    '    .pause {\n' +
    '        display: none;\n' +
    '    }\n' +
    '\n' +
    '    .is-playing .play {\n' +
    '        display: none;\n' +
    '    }\n' +
    '\n' +
    '    .is-playing .pause {\n' +
    '        display: block;\n' +
    '    }\n' +
    '    .mediaPlayer{\n' +
    '        display: none;\n' +
    '    }\n' +
    '</style>\n';

  jQuery(pageContent).append(block);

}



