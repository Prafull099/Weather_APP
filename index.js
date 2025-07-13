document.getElementById("btn").addEventListener("click", () => {
  const name = document.getElementById("name-input").value.trim();
  const city = document.getElementById("city-input").value.trim();

  if (!name || !city) {
    alert("Please enter both name and city.");
    return;
  }

  window.location.href = `result.html?name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`;
});

// Theme toggle
const toggleButton = document.getElementById("theme-toggle");
if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });
}
