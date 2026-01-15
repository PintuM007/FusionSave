  document.body.classList.add('loading');
  window.addEventListener('load', () => {
    document.body.classList.remove('loading');
    document.querySelector('.loader').classList.add('hidden');
  });

// Dark Mode Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
    }

    // Show popup after 5 seconds
    setTimeout(() => {
        const popup = document.getElementById('update-popup');
        popup.style.display = 'flex';
    }, 5000);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active'); // toggles X animation
  navLinks.classList.toggle('active');  // toggles menu visibility
  document.body.classList.toggle('no-scroll'); // disable scroll when menu open
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('no-scroll'); // re-enable scroll
  });
});


// Contact form submission
  emailjs.init({
    publicKey: "fHwNbx6fX7ky0C24q", 
  });
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      company_name: document.getElementById("company").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("service_9jta0qd", "template_48dkck7", formData)
      .then(() => {
        alert("✅ Message sent successfully! We'll get back to you soon.");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("❌ Oops! Something went wrong. Please try again later.");
      });
  });

// Popup functionality
// function closePopup() {
//     document.getElementById('update-popup').style.display = 'none';
// }

// document.getElementById('popupForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const name = this.name.value;
//     const email = this.email.value;

//     alert(`Thanks ${name}! You are now subscribed with ${email}. We'll keep you updated!`);
//     closePopup();
//     this.reset();
// });

// Close Popup Function
function closePopup() {
  document.getElementById('update-popup').style.display = 'none';
}

// Handle Popup Form Submission
document.getElementById('popupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = this.name.value.trim();
  const email = this.email.value.trim();

  // Prepare data for EmailJS
  const popupData = {
    subscriber_name: name,
    subscriber_email: email,
  };

  // Send Email via EmailJS
  emailjs
    .send("service_9jta0qd", "template_kbq2d3l", popupData)
    .then(() => {
      alert(`✅ Thanks ${name}! You are now subscribed with ${email}. We'll keep you updated!`);
      closePopup();
      this.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to subscribe. Please try again later.");
    });
});

// Toggle About section
function toggleAbout() {
    const content = document.getElementById("more-content");
    const btn = document.getElementById("learn-more-btn");
    const icon = btn.querySelector('i');

    if (content.style.display === "none") {
        content.style.display = "block";
        btn.innerHTML = '<i class="fas fa-arrow-up"></i> Show Less';
    } else {
        content.style.display = "none";
        btn.innerHTML = '<i class="fas fa-arrow-down"></i> Learn More';
    }
}

// Chatbot functionality
let chatStep = 0;
let spendValue = "";
let userCount = "";
let chatStarted = false;

function addMessage(text, sender = "bot", withButtons = []) {
    const chatLog = document.getElementById("chat-log");
    const msgClass = sender === "user" ? "user-message" : "bot-message";

    let bubble = `<div class="message ${msgClass}">${text}`;

    if (withButtons.length > 0) {
        bubble += `<div class="options-container">`;
        withButtons.forEach(btn => {
            bubble += `<div class="option-btn" onclick="handleOption('${btn.replace(/'/g, "\\'")}')">${btn}</div>`;
        });
        bubble += `</div>`;
    }

    bubble += `</div>`;
    chatLog.innerHTML += bubble;
    chatLog.scrollTop = chatLog.scrollHeight;
}

function toggleChat() {
    const chatBox = document.getElementById("chat-container");
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "flex";
        if (!chatStarted) {
            startChat();
            chatStarted = true;
        }
    } else {
        chatBox.style.display = "none";
    }
}

function startChat() {
    chatStep = 0;
    document.getElementById("chat-log").innerHTML = "";
    addMessage("👋 Hi there! Welcome to FusionSave - the smarter way to manage and optimize your Oracle Cloud subscriptions.<br><br>Before we dive in, can I ask you a couple of quick questions to show how much you could potentially save?", "bot", ["👉 Sure! Let's go", "👉 Maybe later"]);
}

