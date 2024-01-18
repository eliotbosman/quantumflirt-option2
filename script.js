document.addEventListener("DOMContentLoaded", function () {
  var controller = new ScrollMagic.Controller();
  var fadeElements = document.querySelectorAll('.fade-element');
  var videos = document.querySelectorAll(".grid video");
  var mainContainer = document.getElementById("mainContainer");
  var openOverlayButton = document.getElementById("openOverlayButton");
  var closeOverlayButton = document.getElementById("closeOverlayButton");
  var overlay = document.getElementById("overlay");

  openOverlayButton.addEventListener("click", function () {
      mainContainer.style.display = "none";
      overlay.style.display = "block";
  });

  closeOverlayButton.addEventListener("click", function () {
    mainContainer.style.display = "block";
    overlay.style.display = "none";
  });

  var fullScreenButton = document.getElementById("fullScreenButton");
  fullScreenButton.addEventListener("click", function (event) {
    event.preventDefault();
    var featureVideo = document.querySelector(".feature video");
    handleVideoClick(featureVideo);
    toggleFullScreenOverlay();
  });

  function handleVideoClick(video) {
    videos.forEach(function (v) {
      if (v !== video) {
        v.pause();
      }
    });

    video.classList.toggle("enlarged");
    video.controls = !video.controls;

    var rect = video.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2,
      behavior: "smooth"
    });
  }

  function handleClearButtonClick(video) {
    video.classList.remove("enlarged");
    video.controls = false;
    toggleFullScreenOverlay(false);
  }

  videos.forEach(function (video) {
    video.addEventListener("click", function () {
      handleVideoClick(video);
    });
  });

  var clearButtons = document.querySelectorAll(".clear-button");
  clearButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var video = button.closest(".grid").querySelector("video");
      handleClearButtonClick(video);
    });
  });

  fadeElements.forEach(function (element) {
    new ScrollMagic.Scene({
      triggerElement: element,
      triggerHook: 0.6,
      reverse: true
    })
      .setTween(gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1.4 }))
      .addTo(controller);
  });

  function toggleFullScreenOverlay(showOverlay = true) {
    var overlay = document.getElementById("fullscreenOverlay");
    overlay.style.display = showOverlay ? "block" : "none";
  }

  // New functionality for overlay
  openOverlayButton.addEventListener("click", function (event) {
    event.preventDefault();
    toggleOverlay(true);
  });

  closeOverlayButton.addEventListener("click", function (event) {
    event.preventDefault();
    toggleOverlay(false);
  });

  function toggleOverlay(showOverlay) {
    var mainContentContainer = document.getElementById("mainContentContainer");
    var overlay = document.getElementById("overlay");

    mainContentContainer.style.display = showOverlay ? "none" : "block";
    overlay.style.display = showOverlay ? "block" : "none";
}

});
