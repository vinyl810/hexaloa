export interface Stat {
  Type: string
  Value: string
  Tooltip: string[]
}

export interface Tendency {
  Type: string
  Point: number
  MaxPoint: number
}

export interface ArmoryProfile {
  CharacterImage: string
  ExpeditionLevel: number
  PvpGradeName: string
  TownLevel: number | null
  TownName: string
  Title: string
  GuildMemberGrade: string
  GuildName: string
  UsingSkillPoint: number
  TotalSkillPoint: number
  Stats: Stat[]
  Tendencies: Tendency[]
  ServerName: string
  CharacterName: string
  CharacterLevel: number
  CharacterClassName: string
  ItemAvgLevel: string
  ItemMaxLevel: string
}

export interface ArmoryEquipment {
  Type: string
  Name: string
  Icon: string
  Grade: string
  Tooltip: string
}

export interface ArmoryAvatar {
  Type: string
  Name: string
  Icon: string
  Grade: string
  IsSet: boolean
  IsInner: boolean
  Tooltip: string
}

export interface SkillTripod {
  Tier: number
  Slot: number
  Name: string
  Icon: string
  Level: number
  IsSelected: boolean
  Tooltip: string
}

export interface SkillRune {
  Name: string
  Icon: string
  Grade: string
  Tooltip: string
}

export interface ArmorySkill {
  Name: string
  Icon: string
  Level: number
  Type: string
  IsAwakening: boolean
  Tripods: SkillTripod[]
  Rune: SkillRune
  Tooltip: string
}

export interface Engraving {
  Slot: number
  Name: string
  Icon: string
  Tooltip: string
}

export interface EngravingEffect {
  Icon: string
  Name: string
  Description: string
}

export interface ArmoryEngraving {
  Engravings: Engraving[]
  EngravingEffects: EngravingEffect[]
}

export interface Card {
  Slot: number
  Name: string
  Icon: string
  AwakeCount: number
  AwakeTotal: number
  Grade: string
  Tooltip: string
}

export interface Effect {
  Name: string
  Description: string
}

export interface CardEffect {
  Index: number
  CardSlots: number[]
  Items: Card[]
}

export interface ArmoryCard {
  Cards: Card[]
  Effects: CardEffect[]
}

export interface Gem {
  Slot: number
  Name: string
  Icon: string
  Level: number
  Grade: string
  Tooltip: string
}

export interface GemEffect {
  GemSlot: number
  Name: string
  Description: string
  Icon: string
  Tooltip: string
}

export interface ArmoryGem {
  Gems: Gem[]
  Effects: GemEffect[]
}

export interface AggregationTeamDeathMatchRank {
  Rank: number
  RankName: string
  RankIcon: string
  RankLastMmr: number
  PlayCount: number
  VictoryCount: number
  LoseCount: number
  TieCount: number
  KillCount: number
  AceCount: number
  DeathCount: number
}

export interface Aggregation {
  PlayCount: number
  VictoryCount: number
  LoseCount: number
  TieCount: number
  KillCount: number
  AceCount: number
  DeathCount: number
}

export interface AggregationElimination {
  FirstWinCount: number
  SecondWinCount: number
  ThirdWinCount: number
  FirstPlayCount: number
  SecondPlayCount: number
  ThirdPlayCount: number
  AllKillCount: number
  PlayCount: number
  VictoryCount: number
  LoseCount: number
  TieCount: number
  KillCount: number
  AceCount: number
  DeathCount: number
}

export interface Colosseum {
  SeasonName: string
  Competitive: AggregationTeamDeathMatchRank
  TeamDeathmatch: Aggregation
  Deathmatch: Aggregation
  TeamElimination: AggregationElimination
  CoOpBattle: Aggregation
}

export interface ColosseumInfo {
  Rank: number
  PreRank: number
  Exp: number
  Colosseums: Colosseum[]
}

export interface CollectiblePoint {
  PointName: string
  Point: number
  MaxPoint: number
}

export interface Collectible {
  Type: string
  Icon: string
  Point: number
  MaxPoint: number
  CollectiblePoints: CollectiblePoint[]
}