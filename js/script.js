/* ===== Adesh's Portfolio - all the behaviour (typing text, menu, animations, form) ===== */

// Typing effect (falls back to plain text if the CDN is blocked)
if (window.Typed) {
    new Typed('#element', {
        strings: ['Data Analyst', 'Business Intelligence Developer', 'Python & SQL Enthusiast', 'Data Storyteller'],
        typeSpeed: 50, backSpeed: 30, backDelay: 1400, loop: true
    });
} else {
    document.getElementById('element').textContent = 'Data Analyst';
}

// Mobile menu
const menu = document.getElementById('menu');
document.getElementById('menuBtn').addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Highlight active nav link
const links = [...menu.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
window.addEventListener('scroll', () => {
    const y = window.scrollY + 140;
    let cur = 0;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) cur = i; });
    links.forEach((a, i) => a.classList.toggle('active', i === cur));
}, { passive: true });

// Contact form: sends the message straight to your email using Web3Forms (free service)
// STEP: get your free key at https://web3forms.com (enter your email, they mail you the key), then paste it below.
const WEB3FORMS_KEY = 'PASTE_YOUR_KEY_HERE';

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('msg').value;

    // If the key is not added yet, open Gmail with the message already written
    if (WEB3FORMS_KEY === 'PASTE_YOUR_KEY_HERE') {
        const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
        const subject = encodeURIComponent('Portfolio message from ' + name);
        window.open('https://mail.google.com/mail/?view=cm&fs=1&to=adeshpadwal2004@gmail.com&su=' + subject + '&body=' + body, '_blank');
        status.textContent = 'Gmail opened in a new tab. Press Send there to deliver your message.';
        return;
    }

    status.textContent = 'Sending...';
    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                subject: 'Portfolio message from ' + name,
                name: name, email: email, message: message
            })
        });
        const data = await res.json();
        if (data.success) {
            status.textContent = '✅ Thank you! Your message was sent.';
            form.reset();
        } else {
            status.textContent = '❌ Could not send. Please email me directly.';
        }
    } catch (err) {
        status.textContent = '❌ Network problem. Please try again.';
    }
});

document.getElementById('year').textContent = new Date().getFullYear();
