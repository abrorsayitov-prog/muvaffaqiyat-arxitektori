document.addEventListener("DOMContentLoaded", () => {
    // Barcha animatsiya qilinadigan elementlarni tanlaymiz
    const elements = document.querySelectorAll('.fade-in');

    // Har bir element uchun kuzatuvchi (Observer) yaratamiz
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Element ekranga ko'ringanda, ketma-ket (kechikish bilan) chiqadi
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // Har biri 150ms kechikish bilan chiqadi
            }
        });
    }, {
        threshold: 0.1 // Elementning 10% ko'ringanda animatsiya boshlanadi
    });

    // Har bir elementni kuzatishga qo'shamiz
    elements.forEach(el => observer.observe(el));
});
