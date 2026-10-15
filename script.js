'use strict';
/* ============================================================
   EDITABLE QUESTION BANK — HOTEL INTERIOR DESIGN PROJECT
   Change the text below or add more objects. Correct is the
   ZERO-BASED index in options (0=A, 1=B, 2=C, 3=D).
   The LAST question must be a fresh transfer/application case.
   All questions require four options and an explanation.
   ============================================================ */
const QUESTION_BANK = [
  {category:'Guest experience',question:'What should guide the earliest concept decisions for a boutique hotel?',context:'You are preparing the design brief before sketching the lobby.',options:['A clear guest profile, brand identity, and operational needs','The most expensive furniture available','Your favourite colour palette alone','A copy of another hotel’s lobby'],correct:0,explanation:'Guest profile, hotel positioning, brand identity, and operational requirements shape a coherent design concept. Aesthetics should respond to these needs.'},
  {category:'Space planning',question:'Which arrangement creates the clearest guest arrival sequence?',context:'Your lobby includes an entrance, reception, seating, and lifts.',options:['Hide reception behind the lounge','Use an identifiable path from entry to reception and onward to lifts','Place luggage storage in the middle of the entrance','Make guests cross a service corridor to find check-in'],correct:1,explanation:'An intuitive arrival sequence improves wayfinding, accessibility, and the first impression. Reception should be discoverable without blocking circulation.'},
  {category:'Functional zoning',question:'Where is the best place for housekeeping support in a guestroom-floor plan?',context:'The hotel must supply linen efficiently without disturbing guests.',options:['At the end of the public lounge','Directly inside a guestroom','In a discreet service location with efficient staff access','In the main guest lift lobby as an open display'],correct:2,explanation:'Housekeeping needs efficient back-of-house movement and nearby storage while limiting guest-facing clutter and noise.'},
  {category:'Accessibility',question:'Which approach best supports inclusive guestroom design?',context:'A hotel wants rooms usable by guests with different mobility needs.',options:['Use tight doorways to save floor area','Provide step-free access and suitable clear circulation and bathroom space','Add loose rugs across the main route','Rely on staff to lift wheelchair users over thresholds'],correct:1,explanation:'Inclusive hotel design starts with step-free routes, adequate manoeuvring clearances, reachable controls, and appropriately planned bathrooms. Check the applicable local access standards.'},
  {category:'Lighting design',question:'Which lighting strategy suits a guestroom used for relaxing, reading, and working?',context:'One ceiling light is currently proposed for the entire room.',options:['Layer ambient, task, and accent lighting with convenient controls','Install only intense cool-white downlights','Keep the room uniformly dim all day','Place a spotlight directly into guests’ eyes'],correct:0,explanation:'Layered lighting supports different activities and moods. Bedside/task lights, general illumination, glare control, and simple controls improve comfort.'},
  {category:'Material selection',question:'What is the strongest material choice for a busy hotel entrance?',context:'Guests frequently arrive with wet shoes and wheeled luggage.',options:['Highly polished slippery flooring','Delicate untreated fabric tiles','Durable, slip-resistant, easily maintained flooring','Loose decorative pebbles across the circulation route'],correct:2,explanation:'High-traffic areas benefit from durable, slip-resistant finishes that tolerate cleaning and luggage movement. Confirm material performance and maintenance needs.'},
  {category:'Acoustic comfort',question:'What helps limit noise between adjacent guestrooms?',context:'Guests have complained that conversations are easily heard through the wall.',options:['Use an unsealed gap beneath the dividing wall','Improve partition sound insulation and seal acoustic leaks','Add brighter lights to the rooms','Place speakers in the corridor'],correct:1,explanation:'Sound-insulating partitions, careful junction details, and sealing flanking paths help preserve guest privacy and sleep quality.'},
  {category:'Safety and circulation',question:'How should your lobby furniture respond to emergency exit routes?',context:'A dramatic sofa is proposed in the main egress route.',options:['Keep the route unobstructed and design seating outside required clearances','Let the sofa block the route if it looks attractive','Use temporary signs instead of changing the plan','Reduce exit visibility to keep the look minimal'],correct:0,explanation:'Escape paths and required clear widths must remain clear. Furniture composition should be adjusted to suit life-safety requirements and local approvals.'},
  {category:'Sustainable design',question:'Which decision can reduce energy use without compromising guest comfort?',context:'The guestroom façade receives strong afternoon sun.',options:['Increase unshaded west-facing glass everywhere','Use appropriate solar shading, glazing, and controllable efficient lighting','Keep corridor lights at maximum output constantly','Remove all guest controls for cooling and lighting'],correct:1,explanation:'Solar control, suitable glazing, efficient lighting, and user-responsive controls can reduce loads while protecting daylight and thermal comfort.'},
  {category:'FINAL DESIGN CHALLENGE · APPLY IT',question:'A compact city hotel has a bright west-facing lobby, crowded check-in, and guests struggling to find the lifts. Which redesign is strongest?',context:'NEW SCENARIO: Your client needs one integrated proposal, not an isolated visual upgrade.',options:['Add a giant sculpture in the busiest path and more glass without shading','Move reception out of sight and focus only on decorative lighting','Use a clear entry–reception–lift route, flexible waiting space, and solar control','Reduce circulation width to create a larger display wall'],correct:2,explanation:'A strong integrated solution addresses guest wayfinding, functional circulation, waiting capacity, and solar comfort together. Attractive interiors must also work operationally.'}
];

