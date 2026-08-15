using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace WeeklyFileIPRanges
{
    class Program
    {
        // Path to the locally saved weekly file
        const string weeklyFilePath = @"C:\MyPath\ServiceTags_Public_20230904.json";

        static void Main(string[] args)
        {
            // United States geography has the following regions:
            // Central US, East US, East US 2, East US 3, North Central US, 
            // South Central US, West Central US, West US, West US 2, West US 3
            // This list is accurate as of 9/8/2023
            List<string> USGeographyRegions = new List<string>
            {
                "centralus",
                "eastus",
                "eastus2",
                "eastus3",
                "northcentralus",
                "southcentralus",
                "westcentralus",
                "westus",
                "westus2",
                "westus3"
            };

            // Load the weekly file
            JObject weeklyFile = JObject.Parse(File.ReadAllText(weeklyFilePath));
            JArray values = (JArray)weeklyFile["values"];

            foreach (string region in USGeographyRegions)
            {
                string tag = $"AzureCloud.{region}";
                Console.WriteLine(tag);

                var ipList =
                    from v in values
                    where tag.Equals((string)v["name"], StringComparison.OrdinalIgnoreCase)
                    select v["properties"]["addressPrefixes"];

                foreach (var ip in ipList.Children())
                {
                    Console.WriteLine(ip);
                }
            }
        }
    }
}
