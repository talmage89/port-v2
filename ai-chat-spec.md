# AI Chat Feature Specification

## Overview
Add a search bar to the top of the portfolio site that opens a dialog for an AI chat interface allowing users to query information about the site content, skills, projects, and blog posts. This feature serves primarily as a demonstration of AI capabilities and will help users navigate the site more effectively.

## Design Requirements

### Search Bar Component
- **Location**: In the Navbar component
- **Design**: 
  - Simple search icon with placeholder text like "Ask about my skills, projects, or blog posts"
  - Match the current site's design aesthetic with dark/light theme compatibility
  - Mobile responsive - should collapse to an icon on mobile devices
- **Interaction**: 
  - Clicking opens a dialog for chat interface
  - Supports keyboard shortcut (e.g., Cmd+K/Ctrl+K) to open
  - Uses existing Command component from the UI library

### Chat Interface
- **Implementation**: Dialog Approach
  - Use existing Dialog component from `components/ui/dialog.tsx`
  - Opens as an overlay/modal when search is clicked
  - Allows for seamless interaction without leaving the current page
  - No need for persistent chat history between sessions

- **Features**:
  - Simple chat history for current session only
  - Message input box at the bottom
  - Typing indicator when AI is generating responses
  - Markdown rendering for AI responses (leveraging existing `react-markdown` dependency)
  - Support for links to other pages/routes on the site
  - Reset/clear conversation button
  - Usage counter to limit questions per user per day

- **UI Components Needed**:
  - Chat container
  - Message bubbles (user vs AI)
  - Input field with send button
  - Loading/typing indicator

## Technical Implementation

### Frontend Requirements
- Add search bar to Navbar component in `components/impl/Navbar.tsx`
- Create new chat components:
  - ChatDialog component
  - ChatMessage component
  - ChatInput component
  - ChatTypingIndicator component
- Implement keyboard shortcuts using React hooks
- Include usage counter display

### Backend Requirements
- Create new API route: `/api/chat` for handling AI interactions with Anthropic
- Implement rate limiting (questions per day per user)
- Add basic analytics tracking

### AI Integration
- **Anthropic API**:
  - Integration with Claude model
  - Requires API key and usage monitoring
  - Focus on low-cost implementation with reasonable response times

### Data Sources for AI
- Project information from database
- Skills information from database
- Blog posts and their content
- General site information like contact details
- Navigation information to help users find specific pages

### Context Building
- Create a system prompt that includes relevant information about:
  - Personal information from the site
  - Skills and tech stack
  - Projects overview
  - Blog post summaries
  - How to contact
  - Site navigation guidance

## Implementation Phases

### Phase 1: Basic Integration
- Add search icon to navigation
- Create dialog with basic chat interface
- Implement backend API route with Anthropic integration
- Train AI with basic site information
- Add usage limits per user

### Phase 2: Enhanced Features
- Improve UI/UX of chat interface
- Add support for linking to site pages
- Implement basic analytics for tracking questions

### Phase 3: Refinement
- Use analytics to improve AI responses
- Optimize prompts based on common questions
- Fine-tune rate limits based on actual usage

## Technical Considerations

### State Management
- Use React state for chat dialog open/closed state
- Store current session chat history in state (no persistence needed)

### API Considerations
- Implement streaming responses for better UX
- Set up proper error handling for AI service interruptions
- Add appropriate timeout handling
- Monitor API usage costs

### Security Considerations
- Rate limiting to prevent abuse (questions per day per IP)
- Content filtering for inappropriate requests
- Avoid exposing sensitive information to the AI

### Analytics
- Track questions asked
- Monitor usage patterns
- Record which site sections are most frequently asked about
- Store analytics in existing database

## Storage Requirements
- No need for persistent chat history between sessions
- Store basic usage analytics in database
- Track rate limiting information (e.g., questions asked per IP per day)

## Dependencies
- Existing UI components (Dialog, Input, Button)
- React and Next.js
- Anthropic API integration
- Database storage for analytics 