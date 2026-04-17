/**
 * Applicant Matching Tool - App Logic
 * Adheres to Zero-Trust Privacy: No PII collected.
 */

document.addEventListener('DOMContentLoaded', () => {
    const surveyForm = document.getElementById('survey-form');
    const surveySection = document.getElementById('survey-section');
    const resultsSection = document.getElementById('results-section');
    const loadingMessage = document.getElementById('loading-message');

    if (surveyForm) {
        surveyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Capture data into applicantProfile object
            const formData = new FormData(surveyForm);
            const applicantProfile = {
                academicBackground: formData.get('academicBackground'),
                interests: formData.get('interests'),
                careerGoals: formData.get('careerGoals'),
                globalChallenges: formData.get('globalChallenges'),
                timestamp: new Date().toISOString()
            };

            // Save to localStorage (Zero-Trust/Privacy check)
            // We only save the anonymized survey data for matching logic.
            localStorage.setItem('applicantProfile', JSON.stringify(applicantProfile));

            // UI Feedback: Show loading state
            surveySection.classList.add('hidden');
            window.UI.showLoading();

            // Transition to M2: Matching Engine
            handleMatching(applicantProfile);
        });
    }

    /**
     * Orchestrates the AI matching process
     */
    async function handleMatching(profile) {
        const results = await window.findMinervaMatches(profile);
        
        if (results.error) {
            const grid = document.getElementById('recommendations-grid');
            grid.innerHTML = `<p class="error">${results.message}</p>`;
            return;
        }

        // Use the new UI Discovery Cards
        window.UI.displayResults(results.matches);
    }
});
