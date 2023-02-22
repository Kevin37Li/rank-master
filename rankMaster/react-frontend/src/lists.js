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

export const oscars_list = [
    "All Quiet on the Western Front",
    "Avatar: The Way of Water",
    "The Banshees of Inisherin",
    "Elvis",
    "Everything Everywhere All at Once",
    "The Fabelmans",
    "Tár",
    "Top Gun: Maverick",
    "Triangle of Sadness",
    "Women Talking",
]

export const marvel_list = [
    "WandaVision",
    "The Falcon and the Winter Solider",
    "Loki Season 1",
    "Black Widow",
    "What If...? Season 1",
    "Shang-Chi and the Legend of the Ten Rings",
    "Eternals",
    "Hawkeye",
    "Spider-Man: No Way Home",
    "Moon Knight",
    "Doctor Strange in the Multiverse of Madness",
    "Ms. Marvel",
    "Thor: Love and Thunder",
    "I Am Groot",
    "She-Hulk: Attorney at Law",
    "Werewolf by Night",
    "Black Panther: Wakanda Forever",
    "Guardians of the Galaxy: Holiday Special",
]

export const wanderlust_list = [
    "Sticky Rice + Mango",
    "Kinder",
    "Honey Lavender",
    "Ube Malted Crunch",
    "Abuelita Malted Crunch",
    "Japanese Neapolitan",
    "Wanderlust Vanilla",
    "Vietnamese Rocky Road",
    "Earl Grey",
    "Pandan Tres Leches",
    "Passionfruit Cacao",
    "Gianduja",
    "Smoky Road",
    "Hokey Pokey",
]

export const dining_list = [
    "Feast",
    "Epicuria",
    "De Neve",
    "BPlate"
]

export const nba_list = [
    "Giannis Antetokounmpo (Milwaukee Bucks)",
    "Kevin Durant (Brooklyn Nets)",
    "Jayson Tatum (Boston Celtics)",
    "Donovan Mitchell (Cleveland Cavaliers)",
    "Kyrie Irving (Brooklyn Nets)",
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
    },
    {
        title: "2023 Oscars Best Picture",
        category: "Movie",
        public: true,
        items: oscars_list,
        id: 6,
    },
    {
        title: "Marvel Phase 4",
        category: "Movie",
        public: true,
        items: marvel_list,
        id: 7,
    },
    {
        title: "Wanderlust Flavors",
        category: "Other",
        public: true,
        items: wanderlust_list,
        id: 8,
    },
    {
        title: "UCLA Dining Halls",
        category: "Other",
        public: true,
        items: dining_list,
        id: 9,
    },
    {
        title: "NBA All Star Starters",
        category: "Sport",
        public: true,
        items: nba_list,
        id: 10,
    }
]
