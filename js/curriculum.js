/**
 * Minerva University Curriculum Data
 * Source: Minerva Undergraduate Program Colleges & Concentrations
 */

const MINERVA_CURRICULUM = {
    colleges: [
        {
            name: "Arts & Humanities",
            concentrations: ["Philosophy, Ethics, and the Law", "Historical Forces", "Design"],
            focus: "Human expression, ethical frameworks, and the historical context of global systems."
        },
        {
            name: "Business",
            concentrations: ["Brand Management", "New Business Ventures", "Scalable Growth"],
            focus: "Entrepreneurial leadership, sustainable business models, and strategic growth."
        },
        {
            name: "Computational Sciences",
            concentrations: ["Data Science", "Artificial Intelligence", "Applied Problem Solving"],
            focus: "Algorithmic thinking, data-driven decision making, and technical solutions for complex systems."
        },
        {
            name: "Natural Sciences",
            concentrations: ["Earth and Environmental Systems", "Matter and Energy"],
            focus: "Scientific inquiry, environmental sustainability, and the fundamental laws of nature."
        },
        {
            name: "Social Sciences",
            concentrations: ["Economics and Society", "Politics and Government", "Cognition, Brain, and Behavior"],
            focus: "Human behavior, political systems, economic theory, and social impact."
        }
    ]
};

// If using ES modules in a local environment without a bundler, 
// we'll attach this to the window object for simplicity in this template.
window.MINERVA_CURRICULUM = MINERVA_CURRICULUM;
