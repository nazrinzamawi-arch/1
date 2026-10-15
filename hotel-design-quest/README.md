# Hotel Design Quest

A complete, offline-capable learning arcade website for Diploma Interior Design students, by Nazrin Zamawi. Students act as a hotel interior designer and answer ten design decisions by selecting gently moving targets. All files are plain HTML, CSS and JavaScript—no account, server, API key or build tools.

## Files

```text
hotel-design-quest/
├── index.html       # Homepage, instructions, gameplay, feedback and results
├── style.css        # Responsive visual design and motion
├── script.js        # Gameplay logic and EDITABLE QUESTION BANK
└── README.md        # These instructions
```

## Learning outcome

Apply hotel interior design principles to select appropriate solutions for guest experience, zoning, accessibility, lighting, materials, safety, sustainability and hotel operations. The tenth question is a new scenario testing transfer of learning.

## How to play

1. Press **Start the Project**, or read **How to Play** first.
2. Click or tap an answer target. With a keyboard, use arrow keys to change selection and Enter/Space to answer. You can also Tab to target buttons and press Enter.
3. Read the explanation on the review screen. After a correct choice, press **Continue**; after an incorrect choice, press **Try This Question Again**. All answers are eventually mastered.
4. Each first-try correct answer earns **10 points**; a correct answer on a retry earns **5 points**. There is no time limit or bonus for speed.
5. Read the final report for first-attempt accuracy, eventual mastery and explanations.

**Accessibility:** Keyboard, pointer and touch supported. Use **Steady targets** to stop target movement. System reduced-motion preferences are respected. Text remains readable on mobile.

## Customize questions

Open `script.js` and edit the clearly labelled `QUESTION_BANK` array at the top. Each object needs:

- `category`: small topic label
- `question`: text displayed above the targets
- `context`: supporting scenario text
- `options`: **exactly four** answer strings
- `correct`: correct option's **zero-based position** (`0`=A, `1`=B, `2`=C, `3`=D)
- `explanation`: learning feedback shown after either choice

The progress indicator, results and maximum score automatically adapt to the number of questions. If you change the question count, adjust the fixed **10 design challenges** homepage text and any course-specific wording in `index.html`. Ensure the *final* question is a new example applying the learning outcome. Keep answers accurate and distractors plausible. Because this is a general teaching activity, always verify final specifications against local laws, hotel brand standards and accessibility/fire requirements before using the advice in real projects.

## Local test

Open `index.html` directly in a modern browser. No local server is required. Alternatively, run `python3 -m http.server 8000` inside the project folder and open `http://localhost:8000/` (optional).

## Publish to GitHub Pages

1. Sign in to GitHub and create a new public repository, e.g. `hotel-design-quest`.
2. Choose **Add file → Upload files** and upload all four files to the repository **root** (not a subfolder); commit changes.
3. Go to **Settings → Pages → Build and deployment**.
4. Under **Source**, select **Deploy from a branch**. Select branch **main** and folder **/(root)**, then **Save**.
5. Once GitHub reports deployment, follow the Pages URL, typically `https://YOUR-USERNAME.github.io/hotel-design-quest/`.

Relative `style.css` and `script.js` paths work on GitHub Pages project sites.

## Manual acceptance checklist

- [ ] Home → Start shows challenge 1; Instructions → Start also works.
- [ ] Four targets appear, move gently, and are readable on a phone.
- [ ] Mouse click, touch tap, arrows + Enter/Space all submit an answer.
- [ ] Wrong answer shows the explanation and Retry (not Continue).
- [ ] Retry shows the same question; its correct choice earns five points.
- [ ] First-try correct earns ten points; repeated clicks do not add points.
- [ ] Continue displays the next question, with updated score and progress.
- [ ] Steady targets stops the animation, including on mobile.
- [ ] Final question covers a new hotel-design scenario; results show correct first tries, mastery and all explanations.
- [ ] Restart resets the entire game; Home and Play Again work.
- [ ] All controls remain usable in a narrow mobile viewport.
