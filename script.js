
// ================= SOUND =================
const clickSound = new Audio("sounds/click.mp3");
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const winSound = new Audio("sounds/win.mp3");

// ================= QUESTIONS =================
const questionsData = {

  // 🌍 GENERAL (10)
  general: [
    { question: "Capital of India?", answers: ["Delhi","Mumbai","Chennai","Kolkata"], correct: "Delhi" },
    { question: "Color of sky?", answers: ["Blue","Red","Green","Yellow"], correct: "Blue" },
    { question: "Water freezes at?", answers: ["0°C","10°C","50°C","100°C"], correct: "0°C" },
    { question: "Sun rises in?", answers: ["East","West"], correct: "East" },
    { question: "National animal of India?", answers: ["Tiger","Lion","Elephant","Dog"], correct: "Tiger" },
    { question: "Which is a planet?", answers: ["Mars","Sun","Moon","Star"], correct: "Mars" },
    { question: "How many days in a week?", answers: ["5","6","7","8"], correct: "7" },
    { question: "Which is a liquid?", answers: ["Water","Stone","Wood","Iron"], correct: "Water" },
    { question: "Which is a bird?", answers: ["Eagle","Lion","Dog","Fish"], correct: "Eagle" },
    { question: "Which is a color?", answers: ["Blue","Car","House","Tree"], correct: "Blue" }
  ],

  // 🧠 APTITUDE (10)
  aptitude: [
    { question: "2 + 2 = ?", answers: ["2","4","6","8"], correct: "4" },
    { question: "5 x 3 = ?", answers: ["15","10","8","20"], correct: "15" },
    { question: "10 / 2 = ?", answers: ["5","2","8","6"], correct: "5" },
    { question: "Square of 4?", answers: ["8","12","16","20"], correct: "16" },
    { question: "12 + 8 = ?", answers: ["18","20","22","24"], correct: "20" },
    { question: "15 - 5 = ?", answers: ["5","10","15","20"], correct: "10" },
    { question: "3 x 4 = ?", answers: ["7","10","12","14"], correct: "12" },
    { question: "9 / 3 = ?", answers: ["2","3","4","5"], correct: "3" },
    { question: "7 + 6 = ?", answers: ["11","12","13","14"], correct: "13" },
    { question: "20 - 10 = ?", answers: ["5","10","15","20"], correct: "10" }
  ],

  // 💻 TECH (10)
  tech: [
    { question: "HTML stands for?", answers: ["Hyper Text Markup Language","High Text","None","Hyper Tool"], correct: "Hyper Text Markup Language" },
    { question: "CSS is used for?", answers: ["Styling","Logic","DB","Server"], correct: "Styling" },
    { question: "JS is?", answers: ["Language","OS","Browser","DB"], correct: "Language" },
    { question: "React is?", answers: ["Framework","Language","OS","DB"], correct: "Framework" },
    { question: "Which is backend?", answers: ["Node.js","HTML","CSS","React"], correct: "Node.js" },
    { question: "Which symbol for id in CSS?", answers: ["#",".","$","@"], correct: "#" },
    { question: "Which is database?", answers: ["MongoDB","HTML","CSS","JS"], correct: "MongoDB" },
    { question: "JS keyword for variable?", answers: ["var","int","string","define"], correct: "var" },
    { question: "Which is framework?", answers: ["Angular","HTML","CSS","C"], correct: "Angular" },
    { question: "Which is programming language?", answers: ["JavaScript","HTML","CSS","Bootstrap"], correct: "JavaScript" }
  ]
};

// ================= VARIABLES =================
let questions = [];
let index = 0;
let score = 0;
let category = "";

// ================= LOGIN =================
function login(){
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  category = document.getElementById("category").value;
  const avatar = document.getElementById("avatarSelect").value;

  if(!name || !email || !category) return alert("Fill all details");

  localStorage.setItem("user", name);
  localStorage.setItem("avatar", avatar);

  questions = [...questionsData[category]];

  // shuffle
  questions.sort(() => Math.random() - 0.5);

  document.getElementById("login-screen").style.display="none";
  document.getElementById("quiz-screen").style.display="block";

  loadQuestion();
}

// ================= LOAD QUESTION =================
function loadQuestion(){
  if(index >= questions.length) return showScore();

  const q = questions[index];
  document.getElementById("question").innerText = q.question;

  const ansDiv = document.getElementById("answers");
  ansDiv.innerHTML = "";

  q.answers.forEach(ans=>{
    const btn = document.createElement("button");
    btn.innerText = ans;

    btn.onclick = ()=>{
      clickSound.play();

      const buttons = ansDiv.querySelectorAll("button");
      buttons.forEach(b=>b.disabled=true);

      if(ans === q.correct){
        btn.style.background="green";
        btn.classList.add("correct-glow");
        correctSound.play();
        score++;

        const s = document.getElementById("score-display");
        s.innerText="Score: "+score;
        s.classList.add("score-pop");
        setTimeout(()=>s.classList.remove("score-pop"),300);

      } else {
        btn.style.background="red";
        btn.classList.add("shake");
        wrongSound.play();
      }

      buttons.forEach(b=>{
        if(b.innerText === q.correct){
          b.style.background="green";
          b.classList.add("correct-glow");
        }
      });

      setTimeout(()=>{
        index++;
        loadQuestion();
      },1000);
    };

    ansDiv.appendChild(btn);
  });
}

// ================= RESULT =================
function showScore(){
  winSound.play();
  confetti();

  document.getElementById("quiz-screen").style.display="none";
  document.getElementById("leaderboard-screen").style.display="block";

  document.getElementById("final-score").innerText="Score: "+score;
}

// ================= RESTART =================
function restartQuiz(){
  index=0;
  score=0;

  questions=[...questionsData[category]];
  questions.sort(()=>Math.random()-0.5);

  document.getElementById("leaderboard-screen").style.display="none";
  document.getElementById("quiz-screen").style.display="block";

  loadQuestion();
}

// ================= PROFILE =================
function loadProfile(){
  document.getElementById("profile-name").innerText = localStorage.getItem("user");
  document.getElementById("avatar").src = localStorage.getItem("avatar");
}

// ================= NAV =================
function showScreen(s){
  ["quiz","leaderboard","profile"].forEach(x=>{
    document.getElementById(x+"-screen").style.display="none";
  });

  document.getElementById(s+"-screen").style.display="block";

  if(s==="profile") loadProfile();
}

// ================= 3D BACKGROUND =================
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas:document.getElementById("bg")});

renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.z=30;

function addStar(){
  const g=new THREE.SphereGeometry(0.2,24,24);
  const m=new THREE.MeshBasicMaterial({color:0xffffff});
  const s=new THREE.Mesh(g,m);

  s.position.set(
    THREE.MathUtils.randFloatSpread(100),
    THREE.MathUtils.randFloatSpread(100),
    THREE.MathUtils.randFloatSpread(100)
  );

  scene.add(s);
}

Array(200).fill().forEach(addStar);

function animate(){
  requestAnimationFrame(animate);
  scene.rotation.y+=0.0005;
  renderer.render(scene,camera);
}
animate();