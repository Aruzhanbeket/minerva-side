/**
 * AI Matching Engine Logic - Minerva University
 */

async function findMinervaMatches(applicantProfile) {
    // 1. Check for key in session storage
    let sessionKey = sessionStorage.getItem('GEMINI_KEY');

    // 2. If no key, ASK NOW and WAIT
    if (!sessionKey || sessionKey === "" || sessionKey === "null") {
        sessionKey = window.prompt("Please enter your Gemini API Key to see your matches:");
        
        if (!sessionKey) {
            return { error: true, message: "API Key is required to proceed. Please refresh and try again." };
        }
        
        sessionStorage.setItem('GEMINI_KEY', sessionKey);
    }

    // 3. Build the URL
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${sessionKey}`;
    
    // 4. Construct the curriculum context
    const curriculumContext = window.MINERVA_CURRICULUM.colleges.map(c => 
        `- ${c.name}: Focuses on ${c.focus}. Concentrations: ${c.concentrations.join(', ')}.`
    ).join('\n');

    // 5. Build the text for the AI (Renamed from 'prompt' to 'promptInstructions')
    const promptInstructions = `
        You are a Minerva University Academic Advisor. 
        Match this student to the top 2 Colleges.
        Curriculum: ${curriculumContext}
        Student Profile: 
        Background: ${applicantProfile.academicBackground}
        Interests: ${applicantProfile.interests}
        Goals: ${applicantProfile.careerGoals}
        Wicked Problem: ${applicantProfile.globalChallenges}

        Return ONLY a JSON object: {"matches": [{"college": "Name", "reasoning": "..."}]}`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptInstructions }] }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            sessionStorage.removeItem('GEMINI_KEY');
            return { error: true, message: "Invalid API Key. Please clear your key and try again." };
        }

        const aiResponseText = data.candidates[0].content.parts[0].text;
        const jsonString = aiResponseText.replace(/```json|```/g, '').trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("AI Matching Error:", error);
        return { error: true, message: "Neural network glitch. Please check your key and try again." };
    }
}

window.findMinervaMatches = findMinervaMatches;
