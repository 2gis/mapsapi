#!/bin/sh

py_files=$(git diff `git merge-base master HEAD`..HEAD --name-only | grep ".py$")
if [ "$py_files" = "" ]; then
    exit 0
fi

pass=true

echo "\nValidating python source files:\n"

for file in ${py_files}; do
    result=$(pep8 --format=pylint --config=functional-tests/pep8 ${file})
    if [ "$result" != "" ]; then
        echo "\t\033[31mpep8 Failed: ${file}\033[0m"
        echo "$result"
        pass=false
    else
        echo "\t\033[32mpep8 Passed: ${file}\033[0m"
    fi
done

echo "\nPython validation complete\n"

if ! $pass; then
    echo "\033[41mCOMMIT FAILED:\033[0m Your commit contains files that should pass pep8 but do not. Please fix the pep8 errors and try again.\n"
    exit 1
else
    echo "\033[42mCOMMIT SUCCEEDED\033[0m\n"
fi
