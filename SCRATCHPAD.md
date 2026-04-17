# SCRATCHPAD

## Current State

**Status**: MILESTONE 3 COMPLETE — PROJECT FINALIZED
**Active milestone**: Post-Launch Polish
**Last session**: 2026-04-16

**Next actions**:
- [ ] Final Testing: Verify AI prompt consistency across different survey inputs
- [ ] Accessibility: Conduct a final WCAG AA audit of the new interactive cards
- [ ] Documentation: Prepare a final README update with screenshots (if possible)

**Open questions**:
- None.

---

## Milestones

### M0 — Project Initialization

- [x] Clone template repository
- [x] Fill in GEMINI.md project identity section
- [x] **Define AI Guardrails**: In `DECISIONS.md`, document how this project handles data privacy and human accountability.
- [x] Define milestones M1–M3 below
- [x] Push initial commit to GitHub
- [x] Enable GitHub Pages in repository settings
- [x] Confirm live URL is accessible

### M1 — Applicant Survey UI

*A clean, accessible form collecting data on academic history, personal interests, and long-term career goals.*

**Values checklist**:
- [x] **Learning**: Encourages students to reflect on their own goals
- [x] **Agency**: User controls what data they share; clear "why" for each question
- [x] **Privacy**: Zero-trust — no PII (names, emails) collected or stored
- [x] **Transparency**: Form clearly states how data is used for matching

**Acceptance criteria**:
- [x] Functional multi-step or single-page form with validation
- [x] High-contrast, mobile-first design using Minerva palette
- [x] Data persists in `localStorage` for the duration of the session

### M2 — AI Matching Engine Logic

*Use Gemini to analyze the survey input and recommend specific Minerva areas of study or courses.*

**Values checklist**:
- [x] Learning: Explains *why* certain programs were recommended
- [x] Agency: Recommendations are suggestions, not prescriptions
- [x] Privacy: Only anonymized survey data sent to Gemini
- [x] Transparency: Clear disclosure that matching is AI-assisted

**Acceptance criteria**:
- [x] Successful integration with Gemini API (or mock for testing)
- [x] Logic to map survey responses to Minerva curriculum categories
- [x] Error handling for failed API calls or ambiguous data

### M3 — Results & Discovery View

*A results view where applicants can see detailed info on recommended programs, including sample course titles and faculty focus areas.*

**Values checklist**:
- [x] Learning: Deepens knowledge of Minerva's unique interdisciplinary model
- [x] Agency: Provides "Save for Later" or "Re-take Survey" options
- [x] Privacy: Results are local to the user's browser
- [x] Transparency: Clearly attributes course/faculty data to Minerva sources

**Acceptance criteria**:
- [x] Dynamic results page showing top 3 program matches
- [x] Interactive "Deep Dive" cards for each recommendation
- [x] AI-Assisted badge visible in the footer

---

## Session Log

### 2026-04-16 — Project Setup
**AI Tool(s) Used**: Gemini 2.0 Flash
**Purpose**: Initial project mapping and setup
**Modifications & Verification**: Defined project identity, milestones, and tech stack based on user's vision.
**Learning Reflection**: Establishing clear milestones early helps in aligning technical tasks with the "Human Context" of the project.
**Session Link/Context**: Setup for "AI-Powered Applicant Matching Tool"
