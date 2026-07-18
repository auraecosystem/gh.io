import semver_native

available_releases = [
    "1.0.0",
    "1.4.2",
    "1.9.0",
    "2.0.0",
    "2.1.5",
    "3.0.1"
]

# Scenario A: Pull all compatible patch values within major scope v1.x (Tilde constraint)
patch_matches = semver_native.filter_versions("~1.4.0", available_releases)
print(f"Matches for ~1.4.0: {patch_matches}")
# Output: ['1.4.2'] (Filters out 1.9.0 because minor must lock to 4)

# Scenario B: Pull all additions up until next breaking breaking version bump (Caret constraint)
feature_matches = semver_native.filter_versions("^2.0.0", available_releases)
print(f"Matches for ^2.0.0: {feature_matches}")
# Output: ['2.0.0', '2.1.5'] (Filters out 3.0.1 as a breaking change boundary)

# Scenario C: Bound checks via inequalities
greater_matches = semver_native.filter_versions(">=2.0.0", available_releases)
print(f"Matches for >=2.0.0: {greater_matches}")
# Output: ['2.0.0', '2.1.5', '3.0.1']
