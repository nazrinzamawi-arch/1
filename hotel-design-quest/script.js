"use strict";

/* ================================================================
   EDITABLE QUESTION BANK — HOTEL INTERIOR DESIGN PROJECT
   Each question needs: category, question, context, options (4),
   correct (zero-based index, 0–3), explanation.
   The final question is a new transfer/application scenario.
   ================================================================ */
const QUESTION_BANK = [
  {category:"01 · GUEST EXPERIENCE",question:"A boutique hotel wants guests to feel welcome immediately. What should guide the lobby layout?",context:"Think about a first-time guest arriving with luggage.",options:["Hide reception behind a decorative wall","Make reception easy to identify with clear circulation","Place retail displays across the main entry path","Use as much furniture as possible"],correct:1,explanation:"Visible reception, intuitive routes and space for luggage reduce arrival stress. Atmosphere matters, but wayfinding and function come first."},
  {category:"02 · SPACE PLANNING",question:"Which arrangement best separates hotel public and private spaces?",context:"Plan the ground floor with a lobby, café, back office and service corridor.",options:["Route housekeeping supplies through the café","Let all guests pass through the staff office","Provide distinct guest and service circulation where feasible","Put the service corridor through the reception queue"],correct:2,explanation:"Separating guest-facing and back-of-house routes supports privacy, safer movement and more efficient operations."},
  {category:"03 · ACCESSIBILITY",question:"Which guestroom approach supports inclusive design?",context:"A guest uses a wheelchair and needs to move comfortably within the room.",options:["Keep circulation clear and provide an accessible bathroom layout","Place a raised step at the bathroom entrance","Use narrow spaces beside the bed","Provide only a staircase to accessible rooms"],correct:0,explanation:"Accessible layouts require usable routes, manoeuvring space and appropriately designed fixtures. Final dimensions must be checked against applicable local accessibility requirements."},
  {category:"04 · LIGHTING DESIGN",question:"A hotel room needs to support resting, reading and working. Which lighting strategy is strongest?",context:"Guests use the same room in different ways throughout the day.",options:["One bright ceiling lamp without controls","Colored accent lighting as the only source","No bedside lighting","Layer ambient, task and accent lighting with accessible controls"],correct:3,explanation:"Layered lighting gives guests useful illumination for different activities while supporting comfort and ambience."},
  {category:"05 · MATERIAL SELECTION",question:"What matters most when selecting flooring for a busy hotel lobby?",context:"The entrance sees heavy foot traffic and occasionally wet shoes.",options:["Choose the glossiest finish regardless of slip risk","Prioritize durability, maintenance and appropriate slip resistance","Use delicate surfaces that scratch easily","Select flooring solely based on its photograph"],correct:1,explanation:"High-traffic hotel flooring should be durable, maintainable and suited to expected moisture and slip hazards. Appearance is only one criterion."},
  {category:"06 · ACOUSTIC COMFORT",question:"Guests complain that corridor noise enters their rooms. What is the most effective design direction?",context:"Consider the door assembly, partitions and noisy adjacencies.",options:["Increase corridor background music","Use hard reflective finishes everywhere","Improve door seals, acoustic separation and room planning","Add brighter corridor lighting"],correct:2,explanation:"Sound transmission can be reduced through well-detailed doors, partitions and careful adjacency planning, rather than visual changes."},
  {category:"07 · DESIGN CONCEPT",question:"The owner wants the hotel to reflect local culture. Which concept development method is most responsible?",context:"You are developing the palette, materials and artwork.",options:["Research the place and collaborate respectfully with local makers","Copy another hotel's interior exactly","Use unrelated luxury symbols everywhere","Ignore the site's history and surroundings"],correct:0,explanation:"Site research and respectful collaboration can translate local identity into a coherent concept without relying on superficial imitation."},
  {category:"08 · SUSTAINABLE DESIGN",question:"Which interior strategy is likely to reduce energy demand without compromising guest comfort?",context:"The hotel is in a warm climate and has significant daylight exposure.",options:["Leave decorative lights on continuously","Use dark glazing without performance analysis","Block all daylight in every room","Combine effective solar control, efficient lighting and appropriate controls"],correct:3,explanation:"Solar control can limit unwanted heat gain; efficient lamps and controls avoid unnecessary electricity use. Design decisions should be assessed for the site."},
  {category:"09 · FIRE & OPERATIONS",question:"A dramatic feature wall is proposed beside a guest escape route. What should the designer do first?",context:"The contractor is ready to install the finish.",options:["Assume any decorative finish is permitted","Check egress clearance, fire-performance requirements and approvals","Narrow the escape route to make the feature more impressive","Cover exit signage with artwork"],correct:1,explanation:"Life safety comes before decorative impact. Confirm escape-route clearance, finish performance, signage and relevant local approvals before installation."},
  {category:"10 · FINAL DESIGN TRANSFER",question:"NEW SCENARIO: A small seaside hotel has a narrow entrance, strong afternoon sun and mixed-age guests. Which combined proposal works best?",context:"Apply several principles from the project to a site you have not seen before.",options:["Place a large sculpture in the entrance and use only spotlights","Use slippery polished flooring and remove seating","Keep an unobstructed accessible entrance, add solar control and clear wayfinding","Hide reception and direct arrivals past the delivery area"],correct:2,explanation:"The strongest integrated proposal considers accessibility, arrival circulation, solar comfort and wayfinding together. A good hotel design resolves multiple user needs at once."}
];

