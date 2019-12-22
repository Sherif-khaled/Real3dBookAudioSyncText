
let Real3dBookAudioSyncText = function (data) {
  this.destroy();
  this.syncData = data;
  this.audio_file = ''
  this.audio_control = '';
  this.subtitles = '' ;

}
Object.defineProperties(Real3dBookAudioSyncText.prototype, {
  totalArea: {

    // use get, instead of value, to execute this function when
    // we access the property.
    get: function(){
     return  this.syncData;

    }
  }
});
Real3dBookAudioSyncText.prototype.createAudioElements = function (src) {
  this.style();
  if($('#playButton').length == 0){
    this.audio_control = '<button id="playButton">\n' +
      '    <svg class="play" width="50" height="50" viewBox="0 0 85 100"><path fill="currentColor" d="M81 44.6c5 3 5 7.8 0 10.8L9 98.7c-5 3-9 .7-9-5V6.3c0-5.7 4-8 9-5l72 43.3z"><title>PLAY</title></path></svg>\n' +
      '    <svg class="pause" width="50" height="50" viewBox="0 0 60 100"><path fill="currentColor" d="M0 8c0-5 3-8 8-8s9 3 9 8v84c0 5-4 8-9 8s-8-3-8-8V8zm43 0c0-5 3-8 8-8s8 3 8 8v84c0 5-3 8-8 8s-8-3-8-8V8z"><title>PAUSE</title></path></svg>\n' +
      '</button>';
    $('body').append(this.audio_control);
    this.audio_control = document.getElementById("playButton");
    console.log("Create New Audio Control");//temp

  }
  if($('#audiofile').length == 0){
    this.audio_file  = '<div class="mediaPlayer">\n' +
      '    <audio id="audiofile" src="'+ src +'" controls></audio>\n' +
      '</div>';
    $('body').append(this.audio_file);
    this.audio_file = document.getElementById("audiofile");

    console.log("Create New Audio"); //temp
    this.createSubtitlesElement();
    this.createSubtitle();

  }
}
Real3dBookAudioSyncText.prototype.style = function (){
  let style = '<style id="syncText">' +
               '.pause {display: none;}' +
               '.is-playing .play {display: none;}' +
               '.is-playing .pause {display: block;}' +
               '.mediaPlayer{display: none;}' +
             '</style>'
  $('head').append(style);
}
Real3dBookAudioSyncText.prototype.createSubtitlesElement = function (){

  if($('#subtitles').length == 0){
    this.subtitles = '<div id="subtitles"></div>';
    $('body').append(this.subtitles);
    console.log("Create subtitles block"); //temp
  }
}

Real3dBookAudioSyncText.prototype.events = function(){
  if(this.audio_file !== 0){
    let syncData = this.syncData;
    this.audio_file.addEventListener('loadeddata', function()
    {
      return new Promise(function(resolve, reject) {
        this.audio_file = document.getElementById("audiofile");

        let promise = this.audio_file.play();

        promise.then(function(data) {
          data = this.audio_file.play();
          resolve(data);
        }, function(error) {
          document.addEventListener('click', function () {
            this.audio_file.play();
          }, { once: true });
        });
      });

    }, false);

    this.audio_file.addEventListener('pause',function () {
      this.audio_control = document.getElementById("playButton");
      this.audio_control.classList.remove('is-playing');
      console.log("pause Audio"); //temp
    },false);

    this.audio_file.addEventListener('aborted',function(){
      this.audio_control = document.getElementById("playButton");
      this.audio_control.classList.remove('is-playing');
      console.log("aborted Audio"); //temp
    },false);

    this.audio_file.addEventListener('play',function(){
      this.audio_control = document.getElementById("playButton");
      this.audio_control.classList.add('is-playing');
      console.log("play Audio"); //temp
    },false);

    this.audio_file.addEventListener("timeupdate", function(e){
      this.audio_file = document.getElementById("audiofile");
      this.subtitles = document.getElementById("audiofile");
      syncData.forEach(function(element,index, array){
        syncData.filter(function(){return true;});

        if( this.audio_file.currentTime >= element.start && this.audio_file.currentTime <= element.end )
          this.subtitles.children[index].style.background = 'yellow';
        console.log(index); //temp

      });

    });

  }

  if(this.audio_control !== 0){
    this.audio_control.addEventListener('click',function () {
      this.audio_file = document.getElementById("audiofile");
      console.log(this.audio_file);
      if(this.audio_file.duration > 0 && !this.audio_file.paused){
        this.audio_file.pause();
      }else{
        this.audio_file.play();
      }
    },false);

  }
}

Real3dBookAudioSyncText.prototype.createSubtitle = function (){
  let element;
  this.subtitles =   document.getElementById("subtitles");
  for (let i = 0; i < this.syncData.length; i++) {
    element = document.createElement('span');
    element.setAttribute("id", "c_" + i);
    element.innerText = this.syncData[i].text + " ";
    this.subtitles.appendChild(element);
  }
}

Real3dBookAudioSyncText.prototype.destroy = function () {
  this.audio_file = document.getElementById("audiofile");

  console.log(this.audio_file);

  console.log(this.audio_control);

  console.log(this.subtitles);
if($('#syncText').length > 0){
  $('#syncText').remove();
}
  if($('#playButtonl').length > 0){
    $('#playButtonl').remove();
    console.log("remove Audio Control!");
  }

  if($('.mediaPlayer').length > 0){
    if($('#audiofile').length > 0){
      this.audio_file.pause();
      $('#audiofile').remove();
    }

    $('.mediaPlayer').remove();
    console.log("remove Audio!");
  }

  if($('#subtitles').length > 0){
    $('#subtitles').remove();
    console.log("remove subtitles!");
  }
  this.syncData = null;
}


