document.addEventListener('DOMContentLoaded', function () {
    const moviePosters = document.querySelectorAll('.movie img');

    moviePosters.forEach(poster => {
        poster.addEventListener('click', function () {
            openReviewPopup(this.alt);
        });
    });

    function openReviewPopup(movieName) {
        const popup = document.querySelector('.popup.review-popup');
        const popupMovieName = document.getElementById('popup-movie-name');
        popupMovieName.textContent = movieName;
        popup.style.display = 'block';
    }

    const ratingLabels = document.querySelectorAll('.rating label');

    ratingLabels.forEach(label => {
        label.addEventListener('click', function () {
            const selectedRating = this.getAttribute('for');
            resetStarAnimations();
            highlightStars(selectedRating);
        });
    });

    function resetStarAnimations() {
        ratingLabels.forEach(label => {
            label.style.animation = 'none';
            label.offsetHeight; /* trigger reflow */
            label.style.animation = null;
        });
    }

    function highlightStars(selectedRating) {
        const selectedLabel = document.querySelector(`.rating label[for="${selectedRating}"]`);
        selectedLabel.style.animation = 'fillStars 0.5s ease-out';
    }

    function closePopup() {
        console.log('Close popup function called');
        document.querySelector('.popup.review-popup').style.display = 'none';
    }

    function closeConfirmationPopup() {
        console.log('Close confirmation popup function called');
        document.querySelector('.popup.confirmation-popup').style.display = 'none';
    }

    // Hide popups initially after DOM has loaded
    document.querySelector('.popup.review-popup').style.display = 'none';
    document.querySelector('.popup.confirmation-popup').style.display = 'none';

    document.getElementById('submit-review').addEventListener('click', function () {
        const reviewTextArea = document.getElementById('review-textarea');
        const selectedRating = document.querySelector('.rating input:checked').value;
        const movieName = document.getElementById('popup-movie-name').textContent;

        if (selectedRating && reviewTextArea.value.trim() !== '') {
            const reviewSummary = `Movie: ${movieName}\nRating: ${selectedRating}\nReview: ${reviewTextArea.value}`;
            showConfirmationPopup(reviewSummary);
        } else {
            alert('Please select a rating and write a review before submitting.');
        }
    });

    function showConfirmationPopup(reviewSummary) {
        const confirmationPopup = document.querySelector('.popup.confirmation-popup');
        const confirmationText = document.getElementById('confirmation-text');
        confirmationText.textContent = reviewSummary;
        confirmationPopup.style.display = 'block';
    }

    // Add event listeners for close buttons
    document.querySelector('.popup.review-popup .close-popup').addEventListener('click', closePopup);
    document.querySelector('.popup.confirmation-popup .close-popup').addEventListener('click', closeConfirmationPopup);
});

document.getElementById('login-link').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default link behavior
    toggleLoginPopup();
});

function showLoginPopup() {
    const loginPopup = document.querySelector('.popup.login-popup');
    if (loginPopup) {
        document.getElementById('signup-content').style.display = 'none';
        loginPopup.style.display = 'block';
    }
}

function toggleLoginPopup() {
    const loginPopup = document.querySelector('.popup.login-popup');
    if (loginPopup) {
        loginPopup.style.display = (loginPopup.style.display === 'none') ? 'block' : 'none';
        const signupContent = document.getElementById('signup-content');
        if (signupContent) {
            signupContent.style.display = 'none';
        }
    } else {
        console.error('Login popup not found. Check your HTML and CSS.');
    }
}

function closeSignupForm() {
    const signupPopup = document.querySelector('.popup.signup-popup');
    if (signupPopup) {
        document.getElementById('signup-content').style.display = 'none';
        signupPopup.style.display = 'none';
    }
}

function closePopup() {
    closeLoginPopup();
    closeSignupForm();
}

function closeLoginPopup() {
    const loginPopup = document.querySelector('.popup.login-popup');
    if (loginPopup) {
        loginPopup.style.display = 'none';
    }
}
