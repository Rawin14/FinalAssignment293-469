    // Define provinces by country
    const provincesByCountry = {
        thailand: ["Bangkok", "Chiang Mai", "Phuket", "Chonburi", "Rayong", "Nakhon Ratchasima", "Khon Kaen", "Udon Thani", "Songkhla", "Surat Thani"],
        usa: ["California", "Texas", "New York", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
        uk: ["London", "Manchester", "Liverpool", "Birmingham", "Leeds", "Sheffield", "Bristol", "Newcastle", "Nottingham", "Glasgow"],
        japan: ["Tokyo", "Osaka", "Kyoto", "Hokkaido", "Fukuoka", "Nagoya", "Yokohama", "Kobe", "Sapporo", "Hiroshima"],
        china: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu", "Xi'an", "Wuhan", "Chongqing", "Tianjin", "Hangzhou"]
      };
    
      // Function to update provinces based on selected country
      function updateProvinces() {
        const countrySelect = document.getElementById("country");
        const provinceSelect = document.getElementById("province");
        const selectedCountry = countrySelect.value;
    
        // Clear existing options
        provinceSelect.innerHTML = '<option value="" disabled selected>Select Province</option>';
    
        // Populate province options
        if (provincesByCountry[selectedCountry]) {
          provincesByCountry[selectedCountry].forEach(province => {
            const option = document.createElement("option");
            option.value = province.toLowerCase();
            option.textContent = province;
            provinceSelect.appendChild(option);
          });
        }
      }
    
      // Form validation function
      document.getElementById("contact").addEventListener("submit", function (e) {
        const telNum = document.getElementById("TelNum").value;
        const email = document.getElementById("mail").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;
    
        // Validate phone number
        if (!/^\d{10}$/.test(telNum)) {
          alert("Telephone number must be exactly 10 digits.");
          e.preventDefault();
          return;
        }
    
        // Validate email
        if (!/\S+@\S+\.\S+/.test(email)) {
          alert("Please enter a valid email address with '@'.");
          e.preventDefault();
          return;
        }
    
        // Validate password match
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          e.preventDefault();
          return;
        }
      });
    
      // Call updateProvinces when country is changed
      document.getElementById("country").addEventListener("change", updateProvinces);