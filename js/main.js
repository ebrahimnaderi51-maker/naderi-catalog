document.addEventListener('DOMContentLoaded', function () {
  const bookEl = document.getElementById('flip-book');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const currentPageEl = document.getElementById('current-page');
  const totalPagesEl = document.getElementById('total-pages');

  // Initialize PageFlip
  const pageFlip = new St.PageFlip(bookEl, {
    width: 420,          // base page width
    height: 580,         // base page height
    size: 'stretch',
    minWidth: 300,
    maxWidth: 500,
    minHeight: 420,
    maxHeight: 650,
    drawShadow: true,
    flippingTime: 800,
    usePortrait: true,
    startPage: 0,
    autoSize: true,
    maxShadowOpacity: 0.4,
    showCover: true,
    mobileScrollSupport: false,
    swipeDistance: 40,
    clickEventForward: true,
    useMouseEvents: true,
    disableFlipByClick: false,
  });

  // Load pages from HTML
  pageFlip.loadFromHTML(document.querySelectorAll('.page'));

  // Update page indicator
  function updateUI(pageIndex) {
    const total = pageFlip.getPageCount();
    // In cover mode, we show logical page numbers starting from 1
    currentPageEl.textContent = toPersianNumber(pageIndex + 1);
    totalPagesEl.textContent = toPersianNumber(total);

    prevBtn.disabled = pageIndex <= 0;
    nextBtn.disabled = pageIndex >= total - 1;
  }

  // Convert English digits to Persian
  function toPersianNumber(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/\d/g, d => persianDigits[d]);
  }

  // Initial UI
  updateUI(0);

  // Events
  pageFlip.on('flip', (e) => {
    updateUI(e.data);
  });

  pageFlip.on('changeState', () => {
    // optional: can add loading states later
  });

  // Buttons
  prevBtn.addEventListener('click', () => {
    pageFlip.flipPrev();
  });

  nextBtn.addEventListener('click', () => {
    pageFlip.flipNext();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      pageFlip.flipPrev(); // RTL: right arrow = previous
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      pageFlip.flipNext();
    }
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      pageFlip.update();
    }, 200);
  });
});
