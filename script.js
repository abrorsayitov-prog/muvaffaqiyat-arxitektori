document.addEventListener("DOMContentLoaded", function() {
    // 1. Ko'rishlar sonini avtomatik oshirish (+1)
    // Kodda <span id="view-count"> raqami turgan joyni qidiradi
    let viewElement = document.getElementById("view-count");
    if (viewElement) {
        let currentViews = parseInt(viewElement.innerText.replace(/,/g, ''));
        if (isNaN(currentViews)) currentViews = 0;
        // Raqamni 1 taga oshiramiz va chiroyli formatda (1,246) chiqaramiz
        viewElement.innerText = (currentViews + 1).toLocaleString('en-US');
    }

    // 2. Animatsiya (Fade-in) effekti (sizda oldin bor edi)
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
});

// 3. Izoh qo'shish funksiyasi
function addComment() {
    let nameInput = document.getElementById("username-input");
    let textInput = document.getElementById("comment-input");
    
    if (!nameInput || !textInput) return; // Agar sahifada izoh qismi bo'lmasa, hech narsa qilmaydi

    if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
        alert("Iltimos, ismingizni va izohingizni yozing!");
        return;
    }

    let commentsList = document.getElementById("comments-list");
    let newComment = document.createElement("div");
    newComment.className = "single-comment";
    
    // Xavfsizlik uchun matnlarni tozalash (HTML kiritishning oldini olish)
    let safeName = nameInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let safeText = textInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    newComment.innerHTML = `
        <div class="user"><i class="fa-solid fa-circle-user"></i> ${safeName} <span class="date">Hozirgina</span></div>
        <p>${safeText}</p>
    `;

    // Yangi izohni eng yuqoriga qo'shamiz
    commentsList.prepend(newComment);

    // Izohlar sonini yangilaymiz
    let countElement = document.getElementById("comment-count");
    if (countElement) {
        let currentCount = parseInt(countElement.innerText) || 0;
        countElement.innerText = currentCount + 1;
    }

    // Maydonlarni tozalash
    nameInput.value = "";
    textInput.value = "";
}
