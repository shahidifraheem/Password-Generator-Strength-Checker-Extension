document.addEventListener('DOMContentLoaded', function () {
    // Tab switching
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Password Generator
    const generateBtn = document.getElementById('generate-btn');
    const passwordOutput = document.getElementById('password-output');
    const copyBtn = document.getElementById('copy-btn');
    const strengthMeterGenerator = document.querySelector('#strength-meter-generator .strength-bar');
    const strengthTextGenerator = document.querySelector('#strength-meter-generator .strength-text');

    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyPassword);

    function generatePassword() {
        const length = parseInt(document.getElementById('length').value);
        const uppercase = document.getElementById('uppercase').checked;
        const lowercase = document.getElementById('lowercase').checked;
        const numbers = document.getElementById('numbers').checked;
        const symbols = document.getElementById('symbols').checked;

        let charset = '';
        if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers) charset += '0123456789';
        if (symbols) charset += '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

        if (!charset) {
            passwordOutput.value = 'Select at least one character type';
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        passwordOutput.value = password;
        checkPasswordStrength(password, strengthMeterGenerator, strengthTextGenerator);
    }

    function copyPassword() {
        if (!passwordOutput.value) return;

        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        });
    }

    // Password Strength Checker
    const passwordInput = document.getElementById('password-input');
    const strengthMeterChecker = document.querySelector('#strength-meter-checker .strength-bar');
    const strengthTextChecker = document.querySelector('#strength-meter-checker .strength-text');
    const feedback = document.getElementById('feedback');

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        checkPasswordStrength(password, strengthMeterChecker, strengthTextChecker);
        provideFeedback(password);
    });

    function checkPasswordStrength(password, meterElement, textElement) {
        const strength = calculatePasswordStrength(password);
        const width = Math.min(100, strength.score * 25); // Max 100%

        meterElement.style.setProperty('--width', `${width}%`);
        meterElement.style.backgroundColor = getStrengthColor(strength.score);

        textElement.textContent = getStrengthText(strength.score);
    }

    function calculatePasswordStrength(password) {
        let score = 0;
        const feedback = [];

        if (!password) return { score: 0, feedback };

        // Length
        if (password.length < 8) {
            feedback.push('Password is too short (minimum 8 characters)');
        } else {
            score += Math.min(4, Math.floor(password.length / 4));
        }

        // Character variety
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSymbols = /[^a-zA-Z0-9]/.test(password);

        const varietyCount = [hasLowercase, hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length;
        score += (varietyCount - 1) * 2;

        if (varietyCount < 2) {
            feedback.push('Add more character types (uppercase, lowercase, numbers, symbols)');
        }

        // Common patterns
        if (/(.)\1{2,}/.test(password)) {
            feedback.push('Avoid repeating characters');
            score = Math.max(0, score - 1);
        }

        if (/123|abc|qwerty|password/i.test(password)) {
            feedback.push('Avoid common patterns');
            score = Math.max(0, score - 2);
        }

        return { score: Math.min(4, score), feedback };
    }

    function getStrengthColor(score) {
        const colors = ['#ff0000', '#ff5e00', '#ffbb00', '#a4ff00', '#00ff00'];
        return colors[Math.min(4, Math.max(0, score))];
    }

    function getStrengthText(score) {
        const texts = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        return texts[Math.min(4, Math.max(0, score))];
    }

    function provideFeedback(password) {
        const { feedback: strengthFeedback } = calculatePasswordStrength(password);
        let html = '';

        if (password.length === 0) {
            feedback.innerHTML = '';
            return;
        }

        if (strengthFeedback.length > 0) {
            html += '<p>To improve your password:</p><ul>';
            strengthFeedback.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        } else {
            html = '<p>Your password is strong! Good job!</p>';
        }

        feedback.innerHTML = html;
    }
});