const $ = id => document.getElementById(id);
const screens = ["home","instructions","game","feedback","results"];
let current = 0;
let score = 0;
let attempts = [];
let chosen = 0;
let locked = false;
let lastCorrect = false;
let completed = false;
const maxScore = QUESTION_BANK.length * 10;
const letter = index => String.fromCharCode(65 + index);

function showScreen(id) {
  screens.forEach(name => $(name).classList.toggle("active", name === id));
  window.scrollTo({top:0,behavior:"instant"});
}
function startGame() {
  current = 0; score = 0; attempts = QUESTION_BANK.map(() => ({tries:0,firstTry:false,mastered:false}));
  chosen = 0; locked = false; completed = false;
  renderQuestion();
}
function renderQuestion() {
  if (current >= QUESTION_BANK.length) { renderResults(); return; }
  const q = QUESTION_BANK[current];
  locked = false; chosen = 0;
  $("questionCount").textContent = `CHALLENGE ${String(current+1).padStart(2,"0")} / ${QUESTION_BANK.length}`;
  $("scoreText").textContent = `SCORE ${String(score).padStart(3,"0")}`;
  $("progressFill").style.width = `${100*current/QUESTION_BANK.length}%`;
  $("categoryText").textContent = q.category;
  $("questionTitle").textContent = q.question;
  $("questionContext").textContent = q.context;
  const holder = $("targets");
  holder.replaceChildren();
  q.options.forEach((answer,index) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "target";
    b.style.setProperty("--duration", `${3.1 + index * .45}s`);
    b.style.setProperty("--delay", `${index * -.31}s`);
    b.setAttribute("aria-label", `Answer ${letter(index)}: ${answer}`);
    const mark = document.createElement("span"); mark.textContent = letter(index);
    b.append(mark,document.createTextNode(answer));
    b.addEventListener("click", () => {chosen=index; selectTarget(); submitAnswer(index);});
    holder.append(b);
  });
  selectTarget();
  showScreen("game");
}
function selectTarget() {
  [...$("targets").children].forEach((target,index) => target.classList.toggle("selected",index===chosen));
}
function submitAnswer(index) {
  if (locked || completed) return;
  locked = true;
  const q = QUESTION_BANK[current];
  const entry = attempts[current];
  entry.tries++;
  lastCorrect = index === q.correct;
  const panel = document.querySelector(".feedback-panel");
  panel.classList.toggle("incorrect",!lastCorrect);
  $("feedbackIcon").textContent = lastCorrect ? "✓" : "×";
  $("feedbackLabel").textContent = lastCorrect ? "DESIGN APPROVED" : "DESIGN REVIEW REQUIRED";
  $("feedbackTitle").textContent = lastCorrect ? "Great design decision!" : "Not quite — review the idea.";
  $("feedbackAnswer").textContent = lastCorrect ? `Correct: ${q.options[q.correct]}` : `You selected: ${q.options[index]}`;
  $("feedbackExplanation").textContent = q.explanation + (lastCorrect ? "" : ` The best solution is: ${q.options[q.correct]}`);
  if (lastCorrect) {
    entry.mastered = true;
    entry.firstTry = entry.tries === 1;
    const points = entry.firstTry ? 10 : 5;
    score += points;
    $("feedbackPoints").textContent = `+${points} learning points`;
    $("continueButton").hidden = false;
    $("retryButton").hidden = true;
  } else {
    $("feedbackPoints").textContent = "No points yet — retry to earn 5";
    $("continueButton").hidden = true;
    $("retryButton").hidden = false;
  }
  $("feedbackProgress").textContent = `Challenge ${current+1} of ${QUESTION_BANK.length}`;
  showScreen("feedback");
  $("feedbackTitle").focus({preventScroll:true});
}
function continueGame() {
  if (!locked || !lastCorrect) return;
  current++;
  renderQuestion();
}
function retryQuestion() {if (!locked || lastCorrect) return; renderQuestion();}
function renderResults() {
  if (completed) return;
  completed = true;
  $("finalScore").textContent = score;
  const first = attempts.filter(a=>a.firstTry).length;
  const mastered = attempts.filter(a=>a.mastered).length;
  $("firstTryCount").textContent = `${first}/${QUESTION_BANK.length}`;
  $("masteryCount").textContent = `${mastered}/${QUESTION_BANK.length}`;
  $("resultMessage").textContent = first === QUESTION_BANK.length ? "Excellent! You made every design choice correctly on the first attempt." : "Project complete! Your first-attempt score shows initial understanding; your completed challenges show what you learned through practice.";
  const list = $("reviewList"); list.replaceChildren();
  QUESTION_BANK.forEach((q,index) => {
    const section = document.createElement("article"); section.className="review-item";
    const heading = document.createElement("h4");heading.textContent = `${index+1}. ${q.question}`;
    const status = document.createElement("p");status.className="review-status";
    status.textContent = attempts[index].firstTry ? "Correct on first attempt" : `Mastered after ${attempts[index].tries} attempts`;
    const answer = document.createElement("p");answer.className="review-correct";answer.textContent=`Best answer: ${q.options[q.correct]}`;
    const why = document.createElement("p");why.textContent=q.explanation;
    section.append(heading,status,answer,why);list.append(section);
  });
  showScreen("results");
}
function goHome() {showScreen("home");}
function bind(id,fn) {$(id).addEventListener("click",fn);}
bind("startButton",startGame);
bind("instructionsStart",startGame);
bind("instructionsButton",()=>showScreen("instructions"));
bind("instructionsHome",goHome);
bind("brandHome",e=>{e.preventDefault();goHome();});
bind("gameHome",goHome);
bind("restartGame",startGame);
bind("continueButton",continueGame);
bind("retryButton",retryQuestion);
bind("playAgain",startGame);
bind("resultsHome",goHome);
$("reduceMotion").addEventListener("change",event => document.body.classList.toggle("steady",event.target.checked));
document.addEventListener("keydown",event=>{
  if (!$("game").classList.contains("active") || locked) return;
  // Don't hijack standard keyboard activation on other controls.
  if (["INPUT","BUTTON","A"].includes(document.activeElement.tagName) && !document.activeElement.classList.contains("target")) return;
  if (["ArrowRight","ArrowDown","ArrowLeft","ArrowUp"].includes(event.key)) {
    event.preventDefault();
    chosen = (chosen + (["ArrowRight","ArrowDown"].includes(event.key) ? 1 : -1) + 4) % 4;
    selectTarget();
  } else if (["Enter"," "].includes(event.key) && (document.activeElement === document.body || document.activeElement.classList.contains("target"))) {
    event.preventDefault();
    if (document.activeElement.classList.contains("target")) chosen=[...$("targets").children].indexOf(document.activeElement);
    submitAnswer(chosen);
  }
});
// Respect system reduced-motion preference without forcing the toggle's value.
if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  $("reduceMotion").checked = true; document.body.classList.add("steady");
}
