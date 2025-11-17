PRIVATE FOLDER - CV PDF Storage
================================

This folder contains your CV PDF that will be served securely via the API.

Instructions:
1. Place your CV PDF file here: private/cv.pdf
2. DO NOT commit this PDF to Git
3. The PDF will be included in Vercel deployment
4. Make sure private/cv.pdf is in .gitignore

Security:
- The PDF is only accessible via /api/get-cv with a valid token
- Tokens expire after 1 hour
- Password changes every 4 days automatically
