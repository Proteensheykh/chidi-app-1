#!/bin/bash

echo "🚀 Setting up GitHub repository for CHIDI App..."
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please run 'git init' first."
    exit 1
fi

# Check if we have commits
if [ -z "$(git log --oneline 2>/dev/null)" ]; then
    echo "❌ No commits found. Please make an initial commit first."
    exit 1
fi

echo "✅ Git repository is ready!"
echo ""

# Instructions for manual GitHub setup
echo "📋 Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Create a new repository named 'chidi-app'"
echo "3. Make it public or private (your choice)"
echo "4. DON'T initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo ""

# Wait for user input
read -p "Press Enter after you've created the repository on GitHub..."

# Get repository URL
echo ""
read -p "Enter your GitHub username: " username
repo_url="https://github.com/$username/chidi-app.git"

echo ""
echo "🔗 Adding remote origin: $repo_url"
git remote add origin $repo_url

echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "🎉 Success! Your CHIDI app is now on GitHub!"
echo "🔗 Repository URL: $repo_url"
