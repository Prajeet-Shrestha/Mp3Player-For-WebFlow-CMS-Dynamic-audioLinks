//   The Javascript starts from here
const audiosrc = document.getElementById('audiofile');
const playWrapper = document.getElementById('play-wrapper');
const playPausebtn = document.getElementById('playPausebtn');
// If you are using CMS Database then leave an empty string in AudioSourceUrl
var AudioSourceUrl = 'https://s3.ap-south-1.amazonaws.com/alokkhatri.com/alokkhatri.com+home.mp3';
if (AudioSourceUrl.length > 10) {
  console.log('Custom URl');
  document.getElementById('audiofile').setAttribute('src', AudioSourceUrl);
  audiosrc.load();
} else {
  console.log('CMC URl');
  document
    .getElementById('audiofile')
    .setAttribute('src', '{{wf {&quot;path&quot;:&quot;mp3-audio-link&quot;,&quot;type&quot;:&quot;Link&quot;} }}');
  audiosrc.load();
}

if (playWrapper) {
  playWrapper.addEventListener('click', function (x) {
    if (audiosrc.paused) {
      playPausebtn.setAttribute(
        'src',
        'https://uploads-ssl.webflow.com/60687d0673e522ebc9e8ce21/6079b955a693b215299a6a0c_pause.svg'
      );
      audiosrc.play();
    } else {
      playPausebtn.setAttribute(
        'src',
        'https://uploads-ssl.webflow.com/60687d0673e522ebc9e8ce21/6079b929748b85e0c1757158_play_arrow.svg'
      );
      audiosrc.pause();
    }
  });
}
const totalDuration = document.getElementById('duration');
const currentDuration = document.getElementById('seek-value');
var minutes = Math.floor(audiosrc.duration / 60);
var seconds = Math.round(audiosrc.duration - minutes * 60, 1);
audiosrc.onloadedmetadata = function () {
  var minutes = Math.floor(audiosrc.duration / 60);
  var seconds = Math.round(audiosrc.duration - minutes * 60, 1);
  if (seconds < 10) {
    seconds = '0' + seconds.toString();
  }
  totalDuration.innerText = minutes.toString() + ':' + seconds.toString();
};

totalDuration.innerText = minutes.toString() + ':' + seconds.toString();
audiosrc.ontimeupdate = function () {
  document.getElementById('progressBar').style.width =
    ((audiosrc.currentTime / audiosrc.duration) * 100).toString() + '%';
  var minutes = Math.floor(audiosrc.currentTime / 60);
  var seconds = Math.round(audiosrc.currentTime - minutes * 60, 1);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  currentDuration.innerText = minutes.toString() + ':' + seconds.toString();
};

document.getElementById('rewind').addEventListener('click', function () {
  audiosrc.load();
  playPausebtn.setAttribute(
    'src',
    'https://uploads-ssl.webflow.com/60687d0673e522ebc9e8ce21/6079b955a693b215299a6a0c_pause.svg'
  );
  audiosrc.play();
});
audiosrc.volume = 1;
document.getElementById('volume-up').addEventListener('click', function () {
  currentVolume = audiosrc.volume;
  if (currentVolume <= 1) {
    currentVolume += 0.2;
    if (currentVolume > 1) {
      currentVolume = 1;
    }
    document.getElementById('current-volume').style.width = (currentVolume * 100).toString() + '%';
    audiosrc.volume = currentVolume;
  }
});
document.getElementById('volume-down').addEventListener('click', function () {
  currentVolume = audiosrc.volume;
  if (currentVolume >= 0 && currentVolume <= 1) {
    currentVolume -= 0.2;
    if (currentVolume < 0) {
      currentVolume = 0;
    }
    document.getElementById('current-volume').style.width = (currentVolume * 100).toString() + '%';
    audiosrc.volume = currentVolume;
  }
});
const seekBar = document.getElementById('seek-bar');
seekBar.addEventListener('click', function (e) {
  var bcr = this.getBoundingClientRect();
  CurrentTimePercentage = (e.clientX - bcr.left) / bcr.width;
  audiosrc.currentTime = audiosrc.duration * CurrentTimePercentage;
});
