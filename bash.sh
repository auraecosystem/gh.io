pip install hyperweave
hyperweave install-hook

python3 -m http.server 8080
SYMLINK=<symlink>
MONOPREFIX=/Library/Frameworks/Mono.framework/Versions/$SYMLINK
echo "##vso[task.setvariable variable=DYLD_FALLBACK_LIBRARY_PATH;]$MONOPREFIX/lib:/lib:/usr/lib:$DYLD_LIBRARY_FALLBACK_PATH"
echo "##vso[task.setvariable variable=PKG_CONFIG_PATH;]$MONOPREFIX/lib/pkgconfig:$MONOPREFIX/share/pkgconfig:$PKG_CONFIG_PATH"
echo "##vso[task.setvariable variable=PATH;]$MONOPREFIX/bin:$PATH"
token=`ibmcloud iam oauth-tokens --output json | jq .iam_token -r`
# Connectors preset
https://hyperweave.app/v1/matrix/connectors/primer.static?variant=porcelain

# Any table, one URL: base64url MatrixSpec JSON (8 KB cap)
https://hyperweave.app/v1/matrix/verbs-mouth/primer.static?spec=<base64url>

# CLI, with the markdown twin alongside
hyperweave compose matrix --spec-file table.json -g primer --variant porcelain --markdown-out table.md
hyperweave compose diagram --spec-file tree-health -g primer --variant porcelain --surface inlay --face light -o tree-health-light.svg
hyperweave compose diagram --spec-file cycle-flow -g primer --variant porcelain --surface inlay --face light -o cycle-flow-light.svg