function handleOption(option) {
    addMessage(option, "user");

    if (chatStep === 0) {
        if (option.includes("Maybe later")) {
            addMessage("No worries! Feel free to explore the site or reach out when you're ready. 😊");
            chatStep = -1;
        } else {
            chatStep = 1;
            setTimeout(() => {
                addMessage("Great! Just to better tailor our suggestions, could you tell me what brings you here today?", "bot", ["1️⃣ I'm concerned about subscription compliance", "2️⃣ I want to reduce costs and over-usage", "3️⃣ I'm just exploring solutions"]);
            }, 800);
        }
    } else if (chatStep === 1) {
        if (option.startsWith("1️⃣")) addMessage("Ensuring compliance is critical - unused or misallocated licenses can create gaps and risks. Let's find out how FusionSave can help you stay aligned with your licensing needs.");
        if (option.startsWith("2️⃣")) addMessage("Smart move! Many companies overlook excess subscriptions that drain budgets. Let's calculate how much you could be saving right now.");
        if (option.startsWith("3️⃣")) addMessage("Great! We'll walk you through a simple process to see how FusionSave can optimize your subscriptions and improve ROI.");

        chatStep = 2;
        setTimeout(() => {
            addMessage("To better understand your scenario, please select your annual subscription spend.", "bot", ["< $100,000", "$100,000 – $250,000", "$250,000 – $500,000", "$500,000 – $1M", "$1M+"]);
        }, 1000);
    } else if (chatStep === 2) {
        spendValue = option;
        addMessage("Thanks! That gives us a clearer picture. 📊");
        chatStep = 3;
        setTimeout(() => {
            addMessage("Next, how many users are leveraging Oracle Cloud in your organization?", "bot", ["👥 1 – 50", "👥 51 – 200", "👥 201 – 500", "👥 501 – 1000", "👥 1000+"]);
        }, 1000);
    } else if (chatStep === 3) {
        userCount = option;
        addMessage("Perfect! That helps us understand the scale and where optimizations could make the biggest impact.");
        chatStep = 4;
        setTimeout(() => {
            addMessage("Based on what you've shared, would you like to see how much you could potentially save with FusionSave?", "bot", ["✅ Yes, show me the savings!", "❌ No, maybe later"]);
        }, 1000);
    } else if (chatStep === 4) {
        if (option.includes("No")) {
            addMessage("No problem! You can explore our resources anytime or reach out when you're ready. We're here to help you save smarter. 💡");
            chatStep = -1;
        } else {
            let spendNum = 100000;
            if (spendValue.includes("$100,000 – $250,000")) spendNum = 175000;
            if (spendValue.includes("$250,000 – $500,000")) spendNum = 375000;
            if (spendValue.includes("$500,000 – $1M")) spendNum = 750000;
            if (spendValue.includes("$1M+")) spendNum = 1500000;
            let saving = Math.round(spendNum * 0.3);

            addMessage(`💡 <strong>Exciting news!</strong><br><br>Based on your current subscription spend of <strong>${spendValue}</strong>, you could potentially save <strong>${saving.toLocaleString()}</strong> annually by optimizing inactive and excess users with FusionSave!<br><br>📊 That's a <strong>30% improvement</strong> in your budget efficiency!`);

            chatStep = 5;
            setTimeout(() => {
                addMessage("Would you like to learn exactly how we can help you achieve this?", "bot", ["👉 Yes, show me how", "👉 I'll reach out later"]);
            }, 1500);
        }
    } else if (chatStep === 5) {
        if (option.includes("Yes")) {
            addMessage("Awesome! Let's take the next step together. 🚀<br><br>Our team can provide a personalized demo and show you exactly where your savings opportunities are.<br><br><strong>Ready to get started?</strong> <a href='#contact' style='color:#1479EA;font-weight:bold;text-decoration:underline;'>Contact us now</a>");
        } else {
            addMessage("No problem! You can explore our resources anytime or reach out when you're ready. We're here to help you save smarter. 💼");
        }
        chatStep = -1;
    }
}

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, "user");
    inputField.value = "";

    // Simple bot response for manual input
    setTimeout(() => {
        addMessage("Thanks for your message! For the best experience, please use the guided conversation above. Or feel free to <a href='#contact' style='color:#1479EA;font-weight:bold;'>contact us directly</a>.");
    }, 500);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

  document.addEventListener('contextmenu', event => event.preventDefault());
  document.onkeydown = function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      return false;
    }
  };



document.addEventListener("DOMContentLoaded", () => {

  emailjs.init("fHwNbx6fX7ky0C24q");

  const modal = document.getElementById("registerModal");
  const openBtn = document.getElementById("openRegisterModal");
  const closeBtn = modal.querySelector(".close-modal");
  const form = document.getElementById("registerForm");

  openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
  });

  closeBtn.addEventListener("click", () => modal.style.display = "none");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = regEmail.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {
      alert("Enter a valid email.");
      return;
    }

    try {
      await emailjs.send("service_9jta0qd", "template_q71ywhu", {
        name: email,
        time: new Date().toLocaleString(),
        message: "User requested report download from website."
      });

      alert("✅ Successful! Download starting...");
      modal.style.display = "none";

      const link = document.createElement("a");
      link.href = "./files/FusionSave_SuccessReport.pdf";
      link.download = "";
      link.click();

      form.reset();

    } catch (err) {
      console.error("Email failed:", err);
      alert("❌ Email sending failed. Try again later.");
    }
  });

});



let current = 1;
const total = 4;

setInterval(() => {
    document.getElementById("s-" + current).checked = true;
    current++;
    if (current > total) current = 1;
}, 3500);
