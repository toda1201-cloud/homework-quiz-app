// 問題データ（answer は正解の選択肢の番号: 0〜2）
const questions = [
  {
    question: "建設業法の許可の有効期間は何年間？",
    choices: ["５年", "３年", "１０年"],
    answer: 0,
    explain: "建設業法の有効期間は５年間です。",
  },
  {
    question: "建設業法対象となる工事現場では、主任技術者か監理技術者の技術者配置は、元請も下請も必要か？",
    choices: ["元請も下請も必要", "元請だけ必要", "元請は必要だが、下請は配置が不要な場合がある"],
    answer: 0,
    explain: "安全管理のため、元請も下請も技術者配置が必要となります。",
  },
  {
    question: "作業員名簿は誰が作成しなければならない？",
    choices: ["元請のみ", "元請と全下請", "下請のみ"],
    answer: 1,
    explain: "安全管理のため、作業員名簿は元請と全下請で作成するはこびとなります",
  },
  {
    question: "建設業許可がないと、建設業法対象工事は受注できない？",
    choices: ["受注できない", "受注金額による", "工事種別による"],
    answer: 1,
    explain: "建設業許可がなくても、税込500万円未満の工事は受注できます。",
  },
  {
    question: "建物設備の修理契約は、建設業法対象工事となるのか？",
    choices: ["金額が500万円以上の場合はなる", "なる", "ならない"],
    answer: 2,
    explain: "修理契約は、元の状況に戻すだけで、その建物設備の機能が増加したわけではないので、建設業法対象工事となりません。",
  },
];

const labels = ["A", "B", "C"];

let current = 0;
let score = 0;

const $ = (id) => document.getElementById(id);

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
}

function startQuiz() {
  current = 0;
  score = 0;
  showScreen("quiz-screen");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[current];
  $("progress-text").textContent = `第${current + 1}問 / ${questions.length}`;
  $("score-text").textContent = `得点: ${score}`;
  $("progress-fill").style.width = `${(current / questions.length) * 100}%`;
  $("question").textContent = q.question;

  const feedback = $("feedback");
  feedback.textContent = "";
  feedback.className = "feedback";
  $("next-btn").classList.add("hidden");

  const choices = $("choices");
  choices.innerHTML = "";
  q.choices.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerHTML = `<span class="choice-label">${labels[i]}</span><span></span>`;
    btn.lastChild.textContent = text;
    btn.addEventListener("click", () => selectAnswer(i));
    choices.appendChild(btn);
  });
}

function selectAnswer(selected) {
  const q = questions[current];
  const buttons = $("choices").querySelectorAll(".choice-btn");
  const isCorrect = selected === q.answer;

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
    else if (i === selected) btn.classList.add("wrong");
    else btn.classList.add("dimmed");
  });

  const feedback = $("feedback");
  if (isCorrect) {
    score++;
    feedback.textContent = "⭕ 正解！";
    feedback.classList.add("correct");
  } else {
    feedback.textContent = `❌ 不正解… 正解は「${q.choices[q.answer]}」`;
    feedback.classList.add("wrong");
  }
  const explain = document.createElement("span");
  explain.className = "explain";
  explain.textContent = q.explain;
  feedback.appendChild(explain);

  $("score-text").textContent = `得点: ${score}`;
  $("progress-fill").style.width = `${((current + 1) / questions.length) * 100}%`;

  const nextBtn = $("next-btn");
  nextBtn.textContent = current === questions.length - 1 ? "結果を見る" : "次の問題へ";
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  $("final-score").textContent = score;
  let emoji, message;
  if (score === questions.length) {
    emoji = "🏆";
    message = "全問正解！すばらしい！";
  } else if (score >= 3) {
    emoji = "🎉";
    message = "よくできました！あと少しで満点！";
  } else {
    emoji = "💪";
    message = "おしい！もう一度チャレンジしてみよう！";
  }
  $("result-emoji").textContent = emoji;
  $("result-message").textContent = message;
  showScreen("result-screen");
}

$("start-btn").addEventListener("click", startQuiz);
$("next-btn").addEventListener("click", nextQuestion);
$("retry-btn").addEventListener("click", startQuiz);
