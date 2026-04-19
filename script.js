window.onload = function() {
    let totalPoints = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
    const pointsDisplay = document.getElementById("userPoints");
    pointsDisplay.innerText = totalPoints;

    let timeLeft = 25 * 60;
    let timer = null;

    window.applySettings = function() {
        const color = document.getElementById('colorPicker').value;
        document.documentElement.style.setProperty('--primary', color);
        timeLeft = document.getElementById('pomoMinutes').value * 60;
        updateDisplay();
    };

    function updateDisplay() {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        document.getElementById("pomoDisplay").innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    window.startPomo = function() {
        if (timer) return;
        timer = setInterval(() => {
            if (timeLeft > 0) { timeLeft--; updateDisplay(); }
            else {
                clearInterval(timer); timer = null;
                const earned = Math.floor(document.getElementById('pomoMinutes').value * 1.5);
                addPoints(earned);
                alert(`أحسنت يا دكتور! حصلت على ${earned} نقطة.`);
                resetPomo();
            }
        }, 1000);
    };

    window.resetPomo = function() {
        clearInterval(timer); timer = null;
        timeLeft = document.getElementById('pomoMinutes').value * 60;
        updateDisplay();
    };

    function addPoints(amount) {
        totalPoints += amount;
        localStorage.setItem("points", totalPoints);
        pointsDisplay.innerText = totalPoints;
    }

    window.resetPoints = function() {
        if(confirm("هل تريد فعلاً تصفير نقاطك؟")) {
            totalPoints = 0; localStorage.setItem("points", 0);
            pointsDisplay.innerText = 0;
        }
    };

    window.buyBreak = function(min) {
        let cost = min * 15;
        if(totalPoints >= cost) {
            addPoints(-cost);
            timeLeft = min * 60; updateDisplay(); startPomo();
        } else { alert("نقاطك لا تكفي.. استمر في المذاكرة!"); }
    };

    // العداد التنازلي للسنوات
    const target = new Date("June 30, 2036").getTime();
    setInterval(() => {
        const diff = target - new Date().getTime();
        document.getElementById("years").innerText = Math.floor(diff / (1000*60*60*24*365.25)).toString().padStart(2, '0');
        document.getElementById("days").innerText = Math.floor((diff % (1000*60*60*24*365.25)) / (1000*60*60*24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((diff % (1000*60*60*24)) / (1000*60*60)).toString().padStart(2, '0');
    }, 1000);

    window.addTask = function() {
        const inp = document.getElementById("taskInput");
        if(!inp.value) return;
        const li = document.createElement("li");
        li.innerHTML = `<span>${inp.value}</span><button onclick="this.parentElement.remove()" style="border:none !important; color:#ff4444 !important; min-width:auto !important; background:none !important;">❌</button>`;
        document.getElementById("taskList").appendChild(li);
        inp.value = "";
    };
    document.getElementById('dateDisplay').innerText = new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' });
};
const translations = {
    ar: {
        title: "لوحة تحكم الجراح",
        dream: "حلم التخرج",
        dir: "rtl"
    },
    en: {
        title: "Surgeon Dashboard",
        dream: "Graduation Dream",
        dir: "ltr"
    }
};

function changeLang(lang) {
    console.log("تم اختيار لغة: " + lang); // للتأكد في المتصفح أن الزر يعمل
    
    const content = translations[lang];

    // تغيير النصوص
    document.querySelectorAll('.lang-text').forEach(el => {
        const key = el.getAttribute('data-key');
        if (content[key]) {
            el.innerText = content[key];
        }
    });

    // تغيير اتجاه الصفحة
    document.body.dir = content.dir;
    
    // حفظ اللغة في المتصفح
    localStorage.setItem('selectedLang', lang);
}

// تشغيل اللغة المحفوظة عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'ar';
    changeLang(savedLang);
});
