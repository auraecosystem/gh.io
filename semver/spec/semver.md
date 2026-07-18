SEMVER MODULE

Grammar
-------
Accept:

MAJOR.MINOR.PATCH
MAJOR.MINOR.PATCH-PRERELEASE
MAJOR.MINOR.PATCH+BUILD
MAJOR.MINOR.PATCH-PRERELEASE+BUILD

Examples:

1.0.0
1.2.3
1.2.3-alpha
1.2.3-alpha.1
1.2.3-beta
1.2.3-rc.1
1.2.3+build
1.2.3+linux.x64
1.2.3-alpha+001

Version Structure
-----------------

Version {
    major: Integer
    minor: Integer
    patch: Integer
    prerelease: List<String>
    build: List<String>
}

Parser API
----------

parse(version)
validate(version)

Comparison API
--------------

compare(a, b)
equal(a, b)
less(a, b)
greater(a, b)

Version Operations
------------------

incrementMajor(v)
incrementMinor(v)
incrementPatch(v)

Constraint API
--------------

parseConstraint(expr)

satisfies(version, expr)

Supported constraints:

>1.0.0
>=1.0.0
<2.0.0
<=2.0.0
^1.2.3
~1.2.3
1.*
1.2.*

Dependency Resolver
-------------------

resolve(package)

selectHighestCompatible()

detectConflicts()

buildDependencyGraph()

Validation Rules
----------------

✓ Exactly three numeric identifiers

✓ No leading zeros

✓ Optional prerelease

✓ Optional build metadata

✓ Dot-separated identifiers

✓ Letters, digits and hyphens only

Comparison Rules
----------------

Major

↓

Minor

↓

Patch

↓

Prerelease

↓

Build metadata (ignored for precedence)

Examples

1.0.0
<
1.0.1

1.0.1
<
1.1.0

1.1.0
<
2.0.0

1.0.0-alpha
<
1.0.0-beta

1.0.0-beta
<
1.0.0-rc.1

1.0.0-rc.1
<
1.0.0

Public API
----------

parse()

validate()

compare()

equal()

less()

greater()

incrementMajor()

incrementMinor()

incrementPatch()

parseConstraint()

satisfies()

resolve()

sort()

toString()

Test Cases
----------

VALID

1.0.0
0.1.0
2.5.1
1.0.0-alpha
1.0.0-alpha.1
1.0.0-beta
1.0.0-rc.1
1.0.0+build
1.0.0-alpha+001

INVALID

1
1.2
01.2.3
1.02.3
1.2.03
1.2.3-
1.2.3+
1.2.3-alpha..

Package Manager Workflow
------------------------

Read manifest
      │
      ▼
Parse version
      │
      ▼
Validate
      │
      ▼
Parse constraints
      │
      ▼
Resolve dependencies
      │
      ▼
Compare versions
      │
      ▼
Install highest compatible version
