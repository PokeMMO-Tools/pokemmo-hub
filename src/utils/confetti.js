import confetti from "canvas-confetti";

export const throwConfetti = (confettiCount) => {
    for (let index = 0; index < confettiCount; index++) {
        confetti({
            particleCount: 100,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
            }
        });
    }
}