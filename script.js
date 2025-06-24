const bmiInstructions = {
  underweight: {
    title: "Underweight BMI (< 18.5) 💪🍽️",
    color: "linear-gradient(90deg,#b3e0ff,#f7e6ff)",
    list: [
      "Eat 5–6 times a day.",
      "Add ghee, butter, or cheese to food.",
      "Drink milk daily.",
      "Eat bananas, mangoes, and dry fruits.",
      "Eat eggs, paneer, dal, and chicken.",
      "Drink banana shake or lassi.",
      "Do light exercise like push-ups or squats.",
      "Don’t skip any meal.",
      "Add extra food to your plate each time.",
      "Snack on nuts, raisins, or chikki.",
      "Sleep at least 8 hours daily.",
      "Don’t drink too much water before meals.",
      "Avoid junk food like chips and cold drinks.",
      "Check your weight once a week.",
      "Stay happy and patient. 😊"
    ]
  },
  normal: {
    title: "Normal BMI (18.5–24.9) 🥗🏃‍♂️",
    color: "linear-gradient(90deg,#c7f7c1,#b3e0ff)",
    list: [
      "Eat 3 healthy meals a day.",
      "Avoid oily and fried food.",
      "Stop eating chips, sweets, and cold drinks.",
      "Eat more fruits and vegetables.",
      "Use less rice, more roti or salad.",
      "Walk at least 30 minutes daily.",
      "Climb stairs instead of using lift.",
      "Drink 8–10 glasses of water daily.",
      "Don’t eat late at night.",
      "Sleep on time, at least 7–8 hours.",
      "Avoid eating while watching TV or mobile.",
      "Eat slowly and chew properly.",
      "Use small plates to eat less.",
      "Say no to junk food.",
      "Check your weight once a week."
    ]
  },
  overweight: {
    title: "Overweight BMI (25–29.9) 🍎🚶‍♀️",
    color: "linear-gradient(90deg,#ffe5b3,#ffb92e)",
    list: [
      "Start with small goals.",
      "Eat more fruits, veggies, and salads.",
      "Stop fast food, cold drinks, and sweets.",
      "Use less oil, ghee, and sugar.",
      "Eat home-cooked meals only.",
      "Walk 15–30 minutes daily, increase slowly.",
      "Do light exercises like stretching, yoga.",
      "Don’t skip meals, eat on time.",
      "Drink warm water in the morning.",
      "Use smaller plates to control food.",
      "Avoid eating outside or ordering online.",
      "Sleep at least 7–8 hours.",
      "Don’t watch mobile while eating.",
      "Track your weight weekly.",
      "Stay positive and don’t lose hope. 💯"
    ]
  },
  obese: {
    title: "Obese BMI (≥ 30) 🩺🏥",
    color: "linear-gradient(90deg,#ffc1c1,#ff5b5b)",
    list: [
      "Keep eating healthy food.",
      "Stay active with daily walking or exercise.",
      "Drink enough water every day.",
      "Don’t overeat, even if food is tasty.",
      "Eat on time and chew slowly.",
      "Sleep 7–8 hours every night.",
      "Avoid too much junk or fried food.",
      "Control sugar and salt intake.",
      "Add fruits and veggies in daily meals.",
      "Do regular health check-ups.",
      "Avoid stress and stay calm.",
      "Don’t skip breakfast.",
      "Eat light dinner, not too late.",
      "Keep your weight checked once a month.",
      "Enjoy life, but keep health first! 🌟"
    ]
  }
};

const motivationalMessages = [
  "🌟 <b>Health is wealth — maintain it well.</b>",
  "💪 You’re doing great! Just stay consistent.",
  "😊 Fit body, fresh mind, happy life.",
  "🍏 Small healthy habits = long healthy life."
];

function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const resultDiv = document.getElementById('result');

  if (!height || !weight || height <= 0 || weight <= 0) {
    resultDiv.textContent = "Please enter valid height and weight!";
    resultDiv.style.background = "linear-gradient(90deg,#fdefff,#fffde7)";
    resultDiv.style.color = "#b721ff";
    hideInstructionsButton();
    return;
  }

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  const bmiRounded = bmi.toFixed(1);

  let grade = "";
  let gradeColor = "";
  let bmiCatKey = "";
  if (bmi < 18.5) {
    grade = "Underweight";
    gradeColor = "#3db3ff";
    bmiCatKey = "underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    grade = "Normal";
    gradeColor = "#3cd856";
    bmiCatKey = "normal";
  } else if (bmi >= 25 && bmi < 30) {
    grade = "Overweight";
    gradeColor = "#ffb92e";
    bmiCatKey = "overweight";
  } else {
    grade = "Obese";
    gradeColor = "#ff5b5b";
    bmiCatKey = "obese";
  }

  resultDiv.innerHTML = `BMI: <span style="color:${gradeColor}">${bmiRounded} (${grade})</span>`;
  resultDiv.style.background = "linear-gradient(90deg,#b3e0ff 0 24%,#c7f7c1 27% 55%,#ffe5b3 58% 79%,#ffc1c1 80%)";
  resultDiv.style.color = "#1a1a33";
  showInstructionsButton(bmiCatKey);
}

function showInstructionsButton(bmiCatKey) {
  hideInstructionsButton();
  const btn = document.createElement('button');
  btn.className = 'next-btn';
  btn.innerText = "👉 Show BMI Instructions";
  btn.style.marginTop = "14px";
  btn.onclick = () => showInstructions(bmiCatKey);
  document.getElementById('result').appendChild(btn);
}

function hideInstructionsButton() {
  const resultDiv = document.getElementById('result');
  const btn = resultDiv.querySelector('.next-btn');
  if (btn) btn.remove();
}

function showInstructions(bmiCatKey) {
  // Hide form/result
  document.getElementById('bmiForm').style.display = "none";
  // Show instructions
  const instructionsDiv = document.getElementById('instructionsPage');
  const cat = bmiInstructions[bmiCatKey];

  // Build instructions HTML
  let html = `<div class="instructions-title" style="background:${cat.color};border-radius:12px;">
    ${cat.title}
  </div>
  <ul class="instructions-list">`;
  cat.list.forEach(item => {
    // Choose emoji for list
    let emoji = "✅";
    if (bmiCatKey === "obese") emoji = "⚠️";
    if (bmiCatKey === "underweight") emoji = "🍽️";
    if (bmiCatKey === "normal") emoji = "🥗";
    if (bmiCatKey === "overweight") emoji = "🍏";
    html += `<li><span>${emoji}</span> ${item}</li>`;
  });
  html += `</ul>
    <div class="motivation-title">🌟 Motivational Messages:</div>
    <ul class="motivation-list">`;
  motivationalMessages.forEach(msg => {
    html += `<li>${msg}</li>`;
  });
  html += '</ul>';
  // Show back button
  html += `<button class="next-btn" style="margin-top:18px;" onclick="restartCalculator()">🔄 Back to Calculator</button>`;
  instructionsDiv.innerHTML = html;
  instructionsDiv.style.display = "block";
}

// Allow going back to calculator
function restartCalculator() {
  document.getElementById('bmiForm').style.display = "block";
  document.getElementById('result').innerHTML = "";
  document.getElementById('instructionsPage').style.display = "none";
  document.getElementById('height').value = "";
  document.getElementById('weight').value = "";
  document.getElementById('height').focus();
}