const translations = {
    ar: {
        title: "لوحة تحكم الجراح",
        dream: "⌛ حلم التخرج",
        store: "☕ متجر الطاقة (1د = 15ن)",
        btn5: "5 د لـ 75ن",
        btn10: "10 د لـ 150ن",
        btn15: "15 د لـ 225ن",
        startBtn: "ابدأ المهمة",
        resetBtn: "إعادة ضبط",
        confirmBtn: "تأكيد",
        inputPlaceholder: "أضف مهمة طبية جديدة...",
        dir: "rtl"
    },
    en: {
        title: "Surgeon Dashboard",
        dream: "⌛ Graduation Dream",
        store: "☕ Energy Store (1m = 15p)",
        btn5: "5m for 75p",
        btn10: "10m for 150p",
        btn15: "15m for 225p",
        startBtn: "Start Task",
        resetBtn: "Reset",
        confirmBtn: "Confirm",
        inputPlaceholder: "Add new medical task...",
        dir: "ltr"
    }
};

function changeLang(lang) {
    const content = translations[lang];

    // 1. تغيير الاتجاه
    document.body.dir = content.dir;

    // 2. تغيير النصوص
    document.querySelectorAll('.lang-text').forEach(el => {
        const key = el.getAttribute('data-key');
        if (content[key]) el.innerText = content[key];
    });

    // 3. تغيير الـ Placeholder
    const input = document.getElementById('taskInput');
    if (input) input.placeholder = content.inputPlaceholder;

    // 4. حفظ اللغة
    localStorage.setItem('savedLang', lang);
}

// تشغيل عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('savedLang') || 'ar';
    changeLang(saved);
});
