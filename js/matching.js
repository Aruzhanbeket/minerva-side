/**
 * AI Matching Engine Logic
 * This module handles the communication with the Gemini API to match
 * applicant profiles with Minerva's interdisciplinary colleges.
 */

async function findMinervaMatches(applicantProfile) {
    // 1. Check for key in session storage
    let sessionKey = sessionStorage.getItem('GEMINI_KEY');

    // 2. If no key, ASK NOW and WAIT
    if (!sessionKey || sessionKey === "" || sessionKey === "null") {
        sessionKey = prompt("Please enter your Gemini API Key to see your matches:");
        
        if (!sessionKey) {
            return { error: true, message: "API Key is required to proceed." };
        }
        
        sessionStorage.setItem('GEMINI_KEY', sessionKey);
    }

    // 3. Build the URL with the verified key
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${sessionKey}`;
    
    // 4. Construct the curriculum context for the AI
    const curriculumContext = window.MINERVA_CURRICULUM.colleges.map(c => 
        `- ${c.name}: Focuses on ${c.focus}. Concentrations: ${c.concentrations.join(', ')}.`
    ).join('\n');

    // 5. Build the system-style prompt
    const promptText = `
        You are an expert Minerva University Academic Advisor. 
        Your goal is to match a prospective student to the top 2 Colleges that align with their goals.

        Minerva Curriculum:
        ${curriculumContext}

        Student Profile:
        - Background: ${applicantProfile.academicBackground}
        - Interests: ${applicantProfile.interests}
        - Career Goals: ${applicantProfile.careerGoals}
        - Wicked Problem: ${applicantProfile.globalChallenges}

        Format your response as a JSON object:
        {
            "matches": [
                { "college": "Name", "reasoning": "..." },
                { "college": "Name", "reasoning": "..." }
            ]
        }
    `;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            sessionStorage.removeItem('GEMINI_KEY'); // Clear bad key
            return { error: true, message: "Invalid API Key. Please click the 'Clear API Key' button and try again." };
        }

        const aiResponseText = data.candidates[0].content.parts[0].text;
        const jsonString = aiResponseText.replace(/```json|```/g, '').trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("AI Matching Error:", error);
        return { 
            error: true, 
            message: "We encountered a glitch. Please check your key and try again." 
        };
    }
}

// Attach to window for use in app.js
window.findMinervaMatches = findMinervaMatches;
