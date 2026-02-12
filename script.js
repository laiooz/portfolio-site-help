document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.carousel-container');
    const inner = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
  
    if (!slider || !inner || images.length === 0) return;
  
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;
  
    // Helper to get full width
    function getWidth() {
      return window.innerWidth;
    }
  
    // Event Listeners
    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('touchstart', touchStart);
  
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mouseleave', () => {
      if(isDragging) touchEnd();
    });
    slider.addEventListener('touchend', touchEnd);
  
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('touchmove', touchMove);
  
    // Auto-rotation
    let autoPlay = setInterval(showNextSlide, 3000);
  
    function showNextSlide() {
      currentIndex += 1;
      if (currentIndex >= images.length) currentIndex = 0;
      setPositionByIndex();
    }
  
    function stopAutoPlay() {
      clearInterval(autoPlay);
    }
  
    function touchStart(event) {
      stopAutoPlay();
      isDragging = true;
      startPos = getPositionX(event);
      animationID = requestAnimationFrame(animation);
      slider.style.cursor = 'grabbing';
    }
  
    function touchEnd() {
      if (!isDragging) return;
      isDragging = false;
      cancelAnimationFrame(animationID);
      slider.style.cursor = 'grab';
  
      const movedBy = currentTranslate - prevTranslate;
  
      // Snap logic: if moved enough, change slide
      if (movedBy < -100 && currentIndex < images.length - 1) currentIndex += 1;
      else if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
  
      setPositionByIndex();
    }
  
    function touchMove(event) {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
      }
    }
  
    function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
  
    function animation() {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
    }
  
    function setSliderPosition() {
      inner.style.transform = `translateX(${currentTranslate}px)`;
    }
  
    function setPositionByIndex() {
      const width = getWidth();
      currentTranslate = currentIndex * -width;
      prevTranslate = currentTranslate;
      inner.style.transition = 'transform 0.3s ease-out';
      setSliderPosition();
      
      // Remove transition after it's done for immediate drag response later
      setTimeout(() => {
        inner.style.transition = 'none';
      }, 300);
    }
  
    // Initial setup
    window.addEventListener('resize', () => {
       setPositionByIndex();
    });
    
    // Disable right click context menu on images to prevent interference
    slider.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
});
