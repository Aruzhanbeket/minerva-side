/**
 * AI Matching Engine Logic
 * This module handles the communication with the Gemini API to match
 * applicant profiles with Minerva's interdisciplinary colleges.
 */

async function findMinervaMatches(applicantProfile) {
    // 1. Check for key
    let sessionKey = sessionStorage.getItem('GEMINI_KEY');

    // 2. If no key, ASK NOW and WAIT
    if (!sessionKey || sessionKey === "") {
        sessionKey = prompt("Please enter your Gemini API Key to see your matches:");
        
        // If they click cancel or enter nothing, stop immediately!
        if (!sessionKey) {
            return { error: true, message: "API Key is required to proceed." };
        }
        
        sessionStorage.setItem('GEMINI_KEY', sessionKey);
    }

    // 3. Now build the URL with the verified key
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${sessionKey}`;
    
    // ... rest of your code ...

    // Construct the curriculum context for the AI
    const curriculumContext = window.MINERVA_CURRICULUM.colleges.map(c => 
        `- ${c.name}: Focuses on ${c.focus}. Concentrations: ${c.concentrations.join(', ')}.`
    ).join('\n');

    // Build the system-style prompt
    const prompt = `
        You are an expert Minerva University Academic Advisor. 
        Your goal is to match a prospective student to the top 2 Colleges that align with their goals.

        Minerva Curriculum:
        ${curriculumContext}

        Student Profile:
        - Background: ${applicantProfile.academicBackground}
        - Interests: ${applicantProfile.interests}
        - Career Goals: ${applicantProfile.careerGoals}
        - Wicked Problem they want to solve: ${applicantProfile.globalChallenges}

        Task:
        1. Identify the TOP 2 Minerva Colleges for this student.
        2. Provide a 2-sentence "Why it matches" explanation for each, specifically referencing their "Wicked Problem" and interests.
        3. Strictly only recommend the colleges listed above.

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
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        
        // Extracting text and parsing JSON from Gemini's response
        const aiResponseText = data.candidates[0].content.parts[0].text;
        
        // Clean up markdown code blocks if present
        const jsonString = aiResponseText.replace(/```json|```/g, '').trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("AI Matching Error:", error);
        return { 
            error: true, 
            message: "We encountered a glitch in the neural network. Please try again." 
        };
    }
}

// Attach to window for use in app.js
window.findMinervaMatches = findMinervaMatches;
