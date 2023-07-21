window.addEventListener('scroll', setScrollVar);
window.addEventListener('resize', setScrollVar);

function setScrollVar() {
  // root element:
  const htmlElement = document.documentElement;
  // 스크린 높이에서 얼마만큼 스크롤했는지:
  const percentOfScreenHeightScrolled = htmlElement.scrollTop / htmlElement.clientHeight;
  console.log(Math.min(percentOfScreenHeightScrolled * 100, 100));
  // 퍼센티지와 100 중에 작은 값으로 --scroll CSS 프로퍼티를 설정:
  // --scroll: root element의 스크롤 위치를 지정한다.
  htmlElement.style.setProperty('--scroll', Math.min(percentOfScreenHeightScrolled * 100, 100));
}

setScrollVar();

// IntersectionObserver 객체는 타겟 엘리먼트가 최상위 엘리먼트의 뷰포트와 겹치는지를 관찰한다.
const observer = new IntersectionObserver((entries) => {
  for (let i = entries.length - 1; i >= 0; i--) {
    const entry = entries[i];
    if (entry.isIntersecting) {
      // 타겟 엘리먼트가 뷰포트와 겹칠 때 data-img들에 show 클래스를 제거한다:
      document.querySelectorAll('[data-img]').forEach((img) => {
        img.classList.remove('show');
      });
      //
      const img = document.querySelector(entry.target.dataset.imgToShow);
      img?.classList.add('show');
      break;
    }
  }
});

// data-img-to-show 속성을 가진 모든 엘리먼트를 관찰한다:
document.querySelectorAll('[data-img-to-show]').forEach((section) => {
  observer.observe(section);
});
