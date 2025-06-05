//Menu
  const menuItems = document.querySelectorAll(".menu");
  const sections = document.querySelectorAll(".content-section");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      // Remove active class from all menu items
      menuItems.forEach(i => i.classList.remove("active"));

      // Add active class to clicked menu
      item.classList.add("active");

      // Hide all sections
      sections.forEach(section => section.classList.add("d-none"));

      // Show the selected section
      const target = item.getAttribute("data-section");
      document.getElementById(target).classList.remove("d-none");
    });
  });


//Current Date And Time
   function updateDateTime() {
  const now = new Date();
  const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  document.getElementById('datePart').textContent = now.toLocaleDateString('en-IN', dateOptions);
  document.getElementById('timePart').textContent = now.toLocaleTimeString('en-IN', timeOptions);
}

setInterval(updateDateTime, 1000);
updateDateTime();
