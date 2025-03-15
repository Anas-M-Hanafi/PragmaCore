document.addEventListener("DOMContentLoaded", function () {
    setupAccordion();
    setupVideoChange();
    setupCheckboxes();
});

// ✅ وظيفة فتح وإغلاق الأقسام (Accordion)
function setupAccordion() {
    const headers = document.querySelectorAll(".section-title");

    headers.forEach(header => {
        header.addEventListener("click", function () {
            let section = this.nextElementSibling;

            while (section && section.nodeType === 3) {
                section = section.nextSibling;
            }

            if (section && section.classList.contains("section-content")) {
                section.classList.toggle("active");
                section.style.display = section.classList.contains("active") ? "block" : "none";

                let arrow = this.querySelector("i");
                if (arrow) {
                    arrow.classList.toggle("fa-chevron-down");
                    arrow.classList.toggle("fa-chevron-up");
                }
            }
        });
    });
}

// ✅ وظيفة تغيير الفيديو عند النقر على اسم الدرس
function setupVideoChange() {
    const videoPlayer = document.querySelector("#main-video");
    const lessonTitles = document.querySelectorAll(".lesson-title");

    lessonTitles.forEach(title => {
        title.addEventListener("click", function () {
            const newVideoSrc = this.getAttribute("data-video");
            if (newVideoSrc) {
                videoPlayer.src = newVideoSrc;
                videoPlayer.play(); // ✅ تشغيل الفيديو تلقائيًا بعد التغيير
            }
        });
    });
}

// ✅ وظيفة تحديث شريط التقدم وإدارة "Get Certificate"
function setupCheckboxes() {
    const checkboxes = document.querySelectorAll(".lesson-checkbox");
    const progressBar = document.getElementById("progress-bar");
    const certificateText = document.getElementById("certificate-text");

    if (!progressBar || !certificateText) {
        console.error("Element not found: progress-bar or certificate-text");
        return;
    }

    function updateProgress() {
        let completed = document.querySelectorAll(".lesson-checkbox:checked").length;
        let total = checkboxes.length;
        let progress = (completed / total) * 95;

        // ✅ تحديث شريط التقدم
        progressBar.style.strokeDashoffset = Math.max(0, 95 - progress);

        // ✅ تحديث نص الشهادة عند إكمال الدورة
        if (completed === total) {
            certificateText.innerHTML = "✔ Get Certificate <i class='fas fa-chevron-down'></i>";
            certificateText.style.color = "#a970ff";
        } else {
            certificateText.innerHTML = "Get Certificate <i class='fas fa-chevron-down'></i>";
            certificateText.style.color = "white";
        }
    }

    // ✅ إضافة استماع للأحداث عند تغيير أي checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateProgress);
    });

    // ✅ تحديث التقدم عند تحميل الصفحة
    updateProgress();
}
