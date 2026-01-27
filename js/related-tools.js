/* ===================================
   Related Tools Component
   Version: 1.0
   =================================== */

// Function to load and display related tools
async function loadRelatedTools(currentCategory, currentToolName) {
    try {
        // Load tools from JSON
        const response = await fetch('../../tools.json');
        const data = await response.json();
        
        // Filter tools by same category, exclude current tool
        const relatedTools = data.tools
            .filter(tool => tool.category === currentCategory && tool.name !== currentToolName)
            .slice(0, 4); // Show only 4 related tools
        
        // Get the container
        const container = document.getElementById('relatedToolsContainer');
        
        if (relatedTools.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center col-span-full">No related tools found.</p>';
            return;
        }
        
        // Render related tools
        container.innerHTML = relatedTools.map(tool => `
            <a href="../${tool.category}/${tool.url.split('/').pop()}" class="bg-white rounded-lg shadow hover:shadow-xl transition p-4 border block">
                <div class="flex items-start justify-between mb-3">
                    <h3 class="text-sm font-bold text-gray-800 flex-1">
                        <i class="${tool.fab ? 'fab' : 'fas'} ${tool.icon} text-${tool.color}-600 mr-2"></i>${tool.name}
                    </h3>
                    ${tool.badge ? `<span class="bg-${tool.badge === 'HOT' ? 'red' : tool.badge === 'NEW' ? 'green' : 'yellow'}-500 text-white text-xs font-bold px-2 py-1 rounded">${tool.badge}</span>` : ''}
                </div>
                <div class="text-${tool.color}-600 text-sm font-medium">
                    <i class="fas fa-arrow-right mr-1"></i>Try Now
                </div>
            </a>
        `).join('');
        
    } catch (error) {
        console.error('Error loading related tools:', error);
        document.getElementById('relatedToolsContainer').innerHTML = 
            '<p class="text-red-500 text-center col-span-full">Unable to load related tools.</p>';
    }
}

// Mobile menu toggle for tool pages
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
