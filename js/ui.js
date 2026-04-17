/**
 * UI Rendering for Applicant Matcher
 * Optimized for Professional Visual Identity
 */

const UI = {
    coreValues: [
        "Synthesizing your global impact...",
        "Evaluating interdisciplinary potential...",
        "Mapping your future curriculum...",
        "Identifying transformative opportunities...",
        "Aligning goals with Minerva's mission..."
    ],

    /**
     * Shows a professional loading spinner with random Minerva values
     */
    showLoading: function() {
        const resultsSection = document.getElementById('results-section');
        const grid = document.getElementById('recommendations-grid');
        
        resultsSection.classList.remove('hidden');
        grid.innerHTML = `
            <div class="loading-container">
                <div class="spinner"></div>
                <p class="loading-value">${this.coreValues[Math.floor(Math.random() * this.coreValues.length)]}</p>
            </div>
        `;
    },

    /**
     * Renders matching results with high-fidelity cards
     */
    displayResults: function(matches) {
        const grid = document.getElementById('recommendations-grid');
        grid.innerHTML = ''; // Clear loading spinner
        
        matches.forEach((match, index) => {
            const collegeData = window.MINERVA_CURRICULUM.colleges.find(c => c.name === match.college);
            if (!collegeData) return;

            const card = this.createMatchCard(match, collegeData, index);
            grid.appendChild(card);
        });

        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn-primary';
        resetBtn.textContent = 'Start New Survey';
        resetBtn.style.maxWidth = '300px';
        resetBtn.style.margin = '2rem auto';
        resetBtn.style.display = 'block';
        resetBtn.onclick = () => location.reload();
        grid.appendChild(resetBtn);
    },

    /**
     * Creates a card with clear visual hierarchy
     */
    createMatchCard: function(match, data, index) {
        const card = document.createElement('div');
        card.className = 'match-card fade-in';
        card.style.animationDelay = `${index * 0.2}s`;
        
        card.innerHTML = `
            <h3>${match.college}</h3>
            <p class="match-reasoning">"${match.reasoning}"</p>
            
            <button class="btn-secondary deep-dive-toggle">View Curriculum Details ↓</button>
            
            <div class="deep-dive-content hidden">
                <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #eee;">
                    <h4 style="font-size: 0.8rem; text-transform: uppercase; color: #905112; margin-bottom: 0.5rem;">Concentrations</h4>
                    <ul style="list-style: none; margin-bottom: 1rem;">
                        ${data.concentrations.map(c => `<li style="font-size: 0.9rem; padding: 2px 0;">• ${c}</li>`).join('')}
                    </ul>
                    <h4 style="font-size: 0.8rem; text-transform: uppercase; color: #905112; margin-bottom: 0.5rem;">Academic Focus</h4>
                    <p style="font-size: 0.9rem; margin-bottom: 1rem;">${data.focus}</p>
                    <a href="https://www.minerva.edu/undergraduate-program/" target="_blank" style="color: #1F1F1F; font-weight: 700; text-decoration: none; font-size: 0.9rem;">Official Program Page →</a>
                </div>
            </div>
        `;

        const toggle = card.querySelector('.deep-dive-toggle');
        const content = card.querySelector('.deep-dive-content');
        
        toggle.addEventListener('click', () => {
            const isHidden = content.classList.toggle('hidden');
            toggle.textContent = isHidden ? 'View Curriculum Details ↓' : 'Hide Details ↑';
        });

        return card;
    }
};

window.UI = UI;
