document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to show a specific tab
    window.showTab = function(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        tabButtons.forEach(button => {
            button.classList.remove('bg-revizGreen/10', 'text-revizGreen', 'border', 'border-revizGreen');
            button.classList.add('text-gray-600', 'hover:bg-gray-50');
        });

        document.getElementById(tabId).classList.add('active');
        document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`).classList.add('bg-revizGreen/10', 'text-revizGreen', 'border', 'border-revizGreen');
        document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`).classList.remove('text-gray-600', 'hover:bg-gray-50');
    };

    // Initialize to show the first tab (Guidelines)
    showTab('guidelines');

    // Author fields dynamic add/remove
    let authorCount = 1;
    const addAuthorBtn = document.getElementById('addAuthorBtn');
    const authorFields = document.getElementById('authorFields');

    if (addAuthorBtn) {
        addAuthorBtn.addEventListener('click', function() {
            authorCount++;
            const newAuthorHtml = `
                <div class="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200 author-entry">
                    <div class="flex justify-between items-center mb-3">
                        <p class="text-sm font-bold text-gray-700">Author ${authorCount}</p>
                        <button type="button" class="text-red-500 hover:text-red-700 text-sm remove-author-btn">
                            <i class="fas fa-times-circle mr-1"></i> Remove
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="authorName${authorCount}" class="block text-gray-700 text-xs font-bold mb-1">Full Name</label>
                            <input type="text" id="authorName${authorCount}" name="authorName${authorCount}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" placeholder="Jane Doe" required>
                        </div>
                        <div>
                            <label for="authorEmail${authorCount}" class="block text-gray-700 text-xs font-bold mb-1">Email</label>
                            <input type="email" id="authorEmail${authorCount}" name="authorEmail${authorCount}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" placeholder="jane.doe@example.com" required>
                        </div>
                        <div class="md:col-span-2">
                            <label for="authorAffiliation${authorCount}" class="block text-gray-700 text-xs font-bold mb-1">Affiliation</label>
                            <input type="text" id="authorAffiliation${authorCount}" name="authorAffiliation${authorCount}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm" placeholder="University, Company, etc." required>
                        </div>
                    </div>
                </div>
            `;
            authorFields.insertAdjacentHTML('beforeend', newAuthorHtml);
            updateAuthorNumbers();
        });
    }

    // Delegate event listener for remove buttons
    authorFields.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-author-btn') || e.target.parentElement.classList.contains('remove-author-btn')) {
            const button = e.target.classList.contains('remove-author-btn') ? e.target : e.target.parentElement;
            const authorEntry = button.closest('.author-entry');
            if (authorEntry) {
                authorFields.removeChild(authorEntry);
                authorCount--; // Decrement author count
                updateAuthorNumbers();
            }
        }
    });

    function updateAuthorNumbers() {
        const authorEntries = authorFields.querySelectorAll('.author-entry');
        authorEntries.forEach((entry, index) => {
            if (index > 0) { // Skip primary author
                const authorNumber = index + 1;
                entry.querySelector('.text-sm.font-bold.text-gray-700').textContent = `Author ${authorNumber}`;
            }
        });
    }


    // File upload visual feedback
    const fileUploads = document.querySelectorAll('.file-upload');
    fileUploads.forEach(upload => {
        const input = upload.querySelector('input[type="file"]');
        const fileNameDisplay = upload.querySelector('[id$="FileName"]'); // Selects elements ending with 'FileName'

        input.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                upload.classList.add('active');
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = this.files.length === 1 ? this.files[0].name : `${this.files.length} files selected`;
                    fileNameDisplay.classList.remove('hidden');
                }
            } else {
                upload.classList.remove('active');
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = 'No file chosen';
                    fileNameDisplay.classList.add('hidden');
                }
            }
        });
    });

    // Form submission
    document.getElementById('submissionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send the form data to your server
        // For this demo, we'll just show a success message
        alert('Thank you for your submission! Your manuscript has been received and will undergo editorial review.');
        
        // Reset form
        this.reset();
        document.querySelectorAll('.file-upload').forEach(upload => {
            upload.classList.remove('active');
        });
        document.querySelectorAll('[id$="FileName"]').forEach(element => {
            element.classList.add('hidden');
        });
        
        // Reset author fields to just the primary author
        const authorFields = document.getElementById('authorFields');
        while (authorFields.children.length > 1) {
            authorFields.removeChild(authorFields.lastChild);
        }
        authorCount = 1;
    });
});