# Contributing

Thanks for considering to contribute to Localízame project. It really means a lot!

We worked hard to provide a high-quality and useful demo of this idea to save you all time, and we greatly value feedback and contributions from the community.

Whether it's a new feature, correction, or additional documentation, we welcome your pull requests. Please submit any [issues](https://github.com/mercadonait/localizame/issues) or [pull requests](https://github.com/mercadonait/localizame/pulls) through GitHub.

This document contains guidelines for reporting issues or pull requests and contributing code.

Mind we may take some time to answer.

## Reporting Issues

- Check to see if there\'s an existing issue/pull request for the bug/feature. All issues are at <https://github.com/mercadonait/localizame/issues> and pull reqs are at <https://github.com/mercadonait/localizame/pulls>.
- If there isn\'t an existing issue there, please file an issue. The ideal report includes:
  - A description of the problem/suggestion.
  - The specific Localízame steps you did. For the backend it may help you attach the logs, api calls, example input/output files, and for the frontend the inspection screen of your browser and steps you did follow to get there.
  - You may include also the specific commit version you have been executing.

The first thing an Localízame developer will do is try to reproduce the issue you are seeing, so try to reduce your issue to the smallest possible set of steps that demonstrate the issue. This will lead to quicker resolution of your issue.

## Contributing Code

The list below are guidelines to use when submitting pull requests. These are the same set of guidelines that the core contributors use when submitting changes, and we ask the same of all community contributions as well:

- The project as a whole is released under the [Apache license](https://github.com/MercadonaIT/localizame/blob/main/LICENSE). Any code you submit will be released under that license.
- We aim to maintain a high percentage of code coverage in our unit tests. As a general rule of thumb, code changes should not lower the overall code coverage percentage for the project. In practice, this means that **every bug fix and feature addition should include tests.**.
- We aim to use [ESLint standard config for TypeScript Style Guide](https://github.com/standard/eslint-config-standard-with-typescript) that is based on eslint-config-standard and has TypeScript specific rules from @typescript-eslint/eslint-plugin. With this we try to be more comprehensive and cover a wide range of topics, including best practices for naming conventions, code organization, and documentation. It also includes a set of ESLint rules to help enforce the guide's recommendations... although if you are modifying an existing module, it is more important for the code to be consistent if there are any discrepancies. Using ESLint can assist you in identifying compliance issues. In any case, we don't enforce it and there are exceptions.
- The Localízame is cross platform and code must work on at least Linux, Windows, and Mac OS X. Avoid platform specific behavior.
- If you would like to implement support for a significant feature that is not yet available in the Localízame, please start a discussion beforehand to avoid any duplication of effort. You can file an [issue](https://github.com/mercadonait/localizame/issues) or also check our [backlog panel](https://github.com/orgs/MercadonaIT/projects/4) to discuss the feature request further.
- Add yourself to the [AUTHORS](./AUTHORS.md) file

## Git Commits and Workflow

When sending a pull request, please follow these guidelines:

- The PR should target the `develop` branch.
- Your PR branch should be based off a recent commit of the `develop` branch. Preferably the base commit for the PR should use the latest commit of `develop` at the time the PR was created. This helps to ensure there are no merge conflicts or test failures when the PR is merged back to the develop branch.
- Make separate commits for logically separate changes. Avoid commits such as \"update\", \"fix typo again\", \"more updates\". Rebase your commits before submitting your PR to ensure they represent a logical change.
- Avoid merge commits in your PRs. If you want to pull in the latest changes from the `develop` branch, rebase on top of the `develop` branch instead of merging the `develop` branch into your feature branch.

Also, ensure your commit messages match this format:

    Short (50 characters or less) summary

    After the 50 character summary and a blank line, you can include a body if necessary. Note that the 50 character summary does not end with any punctuation. Describe your changes in the imperative mood, e.g., "Add foo to bar", "Update foo component for bar", "Fix race condition for foo".

    The body of the commit message can include:

    * an explanation of the problem and what this change tries to solve.

    * rationale behind the specific implementation

    * alternatives considered and why they were discarded, if appropriate.

    Please limit the line length in the body of a commit message to 80 characters or less.

### Example Git Workflow

Below is an example of how you can use git to create a feature branch. First, make sure you've created a fork of `mercadonait/localizame`. Then you can run these commands:

    # Clone the repo and set up the remotes.

    $ git clone git@github.com:myusername/localizame.git
    $ cd localizame
    $ git remote add upstream https://github.com/mercadonait/localizame.git
    $ git fetch upstream
    $ git merge upstream/develop

    # Now to create a feature branch:
    $ git checkout -b my-branch-name

    # Now add your commits for your features.
    $ git add path/to/my/files

    # Make sure our commit message matches format described in the
    # previous section.
    $ git commit -m "Add support for foo"

    # If we want to sync with the latest upstream changes before
    # sending our pull request we can run:
    $ git fetch upstream
    $ git rebase upstream/develop

    # When you're ready to send a PR, make sure you push your commits
    # to your fork:
    $ git push origin my-branch-name

When you push to your remote, the output will contain a URL you can use to open a pull request.

## Localízame Development Version

When running locally in your machine Localízame, how to run instructions available in the README.md file, those are the ones for master and develop branches.

You might need to do run locally the development version if:

- You are developing a feature for Localízame and plan on submitting a Pull Request.
- You want to test the latest changes of Localízame before they make it into an official release.

The latest changes to Localízame are in the `develop` branch on github. The default branch is main, mind this when you clone the git repository if you intend to develop.

Additionally, note that there aren't other package being developed in lockstep with Localízame.

To keep up to date, you will continually have to run the `git pull && npm install` to pull in the latest changes from the develop branch and update your local dependencies.
