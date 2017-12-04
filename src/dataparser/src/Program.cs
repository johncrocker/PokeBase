using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Parser
{
    class Program
    {
        static void Main(string[] args)
        {
            string filename = "C:\\Projects\\t\\Data";
            string outputFile = "C:\\Projects\\t\\Output\\stats.csv";

            if (File.Exists(outputFile))
            {
                File.Delete(outputFile);
            }

            using (FileStream fs = new FileStream(outputFile, FileMode.Create, FileAccess.Write, FileShare.ReadWrite))
            {
                using (StreamWriter writer = new StreamWriter(fs, Encoding.UTF8))
                {
                    writer.WriteLine(
                        "id,maxcp,statatk,statdef,statsta,buddydistance,candytoevolve,capturerate,fleerate,legendary,tier1,tier2,tier3,tier4,tier5");

                    for (int i = 1; i < 650; i++)
                    {
                        filename = string.Format("C:\\Projects\\t\\Data\\{0}.html", i);
                        if (!File.Exists(filename))
                        {
                            continue;
                        }

                        Console.WriteLine("Loading " + filename);

                        var doc = new HtmlDocument();
                        doc.Load(filename);
                        var stats = doc.GetElementbyId("stats");

                        if (doc == null)
                        {
                            continue;
                        }

                        var maxcp = GetValue1(stats.SelectSingleNode("//*[@class=\"max-cp\"]"));
                        var statAtk = GetValue1(stats.SelectSingleNode("//*[@class=\"stat atk\"]"));
                        var statDef = GetValue1(stats.SelectSingleNode("//*[@class=\"stat def\"]"));
                        var statSta = GetValue1(stats.SelectSingleNode("//*[@class=\"stat sta\"]"));
                        var buddyDistance = GetValue2(stats.SelectSingleNode("//*[text()='Buddy Distance']")
                            .ParentNode);
                        var candyToEvolve =
                            GetValue2(stats.SelectSingleNode("//*[text()='Candy to evolve']").ParentNode);
                        var captureRate = GetValue2(stats.SelectSingleNode("//*[text()='Capture Rate']").ParentNode);
                        var fleeRate = GetValue2(stats.SelectSingleNode("//*[text()='Flee Rate']").ParentNode);
                        var legendary = GetValue2(stats.SelectSingleNode("//*[text()='Legendary']").ParentNode);
                        var raidboss = GetValue3(stats.SelectSingleNode("//*[@class=\"raid-boss-cps\"]"));

                        writer.Write(i.ToString());
                        writer.Write(",");
                        writer.Write(maxcp); writer.Write(",");
                        writer.Write(statAtk); writer.Write(",");
                        writer.Write(statDef); writer.Write(",");
                        writer.Write(statSta); writer.Write(",");
                        writer.Write(buddyDistance); writer.Write(",");
                        writer.Write(candyToEvolve); writer.Write(",");
                        writer.Write(captureRate); writer.Write(",");
                        writer.Write(fleeRate); writer.Write(",");
                        writer.Write(legendary); writer.Write(",");
                        writer.Write(raidboss["tier 1"]); writer.Write(",");
                        writer.Write(raidboss["tier 2"]); writer.Write(",");
                        writer.Write(raidboss["tier 3"]); writer.Write(",");
                        writer.Write(raidboss["tier 4"]); writer.Write(",");
                        writer.WriteLine(raidboss["tier 5"]);
                    }
                }
            }
        }

        public static string GetValue1(HtmlNode input)
        {
            if (input == null)
            {
                return string.Empty;
            }

            var content = input.SelectSingleNode("td");
            if (content == null)
            {
                return string.Empty;
            }

            return FormatText(content.ChildNodes[0].InnerText);
        }

        public static string GetValue2(HtmlNode input)
        {
            if (input == null)
            {
                return string.Empty;
            }

            var content = input.SelectSingleNode("td");
            if (content == null)
            {
                return string.Empty;
            }

            if (content.ChildNodes.Count > 1)
            {
                return FormatText(content.ChildNodes[1].InnerText);
            }
            else
            {
                return FormatText(content.ChildNodes[0].InnerText);
            }

        }

        public static Dictionary<string, string> GetValue3(HtmlNode input)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();

            if (input.ChildNodes.Count < 3) { return result; }

            var table = input.ChildNodes[3].SelectSingleNode("table");

            if (table == null) { return result; }

            var rows = table.SelectNodes("tr");

            if (rows == null) { return result; }

            foreach (HtmlNode row in rows)
            {
                result.Add(FormatText(row.ChildNodes[1].InnerText).ToLower(), FormatText(row.ChildNodes[3].InnerText));
            }

            return result;
        }

        public static string FormatText(string input)
        {
            string output = input.Replace("\n", "").Replace("\t", "").Trim();
            if (output.Equals("-"))
            {
                output = string.Empty;
            }

            return output;
        }
    }

}
