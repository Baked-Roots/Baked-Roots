window.onload = function () {
  // Initialising inside a try-catch
  try {
    initializeCookies(); // Setting up cookies
    initializeWelcomeAnimation(); // Starting elcome animation
    initializeBrowserPopup(); // Detecting and showing browser
    initializeCookiePopup(); // Managing cookie consent popup
    initializeSubscribePopup(); // Managing subscription popup
    initializeProgressSystem(); // Setting up progress tracking
    initializeStoryForm(); // Managing story form
    initializeStoryFlow(); // Managing story progression and choices
    initializeEndingSystem(); // Managing story endings and outcomes
    initializeNavigation(); // Managing smaller screen navigation and screen reader
  } catch (error) {
    console.error("Initialisation error:", error); // Displaying error
  }
};

/* ========================================
    COOKIE MANAGEMENT
========================================== */

function initializeCookies() {
  try {
    // Getting the start date when the page loads
    const startDate = new Date();
    setCookie("startDate", startDate.toISOString(), 7); // Storing start date for tracking
  } catch (error) {
    console.error("Cookie initialisation failed:", error);
  }
}

/**
 * Setting a cookie with expiration
 * @param {string} name - Name of the cookie
 * @param {string} value - Value to store
 * @param {number} days - Days until cookie expires
 */
