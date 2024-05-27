export interface ChallengeAbyssDungeon {
  Name: string
  Description: string
  MinCharacterLevel: number
  MinItemLevel: number
  AreaName: string
  StartTime: string
  EndTime: string
  Image: string
  RewardItems: RewardItem[]
}

export interface RewardItem {
  Name: string
  Icon: string
  Grade: string
  StartTimes: string[]
}

export interface ChallengeGuardianRaid {
  Raids: GuardianRaid[]
  RewardItems: LevelRewardItems[]
}

export interface GuardianRaid {
  Name: string
  Description: string
  MinCharacterLevel: number
  MinItemLevel: number
  StartTime: string
  EndTime: string
  Image: string
}

export interface LevelRewardItems {
  ExpeditionItemLevel: number
  Items: RewardItem[]
}

export interface ContentsCalendar {
  CategoryName: string
  ContentsName: string
  ContentsIcon: string
  MinItemLevel: number
  StartTimes: number[]
  Location: string
  RewardItems: RewardItem[]
}