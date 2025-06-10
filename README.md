# 🔐 Password Generator & Strength Checker - Chrome Extension
A secure tool that generates strong passwords and evaluates password strength locally in your browser.
![Extension Screenshot](icons/icon128.png)

## Features

### 🎲 Password Generator
- Generate random passwords with customizable length (8-50 characters)
- Toggle character types:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Symbols (!@#$% etc.)
- One-click copy to clipboard

### 🛡️ Strength Checker
- Real-time password strength evaluation
- Visual strength meter with color coding (red to green)
- Detailed feedback on password weaknesses
- Checks for common patterns and vulnerabilities

### 🔒 Privacy Focus
- **No data collection** - everything processes locally
- **No tracking** - we don't store or transmit your passwords
- **No internet connection required** for core functionality

## Installation
1. Clone this repository or download the ZIP file
2. Open Chrome and navigate to:
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked" and select the extension folder

## How to Use
1. Click the extension icon in your Chrome toolbar
2. **Generate passwords**:
- Set your preferred length and character types
- Click "Generate Password"
- Use "Copy" to save to clipboard
3. **Check password strength**:
- Switch to "Checker" tab
- Type or paste a password
- View strength rating and improvement tips

## Technical Details
- **Manifest Version**: 3
- **Permissions**: `clipboardWrite` (only for copy functionality)
- **Storage**: No data storage used
- **Processing**: All calculations done client-side

## Privacy Policy
This extension does not collect, store, or transmit any password data.  
[View Full Privacy Policy](https://shahidifraheem.github.io/Password-Generator-Strength-Checker-Extension/privacy-policy.html)

## License
MIT License - Free for personal and commercial use

---

**Like this extension?** ⭐ Star the repository to show your support!