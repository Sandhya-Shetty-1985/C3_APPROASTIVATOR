import type { RoastLevel, RoastResponse } from "./types"

// This is a mock implementation - in a real app, this would call an API
export function generateRoast(appIdea: string, level: RoastLevel, challengeMode = false): RoastResponse {
  // Normalize the app idea to lowercase for easier matching
  const ideaLower = appIdea.toLowerCase()

  // Check for common app types
  const isFoodApp = ideaLower.includes("food") || ideaLower.includes("recipe") || ideaLower.includes("meal")
  const isSocialApp = ideaLower.includes("social") || ideaLower.includes("friend") || ideaLower.includes("connect")
  const isProductivityApp =
    ideaLower.includes("productivity") || ideaLower.includes("task") || ideaLower.includes("todo")
  const isFitnessApp = ideaLower.includes("fitness") || ideaLower.includes("workout") || ideaLower.includes("exercise")
  const isDatingApp = ideaLower.includes("dating") || ideaLower.includes("match") || ideaLower.includes("relationship")

  // Generate responses based on app type and roast level
  let originality = ""
  let problemSolving = ""
  let engagement = ""
  let whyItMightFlop: string[] = []
  let improvements = {
    makeUnique: "",
    makeEngaging: "",
    solveRealProblem: "",
  }

  // If in challenge mode, flip the script and try to make bad ideas sound good
  if (challengeMode) {
    return generateChallengeResponse(appIdea, level)
  }

  // Originality responses
  if (isFoodApp) {
    if (level === "light") {
      originality =
        "Another food app? That's like bringing a sandwich to a potluck. It works, but it's not winning any creativity awards."
    } else if (level === "medium") {
      originality =
        "Oh great, another food app! Because the 500 existing ones clearly weren't enough. Did you and every other startup founder have the same dream last night?"
    } else {
      originality =
        "A food app? Seriously? That's about as original as a millennial with an avocado toast Instagram. The App Store is BEGGING you to come up with something else."
    }
  } else if (isSocialApp) {
    if (level === "light") {
      originality =
        "A social app is a classic choice! Though Facebook, Instagram, Twitter, TikTok, and Snapchat might have a head start... by about a decade."
    } else if (level === "medium") {
      originality =
        "Another social app? Mark Zuckerberg is shaking in his boots... from laughter. What's your plan to compete with platforms that have billions in funding?"
    } else {
      originality =
        "A social app? How groundbreaking! Next you'll tell me you've invented this cool new thing called 'the wheel.' The digital graveyard is FULL of failed social apps."
    }
  } else if (isProductivityApp) {
    if (level === "light") {
      originality =
        "A productivity app! Because what people need is another app telling them they're behind on their tasks."
    } else if (level === "medium") {
      originality =
        "Oh, a productivity app! How original. There are only about 10,000 of those. What's next, a calculator that also does math?"
    } else {
      originality =
        "A productivity app? Seriously? People spend more time organizing their productivity apps than actually being productive. Yours will just be another icon they feel guilty about not opening."
    }
  } else if (isFitnessApp) {
    if (level === "light") {
      originality =
        "A fitness app! Because what people really need is another app telling them they haven't moved enough today."
    } else if (level === "medium") {
      originality =
        "Another fitness app? The only thing getting a workout here is the 'uninstall' button. What makes yours different from the thousands already out there?"
    } else {
      originality =
        "A fitness app? How revolutionary! Next you'll invent fire. The App Store is a graveyard of abandoned fitness apps that people downloaded January 1st and deleted January 3rd."
    }
  } else if (isDatingApp) {
    if (level === "light") {
      originality = "A dating app! Because swiping left and right has worked out so well for society so far."
    } else if (level === "medium") {
      originality =
        "Another dating app? Great, because what the world needs is more people staring at their phones instead of making eye contact with potential partners."
    } else {
      originality =
        "A dating app? Wow, groundbreaking. Because Tinder, Bumble, Hinge, OkCupid, Match, eHarmony, and literally hundreds of others haven't cornered that market yet. What's your billion-dollar differentiator? Let me guess: 'It's like Tinder, but for [niche group]'?"
    }
  } else {
    // Generic responses for other app types
    if (level === "light") {
      originality = "Interesting idea! It's not completely new, but you might have a fresh take on it."
    } else if (level === "medium") {
      originality =
        "This idea has definitely been done before. You'll need something truly special to stand out from the crowd."
    } else {
      originality =
        "This idea is about as fresh as week-old sushi. A quick App Store search would show you dozens of apps already doing this exact thing."
    }
  }

  // Problem solving responses
  if (level === "light") {
    problemSolving =
      "I see what problem you're trying to solve, but is it really a problem that needs an app? Maybe, maybe not."
  } else if (level === "medium") {
    problemSolving =
      "This feels like a solution looking for a problem. Just because you CAN build an app doesn't mean you SHOULD."
  } else {
    problemSolving =
      "This app solves a problem that literally no one has. It's like creating an app that reminds fish to swim."
  }

  // Engagement responses
  if (level === "light") {
    engagement = "Users might try this once out of curiosity, but you'll need more to keep them coming back."
  } else if (level === "medium") {
    engagement =
      "Users will download this, open it once, forget about it, then delete it three months later during a phone cleanup."
  } else {
    engagement =
      "The user retention on this will be lower than a snake's belly. They'll delete it faster than a bad Tinder match."
  }

  // Why it might flop
  if (isFoodApp) {
    whyItMightFlop = [
      "Market saturation - there are thousands of food/recipe apps already",
      "User acquisition costs for food apps are extremely high",
      "Without a unique angle, users have no reason to switch from apps they already use",
    ]
  } else if (isSocialApp) {
    whyItMightFlop = [
      "Network effect - new social apps need critical mass to be useful",
      "Competing with tech giants with billions in resources",
      "User fatigue - people are already overwhelmed with social platforms",
    ]
  } else if (isProductivityApp) {
    whyItMightFlop = [
      "Productivity app paradox - people download them but rarely stick with them",
      "Extremely competitive market with established players",
      "Most productivity features are now built into operating systems",
    ]
  } else if (isFitnessApp) {
    whyItMightFlop = [
      "Seasonal usage patterns (January surge, February abandonment)",
      "Hardware integration challenges with various fitness devices",
      "Difficulty in providing value beyond what free apps offer",
    ]
  } else if (isDatingApp) {
    whyItMightFlop = [
      "Requires large user base from day one to be useful",
      "Extremely high marketing costs to acquire users",
      "Dominated by a few major players with massive resources",
    ]
  } else {
    whyItMightFlop = [
      "Unclear value proposition for potential users",
      "Difficulty standing out in a crowded app marketplace",
      "Potential lack of recurring usage scenarios",
    ]
  }

  // Improvements
  if (isFoodApp) {
    improvements = {
      makeUnique:
        "Instead of just another recipe app, focus on hyper-local, homemade meal sharing between neighbors or specialized diets that are underserved.",
      makeEngaging:
        "Add meal planning challenges, cooking streaks, or community cook-offs where users can vote on the best creations.",
      solveRealProblem:
        "Target specific dietary restrictions or food allergies with substitution suggestions that actually work, not just removing ingredients.",
    }
  } else if (isSocialApp) {
    improvements = {
      makeUnique:
        "Instead of competing with giants, create a niche community around a specific interest or activity that's underserved by mainstream platforms.",
      makeEngaging:
        "Implement time-limited events or challenges that bring users together around shared goals or interests.",
      solveRealProblem:
        "Focus on genuine connection rather than endless scrolling - maybe limit the number of daily interactions but make them more meaningful.",
    }
  } else if (isProductivityApp) {
    improvements = {
      makeUnique:
        "Combine productivity with another element like storytelling or game mechanics that makes the experience enjoyable, not just functional.",
      makeEngaging:
        "Create a system where completed tasks contribute to a visual story or world-building element that users want to see progress.",
      solveRealProblem:
        "Focus on reducing decision fatigue rather than just organizing tasks - help users decide WHAT to do, not just track what they've decided.",
    }
  } else if (isFitnessApp) {
    improvements = {
      makeUnique:
        "Create workouts based on users' actual living spaces and available household items instead of assuming they have gym equipment.",
      makeEngaging:
        "Implement a narrative adventure where fitness activities progress an interactive story or unlock new chapters.",
      solveRealProblem:
        "Focus on consistency and habit-building rather than intense workouts - make it impossibly easy to maintain a streak.",
    }
  } else if (isDatingApp) {
    improvements = {
      makeUnique:
        "Instead of endless swiping, create structured interactions like virtual events or games that reveal personality before appearance.",
      makeEngaging:
        "Implement progressive disclosure where more profile elements are revealed after meaningful interactions, not just photos upfront.",
      solveRealProblem:
        "Focus on compatibility verification - create scenarios that test if online chemistry translates to real-world connection before users meet.",
    }
  } else {
    improvements = {
      makeUnique:
        "Find an underserved niche within your category and focus exclusively on their specific needs rather than trying to appeal to everyone.",
      makeEngaging:
        "Add elements of gamification, social proof, or narrative that give users a reason to return beyond the core functionality.",
      solveRealProblem:
        "Talk to potential users and identify their actual pain points - then solve those specifically rather than assuming what they need.",
    }
  }

  return {
    originality,
    problemSolving,
    engagement,
    whyItMightFlop,
    improvements,
  }
}

