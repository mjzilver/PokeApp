using Newtonsoft.Json;

using PokeApp.Models;

namespace PokeApp.Services
{
    public enum BattleOutcome
    {
        Tie,
        Pokemon1Wins,
        Pokemon2Wins
    }

    public class PokemonBattleService(HttpClient httpClient)
    {
        private readonly HttpClient _httpClient = httpClient;

        public async Task<BattleOutcome> Battle(Pokemon pokemon1, Pokemon pokemon2)
        {
            if (pokemon1 == null || pokemon2 == null)
            {
                throw new ArgumentNullException();
            }

            var pokemon1AverageDamageMultiplier = 1.0;
            var pokemon2AverageDamageMultiplier = 1.0;

            foreach (var type in pokemon1.Types!)
            {
                foreach (var type2 in pokemon2.Types!)
                {
                    var typeInfo = await GetTypeInfo(type);
                    var type2Info = await GetTypeInfo(type2);

                    if (typeInfo == null || type2Info == null)
                    {
                        throw new Exception("Error getting type info");
                    }

                    pokemon1AverageDamageMultiplier *= CalculateDamageMultiplier(typeInfo, type2Info);
                }
            }

            foreach (var type in pokemon2.Types!)
            {
                foreach (var type2 in pokemon1.Types!)
                {
                    var typeInfo = await GetTypeInfo(type);
                    var type2Info = await GetTypeInfo(type2);

                    if (typeInfo == null || type2Info == null)
                    {
                        throw new Exception("Error getting type info");
                    }

                    pokemon2AverageDamageMultiplier *= CalculateDamageMultiplier(typeInfo, type2Info);
                }
            }

            if (pokemon1AverageDamageMultiplier > pokemon2AverageDamageMultiplier)
            {
                return BattleOutcome.Pokemon1Wins;
            }
            else if (pokemon2AverageDamageMultiplier > pokemon1AverageDamageMultiplier)
            {
                return BattleOutcome.Pokemon2Wins;
            }
            else
            {
                return BattleOutcome.Tie;
            }
        }

        private async Task<PokemonTypeInfo?> GetTypeInfo(string type)
        {
            var pokemonTypeInfo = new PokemonTypeInfo()
            {
                Name = type,
                DoubleDamageTo = [],
                HalfDamageTo = [],
                NoDamageTo = []
            };

            try
            {
                var response = await _httpClient.GetStringAsync($"https://pokeapi.co/api/v2/type/{type}/");

                if (!string.IsNullOrEmpty(response))
                {
                    var typeInfo = JsonConvert.DeserializeObject<TypeInfoJSON>(response);
                    if (typeInfo != null)
                    {
                        pokemonTypeInfo.DoubleDamageTo.AddRange(typeInfo.DamageRelations.DoubleDamageTo.ConvertAll(t => t.Name));
                        pokemonTypeInfo.HalfDamageTo.AddRange(typeInfo.DamageRelations.HalfDamageTo.ConvertAll(t => t.Name));
                        pokemonTypeInfo.NoDamageTo.AddRange(typeInfo.DamageRelations.NoDamageTo.ConvertAll(t => t.Name));
                    }
                }
            }
            catch (HttpRequestException)
            {
                return null;
            }

            return pokemonTypeInfo;
        }

        private static double CalculateDamageMultiplier(PokemonTypeInfo attacker, PokemonTypeInfo defender)
        {
            if (attacker.NoDamageTo.Contains(defender.Name))
            {
                return 0;
            }

            double damageMultiplier = 1;

            foreach (var type in attacker.DoubleDamageTo)
            {
                if (defender.Name == type)
                {
                    damageMultiplier *= 2;
                }
            }

            foreach (var type in attacker.HalfDamageTo)
            {
                if (defender.Name == type)
                {
                    damageMultiplier *= 0.5;
                }
            }

            return damageMultiplier;
        }
    }

    public record PokemonTypeInfo
    {
        public required string Name { get; set; }
        public required List<string> DoubleDamageTo { get; set; }
        public required List<string> HalfDamageTo { get; set; }
        public required List<string> NoDamageTo { get; set; }
    }

    public record TypeInfoJSON
    {
        [JsonProperty("damage_relations")]
        public required DamageRelations DamageRelations { get; set; }
    }

    public record DamageRelations
    {
        [JsonProperty("double_damage_to")]
        public required List<TypeInfoLink> DoubleDamageTo { get; set; }
        [JsonProperty("half_damage_to")]
        public required List<TypeInfoLink> HalfDamageTo { get; set; }
        [JsonProperty("no_damage_to")]
        public required List<TypeInfoLink> NoDamageTo { get; set; }
    }

    public record TypeInfoLink
    {
        [JsonProperty("name")]
        public required string Name { get; set; }
    }
}