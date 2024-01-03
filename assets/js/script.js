document.querySelectorAll(".menu-toggle").forEach(function (element) {
  element.addEventListener("click", function () {
    // 클릭한 메뉴의 속성 가져오기
    var targetMenu = this.getAttribute("data-menu");
    var menu = document.querySelector(
      ".sub-menu[data-menu='" + targetMenu + "']"
    );

    // 메뉴가 이미 열려 있는지 확인
    var isMenuOpen = menu.classList.contains("open");

    // 모든 하위 메뉴 클래스 초기화
    document.querySelectorAll(".sub-menu").forEach(function (menu) {
      menu.classList.remove("open");
    });
    document.querySelectorAll(".menu-toggle").forEach(function (button) {
      button.classList.remove("active", "rotate-icon");
    });

    if (!isMenuOpen) {
      menu.classList.toggle("open"); // 메뉴 열기
      this.classList.toggle("active"); // 메뉴 색상 변경
      this.classList.toggle("rotate-icon"); // 아이콘 회전
    }
  });
});