// Function to generate responses for Challenge Mode
function generateChallengeResponse(appIdea: string, level: RoastLevel): RoastResponse {
  // In Challenge Mode, we try to make even bad ideas sound viable

  // Extract key words from the idea
  const words = appIdea.toLowerCase().split(/\s+/)
  const keyWords = words.filter(
    (word) =>
      word.length > 3 &&
      ![
        "this",
        "that",
        "with",
        "would",
        "could",
        "should",
        "have",
        "about",
        "from",
        "they",
        "will",
        "what",
        "when",
        "where",
        "which",
        "their",
      ].includes(word),
  )

  // Generate a positive spin on originality
  let originality =
    "While this idea might sound unconventional at first, that's exactly what disruption looks like! Remember, Airbnb was once 'strangers sleeping in your house' and Uber was 'getting in cars with strangers.'"

  if (keyWords.length > 0) {
    const randomWord = keyWords[Math.floor(Math.random() * keyWords.length)]
    originality += ` Your focus on ${randomWord} could be the differentiator that sets you apart in the market.`
  }

  // Generate a positive spin on problem solving
  const problemSolving =
    "You're addressing a niche problem that most people don't even realize they have yet. That's visionary thinking! The best products often solve problems people didn't know needed solving."

  // Generate a positive spin on engagement
  const engagement =
    "With the right execution, this could become a habit-forming product. By incorporating variable rewards and creating 'aha moments' early in the user journey, you could drive surprising levels of engagement."

  // Generate "why it might work" instead of "why it might flop"
  const whyItMightWork = [
    "First-mover advantage in an unconventional niche",
    "Potential for strong word-of-mouth if executed with the right tone",
    "Opportunity to create a dedicated community around a unique concept",
    "Possibility to pivot to adjacent, more practical use cases if needed",
  ]

  // Generate improvements that embrace the absurdity
  const improvements = {
    makeUnique:
      "Lean into the unconventional nature of this idea. Make it so distinct and memorable that people can't help but talk about it, even if just for the novelty factor.",
    makeEngaging:
      "Add unexpected elements of delight and surprise. When users expect your app to be one thing, surprise them with additional value they weren't expecting.",
    solveRealProblem:
      "Find the kernel of utility hidden within this concept. Even the most outlandish ideas often contain a nugget of genuine user value that can be expanded upon.",
  }

  return {
    originality,
    problemSolving,
    engagement,
    whyItMightFlop: whyItMightWork, // Repurposing this field for Challenge Mode
    improvements,
  }
}

