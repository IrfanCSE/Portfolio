// Project Data
const projects = [
    {
        title: "RegAnalytics",
        company: "Kaz Software",
        description: "A full-stack e-commerce platform with React, Node.js, and MongoDB",
        image: "./assets/reg.png",
        // github: "https://github.com",
        demo: "https://regplus.reganalytics.com",
        technologies: [".Net 6", "C#","React", "Typscript", "MSSQL", "AWS S3"],
    },
];

const skills = [
    { name: ".NET (C#)", percentage: 90 },
    { name: "MSSQL (SQL)", percentage: 90 },
    { name: "Ts & Js", percentage: 80 },
    { name: "React", percentage: 80 }
];

// DOM Elements
const hamburger = document.querySelector('#hamburger');
const mobileMenu = document.querySelector('#mobile-menu');
const contactForm = document.getElementById('contact-form');
const projectsGrid = document.getElementById('projects-grid');
const skillsGrid = document.getElementById('skills-grid');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle Mobile Navigation
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
mobileMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        mobileMenu.classList.add('hidden');
    }
});

// Active Navigation Link
function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const navHeight = document.querySelector('.navbar')?.offsetHeight ?? 0;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 20;
        const sectionHeight = section.offsetHeight;
        const sectionMiddle = sectionTop + sectionHeight / 2; // Middle of the section
        const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of the viewport
        
        if (scrollPosition >= sectionMiddle && scrollPosition < sectionMiddle + sectionHeight / 2) {
            const currentId = section.getAttribute('id');
            const navItems = document.querySelectorAll('.nav-links a');

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Populate Projects
function displayProjects() {
    if (!projectsGrid) {
        console.error('Projects grid element not found');
        return;
    }

    projectsGrid.innerHTML = projects.map(project => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 relative">
            <!-- Company Name Badge -->
            <div class="absolute top-2 right-2 bg-yellow-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
                ${project.company}
            </div>
            
            <div class="aspect-w-16 aspect-h-9 w-full">
                <img src="${project.image}" alt="${project.title}" class="object-cover" />
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                <p class="text-gray-600 mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies.map(tech => 
                        `<span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">${tech}</span>`
                    ).join('')}
                </div>
                <div class="flex space-x-4">
                    ${project.github ? `
                        <a href="${project.github}" target="_blank" 
                           class="text-blue-500 hover:text-blue-700 transition-colors">
                            <i class="fab fa-github mr-2"></i>GitHub
                        </a>
                    ` : ''}
                    <a href="${project.demo}" target="_blank"
                       class="text-blue-500 hover:text-blue-700 transition-colors">
                        <i class="fas fa-external-link-alt mr-2"></i>Live Demo
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    
}
// Populate Projects
function displaySkils() {
    if (!skillsGrid) {
        console.error('Projects grid element not found');
        return;
    }

    
    skillsGrid.innerHTML = skills
    .map(
        (skill) => `
    <div class="text-center">
        <div class="relative inline-block w-24 h-24">
            <svg class="w-full h-full" viewBox="0 0 36 36">
                <circle
                    class="text-gray-300"
                    stroke-width="3"
                    stroke="currentColor"
                    fill="transparent"
                    r="16"
                    cx="18"
                    cy="18"
                />
                <circle
                    class="text-blue-500 stroke-current"
                    stroke-width="3"
                    stroke-dasharray="${skill.percentage}, 100"
                    fill="transparent"
                    r="16"
                    cx="18"
                    cy="18"
                    style="stroke-dashoffset: 0;"
                />
            </svg>
            <div
                class="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold">
                ${skill.percentage}%
            </div>
        </div>
        <h3 class="text-lg font-semibold mt-4">${skill.name}</h3>
    </div>`
    )
    .join("");
}

// Typewriter Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}
function calculateDateDifference() {
    const startDate = new Date('2021-01-01');
    const today = new Date();

    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();

    // Adjust if the current month is before the start month
    if (months < 0) {
        years--;
        months += 12;
    }

    // Update the span with the calculated years and months
    const span = document.getElementById('date-difference');
    span.textContent = `(${years}+ years)`;
}

// Scroll Animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.75) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {    
    displaySkils();
    displayProjects();
    calculateDateDifference();
    
    // Initialize typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        typeWriter(typewriterElement, '<Full Stack Software Developer/>');
    }
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        setActiveLink();
        revealOnScroll();
    });
    
    // Initial checks
    setActiveLink();
    revealOnScroll();
}); 