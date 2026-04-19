// قاموس الترجمة الشامل للوحة التحكم
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

// الدالة المسؤولة عن التغيير الفوري
function changeLang(lang) {
    const content = translations[lang];

    // 1. تغيير اتجاه الصفحة بالكامل
    document.body.dir = content.dir;

    // 2. تغيير كل النصوص التي تحمل الكلاس lang-text
    document.querySelectorAll('.lang-text').forEach(el => {
        const key = el.getAttribute('data-key');
        if (content[key]) {
            el.innerText = content[key];
        }
    });

    // 3. تغيير نص التلميح داخل مربع الكتابة (Placeholder)
    const taskInput = document.querySelector('.task-input');
    if (taskInput) {
        taskInput.placeholder = content.inputPlaceholder;
    }

    // 4. حفظ اختيارك في ذاكرة المتصفح
    localStorage.setItem('preferredLang', lang);
}

// كود تشغيل اللغة المحفوظة تلقائياً عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'ar';
    changeLang(savedLang);
});
    // تغيير الـ Placeholder لمربع الكتابة
    const input = document.querySelector('.task-input');
    if (input) input.placeholder = content.inputPlaceholder;
}
