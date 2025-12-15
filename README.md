# Flashcard app
Live Site URL: https://flashcards-lac-one.vercel.app/

## Tech Stack
- Next.js
- Tanstack Query
- React Hook Form
- Tailwind CSS
- Drizzle ORM
- Better Auth

## The challenge

Users should be able to:

#### Flashcard Management

- Create new flashcards with a question, answer, and category
- Edit existing flashcards to update their details
- Delete flashcards they no longer need
- See form validation messages when trying to submit a card without all fields completed
- View all their flashcards in a grid layout
- See flashcard details including question, answer, category, and mastery progress

#### Study Mode

- Study flashcards one at a time in Study Mode
- Click on a flashcard to reveal the answer
- Mark a flashcard as known by clicking "I Know This" to track mastery progress
- Navigate between flashcards using Previous and Next buttons
- See which card they're currently viewing (e.g., "Card 1 of 40")
- Track mastery progress for each card on a scale of 0 to 5
- Reset progress on a flashcard to start learning it again

#### Filtering & Organization

- Filter flashcards by selecting one or multiple categories
- See the number of cards in each category within the filter dropdown
- Hide mastered cards to focus on cards that still need practice

#### Statistics & Progress

- View study statistics showing total cards, mastered, in progress, and not started counts

#### UI & Navigation

- Toggle between Study Mode and All Cards views
- Load more flashcards when viewing the full card list with more than 12 cards
- See a toast message when a card is created, updated, or deleted
- View the optimal layout for the interface depending on their device's screen size
- Navigate the entire app using only their keyboard
