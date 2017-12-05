﻿using HtmlAgilityPack;
using Newtonsoft.Json;
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
            string filename = @"C:\Projects\PokeBase\src\dataparser\data";
            string outputFile = @"C:\Projects\PokeBase\src\dataparser\output\stats.csv";

            if (File.Exists(outputFile))
            {
                File.Delete(outputFile);
            }

            using (FileStream fs = new FileStream(outputFile, FileMode.Create, FileAccess.Write, FileShare.ReadWrite))
            {
                using (StreamWriter writer = new StreamWriter(fs, Encoding.UTF8))
                {
                    writer.WriteLine(
                        "id,maxcp,statatk,statdef,statsta,buddydistance,candytoevolve,capturerate,fleerate,legendary,tier1,tier2,tier3,tier4,tier5,maxcpperlevel");

                    for (int i = 1; i < 650; i++)
                    {
                        filename = string.Format(@"C:\Projects\PokeBase\src\dataparser\data\{0}", i);
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
                        var maxCPPerLevel = GetValue4(stats.SelectSingleNode("//*[@class=\"max-cp-per-level\"]"));
                        WriteField(writer, i.ToString(), true);
                        WriteField(writer, maxcp, true);
                        WriteField(writer, statAtk, true);
                        WriteField(writer, statDef, true);
                        WriteField(writer, statSta, true);
                        WriteField(writer, buddyDistance, true);
                        WriteField(writer, candyToEvolve, true);
                        WriteField(writer, captureRate, true);
                        WriteField(writer, fleeRate, true);
                        WriteField(writer, legendary, true);
                        WriteField(writer, raidboss["tier 1"], true);
                        WriteField(writer, raidboss["tier 2"], true);
                        WriteField(writer, raidboss["tier 3"], true);
                        WriteField(writer, raidboss["tier 4"], true);
                        WriteField(writer, raidboss["tier 5"], true);
                        WriteField(writer, JsonConvert.SerializeObject(maxCPPerLevel), false);
                    }
                }
            }
        }

        private static void WriteField(StreamWriter writer, string field, bool comma)
        {
            string data = string.Format("\"{0}\"", field.Replace(@"""", @""""""));

            if (comma)
            {
                writer.Write(data);
                writer.Write(",");
            }
            else
            {
                writer.WriteLine(data);
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

        public static List<CPStat> GetValue4(HtmlNode input)
        {
            List<CPStat> result = new List<CPStat>();

            if (input.ChildNodes.Count < 6) { return result; }

            var table = input.SelectSingleNode("table");

            if (table == null) { return result; }

            var rows = table.SelectSingleNode("tbody").SelectNodes("tr");

            if (rows == null) { return result; }

            foreach (HtmlNode row in rows)
            {
                result.Add(new CPStat(FormatText(row.ChildNodes[1].InnerText).ToLower(),
                    FormatText(row.ChildNodes[3].InnerText), FormatText(row.ChildNodes[5].InnerText)));
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
