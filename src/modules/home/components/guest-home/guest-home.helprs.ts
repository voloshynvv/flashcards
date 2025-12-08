import { Card } from "@/lib/queries/cards.query";

export const guestCards = [
  {
    id: "1",
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
    category: "Web Development",
    knownCount: 0,
  },
  {
    id: "2",
    question: "What is the difference between 'let' and 'const' in JavaScript?",
    answer:
      "'let' allows you to reassign the variable, while 'const' creates a constant reference that cannot be reassigned. Both are block-scoped.",
    category: "JavaScript",
    knownCount: 0,
  },
  {
    id: "3",
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
    category: "Web Development",
    knownCount: 0,
  },
  {
    id: "4",
    question: "What is the capital of France?",
    answer: "Paris",
    category: "Geography",
    knownCount: 0,
  },
  {
    id: "5",
    question: "What is a closure in JavaScript?",
    answer:
      "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.",
    category: "JavaScript",
    knownCount: 0,
  },
  {
    id: "6",
    question: "What does DOM stand for?",
    answer: "Document Object Model",
    category: "Web Development",
    knownCount: 0,
  },
  {
    id: "7",
    question: "What is the Pythagorean theorem?",
    answer: "In a right triangle, a² + b² = c², where c is the hypotenuse",
    category: "Mathematics",
    knownCount: 0,
  },
  {
    id: "8",
    question: "What is the difference between '==' and '===' in JavaScript?",
    answer:
      "'==' checks for value equality with type coercion, while '===' checks for both value and type equality (strict equality).",
    category: "JavaScript",
    knownCount: 0,
  },
  {
    id: "9",
    question: "What is Flexbox used for in CSS?",
    answer:
      "Flexbox is a CSS layout model that helps distribute space and align items in a container, making it easier to create responsive layouts.",
    category: "CSS",
    knownCount: 0,
  },
];

export const categories = [
  ...new Set(guestCards.map((card) => card.category)),
].map((category) => ({
  id: crypto.randomUUID(),
  name: category,
  count: 0,
}));

export const filterCards = (cards: Card[], categories: string[]) => {
  if (categories.length === 0) {
    return cards;
  }

  return cards.filter((card) => categories.includes(card.category));
};
