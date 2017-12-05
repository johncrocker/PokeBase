using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parser
{
    public class CPStat
    {
        [JsonProperty(PropertyName = "level")]
        public string Level { get; set; }

        [JsonProperty(PropertyName = "min")]
        public string Minimum { get; set; }

        [JsonProperty(PropertyName = "max")]
        public string Maximum { get; set; }

        public CPStat(string level, string min, string max)
        {
            Level = level;
            Minimum = min;
            Maximum = max;
        }
    }
}
