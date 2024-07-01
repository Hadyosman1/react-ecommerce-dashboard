const requestFullScreen = (e) => {
  document.addEventListener("fullscreenerror", () => {
    alert("some thing wrong at full screen mode...!");
  });

  if (e.target.requestFullscreen) {
    e.target.requestFullscreen();
    if (e.target.id === "side-bar-avatar") {
      e.target.style.borderRadius = 0;
    }
  } else if (e.target.webkitRequestFullscreen) {
    /* Safari */
    e.target.webkitRequestFullscreen();
    if (e.target.id === "side-bar-avatar") {
      e.target.style.borderRadius = 0;
    }
  } else if (e.target.msRequestFullscreen) {
    /* IE11 */
    e.target.msRequestFullscreen();
    if (e.target.id === "side-bar-avatar") {
      e.target.style.borderRadius = 0;
    }
  }

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement && e.target.id === "side-bar-avatar") {
      e.target.style.borderRadius = "50%";
    }
  });

  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
};
export default requestFullScreen;

