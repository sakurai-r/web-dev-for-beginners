// すべての名言
document.getElementById('start').addEventListener('click', () => {
  // 名言の取得
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // 名言を言葉の配列に入れる
  words = quote.split(' ');
  // トラッキング用の単語インデックスをリセットする
  wordIndex = 0;

  // UI の更新
  // span 要素の配列を作成し、クラスを設定できるようにします。
  const spanWords = words.map(function (word) { return `<span>${word} </span>` });
  // 文字列に変換して、名言を表示する innerHTML として設定します。
  quoteElement.innerHTML = spanWords.join('');
  // 最初の単語を強調表示します。
  quoteElement.childNodes[0].className = 'highlight';
  // 前のメッセージをクリアします。
  messageElement.innerText = '';

  // テキストボックスの設定
  // テキストボックスをクリアします。
  typedValueElement.value = '';
  // フォーカスを合わせます。
  typedValueElement.focus();
  // イベントハンドラを設定します。

  // タイマーを開始します。
  startTime = new Date().getTime();
});

const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// 単語のリストと、プレイヤーが現在入力している単語のインデックスを格納します。
let words = [];
let wordIndex = 0;
// 開始時刻
let startTime = Date.now();
// ページ構成要素
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

typedValueElement.addEventListener('input', () => {
  // 現在の単語を取得します
  const currentWord = words[wordIndex];
  // 現在の値を取得します
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // 文の終了
    // 成功を表示します
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // 単語の終了
    // 新しい単語用に 'typedValueElement' をクリアします
    typedValueElement.value = '';
    // 次の単語に移ります
    wordIndex++;
    // 名言内のすべての要素のクラス名をリセットします
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    // 新しい単語を強調表示します
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // 現在正しく入力されている状態
    // 次の単語を強調表示します
    typedValueElement.className = '';
  } else {
    // エラー状態
    typedValueElement.className = 'error';
  }
});