function setCookie(name, value, days) {
  try {
    // Setting the expiry date
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    // Encoding value and setting cookie
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/`;
  } catch (error) {
    console.error("Failed setting cookie:", error); // Error if cookie cannot be set
  }
}

/**
 * Getting cookie value by name
 * @param {string} name - Cookie name to retrieve
 * @returns {string|null} Cookie value or null if not found
 */
function getCookie(name) {
  try {
    // Matching cookie using regular expression
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  } catch (error) {
    console.error("Failed getting cookie:", error); // Error if cookie cannot be fetched
    return null;
  }
}

/* ========================================
    WELCOME ANIMATION
========================================== */

function initializeWelcomeAnimation() {
  try {
    // Showing message only once per session using session storage
    if (!sessionStorage.getItem("welcomeShown")) {
      const welcome = document.getElementById("welcome");
      if (!welcome) return;

      // Getting required elements
      const body = document.body;
      const textLeft = document.getElementById("text-left");
      const textRight = document.getElementById("text-right");

      welcome.style.display = "flex"; // Showing welcome container
      animateWelcomeElements(welcome, body, textLeft, textRight); // Starting animation
      sessionStorage.setItem("welcomeShown", "true"); // Marking as shown
    }
  } catch (error) {
    console.error("Welcome animation failed:", error); // Showing error if it could not be shown
  }
}

/**
 * @param {HTMLElement} welcome - Welcome container element
 * @param {HTMLElement} body - Page body element
 * @param {HTMLElement} textLeft - Left text element
 * @param {HTMLElement} textRight - Right text element
 */
function animateWelcomeElements(welcome, body, textLeft, textRight) {
  try {
    // Fading out original text
    setTimeout(() => {
      textLeft?.classList.add("fade-out");
      textRight?.classList.add("fade-out");
    }, 4000);

    // Updating text content and fading in new text
    setTimeout(() => {
      const screenWidth = window.innerWidth;
      const fontSize = getDynamicFontSize(screenWidth); // Getting responsive font size

      if (textLeft && textRight) {
        updateTextElements(textLeft, textRight, fontSize); // Updating text content
        triggerFadeIn(textLeft, textRight); // Starting fade-in animation
      }
    }, 4500);

    // Splitting the screen
    setTimeout(() => {
      welcome?.classList.add("split");
    }, 7500);

    // Hiding welcome and showing main content
    setTimeout(() => {
      welcome.style.display = "none";
      body?.classList.add("loaded"); // Adding loaded class to body
    }, 8500);
  } catch (error) {
    console.error("Animation sequence error:", error);
  }
}

/**
 * Calculating dynamic font size based on screen width
 * @param {number} screenWidth - Current screen width
 * @returns {string} Font size with px unit
 */
function getDynamicFontSize(screenWidth) {
  if (screenWidth <= 600) return "100px"; // Mobile size
  if (screenWidth > 600 && screenWidth <= 1024) return "150px"; // Tablet size
  return "200px"; // Desktop size
}

/**
 * Updating text elements with new content and styles
 * @param {HTMLElement} textLeft - Left text element
 * @param {HTMLElement} textRight - Right text element
 * @param {string} fontSize - Calculated font size
 */
function updateTextElements(textLeft, textRight, fontSize) {
  textLeft.textContent = "Baked"; // Updating left text
  textRight.textContent = "Roots"; // Updating right text

  // Applying styles
  const textStyle = {
    fontFamily: "January Night, cursive",
    fontSize: fontSize,
  };

  // Assigning styles with individual colours
  Object.assign(textLeft.style, textStyle, { color: "#2b3c29" });
  Object.assign(textRight.style, textStyle, { color: "#2e241a" });
}

/**
 * Triggering fade-in animation on text elements
 * @param {HTMLElement} textLeft - Left text element
 * @param {HTMLElement} textRight - Right text element
 */
function triggerFadeIn(textLeft, textRight) {
  textLeft.classList.remove("fade-out");
  textRight.classList.remove("fade-out");
  textLeft.classList.add("fade-in");
  textRight.classList.add("fade-in");
}

/* ========================================
    BROWSER DETECTION
========================================== */

function initializeBrowserPopup() {
  try {
    // Showing message only once per session using session storage
    if (!sessionStorage.getItem("browserPopupShown")) {
      detectBrowser(); // Detecting and showing browser info
      sessionStorage.setItem("browserPopupShown", "true"); // Marking as shown
    }
  } catch (error) {
    console.error("Browser detection failed:", error); // Error if browser cannot be detected
  }
}

function detectBrowser() {
  try {
    const userAgent = navigator.userAgent;
    let browser = "Unknown Browser";

    // Checking and naming each browser else setting it to unknown
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
      browser = "Google Chrome";
    } else if (userAgent.includes("Firefox")) {
      browser = "Mozilla Firefox";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
      browser = "Apple Safari";
    } else if (userAgent.includes("Edg")) {
      browser = "Microsoft Edge";
    } else if (userAgent.includes("Trident")) {
      browser = "Internet Explorer";
    }

    alert(`You are using: ${browser}`); // Showing detected browser
  } catch (error) {
    console.error("Browser detection error:", error);
  }
}

/* ========================================
    POPUPS
========================================== */

// Showing message only once per session using session storage
function initializeCookiePopup() {
  try {
    if (!sessionStorage.getItem("cookiePopupShown")) {
      const popup = document.getElementById("cookie-popup");
      if (popup) {
        showPopup(popup); // Showing popup with blur effect
        sessionStorage.setItem("cookiePopupShown", "true"); // Marking as shown
      }
    }

    // Setting up accept button
    const acceptBtn = document.getElementById("accept-cookie-btn");
    if (acceptBtn) {
      acceptBtn.onclick = handleCookieAcceptance;
    }
  } catch (error) {
    console.error("Cookie popup initialisation failed:", error);
  }
}

// Showing message only once per session using session storage
function initializeSubscribePopup() {
  try {
    if (!sessionStorage.getItem("subscribePopupShown")) {
      const popup = document.getElementById("subscribe-popup");
      if (popup) {
        showPopup(popup); // Showing popup with blur effect
        sessionStorage.setItem("subscribePopupShown", "true"); // Marking as shown
      }
    }

    setupSubscribeButtons(); // Setting up subscribe/decline buttons
  } catch (error) {
    console.error("Subscribe popup initialisation failed:", error);
  }
}

// Handling subscribe button

function setupSubscribeButtons() {
  const acceptBtn = document.getElementById("accept-subscribe-btn");
  const declineBtn = document.getElementById("decline-subscribe-btn");

  if (acceptBtn) {
    acceptBtn.onclick = () => handleSubscriptionResponse(true); // Handling subscribe
  }

  if (declineBtn) {
    declineBtn.onclick = () => handleSubscriptionResponse(false); // Handling decline
  }
}

/**
 * Showing popup with blur effect
 * @param {HTMLElement} popup - Popup element to show
 */
function showPopup(popup) {
  popup.style.display = "block"; // Making popup visible
  document.body.classList.add("blur-background"); // Adding blur to background
  document.body.style.pointerEvents = "none"; // Disabling background links
}

// If they accept
function handleCookieAcceptance() {
  try {
    document.getElementById("cookie-popup").style.display = "none"; // Hiding popup
    restorePageInteraction(); // Restoring link functionality
    localStorage.setItem("cookiesAccepted", "true"); // Storing acceptance
  } catch (error) {
    console.error("Cookie acceptance failed:", error); // Showing error
  }
}

/**
 * Handling subscription response
 * @param {boolean} accepted - Whether user accepted subscription
 */
function handleSubscriptionResponse(accepted) {
  try {
    alert(accepted ? "Thank you for subscribing!" : "Not subscribed"); // Showing feedback
    document.getElementById("subscribe-popup").style.display = "none"; // Hiding popup
    restorePageInteraction(); // Restoring link functionality
  } catch (error) {
    console.error("Subscription handling failed:", error);
  }
}

function restorePageInteraction() {
  document.body.style.pointerEvents = "auto"; // Re-enabling interactions
  document.body.classList.remove("blur-background"); // Removing blur effect
}

/* ========================================
    PROGRESS TRACKING
========================================== */

let progress = 0; // Current progress percentage
let experienceLevel = "beginner"; // Default experience level
let userChoices = []; // Array to store user story choices

function initializeProgressSystem() {
  try {
    // Loading saved experience level from cookie
    const savedExperience = getCookie("experienceLevel");
    if (savedExperience) experienceLevel = savedExperience;

    updateProgress(0); // Initialising progress bar display
  } catch (error) {
    console.error("Progress system initialisation failed:", error);
  }
}

/**
 * Updating progress bar display
 * @param {number} increment - Amount to increase progress
 */
function updateProgress(increment = 20) {
  try {
    progress = Math.min(progress + increment, 100); // Ensuring doesn't exceed 100%

    // Updating progress bar fill
    const fill = document.getElementById("growth-bar-fill");
    const leaf = document.getElementById("leaf-icon");

    if (fill) {
      fill.style.width = `${progress}%`; // Setting width based on progress
      fill.style.background = getProgressBarColor(); // Setting colour based on level
    }

    if (leaf) leaf.style.left = `calc(${progress}% - 30px)`; // Moving leaf icon
  } catch (error) {
    console.error("Progress update failed:", error); // Showing error
  }
}

/**
 * Getting colour for progress bar based on experience level
 * @returns {string} Colour hex code
 */
function getProgressBarColor() {
  switch (experienceLevel) {
    case "beginner":
      return "#f5a9a9"; // Red for beginners
    case "intermediate":
      return "#f9e68c"; // Yellow for intermediate
    case "expert":
      return "#a9d6b5"; // Green for experts
    default:
      return "#f5a9a9"; // Default to beginner colour
  }
}

/* ========================================
    STORY FORM
========================================== */

let currentCharacter; // Stores current character data

function initializeStoryForm() {
  try {
    setupNewStoryButton(); // Configuring new story button
    setupFormInputHandlers(); // Setting up form input
    setupFormSubmission(); // Configuring form submission
  } catch (error) {
    console.error("Story form initialisation failed:", error); // Showing error
  }
}

// New story button
function setupNewStoryButton() {
  const newStoryBtn = document.getElementById("new-story-btn");
  if (newStoryBtn) {
    newStoryBtn.addEventListener("click", resetStoryProgress); // Resetting progress on click
  }
}

// Resetting progress
function resetStoryProgress() {
  try {
    progress = 0;
    updateProgress(0); // Resetting progress bar

    // Clearing relevant cookies
    ["startDate", "lastScene", "userChoices", "progress", "score"].forEach(
      (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    );

    // Showing form
    document.querySelector(".grow-page-content-section").style.display = "none";
    document.getElementById("story-form").style.display = "flex";
  } catch (error) {
    console.error("Failed resetting story progress:", error); // Showing error
  }
}

// Form input
function setupFormInputHandlers() {
  const nameInput = document.getElementById("full-name");
  const ageInput = document.getElementById("age");
  const genderInputs = document.querySelectorAll('input[name="gender"]');

  if (nameInput) {
    nameInput.addEventListener("change", handleNameChange); // Handling name changes
  }

  if (ageInput) {
    ageInput.addEventListener("change", handleAgeChange); // Handling age changes
  }

  genderInputs.forEach((el) => {
    el.addEventListener("change", handleGenderChange); // Handling gender changes
  });
}

// Name input changes
function handleNameChange() {
  try {
    const fullName = this.value.trim();
    const age = parseInt(document.getElementById("age").value);
    const genderEl = document.querySelector('input[name="gender"]:checked');

    if (genderEl) {
      currentCharacter = new Character(fullName, age, genderEl.value); // Creating character
      generateUsername(); // Updating username display
    }
  } catch (error) {
    console.error("Name change handling failed:", error);
  }
}

// Age input changes
function handleAgeChange() {
  try {
    const age = parseInt(this.value);
    if (currentCharacter) currentCharacter.age = age; // Updating character age
    generateUsername(); // Updating username display
  } catch (error) {
    console.error("Age change handling failed:", error);
  }
}

// Gender input changes
function handleGenderChange() {
  try {
    if (currentCharacter) currentCharacter.gender = this.value; // Updating character gender
    generateUsername(); // Updating username display
  } catch (error) {
    console.error("Gender change handling failed:", error);
  }
}

/**
 * Character constructor
 * @param {string} fullName - User's full name
 * @param {number} age - User's age
 * @param {string} gender - User's gender
 */
function Character(fullName, age, gender) {
  this.fullName = fullName; // Storing full name
  this.age = age; // Storing age
  this.gender = gender; // Storing gender

  /**
   * Getting and formatting first name
   * @returns {string} Formatted first name
   */
  this.getFirstName = function () {
    try {
      const firstName = this.fullName.split(" ")[0]; // Getting first word
      return (
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() // Capitalising first letter
      );
    } catch (error) {
      console.error("Failed getting first name:", error); // Showing error
      return "";
    }
  };
}

// Generating username
function generateUsername() {
  try {
    const fullName = document.getElementById("full-name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const gender = document.querySelector('input[name="gender"]:checked');

    // Only generating if requirements met
    if (fullName.length >= 2 && gender && age >= 15) {
      const username =
        fullName.slice(0, 2).toUpperCase() + // First 2 letters of name
        gender.value[0].toUpperCase() + // First letter of gender
        age + // User's age
        (Math.floor(Math.random() * 10) + 1); // Random number 1-10

      // Updating form heading with generated username
      const formHeading = document.getElementById("form-heading");
      if (formHeading) formHeading.textContent = `Username : ${username}`;
    }
  } catch (error) {
    console.error("Username generation failed:", error); // Showing error
  }
}

function setupFormSubmission() {
  const form = document.getElementById("story-form-content");
  if (form) {
    form.addEventListener("submit", handleFormSubmission); // Handling form submit
  }
}

/**
 * Handling form submission
 * @param {Event} e - Form submission event
 */
function handleFormSubmission(e) {
  try {
    e.preventDefault(); // Preventing default form submission

    // Getting form values
    const fullName = document.getElementById("full-name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const gender = document.querySelector('input[name="gender"]:checked');
    experienceLevel = document.getElementById("experience").value;

    // Validating form inputs
    if (!validateFormInputs(fullName, age, gender, experienceLevel)) {
      return;
    }

    generateUsername(); // Updating username display

    // Creating character with final values
    currentCharacter = new Character(fullName, age, gender.value);

    // Replacing placeholder in story text
    const firstName = currentCharacter.getFirstName();
    const storyText = document.querySelector(".story-text p");
    if (storyText) {
      storyText.textContent = storyText.textContent.replace(
        "[User]",
        firstName
      );
    }

    // Confirming submission with user
    if (confirm("Are you sure you want to submit these details?")) {
      completeFormSubmission(fullName, experienceLevel, firstName);
    }
  } catch (error) {
    console.error("Form submission failed:", error); // Showing error
  }
}

/**
 * Validating form inputs
 * @returns {boolean} True if inputs are valid
 */
function validateFormInputs(fullName, age, gender, experienceLevel) {
  if (fullName.length < 2) {
    alert("Full name must be at least 2 characters.");
    return false;
  }

  if (!age || age < 15) {
    alert("Must be at least 15.");
    return false;
  }

  if (!age || age > 100) {
    alert("Can only be 100 or younger.");
    return false;
  }

  if (!gender || !experienceLevel) {
    alert("Please complete all fields.");
    return false;
  }

  return true;
}

function completeFormSubmission(fullName, experienceLevel, firstName) {
  alert("Details submitted successfully!");

  // Setting cookies for persistence
  setCookie("fullName", fullName, 7);
  setCookie("experienceLevel", experienceLevel, 7);
  setCookie("lastScene", "story-intro-section", 7);

  updateProgress(20); // Updating progress bar

  // Showing story intro
  document.getElementById("story-form").style.display = "none";
  document.getElementById("story-intro-section").style.display = "block";
  document.getElementById("growth-tracker").style.display = "block";

  // Updating story text again
  const storyText = document.querySelector(".story-text p");
  if (storyText && storyText.textContent.includes("[User]")) {
    storyText.textContent = storyText.textContent.replace("[User]", firstName);
  }
}

/* ========================================
    STORY FLOW SYSTEM
========================================== */

// Scene configurations for different choices
const SCENE_CONFIGURATIONS = {
  "loamy-soil": {
    scene: "story-scene-2-section", // Showing scene
    hideButtons: ["choice-1-btn"], // Hiding buttons
    progress: 20, // Updating progress
  },
  "clay-soil": {
    scene: "story-scene-2-section",
    hideButtons: ["choice-1-btn", "choice-2-btn"],
    progress: 80,
  },
  "organic-fertiliser": {
    scene: "story-scene-3-section",
    hideButtons: ["choice-2-btn"],
    progress: 20,
  },
  "chemical-fertiliser": {
    scene: "story-scene-3-section",
    hideButtons: ["choice-2-btn"],
    progress: 20,
  },
  "drip-irrigation": {
    scene: "story-scene-4-section",
    hideButtons: ["choice-3-btn"],
    progress: 20,
  },
  "flood-irrigation": {
    scene: "story-scene-4-section",
    hideButtons: ["choice-3-btn", "choice-4-btn"],
    progress: 60,
  },
  "organic-pesticide": {
    scene: "story-scene-5-section",
    hideButtons: ["choice-4-btn"],
    progress: 20,
  },
  "chemical-pesticide": {
    scene: "story-scene-5-section",
    hideButtons: ["choice-4-btn"],
    progress: 20,
  },
};

function initializeStoryFlow() {
  try {
    setupContinueStoryButton(); // Continue button
    initializeChoiceSections(); // Setting up choice sections
  } catch (error) {
    console.error("Story flow initialisation failed:", error); // Showing error
  }
}

// Continue story button
function setupContinueStoryButton() {
  const continueBtn = document.getElementById("continue-story-btn");
  const lastScene = getCookie("lastScene"); // Getting last scene from cookies
  const savedChoices = getCookie("userChoices"); // Getting saved choices

  if (continueBtn) {
    if (lastScene) {
      // If there's progress to continue
      continueBtn.style.display = "inline-block";
      continueBtn.addEventListener("click", () =>
        loadSavedProgress(lastScene, savedChoices)
      );
    } else {
      // Disabling if no progress exists
      continueBtn.disabled = true;
      continueBtn.style.opacity = "0.5";
      alert("Start your new story!");
    }
  }
}

// Loading progress from cookies
function loadSavedProgress(lastScene, savedChoices) {
  try {
    const continueBtn = document.getElementById("continue-story-btn");
    if (continueBtn) continueBtn.style.display = "none";

    // Reset progress to 0 when continuing
    progress = 0;
    updateProgress(0);

    // SHowing story intro again
    document.querySelector(".grow-page-content-section").style.display = "none";
    document.getElementById("story-intro-section").style.display = "block";

    // Loading saved name and updating story text
    const savedName = getCookie("fullName");
    if (savedName) {
      const firstName = savedName.split(" ")[0];
      const formatted =
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

      const storyText = document.querySelector(".story-text p");
      if (storyText) {
        storyText.textContent = storyText.textContent.replace(
          "[User]",
          formatted
        );
      }
    }

    document.getElementById("growth-tracker").style.display = "block";

    if (savedChoices) {
      userChoices = JSON.parse(savedChoices); // Restoring choices
      restoreChoiceTexts(); // Updating choice texts
      restoreSceneVisibility(); // Showing appropriate scenes
    }

    // Calculate progress based on choices
    userChoices.forEach((choice) => {
      const config = SCENE_CONFIGURATIONS[choice];
      if (config) {
        progress += config.progress;
      }
    });

    // Update progress bar
    updateProgress(20);

    // Showing ending if that was the last scene
    if (lastScene === "story-ending-section") {
      document.getElementById("story-ending-section").style.display = "block";
      userOutcome();
    }
  } catch (error) {
    console.error("Failed loading saved progress:", error);
  }
}

// Restoring choice texts from saved data
function restoreChoiceTexts() {
  const choiceTexts = {
    "loamy-soil":
      "You decided to go with loamy soil, confident it would provide the best conditions for your apple tree. The tree grew strong and steady, its roots digging deep into the soil.",
    "clay-soil":
      "You decided to go with clay soil, hoping its moisture retention would benefit your apple tree. At first, it seemed like the right choice. But after a few days, you noticed the tree wasn’t thriving as expected. The soil was too dense, and the roots struggled to spread, causing your fruit to die.",
    "organic-fertiliser":
      "You decided on organic fertiliser, trusting it would nurture the soil and promote healthy growth. The apples were bigger, and the tree seemed to thrive in this natural, balanced environment.",
    "chemical-fertiliser":
      "You chose chemical fertiliser, believing it would give the apple tree the boost it needed. At first, the tree grew quickly, and the apples looked impressive. But as time went on, the soil began to lose its vitality, and eventually, fruit could no longer be planted there.",
    "flood-irrigation":
      "Due to budget constraints, you decided that flood irrigation would be the option. You watch as the water spreads across the soil, soaking everything in its path. However, after a few days, you notice something strange. What are those small spots appearing on your apples? Despite the abundance of water, it seems the water hasn't reached the roots properly, causing the tree to wither and die.",
    "drip-irrigation":
      "After some thought, you decided on drip irrigation. It was more expensive, but you had a good feeling about it. Over the next few days, the apples seemed brighter, almost glowing. The tree flourished, its roots well-fed, and before long, your apples were the juiciest you'd ever seen.",
    "chemical-pesticide":
      "You decided to use chemical pesticides to protect your apple tree from pests. The tree grew healthy and strong, and the apples looked perfect. However, as you looked closer, you couldn’t shake the feeling that there was more to this method than meets the eye.",
    "organic-pesticide":
      "You went with organic pesticides, wanting to protect your tree while keeping everything as natural as possible. The apples remained safe from pests, and you felt confident that your decision was the right one for both your tree and the environment.",
  };

  // Updating text for each saved choice
  userChoices.forEach((choice) => {
    const elementId = getChoiceElementId(choice);
    const element = document.getElementById(elementId);
    if (element && choiceTexts[choice]) {
      element.textContent = choiceTexts[choice];
    }
  });
}

// Getting element ID for a choice
function getChoiceElementId(choice) {
  const choiceMap = {
    "loamy-soil": "soil-choice",
    "clay-soil": "soil-choice",
    "organic-fertiliser": "fertiliser-choice",
    "chemical-fertiliser": "fertiliser-choice",
    "flood-irrigation": "irrigation-choice",
    "drip-irrigation": "irrigation-choice",
    "chemical-pesticide": "pesticide-choice",
    "organic-pesticide": "pesticide-choice",
  };
  return choiceMap[choice] || "";
}

// Restoring scene visibility based on choices
function restoreSceneVisibility() {
  userChoices.forEach((choice) => {
    const config = SCENE_CONFIGURATIONS[choice];
    if (config) {
      // Showing appropriate scene
      const scene = document.getElementById(config.scene);
      if (scene) scene.style.display = "block";

      // Hiding appropriate buttons
      config.hideButtons.forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) {
          btn.style.display = "none";
        }
      });
    }
  });
}

// Initialising choice sections and buttons
function initializeChoiceSections() {
  try {
    // Choice 1 - Soil Type
    setupChoiceSection("choice-1-btn", "choice-1-section", [
      {
        id: "choice-1-option-loamy-btn",
        choice: "loamy-soil",
        section: "choice-1-section",
        nextScene: "story-scene-2-section",
        textElementId: "soil-choice",
        text: "You decided to go with loamy soil, confident it would provide the best conditions for your apple tree. The tree grew strong and steady, its roots digging deep into the soil.",
      },
      {
        id: "choice-1-option-clay-btn",
        choice: "clay-soil",
        section: "choice-1-section",
        nextScene: "story-scene-2-section",
        immediateOutcome: true,
        textElementId: "soil-choice",
        text: "You decided to go with clay soil, hoping its moisture retention would benefit your apple tree. At first, it seemed like the right choice. But after a few days, you noticed the tree wasn’t thriving as expected. The soil was too dense, and the roots struggled to spread, causing your fruit to die.",
      },
    ]);

    // Choice 2 - Fertiliser
    setupChoiceSection("choice-2-btn", "choice-2-section", [
      {
        id: "choice-2-organic-fertiliser-btn", // Element ID
        choice: "organic-fertiliser", // Choice made
        section: "choice-2-section", // Section displayed
        nextScene: "story-scene-3-section", // Next section to display
        textElementId: "fertiliser-choice", // Text element ID
        // Text to show
        text: "You decided on organic fertiliser, trusting it would nurture the soil and promote healthy growth. The apples were bigger, and the tree seemed to thrive in this natural, balanced environment.",
      },
      {
        id: "choice-2-chemical-fertiliser-btn",
        choice: "chemical-fertiliser",
        section: "choice-2-section",
        nextScene: "story-scene-3-section",
        textElementId: "fertiliser-choice",
        text: "You chose chemical fertiliser, believing it would give the apple tree the boost it needed. At first, the tree grew quickly, and the apples looked impressive. But as time went on, the soil began to lose its vitality, and eventually, fruit could no longer be planted there.",
      },
    ]);

    // Choice 3 - Irrigation
    setupChoiceSection("choice-3-btn", "choice-3-section", [
      {
        id: "choice-3-flood-irrigation-btn",
        choice: "flood-irrigation",
        section: "choice-3-section",
        nextScene: "story-scene-4-section",
        immediateOutcome: true,
        textElementId: "irrigation-choice",
        text: "Due to budget constraints, you decided that flood irrigation would be the option. You watch as the water spreads across the soil, soaking everything in its path. However, after a few days, you notice something strange. What are those small spots appearing on your apples? Despite the abundance of water, it seems the water hasn't reached the roots properly, causing the tree to wither and die.",
      },
      {
        id: "choice-3-drip-irrigation-btn",
        choice: "drip-irrigation",
        section: "choice-3-section",
        nextScene: "story-scene-4-section",
        textElementId: "irrigation-choice",
        text: "After some thought, you decided on drip irrigation. It was more expensive, but you had a good feeling about it. Over the next few days, the apples seemed brighter, almost glowing. The tree flourished, its roots well-fed, and before long, your apples were the juiciest you'd ever seen.",
      },
    ]);

    // Choice 4 - Pesticide
    setupChoiceSection("choice-4-btn", "choice-4-section", [
      {
        id: "choice-4-chemical-pesticide-btn",
        choice: "chemical-pesticide",
        section: "choice-4-section",
        nextScene: "story-scene-5-section",
        immediateOutcome: true,
        textElementId: "pesticide-choice",
        text: "You decided to use chemical pesticides to protect your apple tree from pests. The tree grew healthy and strong, and the apples looked perfect. However, as you looked closer, you couldn’t shake the feeling that there was more to this method than meets the eye.",
      },
      {
        id: "choice-4-organic-pesticide-btn",
        choice: "organic-pesticide",
        section: "choice-4-section",
        nextScene: "story-scene-5-section",
        immediateOutcome: true,
        textElementId: "pesticide-choice",
        text: "You went with organic pesticides, wanting to protect your tree while keeping everything as natural as possible. The apples remained safe from pests, and you felt confident that your decision was the right one for both your tree and the environment.",
      },
    ]);
  } catch (error) {
    console.error("Choice section initialisation failed:", error);
  }
}

function setupChoiceSection(continueBtnId, sectionId, options) {
  const continueBtn = document.getElementById(continueBtnId);
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      continueBtn.style.display = "none"; // Hiding continue button
      document.body.style.pointerEvents = "none"; // Disabling background
      const section = document.getElementById(sectionId);
      if (section) section.style.display = "block"; // Showing choice section
    });
  }

  // Setting up each option
  options.forEach((option) => {
    const btn = document.getElementById(option.id);
    if (btn) {
      btn.addEventListener("click", () => handleChoiceSelection(option));
    }
  });
}

// Handling choice selection
function handleChoiceSelection(option) {
  try {
    // Hiding choice section
    const choiceSection = document.getElementById(option.section);
    if (choiceSection) {
      choiceSection.style.display = "none";
    }

    // Restoring link interaction
    document.body.style.pointerEvents = "auto";

    // Storing user choice
    userChoices.push(option.choice);

    // Updating story text based on choice
    const storyTextElement = document.getElementById(option.textElementId);
    if (storyTextElement) {
      storyTextElement.textContent = option.text;
    }

    // Showing next scene
    const nextScene = document.getElementById(option.nextScene);
    if (nextScene) {
      nextScene.style.display = "block";
    }

    // Getting scene configuration
    const config = SCENE_CONFIGURATIONS[option.choice];
    if (config) {
      // Hiding appropriate buttons
      config.hideButtons.forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) {
          btn.style.display = "none";
        }
      });

      // Updating progress
      updateProgress(config.progress);
    }

    // Updating cookies
    setCookie("lastScene", option.nextScene, 7);
    setCookie("userChoices", JSON.stringify(userChoices), 7);

    // Handling immediate outcomes (bad endings)
    if (option.immediateOutcome) {
      userOutcome();
      endLoadingScene();
      setCookie("lastScene", "story-ending-section", 7);
    }
  } catch (error) {
    console.error("Choice selection failed:", error);
  }
}

/* ========================================
    ENDING SYSTEM
========================================== */

let bonusQuestionShown = false; // Tracks if bonus question was shown

function initializeEndingSystem() {
  try {
    setupRestartButton(); // Setting up restart button
    setupRevealAnswersButton(); // Setting up reveal answers button
  } catch (error) {
    console.error("Ending system initialisation failed:", error);
  }
}

// Restart button
function setupRestartButton() {
  const restartBtn = document.getElementById("restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      // Confirming with user before restarting
      if (confirm("Do you want to start a new story?")) {
        bonusQuestionShown = false; // Resetting bonus flag
        location.reload(); // Reloading page
      } else {
        alert("Cancelled."); // Showing alert
      }
    });
  }
}

// Reveal answers button
function setupRevealAnswersButton() {
  const revealBtn = document.getElementById("reveal-btn");
  const closeBtn = document.getElementById("close-answers-btn");

  if (revealBtn) {
    revealBtn.addEventListener("click", () => {
      document.getElementById("story-reveal-section").style.display = "block"; // Showing answers
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("story-reveal-section").style.display = "none"; // Hiding answers
    });
  }
}

// Formatting date as dd/mm/yyyy
function formatDate(date) {
  try {
    const day = ("0" + date.getDate()).slice(-2); // Ensuring 2-digit day
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Ensuring 2-digit month
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Returning in the right format
  } catch (error) {
    console.error("Date formatting failed:", error);
    return "Unknown date";
  }
}

// Ending animation
function endLoadingScene() {
  try {
    const loadingScene = document.getElementById("story-ending-scene-section");
    const endingScene = document.getElementById("story-ending-section");

    if (loadingScene) loadingScene.style.display = "block"; // Showing animation
    if (endingScene) endingScene.style.display = "none"; // Hiding outcome

    // Animating apple growth
    [1, 2, 3].forEach((num, index) => {
      setTimeout(() => {
        const apple = document.getElementById(`apple-${num}`);
        if (apple) {
          const seed = apple.querySelector(".seed");
          const appleImg = apple.querySelector(".apple");

          seed?.classList.add("shake"); // Shaking seed
          setTimeout(() => {
            if (seed) seed.style.opacity = 0; // Fading out seed
            if (appleImg) appleImg.style.opacity = 1; // Showing apple
            seed?.classList.remove("shake");
          }, 1000);
        }
      }, index * 1500);
    });

    // Showing ending after animations complete
    setTimeout(() => {
      if (loadingScene) loadingScene.style.display = "none";
      if (endingScene) endingScene.style.display = "block"; // Hiding animation
    }, 6000);
  } catch (error) {
    console.error("Loading scene animation failed:", error); // Showing error
  }
}

// Displaying outcome
function userOutcome() {
  try {
    let endDate = new Date();
    const storyEnding = document.getElementById("story-ending");
    if (!storyEnding) return;

    let score = calculateScore(); // Calculating score
    let scorePercentage = Math.ceil((score / 4) * 100); // Converting to percentage
    setCookie("score", scorePercentage, 7); // Storing score

    const outcomeText = determineOutcomeText(scorePercentage); // Getting outcome text
    const savedStart = getCookie("startDate");
    const start = savedStart ? new Date(savedStart) : new Date();

    // Displaying outcome with score and dates
    storyEnding.innerHTML = `${outcomeText}<br><br>Score: ${scorePercentage}/100<br><br>Completed: ${formatDate(
      start
    )} - ${formatDate(endDate)}`;

    handleBonusQuestion(scorePercentage); // Handling bonus question
    trackStoryCompletion(scorePercentage); // Tracking completion
  } catch (error) {
    console.error("Outcome determination failed:", error);
  }
}

// Calculating score based on user choices
function calculateScore() {
  let score = 0;
  if (userChoices.includes("loamy-soil")) score += 1;
  if (userChoices.includes("organic-fertiliser")) score += 1;
  if (userChoices.includes("drip-irrigation")) score += 1;
  if (userChoices.includes("organic-pesticide")) score += 1;
  return score;
}

// Determining outcome text based on choices
function determineOutcomeText(scorePercentage) {
  if (userChoices.includes("clay-soil")) {
    return "Your hands were now rough from trying to work the unyielding clay soil. But the dense earth resisted your efforts. No sign of the seed you had planted a few weeks ago should've sprouted by now. Disappointed, you stood up, took off your gloves and decided to try a different soil next time.";
  } else if (
    userChoices.includes("loamy-soil") &&
    userChoices.includes("organic-fertiliser") &&
    userChoices.includes("drip-irrigation") &&
    userChoices.includes("organic-pesticide")
  ) {
    return "Perfect! You trusted your gut and chose loamy soil, and it paid off. Your tree grew strong, deep roots. When it came time to pick a fertiliser, you went the organic route, and soon you had big, Granny Smith–worthy apples. Your choice of drip irrigation struck the perfect balance, producing the juiciest apples. Wanting to stay committed to sustainable methods, you chose organic pesticides that protected your tree while preserving the environment around it. In the end, your apples were lovingly baked into delicious pastries, and the children were overjoyed to receive them.";
  } else if (userChoices.includes("flood-irrigation")) {
    return "As all good farmers do, you set out to flood your tree twice a week. At first, your tree grew beautifully, supported by your wonderful choice of loamy soil, which gave it all the nutrients it needed. But then you started to notice something weird, despite your diligent application of fertiliser and pesticide, your tree had little black spots all over its bark. Huh... you were pretty sure that that was a sign of root rot. But how... what did you do wrong? You looked it up, and it seemed like you had flooded your tree. You did a little digging near your tree, and sure enough, your soil was waterlogged, and the roots of your tree were rotten. You sadly decided to uproot your failed tree and looked for watering alternatives that wouldn't drown your tree.";
  } else if (
    userChoices.includes("chemical-pesticide") &&
    userChoices.includes("chemical-fertiliser")
  ) {
    return "At first, your tree thrived. The loamy soil supported it, the drip irrigation kept it watered, the chemical fertiliser made it grow faster than expected, and the pesticides wiped out pests overnight. But soon, water pooled on the soil’s surface, not soaking in like before. Still, it was time to harvest. The kids loved your apples... until the principal called. The children were in hospital, sick from the chemical pesticides. You dug into the soil, and what you found shocked you. The once-living loamy soil was now dry and brittle. The chemical fertiliser had killed the micro-organisms. The rest of your fruit was confiscated, your tree uprooted, and you were left with months of work to restore your soil.";
  } else if (userChoices.includes("chemical-pesticide")) {
    return "Your apples looked stunning, so big, so juicy, and so ready to be baked into delicious treats for many children. Your use of loamy soil, fertiliser, and the drip irrigation has given your tree the perfect conditions to thrive. But your use of chemical pesticides? It was cheap and drove away all the pests that would’ve helped themselves to your fruit. Still, it came at a cost. Only a few days later, you got a call from the principal... the kids were in hospital, sick because of your use of chemical pesticides. It was confirmed by the doctor, and the rest of your fruit had to be thrown away; your tree was uprooted.";
  } else if (userChoices.includes("chemical-fertiliser")) {
    return "Your first harvest went amazingly. The kids were fed with beautiful, healthy apples that grew wonderfully thanks to your choices. Your loamy soil, drip irrigation, pesticide and chemical fertiliser use all aided this delicious yield of apples...until the next harvest. Your tree branches were sparse, your tree's leaves yellowed, even though you did exactly what you did last harvest. The exact same soil, fertiliser and watering system. So what could be the issue? A fellow Baked Roots member suggested you inspect the soil, and so you did. When you dug into your once lively soil, you found that it was now dull and lifeless. No earthworms, no fungi, just little chemical crystals. The chemical fertiliser had killed off everything your loamy soil needed to keep your tree alive. You sighed and thought about the months it would take to restore the soil to its former glory. Maybe using something a little more organic next time wouldn't hurt.";
  } else {
    return "You stand staring at your tree as your story comes to an end. Some choices nurtured growth, while others left your apples longing for more. Not every decision yielded the results you had hoped for, but every step, every stumble, planted a lesson deep within. You leave this chapter wiser, your roots stronger, ready to begin a new and better season.";
  }
}

// Bonus question for perfect score
function handleBonusQuestion(scorePercentage) {
  if (scorePercentage === 100 && !bonusQuestionShown) {
    bonusQuestionShown = true;
    const response = prompt(
      // Showing prompt
      "Congratulations! You scored 100/100. Would you like to answer a bonus question? (yes or no)"
    );

    if (response && response.toLowerCase() === "yes") {
      const answer = prompt(
        // Showing question
        "Bonus Question: How many times, in late winter, do you need to prune your plants?"
      );

      // Checking if answer was correct
      if (answer && (answer.toLowerCase() === "once" || answer === "1")) {
        alert("Correct! Well done!");
      } else {
        alert("Sorry, the correct answer is 'once' or '1'.");
      }
    }
  }
}

// Tracking story completions in localStorage
function trackStoryCompletion(scorePercentage) {
  try {
    if (!isNaN(scorePercentage)) {
      let storyCount = parseInt(
        localStorage.getItem("storiesCompleted") || "0" // Getting amount from stories else 0
      );
      storyCount++; // Adding to int
      localStorage.setItem("storiesCompleted", storyCount.toString()); // Setting amount

      // Showing reveal button after 3 completions
      if (storyCount >= 3) {
        const revealBtn = document.getElementById("reveal-btn");
        if (revealBtn) revealBtn.style.display = "inline-block";
      }
    }
  } catch (error) {
    console.error("Failed tracking story completion:", error); // Showing error
  }
}

/* ========================================
    NAVIGATION SYSTEM
========================================== */

function initializeNavigation() {
  try {
    setupHamburgerMenu(); // Mobile menu
    setupScreenReader(); // Setting up screen reader -- BONUS
    setupBlogsLink(); // Blogs link for smaller screens
  } catch (error) {
    console.error("Navigation initialisation failed:", error); // Showing error
  }
}

// Hamburger menu for mobile
function setupHamburgerMenu() {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const mainNav = document.getElementById("main-nav");

  if (hamburgerMenu && mainNav) {
    hamburgerMenu.addEventListener("click", function () {
      mainNav.classList.toggle("active"); // Toggling mobile menu
    });
  }
}

// Screen reader -- BONUS (10 marks)
function setupScreenReader() {
  let reading = false;
  let utterance;

  const readerBtn = document.getElementById("screen-reader-toggle-btn");
  if (readerBtn) {
    readerBtn.addEventListener("click", function () {
      if (!reading) {
        // Starting to read page content
        utterance = new SpeechSynthesisUtterance(document.body.innerText);
        utterance.lang = "en-ZA"; // Setting South African English
        speechSynthesis.speak(utterance);
        reading = true;
        this.textContent = "Stop Reading";
      } else {
        // Stopping reading
        speechSynthesis.cancel();
        reading = false;
        this.textContent = "Page Reader";
      }
    });
  }
}

// More blogs link
function setupBlogsLink() {
  const moreLink = document.getElementById("more-blogs-link");
  const sideBlogs = document.querySelector(".side-blogs");

  if (moreLink && sideBlogs) {
    moreLink.addEventListener("click", (e) => {
      e.preventDefault(); // Preventing default link behaviour
      sideBlogs.classList.toggle("visible"); // Toggling blogs visibility
    });
  }
}
