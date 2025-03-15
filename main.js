document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.color = "#20c997";
        });
        link.addEventListener("mouseout", () => {
            link.style.color = "#033b4a";
        });
    });

    const scrollToSection = (section) => {
        document.querySelector(section).scrollIntoView({
            behavior: "smooth"
        });
    };

    document.querySelector(".btn").addEventListener("click", () => {
        scrollToSection("#courses");
    });

    const courseButtons = document.querySelectorAll(".course-item button");
    courseButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Redirecting to the course page...");
        });
    });
});
