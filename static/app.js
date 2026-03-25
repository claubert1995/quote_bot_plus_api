/* ═══════════════════════════════════════════
   QuoteAI+ — Script principal
   ═══════════════════════════════════════════ */

const ta = document.getElementById('topic');
const cc = document.getElementById('charCount');

/* ── Compteur de caractères ── */
ta.addEventListener('input', () => {
  cc.textContent = `${ta.value.length} / 200`;
});

/* ── Génération de citation ── */
async function generateQuote() {
  const topic  = ta.value.trim();
  const btn    = document.getElementById('generateBtn');
  const loader = document.getElementById('loader');
  const box    = document.getElementById('resultBox');

  if (!topic) {
    ta.focus();
    flashBorder();
    return;
  }

  btn.disabled = true;
  loader.classList.add('visible');
  box.classList.remove('visible');

  try {
    const res = await fetch('http://127.0.0.1:8000/API/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: topic, author: 'string' })
    });

    const data = await res.json();
    const raw  = data.Citation;

    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      parsed = { quote: raw, author: '— QuoteAI+' };
    }

    document.getElementById('quoteText').textContent   = parsed.quote;
    document.getElementById('quoteAuthor').textContent = parsed.author;
    box.classList.add('visible');

  } catch (e) {
    document.getElementById('quoteText').textContent   = 'Une erreur est survenue. Veuillez réessayer.';
    document.getElementById('quoteAuthor').textContent = '';
    box.classList.add('visible');
    console.error(e);
  }

  loader.classList.remove('visible');
  btn.disabled = false;
}

/* ── Copier la citation ── */
function copyQuote() {
  const q = document.getElementById('quoteText').textContent;
  const a = document.getElementById('quoteAuthor').textContent;
  navigator.clipboard.writeText(`« ${q} »\n${a}`);
  showToast('Citation copiée ✓');
}

/* ── Texte de partage ── */
function getShareText() {
  const q = document.getElementById('quoteText').textContent;
  const a = document.getElementById('quoteAuthor').textContent;
  return `« ${q} » ${a}`;
}

/* ── Partage WhatsApp ── */
function shareWhatsApp() {
  const url = `https://wa.me/?text=${encodeURIComponent(getShareText())}`;
  window.open(url, '_blank');
}

/* ── Partage Facebook ── */
function shareFacebook() {
  const msg = encodeURIComponent(getShareText());
  window.open(`https://www.facebook.com/sharer/sharer.php?quote=${msg}&u=https://quoteai.app`, '_blank');
}

/* ── Partage Instagram (copie) ── */
function shareInstagram() {
  navigator.clipboard.writeText(getShareText());
  showToast('Texte copié — collez dans Instagram ✓');
}

/* ── Toast de notification ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── Flash rouge si champ vide ── */
function flashBorder() {
  ta.style.borderBottomColor = 'rgba(220, 60, 60, 0.6)';
  ta.style.boxShadow         = '0 2px 0 rgba(220, 60, 60, 0.2)';
  setTimeout(() => {
    ta.style.borderBottomColor = '';
    ta.style.boxShadow         = '';
  }, 700);
}

/* ── Entrée clavier pour soumettre ── */
ta.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    generateQuote();
  }
});
