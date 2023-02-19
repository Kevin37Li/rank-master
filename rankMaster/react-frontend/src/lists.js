export const mlb_list = [ "ARI", "COL", "HOU", "LAA", "LAD", "OAK", "SD", "SF", "SEA", "TEX" ];

export const num_list = [30, 10, 20, 40, 0, 60, 50]

export const zutomayo_list = [
    "\"Byōshin o Kamu\" (秒針を噛む)",
    "\"Nōriue no Cracker\" (脳裏上のクラッカー)",
    "\"Humanoid\" (ヒューマノイド)",
    "\"Mabushii DNA Dake\" (眩しいDNAだけ)",
    "\"Seigi\" (正義)",
    "\"Kettobashita Mōfu\" (蹴っ飛ばした毛布)",
    "\"Obenkyō Shitoite yo\" (お勉強しといてよ)",
    "\"Darken\" (暗く黒く)",
    "\"Hunch Gray\" (勘ぐれい)",
    "\"Can't Be Right\" (正しくなれない)",
    "\"Inside Joke\" (あいつら全員同窓会)",
    "\"Stay Foolish\" (ばかじゃないのに)",
    "\"Mirror Tune\" (ミラーチューン)",
    "\"Blush\" (消えてしまいそうです)",
    "\"Time Left\" (残機)",
    "\"Kira Killer\" (綺羅キラー)\n(featuring Mori Calliope)",
]

export const jojo_list = [
    "Part 1: Phantom Blood",
    "Part 2: Battle Tendency",
    "Part 3: Stardust Crusaders",
    "Part 4: Diamond Is Unbreakable",
    "Part 5: Golden Wind",
    "Part 6: Stone Ocean",
    "Part 7: Steel Ball Run",
    "Part 8: JoJolion",
]

export const cs_list = [
    "CS 31", "CS 32", "CS 33", "CS 35L", "CS M51A",
    "CS 111", "CS 118", "CS 131", "CS 130", "CS M151B", "CS M152A", "CS 180", "CS 181"
]

export const list_of_lists = [
    {
        title: "JJBA",
        category: "TV",
        public: true,
        items: jojo_list,
        id: 1,
    },
    {
        title: "UCLA CS Required Classes",
        category: "Other",
        public: true,
        items: cs_list,
        id: 2,
    },
    {
        title: "Zutomayo songs",
        category: "Music",
        public: true,
        items: zutomayo_list,
        id: 3,
    },
    {
        title: "MLB West Teams",
        category: "Other",
        public: true,
        items: mlb_list,
        id: 4,
    },
    {
        title: "Numbers",
        category: "Other",
        public: true,
        items: num_list,
        id: 5,
    }
]
