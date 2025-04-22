window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 10) {
      header.classList.add('bg-white/90', 'backdrop-blur-sm', 'shadow-md');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('bg-white/90', 'backdrop-blur-sm', 'shadow-md');
      header.classList.add('bg-transparent');
    }
  });


// =============================================
// 1. تأثيرات GSAP للتمرير
// =============================================
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // تأثيرات الظهور عند التمرير للعناصر ذات كلاس animate-on-scroll
  gsap.utils.toArray('.animate-on-scroll').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 1
    });
  });

  // تأثيرات خاصة بقسم اللابتوب
  const laptopTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#video-laptop-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      markers: false
    }
  });

  laptopTimeline
    .from(".computer", {
      y: 100,
      opacity: 0.75,
      duration: 0.5
    })
    .to(".laptop-screen", {
      scale: 1.02,
      ease: "power2.out"
    }, 0)
    .to(".laptop-frame", {
      scale: 1.2,
      y: -30,
      ease: "power2.out"
    }, 0)
    .to(".computer", {
      y: -30,
      ease: "power2.out"
    }, 0);
}

// =============================================
// 2. تهيئة Swiper للسلايدرز
// =============================================
function initSwipers() {
  // سلايدر تبويبات المحتوى
  const tabsSwiper = new Swiper('.tabs-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    freeMode: true
  });

  // سلايدر آراء العملاء
  const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
}

// =============================================
// 3. وظائف تبويبات المحتوى
// =============================================
function initContentTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      // تحديث زر التبويب النشط
      tabButtons.forEach(btn => btn.classList.remove('active', 'bg-white', 'text-medical-primary', 'shadow-md'));
      button.classList.add('active', 'bg-white', 'text-medical-primary', 'shadow-md');

      // إظهار المحتوى المقابل للتبويب
      tabPanes.forEach(pane => pane.classList.add('hidden'));
      document.getElementById(`${tabId}-tab`).classList.remove('hidden');
    });
  });
}

// =============================================
// 4. وظائف الأسئلة الشائعة (FAQ)
// =============================================
function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('i');

      answer.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
    });
  });
}

// =============================================
// 5. تأثيرات Parallax
// =============================================
function initParallaxEffects() {
  const parallaxBg = document.querySelector('.parallax-bg');
  if (parallaxBg) {
    new Parallax(parallaxBg, {
      relativeInput: true,
      hoverOnly: true,
      calibrateX: true,
      calibrateY: true,
      scalarX: 10,
      scalarY: 10
    });
  }
}

// =============================================
// 6. تأثيرات العناصر العائمة
// =============================================
function initFloatingElements() {
  // تحريك العناصر العائمة بأسلوب متعرج
  gsap.to(".animate-float", {
    y: 20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  
  gsap.to(".animate-float-slow", {
    y: 30,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  
  gsap.to(".animate-float-slower", {
    y: 25,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}


// =============================================
// 9. تسجيل Service Worker
// =============================================
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('ServiceWorker registration successful');
      }).catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
}

// =============================================
// تهيئة كل الوظائف عند تحميل الصفحة
// =============================================
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initSwipers();
  initContentTabs();
  initFAQAccordion();
  initParallaxEffects();
  initFloatingElements();
  registerServiceWorker();
});