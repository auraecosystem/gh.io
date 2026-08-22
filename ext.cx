#r "nuget: Newtonsoft.Json, 13.0.3"

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;

const string weeklyFilePath = @"C:\MyPath\ServiceTags_Public_20230904.json";

if (!File.Exists(weeklyFilePath))
{
    Console.WriteLine($"Error: File not found at '{weeklyFilePath}'");
    return;
}

var usRegions = new[]
{
    "centralus", "eastus", "eastus2", "eastus3", "northcentralus",
    "southcentralus", "westcentralus", "westus", "westus2", "westus3"
};

// Parse file and build fast lookup
var weeklyFile = JObject.Parse(File.ReadAllText(weeklyFilePath));
var values = (JArray)weeklyFile["values"];

var serviceTagLookup = values
    .Where(v => v["name"] != null)
    .ToDictionary(
        v => (string)v["name"],
        v => v["properties"]?["addressPrefixes"],
        StringComparer.OrdinalIgnoreCase
    );

foreach (string region in usRegions)
{
    string tag = $"AzureCloud.{region}";
    Console.WriteLine($"\n=== {tag} ===");

    if (serviceTagLookup.TryGetValue(tag, out var addressPrefixes) && addressPrefixes != null)
    {
        foreach (var ip in addressPrefixes)
        {
            Console.WriteLine(ip);
        }
    }
    else
    {
        Console.WriteLine("Tag not found in file.");
    }
}
