document.addEventListener("DOMContentLoaded", () => {
  const mainLine = document.querySelector('.main-line-structure');
  const footnotesLine = document.querySelector('.footnotes .line');

  // Apply fade-in animation to main-line-structure
  mainLine.style.animationDelay = "0s";

  // Delay the fade-in animation for the footnotes line
  footnotesLine.style.animationDelay = "1.7s"; // Adjust delay based on main-line duration
});
