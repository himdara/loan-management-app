// src/utils/helpers.js

export const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    // Ensure date is valid before formatting
    if (isNaN(date.getTime())) {
        return dateString; // Return original string if it's not a valid date
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `<span class="math-inline">\{day\}\-</span>{month}-${year}`;
};

// You can add more helper functions here as needed