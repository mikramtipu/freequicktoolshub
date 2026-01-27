/* ===================================
   QuickToolsHub JavaScript
   Version: 1.0
   =================================== */

// Global variables
let allTools = [];

// Load tools from JSON file
async function loadTools() {
    try {
        const response = await fetch('tools.json');
        const data = await response.json();
        allTools = data.tools;
        renderTools();
    } catch (error) {
        console.error('Error loading tools:', error);
        // Fallback: show error message
        document.getElementById('toolsGrid').innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <p class="text-gray-600">Unable to load tools. Please refresh the page.</p>
            </div>
        `;
    }
}

// Render tools to the grid
function renderTools() {
    const grid = document.getElementById('toolsGrid');
    if (!allTools || allTools.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-gray-500">No tools available.</p>';
        return;
    }
    
    grid.innerHTML = allTools.map(tool => `
        <div class="tool-card bg-white rounded-lg shadow hover:shadow-xl transition p-4 border" data-category="${tool.category}">
            <div class="flex items-start justify-between mb-3">
                <h3 class="text-base font-bold text-gray-800 flex-1">
                    <i class="${tool.fab ? 'fab' : 'fas'} ${tool.icon} text-${tool.color}-600 mr-2"></i>${tool.name}
                </h3>
                ${tool.badge ? `<span class="bg-${tool.badge === 'HOT' ? 'red' : tool.badge === 'NEW' ? 'green' : 'yellow'}-${tool.badge === 'HOT' ? '500' : '500'} text-white text-xs font-bold px-2 py-1 rounded">${tool.badge}</span>` : ''}
            </div>
            <a href="${tool.url}" class="block bg-${tool.color}-600 text-white px-4 py-2 rounded-lg hover:bg-${tool.color}-700 transition text-center text-sm">
                <i class="fas fa-arrow-right mr-1"></i>Use Tool
            </a>
        </div>
    `).join('');
}

// Filter tools by category
function filterTools(category) {
    const cards = document.querySelectorAll('.tool-card');
    const buttons = document.querySelectorAll('.category-btn');
    
    // Update button styles
    buttons.forEach(btn => {
        btn.classList.remove('active', 'bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active', 'bg-gradient-to-r', 'from-blue-600', 'to-purple-600', 'text-white');
    event.target.classList.remove('bg-gray-100', 'text-gray-700');
    
    // Filter cards
    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            card.style.display = card.dataset.category === category ? 'block' : 'none';
        }
    });
    
    // Scroll to tools section
    document.getElementById('tools').scrollIntoView({ behavior: 'smooth' });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchTools');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.tool-card');
            
            cards.forEach(card => {
                const toolName = card.textContent.toLowerCase();
                card.style.display = toolName.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }
}

// Mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadTools();
    initializeSearch();
    initializeMobileMenu();
    
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Export functions for use in HTML onclick attributes
window.filterTools = filterTools;
