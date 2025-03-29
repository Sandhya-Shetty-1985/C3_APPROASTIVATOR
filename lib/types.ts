export type RoastLevel = "light" | "medium" | "dark"

export interface RoastResponse {
  originality: string
  problemSolving: string
  engagement: string
  whyItMightFlop: string[]
  improvements: {
    makeUnique: string
    makeEngaging: string
    solveRealProblem: string
  }
}

