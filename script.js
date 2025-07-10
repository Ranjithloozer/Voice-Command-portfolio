function speak(text, lang = 'en-US') {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = lang;
  window.speechSynthesis.speak(speech);
}

function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert("Voice recognition not supported.");

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.start();

  recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("Heard:", command);
    handleVoiceCommand(command);
  };
}

function handleVoiceCommand(command) {
  if (command.includes("about")) {
    showSection("about");
    speak("Opening about section");
  } else if (command.includes("projects")) {
    showSection("projects");
    speak("Here are your awesome projects");
  } else if (command.includes("resume") || command.includes("cv")) {
    showSection("resume");
    speak("Here is your resume");
  } else if (command.includes("contact")) {
    showSection("contact");
    speak("Here is the contact section");
  } else if (command.includes("stats") || command.includes("performance")) {
    showSection("stats");
    speak("Here are your performance stats");
  } else if (command.includes("scroll down")) {
    window.scrollBy(0, 300);
    speak("Scrolling down");
  } else if (command.includes("scroll up")) {
    window.scrollBy(0, -300);
    speak("Scrolling up");
  } else if (command.includes("dark mode") || command.includes("night mode")) {
    toggleDarkMode();
    speak("Dark mode toggled");
  } else if (command.includes("light mode") || command.includes("day mode")) {
    toggleDarkMode();
    speak("Light mode toggled");
  } else {
    speak("Command not recognized. Try About, Projects, Resume, Contact or Stats.");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function showSection(id) {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => sec.style.display = "none");
  const target = document.getElementById(id);
  if (target) target.style.display = "block";
}

function filterProjects() {
  const input = document.getElementById("projectSearch").value.toLowerCase();
  const items = document.querySelectorAll("#projectList li");
  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(input) ? "block" : "none";
  });
}

function animateCounters() {
  const countUp = (id, end) => {
    let current = 0;
    const step = () => {
      current++;
      document.getElementById(id).innerText = current;
      if (current < end) requestAnimationFrame(step);
    };
    step();
  };
  countUp("projectsCount", 10);
  countUp("certsCount", 5);
  countUp("hacksCount", 3);
}

window.onload = function() {
  animateCounters();
  showSection("about"); // Show About on load
};

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  speak("Thank you. Your message has been sent successfully.");
  alert("Thank you for contacting me! I will get back to you soon.");
  this.reset();
});
