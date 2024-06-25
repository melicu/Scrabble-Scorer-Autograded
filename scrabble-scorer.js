// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   let playedWord = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < playedWord.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(playedWord[i])) {
            letterPoints += `Points for '${playedWord[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let initialPrompt = () => {
   return word = input.question("Let's play some Scrabble! \n\nEnter a word to score: ");
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = (word) => {
   let playedWord = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < playedWord.length; i++) {
      letterPoints++
   }
   return letterPoints;
};

let vowelBonusScorer = (word) => {
   let playedWord = word.toUpperCase();
   let letterPoints = 0;
   let vowels = ['A', 'E', 'I', 'O', 'U'];

   for (let i = 0; i < playedWord.length; i++) {
      if (vowels.includes(playedWord[i])) {
         letterPoints += 3;
      } else {
         letterPoints++;
      }
   }
   return letterPoints;
};

let scrabbleScorer = (word) => {
   let playedWord = word.toLowerCase();
   let letterPoints = 0;

   for (let i = 0; i < playedWord.length; i++) {
      letterPoints += newPointStructure[playedWord[i]];
   }
   return letterPoints;
}


const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scoringFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scoringFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scoringFunction: scrabbleScorer
   }
]

function scorerPrompt(word) {
   let selectedScoringAlgorithm = Number(input.question("Which scoring algorithm would you like to use? \n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses Scrabble point system \nEnter 0, 1, or 2: "));
   console.log(`Score for '${word}': ${scoringAlgorithms[selectedScoringAlgorithm].scoringFunction(word)}`);
}


function transform(object) {
   let newObject = {}
   for (item in object) {
      for (i = 0; i < object[item].length; i++) {
         newObject[object[item][i].toLowerCase()] = Number(item);
      }
   }
   return newObject
}

function runProgram() {
   scorerPrompt(initialPrompt());

}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
