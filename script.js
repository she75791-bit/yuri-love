const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 80}ms`;
  revealObserver.observe(item);
});

const envelope = document.querySelector(".envelope");
const caption = document.querySelector(".envelope-caption");

envelope.addEventListener("click", () => {
  const isOpen = envelope.classList.toggle("open");
  envelope.setAttribute("aria-expanded", String(isOpen));
  caption.textContent = isOpen ? "CLICK TO CLOSE" : "OPEN THE LETTER";
});

const messages = [
  "今天的喜欢，已经好好送达了。",
  "明天也会继续喜欢你。",
  "この気持ちが、君に届きますように。",
  "ゆり，因为是你，所以喜欢。",
];

const likeButton = document.querySelector(".like-button");
const response = document.querySelector(".response");
let messageIndex = 0;

likeButton.addEventListener("click", (event) => {
  response.textContent = messages[messageIndex % messages.length];
  messageIndex += 1;

  const rect = event.currentTarget.getBoundingClientRect();
  for (let i = 0; i < 14; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-burst";
    heart.textContent = i % 3 === 0 ? "✦" : "♡";
    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top + rect.height / 2}px`;
    heart.style.setProperty("--dx", `${(Math.random() - 0.5) * 260}px`);
    heart.style.setProperty("--dy", `${-70 - Math.random() * 190}px`);
    heart.style.setProperty("--r", `${(Math.random() - 0.5) * 160}deg`);
    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
});

const petalLayer = document.querySelector(".petals");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function createPetal() {
  if (reducedMotion || document.hidden) return;

  const petal = document.createElement("span");
  petal.className = "falling-petal";
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.opacity = `${0.25 + Math.random() * 0.5}`;
  petal.style.setProperty("--duration", `${7 + Math.random() * 7}s`);
  petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 230}px`);
  petalLayer.appendChild(petal);
  petal.addEventListener("animationend", () => petal.remove());
}

if (!reducedMotion) {
  window.setInterval(createPetal, 1100);
}
