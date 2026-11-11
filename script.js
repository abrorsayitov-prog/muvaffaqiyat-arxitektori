// ==========================================
// 1. FIREBASE SOZLAMALARI
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyB6skaiC57bnS3BvL6tYXk0IvNsbneIJfg",
    authDomain: "muvaffaqiyat-arxitektori-e146b.firebaseapp.com",
    projectId: "muvaffaqiyat-arxitektori-e146b",
    storageBucket: "muvaffaqiyat-arxitektori-e146b.firebasestorage.app",
    messagingSenderId: "919978104852",
    appId: "1:919978104852:web:bc37a97db913078e6c2f01"
};

// ==========================================
// 2. FIREBASE'NI ISHGA TUSHIRISH
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// 3. SAHIFA YUKLANGANDA ISHLAYDI
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    
    // Animatsiya effekti
    const elements = document.querySelectorAll('.fade-in');
    if(elements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => { entry.target.classList.add('visible'); }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        elements.forEach(el => observer.observe(el));
    }

    // ==========================================
    // 4. IZOHLARNI FIREBASE'DAN YUKLASH
    // ==========================================
    const commentsList = document.getElementById("comments-list");
    const commentCount = document.getElementById("comment-count");
    
    if (commentsList) {
        // Sahifa nomini URL orqali aniqlaymiz
        const pageId = window.location.pathname.split('/').pop() || 'index.html';
        
        const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
        
        onSnapshot(q, (snapshot) => {
            commentsList.innerHTML = ''; 
            let count = 0;
            
            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.page === pageId) {
                    count++;
                    const commentDiv = document.createElement("div");
                    commentDiv.className = "single-comment";
                    commentDiv.style.cssText = "border-top: 1px solid #333; padding: 15px 0;";
                    commentDiv.innerHTML = `
                        <div class="user" style="color: #c5a059; font-weight: bold; font-size: 14px; margin-bottom: 5px; display: flex; align-items: center; gap: 10px;">
                            <i class="fa-solid fa-circle-user"></i> ${data.name} 
                            <span class="date" style="color: #666; font-size: 12px; font-weight: normal; margin-left: auto;">${data.time || 'Hozirgina'}</span>
                        </div>
                        <p style="color: #a0a0a0; font-size: 14px;">${data.text}</p>
                    `;
                    commentsList.appendChild(commentDiv);
                }
            });
            
            if (commentCount) commentCount.innerText = count;
        });
    }
});

// ==========================================
// 5. YANGI IZOH QO'SHISH
// ==========================================
window.addComment = async function() {
    let nameInput = document.getElementById("username-input");
    let textInput = document.getElementById("comment-input");
    
    if (!nameInput || !textInput) return;

    if (nameInput.value.trim() === "" || textInput.value.trim() === "") {
        alert("Iltimos, ismingizni va izohingizni yozing!");
        return;
    }

    const pageId = window.location.pathname.split('/').pop() || 'index.html';
    const now = new Date();
    const timeStr = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();

    try {
        await addDoc(collection(db, "comments"), {
            page: pageId,
            name: nameInput.value,
            text: textInput.value,
            createdAt: serverTimestamp(),
            time: timeStr
        });

        nameInput.value = "";
        textInput.value = "";
    } catch (e) {
        console.error("Xatolik: ", e);
        alert("Izoh yuborishda xatolik yuz berdi. Internet aloqasini tekshiring.");
    }
};
