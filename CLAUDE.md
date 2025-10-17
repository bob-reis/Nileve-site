# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a social engineering awareness demonstration - an elegant educational tool that shows how even security-conscious people can be vulnerable to social engineering attacks. The project creates a professional landing page that reveals its true purpose after someone clicks a contextual link.

## Architecture

**Frontend-Only Static Site**:
- Pure HTML/CSS/JavaScript - no backend required
- Uses localStorage for click counting persistence
- Responsive design with modern CSS animations
- Vercel-optimized for instant deployment

**Key Components**:
- `index.html`: Main landing page with educational content
- `styles.css`: Modern, responsive design with animations
- `script.js`: Click counter, animations, and interaction logic
- `vercel.json`: Deployment configuration with security headers

## Development Commands

```bash
# Local development server
python3 -m http.server 8000
# or
npm run dev

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
# or
npm run deploy
```

## Security Guidelines

**Ethical Use Only**:
- This is exclusively for cybersecurity education and awareness
- Contains clear disclaimers about educational purpose
- No data collection or malicious functionality
- Designed to teach, not exploit
- Always use in appropriate professional/educational contexts

**Technical Security**:
- Includes proper security headers via Vercel configuration
- No external dependencies that could introduce vulnerabilities
- Client-side only - no server-side attack vectors
- Uses HTTPS by default on Vercel

## Project Structure

```
fake-fishing/
├── index.html          # Main landing page
├── styles.css          # Responsive CSS with animations
├── script.js           # Counter logic and interactions
├── vercel.json         # Deployment configuration
├── package.json        # Project metadata and scripts
├── README.md           # Deployment and usage guide
└── CLAUDE.md           # This file
```

## Agent Recommendations

For this cybersecurity-focused project, consider using specialized agents:

- **Neo**: For threat modeling and security analysis of the platform itself
- **Trinity**: For vulnerability scanning and security remediation
- **Niobe**: For operational security and security culture implementation
- **Link**: For defensive security monitoring and threat detection
- **Commander Locke**: For ethical penetration testing of the platform (controlled environment only)
- **Ghost**: For threat intelligence integration and analysis features

## Notes

This is a new project. This file should be updated as the codebase develops to include:
- Build and test commands
- Detailed architecture documentation
- Development workflow guidelines
- Deployment procedures