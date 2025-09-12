/**
 * Easing function for a cubic in-out curve.
 * @param t - The current progress of the animation (0 to 1).
 * @returns The eased progress.
 */
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Smoothly scrolls the page to a specific vertical position using an easing function.
 * @param targetPosition - The vertical position to scroll to (in pixels).
 * @param duration - The duration of the scroll animation (in milliseconds).
 */
export const smoothScrollTo = (targetPosition: number, duration: number): void => {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};
