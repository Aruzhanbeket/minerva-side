# Architecture Decision Record

> Log every significant technical or design decision here.
> This file is **append-only** — never edit or remove past decisions.
> A decision is significant if a future session would benefit from knowing why it was made.

**Format for each entry:**

```
## Decision NNN — [Short title]
**Date**: YYYY-MM-DD
**Decision**: [What was decided, in one sentence]
**Rationale**: [Why this was the right choice for this project]
**Alternatives considered**: [What else was on the table]
**Trade-offs**: [What we gain, what we give up]

**Guardrails Alignment**:
- **Privacy & IP**: [How does this decision protect student data and clarify ownership?]
- **Disclosure**: [How will this choice be disclosed to users/stakeholders?]
- **Responsibility**: [Who is the human responsible for this decision's impact?]
- **Bias & Trust**: [What measures mitigate bias in this specific choice?]
- **Values**: [Which core Minerva value does this align with?]
```

---

## Decision 001 — Vanilla HTML/CSS/JS, no framework

**Date**: [YYYY-MM-DD]
**Decision**: Use plain HTML, CSS, and JavaScript with no build step and no framework.
**Rationale**: GitHub Pages hosts static files directly. No framework means no build pipeline, no dependencies to update, no abstraction between the code and the browser. The project remains readable and modifiable by anyone with basic web knowledge, which aligns with the learning-orientation principle of clarity over cleverness.
**Alternatives considered**: React, Vue, Svelte — all require a build step or CDN dependency; Astro — adds complexity for a single-page app
**Trade-offs**: We lose component reuse patterns and reactive state management. We gain zero setup friction, full control over output, and a codebase that doesn't rot when npm packages break.

## Decision 002 — Ethical AI & Data Privacy Guardrails

**Date**: [YYYY-MM-DD]
**Decision**: Adoption of Minerva University's AI Guardrails for all project development and deployment.
**Rationale**: To protect data privacy (especially student PII), ensure intellectual property integrity, and maintain human-centered learning. This project prioritizes human agency and accountability, treating AI as a "thinking partner" rather than a substitute.
**Specific Guardrails for this Project**:
1. **No Sensitive Data**: The app will not store or process real student records or PII.
2. **Human-in-the-Loop**: All AI-suggested code and content are reviewed by the human developer before commit.
3. **Mandatory Disclosure**: AI use is logged in `SCRATCHPAD.md`.
**Trade-offs**: Development may be slower due to mandatory human review and documentation overhead, but the resulting system is more ethical, secure, and aligned with institutional values.

## Decision 003 — Zero-Trust Survey Data Handling

**Date**: 2026-04-16
**Decision**: Collect only anonymized academic interests and goals; no PII (names, emails) will be requested or stored.
**Rationale**: Aligning with the "Zero-Trust" guardrail. By not collecting PII, we eliminate the risk of data breaches or misuse of student identity.
**Alternatives considered**: Collecting emails for "emailing results" — rejected to maintain privacy and reduce technical complexity of backend/mailing service.
**Trade-offs**: We cannot re-contact users or save their profile across different devices unless they manually export/import data.

**Guardrails Alignment**:
- **Privacy & IP**: No PII collected; data stays in `localStorage`.
- **Disclosure**: UI will explicitly state that no personal data is stored.
- **Responsibility**: Human developer (Aruzhanbeket) responsible for form design.
- **Bias & Trust**: Transparency in data collection builds trust with prospective applicants.
- **Values**: Prioritizes Human Agency and Privacy.

## Decision 004 — Gemini API Integration

**Date**: 2026-04-16
**Decision**: Use Gemini 1.5 Flash for the matching engine, passing structured curriculum data via the prompt.
**Rationale**: Gemini 1.5 Flash is fast and cost-effective for simple matching tasks. By providing the curriculum data in the prompt, we ensure "grounding" and prevent the AI from hallucinating non-existent Minerva programs.
**Alternatives considered**: Hard-coded keyword matching — rejected because it lacks the nuance to connect "Wicked Problems" to interdisciplinary study.
**Trade-offs**: Requires an API key and an internet connection. If the API is unavailable, the matching fails.

**Guardrails Alignment**:
- **Privacy & IP**: No PII is sent to the API; only anonymized interests and goals.
- **Disclosure**: UI includes an "AI-Assisted" badge.
- **Responsibility**: Human developer responsible for prompt engineering and curriculum accuracy.
- **Bias & Trust**: Grounding the AI in official curriculum data reduces hallucination risk.
- **Values**: Aligns with "Clarity over cleverness" by using a simple fetch call.