const $ = id => document.getElementById(id);
const LETTERS = ['A','B','C','D'];
let current=0,score=0,selected=0,attempts=0,locked=false,history=[];
const total=QUESTION_BANK.length;
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo(0,0);}
function home(){show('home');}
function start(){current=0;score=0;selected=0;attempts=0;locked=false;history=[];renderQuestion();show('game');}
function renderQuestion(){
 const q=QUESTION_BANK[current];locked=false;selected=0;
 $('questionCount').textContent=`CHALLENGE ${String(current+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
 $('scoreText').textContent=`SCORE ${String(score).padStart(3,'0')}`;
 $('progressFill').style.width=`${100*current/total}%`;
 $('categoryText').textContent=q.category;
 $('questionTitle').textContent=q.question;
 $('questionContext').textContent=q.context;
 $('targets').replaceChildren();
 q.options.forEach((option,i)=>{
  const button=document.createElement('button');button.type='button';button.className='target';
  button.style.setProperty('--duration',`${3.5+i*.4}s`);button.style.setProperty('--delay',`${-i*.8}s`);
  const tag=document.createElement('span');tag.textContent=LETTERS[i];button.append(tag,document.createTextNode(option));
  button.setAttribute('aria-label',`Option ${LETTERS[i]}: ${option}`);
  button.addEventListener('click',()=>answer(i));$('targets').append(button);
 });updateSelected();
}
function updateSelected(){document.querySelectorAll('.target').forEach((b,i)=>{b.classList.toggle('selected',i===selected);b.setAttribute('aria-current',i===selected?'true':'false');});}
function answer(i){
 if(locked||!document.getElementById('game').classList.contains('active'))return;
 const q=QUESTION_BANK[current];locked=true;attempts++;
 const correct=i===q.correct;
 if(correct){const points=attempts===1?10:5;score+=points;history.push({chosen:i,attempts,points});}
 $('feedbackIcon').textContent=correct?'✓':'×';
 $('feedbackLabel').textContent=correct?'DESIGN APPROVED':'DESIGN NEEDS REVISION';
 $('feedbackTitle').textContent=correct?'Excellent design decision!':'Not quite — here’s why.';
 $('feedbackAnswer').textContent=correct?`Best answer: ${LETTERS[q.correct]}. ${q.options[q.correct]}`:`Your choice: ${LETTERS[i]}. ${q.options[i]}`;
 $('feedbackExplanation').textContent=correct?q.explanation:`${q.explanation} Think through the design brief and try again.`;
 $('feedbackPoints').textContent=correct?`+${attempts===1?10:5} LEARNING POINTS`:'NO POINTS LOST';
 $('feedbackProgress').textContent=`CHALLENGE ${current+1} OF ${total}`;
 $('feedback').querySelector('.feedback-panel').classList.toggle('incorrect',!correct);
 $('continueButton').hidden=!correct;$('retryButton').hidden=correct;
 show('feedback');$('feedbackTitle').focus({preventScroll:true});
}
function retry(){locked=false;show('game');$('questionTitle').focus({preventScroll:true});}
function continueGame(){if(!locked||history.length!==current+1)return;current++;attempts=0;if(current===total){renderResults();show('results');}else{renderQuestion();show('game');$('questionTitle').focus({preventScroll:true});}}
function renderResults(){
 $('finalScore').textContent=score;
 const first=history.filter(h=>h.attempts===1).length;
 $('firstTryCount').textContent=`${first}/${total}`;
 $('masteryCount').textContent=`${history.length}/${total}`;
 $('resultMessage').textContent=first>=8?'Strong work! You consistently applied hotel design principles.':first>=5?'Good progress. Review the explanations to strengthen your design judgement.':'You completed the project! Use the design review below to build your reasoning.';
 $('progressFill').style.width='100%';
 const root=$('reviewList');root.replaceChildren();
 QUESTION_BANK.forEach((q,i)=>{
  const box=document.createElement('article');box.className='review-item';
  const heading=document.createElement('h4');heading.textContent=`${i+1}. ${q.question}`;
  const stat=document.createElement('p');stat.className='review-status';stat.textContent=`${history[i].attempts===1?'Correct on first attempt':`Learned after ${history[i].attempts} attempts`} · +${history[i].points} points`;
  const solution=document.createElement('p');solution.className='review-correct';solution.textContent=`✓ ${LETTERS[q.correct]}. ${q.options[q.correct]}`;
  const explanation=document.createElement('p');explanation.textContent=q.explanation;
  box.append(heading,stat,solution,explanation);root.append(box);
 });
}
$('startButton').addEventListener('click',start);
$('instructionsButton').addEventListener('click',()=>show('instructions'));
$('instructionsStart').addEventListener('click',start);
$('instructionsHome').addEventListener('click',home);
$('brandHome').addEventListener('click',e=>{e.preventDefault();home();});
$('gameHome').addEventListener('click',home);
$('restartGame').addEventListener('click',start);
$('resultsHome').addEventListener('click',home);
$('playAgain').addEventListener('click',start);
$('continueButton').addEventListener('click',continueGame);
$('retryButton').addEventListener('click',retry);
$('reduceMotion').addEventListener('change',e=>document.body.classList.toggle('steady',e.target.checked));
document.addEventListener('keydown',e=>{
 if(!$('game').classList.contains('active')||locked)return;
 if(e.target.matches('button,input,a'))return;
 if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();selected=(selected+1)%4;updateSelected();}
 else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();selected=(selected+3)%4;updateSelected();}
 else if(e.key==='Enter'||e.key===' '){e.preventDefault();answer(selected);}
});
