const rules = [
  {
    id: "rule-length",
    message: "Your password must be at least 5 characters.",
    test: (password) => password.length >= 5,
  },
  {
    id: "rule-number",
    message: "Must contain at least one number",
    test: (password) => /[0-9]/.test(password),
  },
  {
    id: "rule-uppercase",
    message: "Must contain at least one uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: "rule-special-char",
    message: "Must contain a special character like !, @, #, or $.",
    test: (password) => /[!@#$%^&*]/.test(password),
  },
  {
    id: "rule-no-space",
    message: "Cannot contain any spaces.",
    test: (password) => !/\s/.test(password),
  },
  {
    id: "rule-last-char",
    message: "The last character must not be a number.",
    test: (password) => !/[0-9]$/.test(password),
  },
  {
    id: "rule-emoji",
    message: "Must contain at least one emoji. 😂❤️🔥",
    test: (password) => /[\uD83C-\uDBFF\uDC00-\uDFFF]/.test(password),
  },
  {
    id: "rule-prime-number",
    message: "Your password must contain at least one prime number (e.g., 2, 3, 5, 7).",
    test: (password) => /[2357]/.test(password),
},
{
    id: "rule-word-backwards",
    message: "Your password must contain a word spelled backwards (e.g., 'rat' as 'tar').",
    test: (password) => {
        const words = password.match(/\w+/g) || [];
        return words.some(word => words.includes(word.split('').reverse().join('')));
    },
},
{
    id: "rule-sum-equals-15",
    message: "The sum of all digits in your password must equal 15.",
    test: (password) => {
        const digits = password.split('').filter(char => /[0-9]/.test(char)).map(Number);
        const sum = digits.reduce((a, b) => a + b, 0);
        return sum === 15;
    },
}

];

function checkPassword() {
    const password = document.getElementById("password").value;
    const rulesContainer = document.getElementById("rules");
    const saveButtonContainer = document.getElementById("saveButtonContainer");
    const successMessage = document.getElementById("successMessage");
    rulesContainer.innerHTML = ""; // Clear old rules
    saveButtonContainer.innerHTML = ""; // Clear old save button
    successMessage.innerHTML = ""; // Clear old success message
  
    let allPassed = true;
  
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
  
      const ruleElement = document.createElement("div");
      ruleElement.classList.add("alert", "mt-2");
  
      if (rule.test(password)) {
        ruleElement.classList.add("alert-success");
        ruleElement.innerText = rule.message + " (✅)";
      } else {
        ruleElement.classList.add("alert-danger");
        ruleElement.innerText = rule.message + " (❌)";
        allPassed = false;
        rulesContainer.prepend(ruleElement); // If a rule fails, add it to the top
        break; // Stop checking further rules
      }
  
      if (allPassed) {
        rulesContainer.appendChild(ruleElement);
      }
    }
  
    if (allPassed) {
      // Show success message
      const successText = document.createElement("p");
      successText.classList.add("alert", "alert-success", "mt-3");
      successText.innerText = "Congratulations! Your password meets all requirements.";
      successMessage.appendChild(successText);
  
      // Add save button
      const saveButton = document.createElement("button");
      saveButton.classList.add("btn", "btn-primary", "mt-3");
      saveButton.innerText = "Save Password";
      saveButton.onclick = () => alert("Password saved successfully!");
      saveButtonContainer.appendChild(saveButton);
    }
  }
  