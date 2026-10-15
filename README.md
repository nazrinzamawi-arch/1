# Hotel Design Quest

A standalone educational target-selection game for **Interior Design Project: Hotel Interior Design**. Created for diploma-level design students. Attribution in the footer: By Nazrin Zamawi.

## Learning outcome
Students apply hospitality interior design principles to choose solutions for guest experience, functional zoning, accessibility, lighting, acoustics, material selection, safe circulation, sustainability, and an integrated novel design scenario.

## Included files
```
hotel-design-quest/
├── index.html
├── style.css
├── script.js
└── README.md
```
No external files, fonts, JavaScript libraries, accounts, or servers are required.

## Play
1. Open `index.html` in any modern browser, or launch a local static server if desired.
2. Select **START THE PROJECT** or read **HOW TO PLAY**.
3. Select moving answer targets with mouse/touch; on a keyboard, use arrow keys and Enter/Space when focus is not on a control. Buttons themselves also support standard Tab + Enter/Space keyboard activation.
4. Read feedback. Incorrect answers can be retried without losing points; correct answers unlock **CONTINUE**.
5. Review your score and a full explanation for every question on the final screen.

**Scoring:** 10 points if correct on the first try; 5 points if correct after one or more retries. No time limit, timer score, or speed penalty. The results distinguish first-try success from eventual mastery. Target motion can be disabled using **Steady targets**. System reduced-motion preferences are also respected.

## Edit the questions
Open `script.js` in a text editor and find `EDITABLE QUESTION BANK`. Update the objects in the `QUESTION_BANK` array. Each entry has:
- `category`: short design topic.
- `question`: the question itself.
- `context`: brief hotel project scenario.
- `options`: **exactly four** answer choices (strings).
- `correct`: numeric index of correct answer: 0=A, 1=B, 2=C, 3=D.
- `explanation`: feedback showing the design reasoning.

Add or delete entries to change the number of challenges. Keep the final question as a new scenario that asks students to apply their knowledge. The interface updates counts and score labels automatically (except the static homepage's “10 design challenges” tagline and results label “POINTS / 100”; if the count changes, update those two pieces in `index.html` to match 10 × question count).

## Publish on GitHub Pages
1. Create a new public GitHub repository (for example `hotel-design-quest`).
2. Upload all four files **to the repository root**, not inside a nested folder. Ensure `index.html` is in the root.
3. Commit the changes.
4. Open the repository **Settings → Pages**.
5. In **Build and deployment**, select **Deploy from a branch**. Choose `main` and `/ (root)`; click **Save**.
6. Open the published website URL shown in Pages after deployment, generally `https://YOUR-USERNAME.github.io/hotel-design-quest/`.

This is a project website and uses relative paths, so it works at a subpath. Re-upload changed files and commit to publish edits.

## Local manual testing checklist
- [ ] Home Play starts the first question.
- [ ] How to Play, Back Home, logo link, and instructions Start work.
- [ ] Clicking or tapping each answer selects exactly one answer.
- [ ] Arrow keys and Enter/Space answer when keyboard focus is not inside a button.
- [ ] Keyboard Tab + Enter/Space activates focused answer buttons.
- [ ] Incorrect answer shows feedback and **Try Again**; score is unchanged.
- [ ] Correct answer shows explanation and **Continue**; repeated taps do not add points.
- [ ] Retrying and then succeeding awards 5 points rather than 10.
- [ ] Progress, score, and question count update.
- [ ] Completing all questions displays points, first-try score, mastered count, and per-question review.
- [ ] Restart and Play Again reset state, and Home navigates back.
- [ ] Touch controls fit narrow mobile screens without sideways scrolling.
- [ ] Steady targets stops motion; untimed mode is always active.

## Notes
All content is general design-education guidance. Always check applicable Malaysian and local building, accessibility, fire safety, and hospitality requirements when developing a real hotel project.
