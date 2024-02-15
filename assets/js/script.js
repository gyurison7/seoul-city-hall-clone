$(".btn-close").click(function () {
  $(".top-banner").hide();
});

const swipers = {};

function initializeNewsSlide() {
  swipers.newsSlide = new Swiper("[data-swiper='newsSlide']", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "custom",
      renderCustom: function (_, current, total) {
        return current + "/" + total;
      },
    },
    navigation: {
      prevEl: ".btn-prev-news",
      nextEl: ".btn-next-news",
    },
    on: {
      init: function () {
        setTimeout(() => updateSlideContent("newsSlide", this.activeIndex), 0);
      },
      slideChange: function () {
        updateSlideContent("newsSlide", this.activeIndex);
      },
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false, // 사용자 상호작용 후에도 자동 슬라이드 유지
    },
  });
}

function initializePSlide() {
  swipers.pSlide = new Swiper("[data-swiper='pSlide']", {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "custom",
      renderCustom: function (_, current, total) {
        return current + "/" + total;
      },
    },
    navigation: {
      prevEl: ".btn-prev-p",
      nextEl: ".btn-next-p",
    },
    on: {
      init: function () {
        setTimeout(() => updateSlideContent("pSlide", this.activeIndex), 0);
      },
      slideChange: function () {
        updateSlideContent("pSlide", this.activeIndex);
      },
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false, // 사용자 상호작용 후에도 자동 슬라이드 유지
    },
  });
}

// 초기 호출
initializeNewsSlide();
initializePSlide();

// 슬라이드 content 업데이트
function updateSlideContent(slideName, activeIndex) {
  let content;
  if (swipers[slideName]) {
    content = swipers[slideName].slides[activeIndex].querySelector("p").textContent;
  }
  document.querySelector(`[data-swiper="${slideName}"] .slide-content`).textContent = content;
}

// 슬라이드 탭 토글
$(".inner1 .tab button").click(function () {
  $(this).addClass("on").siblings().removeClass("on");

  const calssName = $(this).attr("class").split(" ")[0];

  if (calssName === "tab-news") {
    if (swipers.pSlide) {
      // pSlide 인스턴스 파괴
      swipers.pSlide.destroy(true, true);
      swipers.pSlide = undefined;
    }
    initializeNewsSlide(); // newsSlide 인스턴스 재생성

    $("[data-swiper='newsSlide']").show();
    $("[data-swiper='pSlide']").hide();
  } else {
    if (swipers.newsSlide) {
      // newsSlide 인스턴스 파괴
      swipers.newsSlide.destroy(true, true);
      swipers.newsSlide = undefined;
    }
    initializePSlide(); // pSlide 인스턴스 재생성

    $("[data-swiper='pSlide']").show();
    $("[data-swiper='newsSlide']").hide();
  }
});

// 슬라이드 일시정지/재생
$(".btn-pauseOrPlay").click(function () {
  const slideName = $(this).closest("[data-swiper]").data("swiper");
  const targetSwiper = swipers[slideName];

  if ($(this).hasClass("click")) {
    targetSwiper.autoplay.start();
  } else {
    targetSwiper.autoplay.stop();
  }

  $(this).toggleClass("click");
});

swipers.bannerSlide = new Swiper("[data-swiper='bannerSlide']", {
  slidesPerView: 3,
  spaceBetween: 43,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    type: "custom",
    renderCustom: function (_, current, total) {
      return current + "/" + total;
    },
  },
  navigation: {
    prevEl: ".btn-prev-banner",
    nextEl: ".btn-next-banner",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

$(".menu-toggle").each(function () {
  $(this).click(function () {
    const targetMenu = $(this).data("menu");
    const subMenu = $(`.sub-menu[data-menu="${targetMenu}"]`);

    $(".sub-menu").not(subMenu).slideUp();
    $(".menu-toggle").not($(this)).removeClass("active rotatoe-icon");

    subMenu.slideToggle();
    $(this).toggleClass("active rotate-icon");
  });
});
