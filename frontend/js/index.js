// Add interactive animations on load
document.addEventListener('DOMContentLoaded', () => {
  // Stagger animation for feature items
  const features = document.querySelectorAll('.feature-item');
  features.forEach((feature, index) => {
    feature.style.animationDelay = `${0.8 + index * 0.1}s`;
  });
  
  // Add click effect to CTA button
  const ctaBtn = document.querySelector('.cta-btn');
  ctaBtn.addEventListener('click', (e) => {
    ctaBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      ctaBtn.style.transform = '';
    }, 200);
  });
});