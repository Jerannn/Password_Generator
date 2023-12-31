const generateBtn = document.querySelector(".generateBtn");

const displayPassword = document.querySelector(".generatedPassword");
const copyTextBtn = document.querySelector(".copyTextBtn");
const copiedText = document.querySelector(".copiedText");
const materialSymbol = document.querySelector(".material-symbols-outlined");

// Check Password Strength
const tooShort = document.querySelector(".tooShort");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");
const displayStrength = document.querySelector(".displayStrength");

const upperCase = document.querySelector(".upperCaseLetters");
const numbers = document.querySelector(".numbers");
const symbols = document.querySelector(".symbols");
const passwordRangeValue = document.querySelector(".passwordRangeValue");
const passwordRange = document.querySelector(".passwordRange");

// Event Handlers
passwordRangeValue.addEventListener("input", realTimeAmount);
passwordRange.addEventListener("input", realTimeAmount);
copyTextBtn.addEventListener("click", copyGeneratedPassword);
generateBtn.addEventListener("click", displayGeneratedPassword);

// Get CharCodes in an easy way
const lowerCaseLetters = charArray(97, 122);
const upperCaseLetters = charArray(65, 90);
const numberCharCodes = charArray(48, 57);
const symbolCharCodes = charArray(33, 47)
  .concat(charArray(58, 64))
  .concat(charArray(91, 96))
  .concat(charArray(123, 126));

// Get a copy of Generated Password
function copyGeneratedPassword() {
  const passwordValue = displayPassword.value;
  if (!passwordValue) return;
  navigator.clipboard.writeText(passwordValue);
  materialSymbol.style.display = "none";
  copiedText.style.display = "block";
  setTimeout(() => {
    materialSymbol.style.display = "block";
    copiedText.style.display = "none";
  }, 2000);
}

// It will display password once the event handler for this function is triggered
function displayGeneratedPassword() {
  const charAmount = Number(passwordRange.value);
  const charUpperCaseLetters = upperCase.checked;
  const charNumbers = numbers.checked;
  const charSymbols = symbols.checked;

  const password = generatePassword(
    charAmount,
    charUpperCaseLetters,
    charNumbers,
    charSymbols
  );

  displayPassword.value = password;
}

// This function will generate a password
function generatePassword(
  charAmount,
  charUpperCaseLetters,
  charNumbers,
  charSymbols
) {
  const completeGeneratePassword = [];
  let charCombination = lowerCaseLetters;

  if (charUpperCaseLetters) {
    charCombination = charCombination.concat(upperCaseLetters);
  }
  if (charNumbers) charCombination = charCombination.concat(numberCharCodes);
  if (charSymbols) charCombination = charCombination.concat(symbolCharCodes);

  for (let i = 0; i < charAmount; i++) {
    const charCodes =
      charCombination[Math.floor(Math.random() * charCombination.length)];

    completeGeneratePassword.push(String.fromCharCode(charCodes));
  }

  if (
    completeGeneratePassword.length <= 5 ||
    (completeGeneratePassword.length <= 5 &&
      charUpperCaseLetters &&
      charNumbers &&
      charSymbols)
  ) {
    checkPasswordStrength([
      {
        el: weak,
        backgroundColor: "#24232b",
        borderColor: "1px solid #fff",
        message: "",
      },
      {
        el: medium,
        backgroundColor: "#24232b",
        borderColor: "1px solid #fff",
        message: "",
      },
      {
        el: strong,
        backgroundColor: "#24232b",
        borderColor: "1px solid #fff",
        message: "",
      },
      {
        el: tooShort,
        backgroundColor: "yellow",
        borderColor: "1px solid yellow",
        message: "",
      },
      {
        el: displayStrength,
        backgroundColor: "",
        borderColor: "",
        message: "TOO SHORT",
      },
    ]);
  }

  if (
    (completeGeneratePassword.length > 5 && charUpperCaseLetters) ||
    (completeGeneratePassword.length > 5 && charNumbers) ||
    (completeGeneratePassword.length > 5 && charSymbols) ||
    completeGeneratePassword.length > 5 ||
    (completeGeneratePassword.length > 5 &&
      charUpperCaseLetters &&
      charNumbers) ||
    (completeGeneratePassword.length > 5 &&
      charUpperCaseLetters &&
      charSymbols) ||
    (completeGeneratePassword.length > 5 && charNumbers && charSymbols)
  ) {
    checkPasswordStrength([
      {
        el: medium,
        backgroundColor: "#24232b",
        borderColor: "1px solid #fff",
        message: "",
      },
      {
        el: weak,
        backgroundColor: "yellow",
        borderColor: "1px solid yellow",
        message: "",
      },
      {
        el: tooShort,
        backgroundColor: "yellow",
        borderColor: "1px solid yellow",
        message: "",
      },
      {
        el: displayStrength,
        backgroundColor: "",
        borderColor: "",
        message: "WEAK",
      },
    ]);
  }

  if (
    (completeGeneratePassword.length > 8 &&
      charUpperCaseLetters &&
      charNumbers) ||
    (completeGeneratePassword.length > 8 &&
      charUpperCaseLetters &&
      charSymbols) ||
    (completeGeneratePassword.length > 8 && charNumbers && charSymbols)
  ) {
    checkPasswordStrength([
      {
        el: strong,
        backgroundColor: "#24232b",
        borderColor: "1px solid #fff",
        message: "",
      },
      {
        el: medium,
        backgroundColor: "yellow",
        borderColor: "1px solid yellow",
        message: "",
      },
      {
        el: displayStrength,
        backgroundColor: "",
        borderColor: "",
        message: "MEDIUM",
      },
    ]);
  }

  if (
    completeGeneratePassword.length >= 15 &&
    charUpperCaseLetters &&
    charNumbers &&
    charSymbols
  ) {
    checkPasswordStrength([
      {
        el: strong,
        backgroundColor: "yellow",
        borderColor: "1px solid yellow",
        message: "",
      },

      {
        el: displayStrength,
        backgroundColor: "",
        borderColor: "",
        message: "STRONG",
      },
    ]);
  }

  return completeGeneratePassword.join("");
}

// This function will check the strength of the password
function checkPasswordStrength(els) {
  els.forEach((el) => {
    el.el.style.background = el.backgroundColor;
    el.el.style.border = el.borderColor;
    el.el.innerText = el.message;
  });
}

// This function will iterate the charCodes numbers from low to high and return a new array
function charArray(from, to) {
  const charNumbers = [];

  for (let i = from; i < to; i++) {
    charNumbers.push(i);
  }
  return charNumbers;
}

// This function will get an input field value every time we type in the input field
function realTimeAmount(e) {
  const amount = e.target.value;
  passwordRange.value = amount;
  passwordRangeValue.innerHTML = amount;
}
